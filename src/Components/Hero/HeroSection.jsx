import React, { useState, useEffect } from 'react';
import imgFundo from '../../assets/img/img_fundo_resized.jpg';
import { horarioService } from '../../services/firebase_func';
import { enderecoService } from '../../services/firebase_end';
import imgLogoCharada from '../../assets/img/img_logo_original_charada_sem_fundo.png';

const HeroSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [endereco, setEndereco] = useState({
    enderecoFormatado: 'Carregando endereço...'
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Carrega endereço
        const enderecoData = await enderecoService.getDadosEndereco();
        if (enderecoData) {
          setEndereco({
            enderecoFormatado: `${enderecoData.logradouro} ${enderecoData.nomeLogradouro}, ${enderecoData.numero} - ${enderecoData.bairro}, ${enderecoData.cidade} - ${enderecoData.sigla}`
          });
        } else {
          setEndereco({
            enderecoFormatado: 'Endereço não cadastrado'
          });
        }
  
        // 2. Pega o horário atual (com fallback)
        let serverTime;
        try {
          serverTime = await horarioService.getServerTime();
        } catch {
          serverTime = new Date(); // Fallback local
        }
        setCurrentTime(serverTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
  
        // 3. Verifica se está aberto
        const { isOpen } = await horarioService.checkOpenNow(serverTime);
        setIsOpen(isOpen);
  
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        // Fallback completo
        const localTime = new Date();
        setCurrentTime(localTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
        setIsOpen(localTime.getHours() >= 8 && localTime.getHours() < 18);
      } finally {
        setIsLoading(false);
      }
    };
  
    loadData();
    const interval = setInterval(loadData, 300000); // Atualiza a cada 5 minutos
  
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="hero-section position-relative" style={{ height: '340px', overflow: 'hidden' }}>
      {/* Camadas e conteúdo seguem iguais */}
      <div 
        className="position-absolute w-100 h-100"
        style={{
          backgroundImage: `url(${imgFundo})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(4px)',
          zIndex: 0
        }}
      />
      
      <div 
        className="position-absolute w-100 h-100"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1
        }}
      />

<div className="container position-relative d-flex flex-column align-items-center justify-content-center h-100 text-center" style={{ zIndex: 2 }}>
  <div className="hero-text text-white">
    <img src={imgLogoCharada} alt="Charada Motos" style={{width: '140px'}} />
    <h1 className="h3 fw-bold mb-2">CHARADA MOTOS</h1>

    <div className="mb-2" style={{ fontSize: '0.9rem' }}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="19" 
        height="19" 
        fill="currentColor" 
        className="bi bi-geo-alt-fill me-2" 
        viewBox="0 0 16 16"
      >
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
      </svg>
      <span style={{ fontSize: '0.9rem' }}>
        {endereco.enderecoFormatado}
      </span>
    </div>

    {!isLoading && (
      <div className="mt-3 d-flex flex-column align-items-center">
        <div className="d-flex align-items-center justify-content-center mb-2">
          <span 
            className="fw-bold me-2" 
            style={{ 
              fontSize: '1rem',
              color: isOpen ? '#28a745' : '#dc3545'
            }}
          >
            {isOpen ? 'Aberto' : 'Fechado'}
          </span>
          
          <div className="d-flex align-items-center" style={{ fontSize: '0.85rem', color: '#fff' }}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              fill="currentColor" 
              className="bi bi-exclamation-circle me-1" 
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
            </svg>
            mais informações
          </div>
        </div>
        
        <button className={`btn btn-sm fw-bold px-3 ${isOpen ? 'btn-light text-primary' : 'btn-secondary'}`}>
          {isOpen ? 'Comprar ou Agendar Serviço' : 'Comprar ou Agendar para depois'}
        </button>
      </div>
    )}
  </div>
</div>
    </header>
  );
};

export default HeroSection;
