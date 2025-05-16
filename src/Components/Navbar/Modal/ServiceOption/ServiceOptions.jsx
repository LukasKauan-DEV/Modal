import React from 'react';
import { Button } from 'react-bootstrap';

/**
 * Componente ServiceOptions - Ações após seleção de retirada na loja
 * 
 * Responsabilidades:
 * - Exibir botões "Ver Produtos" e "Agendar Serviço"
 * - Gerenciar a navegação entre modais
 * - Manter o mesmo estilo visual do original
 * 
 * Props:
 * - onViewProducts (function): Callback para fechar o modal principal
 * - onScheduleService (function): Callback para abrir o modal de agendamento
 */
const ServiceOptions = ({ onViewProducts, onScheduleService }) => {
  return (
    <div className="mt-4 text-center">
      <h5>O que você deseja?</h5>
      <div className="d-flex gap-2 justify-content-center mt-3">
        <Button 
          variant="primary"
          onClick={onViewProducts}
        >
          Ver Produtos
        </Button>
        <Button 
          variant="outline-primary"
          onClick={onScheduleService}
        >
          Agendar Serviço
        </Button>
      </div>
    </div>
  );
};

export default ServiceOptions;