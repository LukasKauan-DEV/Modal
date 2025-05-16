import { db } from './config';
import { collection, getDocs, query, where } from 'firebase/firestore';

/**
 * Verifica se um e-mail já está cadastrado na coleção 'usuarios'
 * @param {string} email - E-mail a ser verificado
 * @returns {Promise<boolean>} - true se existir, false se não
 */
export const checarEmail = async (email) => {
  try {
    const usuariosRef = collection(db, 'usuarios'); // PADRÃO: sempre 'usuarios'
    const q = query(usuariosRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log('✅ E-mail encontrado na coleção: usuarios');
      return true;
    } else {
      console.log('❌ E-mail NÃO encontrado na coleção: usuarios');
      return false;
    }
  } catch (error) {
    console.error('Erro ao verificar e-mail:', error);
    throw error;
  }
};
