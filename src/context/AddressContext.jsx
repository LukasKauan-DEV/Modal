import React, { createContext, useContext, useState } from 'react';

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState(null); // 'delivery' ou 'pickup'

  const updateAddress = (newAddress, method, fee = 0) => {
    setAddress(newAddress);
    setDeliveryMethod(method);
    setDeliveryFee(fee);
  };

  return (
    <AddressContext.Provider value={{ address, deliveryFee, deliveryMethod, updateAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};