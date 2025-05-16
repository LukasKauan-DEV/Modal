import React, { useState, useEffect } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import DeliveryOptionButton from '../../../../Navbar/Modal/OptionButton/DeliveryOptionButton';
import ServiceOptions from '../../../../Navbar/Modal/ServiceOption/ServiceOptions';
import AddressForm from '../../../../Navbar/Modal/CEP/AddressForm';
import { useAddress } from '../../../../../context/AddressContext';
import axios from 'axios';
import { getStoreAddress } from '../../../../../services/firebase_end'; // Ajuste o caminho conforme necessário

const AddressChangeModal = () => {
  const { address, updateAddress } = useAddress();
  const [showModal, setShowModal] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState(address?.type || null);
  const [cep, setCep] = useState('');
  const [localAddress, setLocalAddress] = useState(address || {
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  });
  const [storeAddress, setStoreAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carrega o endereço da loja ao montar o componente
  useEffect(() => {
    const loadStoreAddress = async () => {
      try {
        const addressData = await getStoreAddress();
        setStoreAddress(addressData);
      } catch (error) {
        console.error('Erro ao carregar endereço da loja:', error);
        // Endereço fallback caso ocorra erro
        setStoreAddress({
          street: 'Rua Arcílio Federzoni',
          number: '971',
          neighborhood: 'Jardim Silva',
          city: 'Francisco Morato',
          state: 'SP',
          type: 'pickup',
          isStore: true
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadStoreAddress();
  }, []);

  const handleAddressChange = () => {
    setShowModal(true);
    setDeliveryOption(address?.type);
    setLocalAddress(address || {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: ''
    });
  };

  const handleDeliverySelection = (option) => {
    setDeliveryOption(option);
    if (option === 'pickup' && storeAddress) {
      updateAddress({
        ...storeAddress,
        type: 'pickup',
        isStore: true
      }, 'pickup', 0);
    }
  };

  const handleCepSearch = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setLocalAddress({
        ...localAddress,
        street: response.data.logradouro || '',
        neighborhood: response.data.bairro || '',
        city: response.data.localidade || '',
        state: response.data.uf || ''
      });
    } catch (error) {
      alert('CEP não encontrado ou erro na busca');
    }
  };

  const calculateDeliveryFee = (address) => {
    // Implemente sua lógica de cálculo de frete aqui
    return 10.00; // Valor exemplo
  };

  const handleContinue = () => {
    if (deliveryOption === 'delivery') {
      const fee = calculateDeliveryFee(localAddress);
      updateAddress({
        type: 'delivery',
        ...localAddress
      }, 'delivery', fee);
    } else if (deliveryOption === 'pickup') {
      updateAddress({
        ...storeAddress,
        type: 'pickup',
        isStore: true
      }, 'pickup', 0);
    }
    setShowModal(false);
  };

  return (
    <>
      <div className="mb-3 p-3 bg-light rounded">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0">Método de {address?.type === 'delivery' ? 'Entrega' : 'Retirada'}</h6>
          <button 
            className="btn btn-sm btn-outline-primary"
            onClick={handleAddressChange}
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Alterar'}
          </button>
        </div>
        {address?.type === 'delivery' ? (
          <>
            <p className="mb-1 small">
              <strong>Endereço:</strong> {address?.street}, {address?.number}
              {address?.complement && `, ${address.complement}`}
            </p>
            <p className="mb-1 small">
              <strong>Bairro:</strong> {address?.neighborhood}
            </p>
            <p className="mb-1 small">
              <strong>Cidade:</strong> {address?.city} - {address?.state}
            </p>
          </>
        ) : (
          <p className="mb-0 small">
            <strong>Local:</strong> Retirada na loja
          </p>
        )}
      </div>

      <Modal style={{zIndex: '2500'}} show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Alterar Método de Entrega</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading || !storeAddress ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Carregando opções...</p>
            </div>
          ) : (
            <div className="d-grid gap-3">
              <DeliveryOptionButton
                option="pickup"
                selectedOption={deliveryOption}
                onSelect={handleDeliverySelection}
                storeAddress={storeAddress}
              />
              <DeliveryOptionButton
                option="delivery"
                selectedOption={deliveryOption}
                onSelect={handleDeliverySelection}
                storeAddress={storeAddress}
              />

              {deliveryOption === 'pickup' && (
                <ServiceOptions
                  onViewProducts={() => setShowModal(false)}
                  onScheduleService={() => {
                    // Lógica para agendamento de serviço
                    setShowModal(false);
                  }}
                />
              )}

              {deliveryOption === 'delivery' && (
                <AddressForm
                  cep={cep}
                  address={localAddress}
                  onCepChange={setCep}
                  onCepSearch={handleCepSearch}
                  onAddressChange={(field, value) => 
                    setLocalAddress(prev => ({ ...prev, [field]: value }))
                  }
                />
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          {deliveryOption === 'delivery' && localAddress.street && (
            <Button variant="primary" onClick={handleContinue}>
              Confirmar Alteração
            </Button>
          )}
          {deliveryOption === 'pickup' && (
            <Button variant="primary" onClick={handleContinue}>
              Confirmar Retirada
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddressChangeModal;