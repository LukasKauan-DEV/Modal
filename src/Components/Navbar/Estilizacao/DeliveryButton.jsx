import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeliveryButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowModal(true);
      setIsAnimating(false);
    }, 1000); // Tempo da animação
  };

  return (
    <>
      <div 
        className="position-relative d-inline-block" 
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="small">Insira seu endereço</div>
        <div 
          className={`moto ${isAnimating ? 'animate' : ''}`}
          style={{
            position: 'absolute',
            right: -30,
            top: '50%',
            transform: 'translateY(-50%)',
            transition: 'all 0.8s ease-out',
            fontSize: '24px'
          }}
        >
          🏍️
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastre seu endereço</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Formulário do endereço aqui */}
          <p>Em breve você poderá cadastrar seu endereço para entrega!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .moto.animate {
          animation: acelerar 1s forwards;
        }
        
        @keyframes acelerar {
          0% {
            transform: translateY(-50%) translateX(0);
          }
          30% {
            transform: translateY(-50%) translateX(-10px) rotate(-5deg);
          }
          60% {
            transform: translateY(-50%) translateX(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(-50%) translateX(-100vw);
          }
        }
      `}</style>
    </>
  );
};

export default DeliveryButton;