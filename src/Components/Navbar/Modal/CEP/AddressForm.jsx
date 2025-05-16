import React from 'react';
import { Accordion, Form, Button } from 'react-bootstrap';

/**
 * Componente AddressForm - Formulário de busca por CEP e campos de endereço
 * 
 * Responsabilidades:
 * - Buscar endereço via API ViaCEP
 * - Exibir e permitir edição dos campos de endereço
 * - Notificar o componente pai sobre mudanças nos campos
 * 
 * Props:
 * - cep (string): Valor atual do CEP
 * - address (object): { street, number, complement, neighborhood, city, state }
 * - onCepChange (function): Atualiza o CEP no componente pai
 * - onCepSearch (function): Dispara a busca do CEP
 * - onAddressChange (function): Atualiza qualquer campo do endereço
 */
const AddressForm = ({ cep, address, onCepChange, onCepSearch, onAddressChange }) => {
  return (
    <Accordion defaultActiveKey="0" className="mt-3">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Informe seu CEP</Accordion.Header>
        <Accordion.Body>
          <Form.Group className="mb-3">
            <Form.Label>CEP</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => onCepChange(e.target.value)}
              />
              <Button 
                variant="primary" 
                className="ms-2"
                onClick={onCepSearch}
              >
                Buscar
              </Button>
            </div>
          </Form.Group>

          {address && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Logradouro</Form.Label>
                <Form.Control 
                  type="text" 
                  value={address.street || ''}
                  readOnly 
                />
              </Form.Group>
              <div className="row">
                <div className="col-4">
                  <Form.Group className="mb-3">
                    <Form.Label>Número</Form.Label>
                    <Form.Control
                      type="text"
                      value={address.number || ''}
                      onChange={(e) => onAddressChange('number', e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-8">
                  <Form.Group className="mb-3">
                    <Form.Label>Complemento</Form.Label>
                    <Form.Control
                      type="text"
                      value={address.complement || ''}
                      onChange={(e) => onAddressChange('complement', e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Bairro</Form.Label>
                <Form.Control 
                  type="text" 
                  value={address.neighborhood || ''} 
                  readOnly 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cidade</Form.Label>
                <Form.Control 
                  type="text" 
                  value={address.city || ''} 
                  readOnly 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Control 
                  type="text" 
                  value={address.state || ''} 
                  readOnly 
                />
              </Form.Group>
            </>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AddressForm;