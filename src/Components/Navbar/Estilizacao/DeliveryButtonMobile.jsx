import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { GiMotorbike } from 'react-icons/gi'; // Ícone de moto profissional

const DeliveryButtonMobile = () => {
  const [showModal, setShowModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null); // Ref para controlar a animação

  const handleClick = () => {
    if (isAnimating) return; // Previne múltiplos cliques
    setIsAnimating(true);
  };

  useEffect(() => {
    // Limpeza quando o componente desmontar
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isAnimating) {
      animationRef.current = setTimeout(() => {
        setShowModal(true);
        setIsAnimating(false);
      }, 800);
    }
  }, [isAnimating]);

  return (
    <div className="delivery-mobile-wrapper">
      <div 
        className="delivery-trigger"
        onClick={handleClick}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        <div className="small text-muted">Entrega</div>
        <div 
          className={`moto-icon ${isAnimating ? 'animate' : ''}`}
          style={{
            position: 'absolute',
            right: -30,
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        >
          <GiMotorbike size={20} color="#e63946" />
        </div>
      </div>

      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="border-bottom-0">
          <Modal.Title className="d-flex align-items-center">
            <GiMotorbike size={24} className="me-2" color="#e63946" />
            <span>Endereço de Entrega</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <p className="mb-4">Informe seu endereço para calcularmos o frete:</p>
          {/* Adicione seu formulário aqui */}
          <div className="mb-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Digite seu endereço completo"
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="border-top-0">
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowModal(false)}
            className="px-4"
          >
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={() => setShowModal(false)}
            className="px-4"
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .moto-icon {
          transition: transform 0.3s ease;
        }
        
        .moto-icon.animate {
          animation: motoRide 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes motoRide {
          0% {
            transform: translateY(-50%) translateX(0) rotate(0deg);
            opacity: 1;
          }
          30% {
            transform: translateY(-50%) translateX(15px) rotate(-10deg);
          }
          60% {
            transform: translateY(-50%) translateX(30px) rotate(10deg);
          }
          100% {
            transform: translateY(-50%) translateX(80px) rotate(0deg);
            opacity: 0;
          }
        }
        
        .delivery-trigger {
          padding-right: 40px;
        }
      `}</style>
    </div>
  );
};

export default DeliveryButtonMobile;