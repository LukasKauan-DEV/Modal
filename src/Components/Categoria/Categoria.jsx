import React, { useEffect, useRef } from 'react';
import './Categoria.css'; // Importação do CSS

const Categoria = ({ activeCategory, setActiveCategory, categories }) => {
  const menuRef = useRef(null);
  const menuContainerRef = useRef(null);

  // Função para rolar o menu até a categoria ativa
  const scrollToActiveButton = () => {
    if (menuRef.current && activeCategory) {
      const menu = menuRef.current;
      const activeButton = menu.querySelector(`[data-category="${activeCategory}"]`);
      
      if (activeButton) {
        const menuRect = menu.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        const scrollTo = activeButton.offsetLeft - (menuRect.width / 2) + (buttonRect.width / 2);
        
        menu.scrollTo({
          left: scrollTo,
          behavior: 'smooth'
        });
      }
    }
  };

  // Atualiza o scroll do menu quando a categoria muda
  useEffect(() => {
    scrollToActiveButton();
  }, [activeCategory]);

  // Adiciona listener de redimensionamento
  useEffect(() => {
    const handleResize = () => {
      scrollToActiveButton();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={menuContainerRef}
      className="categories-container"
      style={{
        position: 'sticky',
        top: '75px',
        zIndex: 1020,
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '0.5rem 0'
      }}
    >
      <div 
        ref={menuRef}
        className="d-flex overflow-auto hide-scrollbar px-2"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            data-category={cat.id}
            type="button"
            className={`btn btn-outline-primary rounded-pill mx-1 flex-shrink-0 ${
              activeCategory === cat.id ? 'active' : ''
            }`}
            onClick={() => {
              setActiveCategory(cat.id);
              const element = document.getElementById(`cat-${cat.id}`);
              if (element) {
                const offset = 120;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }
            }}
            style={{
              borderColor: cat.color,
              color: activeCategory === cat.id ? '#fff' : cat.color,
              backgroundColor: activeCategory === cat.id ? cat.color : 'transparent',
              padding: '0.375rem 1rem',
              fontSize: '0.875rem'
            }}
          >
            {cat.name || cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categoria;