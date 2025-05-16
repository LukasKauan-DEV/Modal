import React from 'react';

/**
 * Componente AddressLoader - Exibe estados de carregamento/erro
 * 
 * Responsabilidades:
 * - Mostrar mensagem de carregamento do endereço
 * - Exibir erro se o endereço não carregar
 * - Manter o mesmo estilo visual do original
 * 
 * Props:
 * - loading (boolean): Indica se está carregando
 * - error (boolean): Indica se houve erro
 */
const AddressLoader = ({ loading, error }) => {
  if (loading) {
    return <div className="text-center my-3">Carregando endereço da loja...</div>;
  }

  if (error) {
    return <div className="text-center my-3 text-danger">Não foi possível carregar o endereço da loja</div>;
  }

  return null;
};

export default AddressLoader;