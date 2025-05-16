import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ServiceModal = ({ show, onHide, onSubmit }) => {
  const [clientData, setClientData] = useState({
    name: '',
    phone: '',
    address: '',
    brand: '',
    model: '',
    year: '',
    plate: '',
    fuel: '',
    color: '',
    serviceType: '',
    problemDescription: '',
    additionalServices: '',
    preferredDate: '',
    preferredTime: '',
    deliveryOption: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(clientData);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Agendar Serviço de Manutenção</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Informações do Cliente */}
          <h5>Informações do Cliente</h5>
          <Form.Group className="mb-3">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control type="text" name="name" value={clientData.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Telefone / WhatsApp</Form.Label>
            <Form.Control type="tel" name="phone" value={clientData.phone} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Endereço (para coleta/entrega)</Form.Label>
            <Form.Control type="text" name="address" value={clientData.address} onChange={handleChange} />
          </Form.Group>

          {/* Informações da Moto */}
          <h5>Informações da Moto</h5>
          <Form.Group className="mb-3">
            <Form.Label>Marca</Form.Label>
            <Form.Control type="text" name="brand" value={clientData.brand} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Modelo</Form.Label>
            <Form.Control type="text" name="model" value={clientData.model} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ano</Form.Label>
            <Form.Control type="text" name="year" value={clientData.year} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Placa</Form.Label>
            <Form.Control type="text" name="plate" value={clientData.plate} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Combustível</Form.Label>
            <Form.Select name="fuel" value={clientData.fuel} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Flex">Flex</option>
              <option value="Elétrica">Elétrica</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Cor da Moto</Form.Label>
            <Form.Control type="text" name="color" value={clientData.color} onChange={handleChange} />
          </Form.Group>

          {/* Informações do Serviço */}
          <h5>Informações do Serviço</h5>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Manutenção</Form.Label>
            <Form.Select name="serviceType" value={clientData.serviceType} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Revisão preventiva">Revisão preventiva</option>
              <option value="Troca de óleo">Troca de óleo</option>
              <option value="Freios/pneus/bateria">Freios, pneus ou bateria</option>
              <option value="Elétrica/injeção">Elétrica ou injeção</option>
              <option value="Outro">Outro</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrição do problema (manutenção corretiva)</Form.Label>
            <Form.Control as="textarea" rows={2} name="problemDescription" value={clientData.problemDescription} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Serviços adicionais desejados</Form.Label>
            <Form.Control type="text" name="additionalServices" value={clientData.additionalServices} onChange={handleChange} placeholder="Ex: check-up geral, lavagem, etc." />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data preferida</Form.Label>
            <Form.Control type="date" name="preferredDate" value={clientData.preferredDate} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Horário preferido</Form.Label>
            <Form.Control type="time" name="preferredTime" value={clientData.preferredTime} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Entrega da moto</Form.Label>
            <Form.Select name="deliveryOption" value={clientData.deliveryOption} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Será deixada no local">Será deixada no local</option>
              <option value="Necessita coleta">Necessita coleta no endereço</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Confirmar Agendamento
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceModal;
