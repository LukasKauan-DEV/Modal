import React, { useState, useEffect, useRef, useCallback } from 'react';
import Categoria from '../Categoria/Categoria';
import { productService } from '../../services/firebase_products';
import { categoryService } from '../../services/firebase_categories';
import LoadingSkeleton from './LoadingSkeleton/LoadingSkeleton';
import ProductCard from './ProductCard/ProductCard'; // Importação do card do produto
import './Produto.css'; // Importação do CSS

const Produto = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const categoryRefs = useRef({});
  const observer = useRef(null);
  const lastScrollTime = useRef(0);

  // Função para carregar os dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const [productsData, categoriesData] = await Promise.all([
          productService.getProducts(),
          categoryService.getCategories()
        ]);
        
        if (!productsData || !categoriesData) {
          throw new Error("Dados não encontrados");
        }
        
        // Define a primeira categoria como ativa
        if (categoriesData.length > 0) {
          setActiveCategory(categoriesData[0].id);
        }
        
        setCategories(categoriesData.map(cat => ({
          ...cat,
          label: cat.name
        })));
        
        // Mapeia os produtos com suas categorias
        const productsWithCategories = productsData.map(product => {
          const productCategory = categoriesData.find(cat => cat.id === product.id_categoria);
          
          return {
            ...product,
            categoryName: productCategory?.name || 'Sem categoria',
            categoryColor: productCategory?.color || '#6c757d'
          };
        });

        setProducts(productsWithCategories);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Erro ao carregar produtos. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função de fallback para o scroll
  const handleScroll = useCallback(() => {
    const now = Date.now();
    if (now - lastScrollTime.current > 100) {
      lastScrollTime.current = now;
      
      Object.values(categoryRefs.current).forEach(ref => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const isVisible = rect.top <= 120 && rect.bottom >= 100;
          if (isVisible) {
            const categoryId = ref.id.replace('cat-', '');
            setActiveCategory(prev => prev === categoryId ? prev : categoryId);
          }
        }
      });
    }
  }, []);

  // Configura o IntersectionObserver
  useEffect(() => {
    if (categories.length === 0 || products.length === 0) return;

    const options = {
      root: null,
      rootMargin: window.innerWidth < 768 ? '-40% 0px -55% 0px' : '-25% 0px -65% 0px',
      threshold: window.innerWidth < 768 ? 0.15 : 0.1
    };

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= options.threshold) {
          const categoryId = entry.target.id.replace('cat-', '');
          setActiveCategory(prev => prev === categoryId ? prev : categoryId);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersection, options);

    Object.values(categoryRefs.current).forEach(ref => {
      if (ref) observer.current.observe(ref);
    });

    // Adiciona fallback para scroll
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [categories, products, handleScroll]);

  // Agrupa produtos por categoria
  const productsByCategory = products.reduce((acc, product) => {
    const categoryId = product.id_categoria || 'outros';
    
    if (!acc[categoryId]) {
      acc[categoryId] = {
        products: [],
        category: categories.find(c => c.id === categoryId) || { 
          id: categoryId, 
          name: product.categoryName || 'Outros', 
          color: product.categoryColor || '#6c757d' 
        }
      };
    }
    acc[categoryId].products.push(product);
    return acc;
  }, {});

  if (isLoading) {
    return <LoadingSkeleton count={6}/>;
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-3">
      <Categoria 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
      />
  
      <div className="mt-3">
        <div className="accordion" id="categoriesAccordion">
          {Object.entries(productsByCategory).map(([categoryId, { products: categoryProducts, category }]) => (
            <div 
              key={categoryId}
              id={`cat-${categoryId}`}
              ref={el => categoryRefs.current[categoryId] = el}
              className="accordion-item mb-3 border-0"
            >
              <h2 className="accordion-header" id={`heading-${categoryId}`}>
                <button 
                  className="accordion-button bg-gradient" 
                  type="button"
                  style={{ 
                    background: `linear-gradient(135deg, ${category.color}15, ${category.color}30)`,
                    color: category.color,
                    boxShadow: 'none'
                  }}
                >
                  {category.name}
                </button>
              </h2>
              <div 
                id={`collapse-${categoryId}`}
                className="accordion-collapse collapse show"
                aria-labelledby={`heading-${categoryId}`}
              >
                <div className="accordion-body p-0 pt-3">
                  <div className="row g-4">
                    {categoryProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Produto;