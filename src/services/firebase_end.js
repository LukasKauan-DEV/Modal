import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export const enderecoService = {
  /**
   * Busca o endereço (considerando ID automático)
   * @returns {Promise<Object|null>} Dados do endereço ou null se não existir
   */
  async getDadosEndereco() {
    try {
      // 1. Acessa a coleção 'endereco'
      const querySnapshot = await getDocs(collection(db, 'endereco'));
      
      // 2. Verifica se há documentos
      if (querySnapshot.empty) {
        console.warn('Nenhum endereço encontrado na coleção "endereco"');
        return null;
      }

      // 3. Pega o PRIMEIRO documento (supondo que só existe um)
      const primeiroDoc = querySnapshot.docs[0];
    
      
      return {
        id: primeiroDoc.id, // Inclui o ID gerado automaticamente
        ...primeiroDoc.data()
      };

    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      return null; // Retorna null para tratamento no componente
    }
  }
};

// Função para buscar o endereço da loja
export const getStoreAddress = async () => {
  try {
    // Busca o primeiro documento da coleção "endereco"
    const querySnapshot = await getDocs(collection(db, 'endereco'));
    
    if (!querySnapshot.empty) {
      // Pega o primeiro documento (já que é o único)
      const docData = querySnapshot.docs[0].data();
      
      return {
        street: `${docData.logradouro || ''} ${docData.nomeLogradouro || ''}`.trim() || 'Endereço não informado',
        number: docData.numero?.toString() || 'S/N',
        neighborhood: docData.bairro || 'Bairro não informado',
        city: docData.cidade || 'Cidade não informada',
        state: docData.sigla || 'UF'
      };
    } else {
      console.warn('Nenhum endereço encontrado na coleção "endereco". Usando endereço padrão.');
      return getDefaultAddress();
    }
  } catch (error) {
    console.error('Erro ao buscar endereço:', error);
    return getDefaultAddress();
  }
};

// Endereço padrão para fallback
const getDefaultAddress = () => ({
  street: 'Rua Arcílico Fderzoni ||',
  number: '986 ||',
  neighborhood: 'Jardim Silva ||',
  city: 'Francisco Morato ||',
  state: 'São Paulo ||'
});

// Exportação padrão para compatibilidade
export default {
  getStoreAddress
};