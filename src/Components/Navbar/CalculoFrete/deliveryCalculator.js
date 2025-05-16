/**
 * Serviço de cálculo de distância e frete
 */

// Configurações
const GOOGLE_GEOCODING_API_KEY = 'AIzaSyBWUcuzeJzgiC7klXcmixIQ9sRuMARlLAc';
const GOOGLE_GEOCODING_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

// Coordenadas FIXAS da loja (Francisco Morato)
const STORE_COORDINATES = {
  lat: -23.2720601,  // Latitude da loja
  lon: -46.7330031,  // Longitude da loja
  address: "Estrada Arcílio Federzoni, 971, Jardim Silvia, Francisco Morato - SP"
};

/**
 * Calcula distância aproximada entre dois pontos (fórmula de Haversine)
 * @returns {Object} Retorna a distância em km e os detalhes das coordenadas
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return {
    distance: distance,
    origin: { lat: lat1, lon: lon1 },
    destination: { lat: lat2, lon: lon2 }
  };
};

/**
 * Calcula valor do frete conforme novas regras
 */
export const calculateDeliveryFee = (km) => {
  if (km < 1) {
    return 3.5;
  } else if (km < 3) {
    return 5;
  } else {
    return km * 0.9;
  }
};

/**
 * Obtém coordenadas usando Google Maps Geocoding API
 * @returns {Object} Coordenadas e endereço formatado
 */
export const getCoordinates = async (address) => {
  try {
    const response = await fetch(
      `${GOOGLE_GEOCODING_URL}?address=${encodeURIComponent(address)}&key=${GOOGLE_GEOCODING_API_KEY}&region=br`
    );

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(data.error_message || 'Erro na API de geocodificação');
    }

    const location = data.results[0].geometry.location;
    return {
      lat: location.lat,
      lon: location.lng,
      display: data.results[0].formatted_address,
      source: 'Google Maps',
      fullResult: data.results[0] // Para debug
    };

  } catch (err) {
    console.error('Erro na geocodificação:', {
      input: address,
      error: err.message
    });
    throw new Error('Não foi possível calcular a localização. Verifique o endereço');
  }
};

/**
 * Obtém as coordenadas da loja
 */
export const getStoreCoordinates = () => {
  return STORE_COORDINATES;
};
