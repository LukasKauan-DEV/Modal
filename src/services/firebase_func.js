import { db } from '../firebase/config'; // Firestore
// Adicione getDoc aos imports existentes
import { collection, getDocs, serverTimestamp, setDoc, doc, getDoc } from 'firebase/firestore';
import { getDatabase, ref, set, get } from 'firebase/database'; // Realtime Database

// Configurações de Firestore
const horariosCollection = collection(db, 'funcionamento');

// Configurações de Realtime Database
const realtimeDb = getDatabase();

export const horarioService = {
    async getHorarios() {
      try {
        const querySnapshot = await getDocs(horariosCollection);
        return querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a, b) => a.numDia - b.numDia);
      } catch (error) {
        console.error("Erro ao buscar horários: ", error);
        throw error;
      }
    },
  
    async getServerTime() {
        try {
          const tempRef = doc(collection(db, 'temp'));
          await setDoc(tempRef, { timestamp: serverTimestamp() });
          const docSnapshot = await getDoc(tempRef); // Agora getDoc está definido
          if (docSnapshot.exists()) {
            return docSnapshot.data().timestamp.toDate();
          }
          throw new Error('Não foi possível obter o horário do servidor.');
        } catch (error) {
          console.error("Erro ao obter horário do servidor: ", error);
          throw error;
        }
      },
  
    async checkOpenNow(now = new Date()) {
      try {
        const horarios = await this.getHorarios();
        const currentDay = now.getDay();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
  
        const horarioAtual = now.toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
  
        const horarioDia = horarios.find(h => h.numDia === currentDay);
  
        if (!horarioDia) {
          return { isOpen: false, horarioAtual };
        }
  
        const parseTime = (timeStr) => {
          const [h, m] = timeStr.split(':').map(Number);
          return { h, m };
        };
  
        const abertura = parseTime(horarioDia.horarioAbertura);
        const fechamento = parseTime(horarioDia.horarioFechamento);
  
        const isOpen = (
          (currentHour > abertura.h || (currentHour === abertura.h && currentMinute >= abertura.m)) &&
          (currentHour < fechamento.h || (currentHour === fechamento.h && currentMinute < fechamento.m))
        );
  
        return { isOpen, horarioAtual };
      } catch (error) {
        console.error("Erro ao verificar horário: ", error);
        throw error;
      }
    }
  };