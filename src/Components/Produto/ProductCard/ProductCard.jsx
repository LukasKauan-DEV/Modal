import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiShoppingCart, FiStar, FiClock, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../../../context/CartProvider';
import { useAddress } from '../../../context/AddressContext'; // Importe o contexto de endereço
import AddressChangeModal from './Cart/CartModal/AddressChangeModal'

const ProductCard = ({ product }) => {

  const [showAddressSelector, setShowAddressSelector] = useState(false);

  const handleAddressChange = () => {
    setShowAddressSelector(true);
    
  };

  const [showCartModal, setShowCartModal] = useState(false);
  const { 
    cartItems, 
    addToCart, 
    removeFromCart, 
    updateQuantity,
    totalItems,
    totalPrice
  } = useCart();

  // Obtenha os dados do endereço e frete do contexto
  const { address, deliveryFee } = useAddress();
  const deliveryMethod = address?.type || 'pickup'; // 'delivery' ou 'pickup'

  // Verifica se o produto já está no carrinho
  const itemInCart = cartItems.find(item => item.id === product.id);
  const currentQuantity = itemInCart ? itemInCart.quantity : 0;

  // Calcula o total incluindo o frete (se for entrega)
  const calculateTotalWithDelivery = () => {
    const deliveryCost = deliveryMethod === 'delivery' ? parseFloat(deliveryFee || 0) : 0;
    return totalPrice + deliveryCost;
  };

  const totalWithDelivery = calculateTotalWithDelivery();

  return (
    <>
      <div className="col-md-6 col-lg-4 mb-4 pb-6">
        <div className="card h-100 border-0 shadow-sm">
          {/* Container da imagem */}
          <div className="position-relative overflow-hidden" style={{
            width: '250px', 
            height: '250px',
            margin: '0 auto'
          }}>
            <div className="d-flex justify-content-center align-items-center h-100">
              <img
                src={product.imagem || 'https://source.unsplash.com/random/600x400?food'}
                className="img-fluid object-fit-cover"
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectPosition: 'center'
                }}
              />
            </div>
            
            {/* Badge "NOVO" */}
            {product.isNovo && (
              <span className="position-absolute top-0 start-0 m-2 bg-success text-white px-2 py-1 rounded-pill small">
                NOVO
              </span>
            )}
          </div>

          {/* Corpo do card */}
          <div className="card-body d-flex flex-column">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h5 className="card-title mb-0 fw-bold">{product.name}</h5>
              <span className="text-primary fw-bold fs-5">
                {product.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>

            <p className="card-text text-secondary small mb-3 flex-grow-1">
              {product.description || 'Descrição não disponível'}
            </p>
            <p className="card-text text-secondary small mb-3 flex-grow-1">
              <strong>Código do Produto: </strong>{product.codigo || 'Descrição não disponível'}
            </p>

            <button
              className={`btn w-100 rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center ${
                product.estoque <= 0 ? 'btn-outline-secondary' : 'btn-primary'
              }`}
              onClick={() => addToCart(product)}
              disabled={
                product.estoque <= 0 || 
                currentQuantity >= product.estoque
              }
            >
              <FiShoppingCart className="me-2" />
              {product.estoque <= 0 
                ? 'Esgotado' 
                : currentQuantity > 0 
                  ? `Adicionar mais (${currentQuantity})` 
                  : 'Adicionar ao Carrinho'}
            </button>
          </div>
        </div>
      </div>

      {/* Botão flutuante do carrinho */}
      {totalItems > 0 && (
        <div className="position-fixed bottom-0 start-0 end-0 p-3" style={{ zIndex: 1050 }}>
          <button 
            className="btn w-100 rounded-pill py-3 d-flex align-items-center justify-content-center position-relative"
            style={{ 
              height: '60px', 
              maxWidth: 'calc(100% - 1.5rem)', 
              margin: '0 auto', 
              backgroundColor: '#77CC8A' 
            }}
            onClick={() => setShowCartModal(true)}
          >
            <span style={{fontSize: '1.4rem'}}>Ver Carrinho</span>
            <div className="position-relative ms-2">
              <FiShoppingCart size={25} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                {totalItems}
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Modal do carrinho */}
      {showCartModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ 
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1060
        }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Seu Carrinho</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowCartModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {cartItems.length === 0 ? (
                  <p className="text-center text-muted py-4">Seu carrinho está vazio</p>
                ) : (
                  <>
                    {/* Exibir método de entrega/retirada */}
                    <div className="mb-3 p-3 bg-light rounded">
                      <AddressChangeModal />
                    </div>

                    <ul className="list-group mb-3">
                      {cartItems.map(item => (
                        <li key={item.id} className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <div style={{ width: '50%' }}>
                              <h6 className="mb-1 text-truncate">{item.nome}</h6>
                              <small className="text-muted">
                                {item.preco.toLocaleString('pt-BR', { 
                                  style: 'currency', 
                                  currency: 'BRL' 
                                })}
                              </small>
                              <div className="small text-muted mt-1">
                                {item.name || 'Descrição não disponível'}
                              </div>
                            </div>
                            <div className="d-flex align-items-center">
                              <button 
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </button>
                              <span className="mx-2">{item.quantity}</span>
                              <button 
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.estoque}
                              >
                                +
                              </button>
                              <button 
                                className="btn btn-sm btn-outline-danger ms-2"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {/* Resumo do pedido com frete */}
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
                        <span>Subtotal:</span>
                        <span>
                          {totalPrice.toLocaleString('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL' 
                          })}
                        </span>
                      </div>
                      {deliveryMethod === 'delivery' && (
                        <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
                          <span>Taxa de entrega:</span>
                          <span>
                            {deliveryFee.toLocaleString('pt-BR', { 
                              style: 'currency', 
                              currency: 'BRL' 
                            })}
                          </span>
                        </div>
                      )}
                      <div className="d-flex justify-content-between align-items-center p-2">
                        <h5 className="mb-0">Total:</h5>
                        <h5 className="mb-0 text-primary">
                          {totalWithDelivery.toLocaleString('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL' 
                          })}
                        </h5>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowCartModal(false)}
                >
                  Continuar Comprando
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  disabled={cartItems.length === 0}
                >
                  Finalizar Compra
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    descricao: PropTypes.string,
    preco: PropTypes.number.isRequired,
    imagem: PropTypes.string,
    estoque: PropTypes.number,
    isNovo: PropTypes.bool,
  }).isRequired,
};

export default ProductCard;