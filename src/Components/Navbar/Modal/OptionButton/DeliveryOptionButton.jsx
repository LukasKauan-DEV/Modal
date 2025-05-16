import React from 'react';
import { Button } from 'react-bootstrap';
import { FaCheckCircle, FaMotorcycle, FaStore } from 'react-icons/fa';

/**
 * Componente DeliveryOptionButton - Botões de seleção de entrega/retirada
 * 
 * Responsabilidades:
 * - Exibir botões estilizados para "Retirar na loja" e "Entregar no meu endereço"
 * - Indicar visualmente a opção selecionada
 * - Notificar o componente pai sobre a seleção
 * 
 * Props:
 * - option (string): Tipo de opção ('pickup' ou 'delivery')
 * - selectedOption (string): Opção atualmente selecionada
 * - onSelect (function): Callback quando uma opção é selecionada
 * - storeAddress (object): { street, number } para exibir no botão de retirada
 */
const DeliveryOptionButton = ({ option, selectedOption, onSelect, storeAddress }) => {
  const isSelected = selectedOption === option;
  const isPickup = option === 'pickup';

  return (
    <Button
      variant={isSelected ? 'success' : 'outline-secondary'}
      onClick={() => onSelect(option)}
      className="text-start p-3"
    >
      <div className="d-flex align-items-center">
        {isSelected && <FaCheckCircle className="me-2" />}
        {isPickup ? (
          <FaStore className="me-3" size={24} />
        ) : (
          <FaMotorcycle className="me-3" size={24} />
        )}
        <div>
          <h5 className="mb-1">
            {isPickup ? 'Retirar na loja' : 'Entregar no meu endereço'}
          </h5>
          <small className="text-muted">
            {isPickup 
              ? `${storeAddress.street}, ${storeAddress.number}`
              : 'Frete calculado conforme localização'}
          </small>
        </div>
      </div>
    </Button>
  );
};

export default DeliveryOptionButton;