import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-3 pb-2" style={{ fontSize: '0.8rem' }}>
      <div className="container">
        <div className="row g-2">
          <div className="col-lg-4 mb-2">
            <div className="d-flex align-items-center mb-1">
              <img src="../../assets/img/charada-motos.svg" width="20" height="20" className="me-1" alt="Logo" />
              <h6 className="text-uppercase mb-0">Charada Motos</h6>
            </div>
            <p className="text-muted mb-1">O melhor açaí da cidade.</p>
            <div>
              <a href="#" className="text-white me-2"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white me-2"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white"><i className="bi bi-whatsapp"></i></a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-4 mb-2">
            <h6 className="text-uppercase mb-1">Links</h6>
            <div>
              <a href="#" className="text-muted d-block mb-1">Início</a>
              <a href="#" className="text-muted d-block mb-1">Cardápio</a>
              <a href="#" className="text-muted d-block">Contato</a>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-4 mb-2">
            <h6 className="text-uppercase mb-1">Horário</h6>
            <div className="text-muted">
              <div className="mb-1">Seg-Sab: 10h-22h</div>
              <div>Dom: 12h-20h</div>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-4 mb-2">
            <h6 className="text-uppercase mb-1">Contato</h6>
            <address className="text-muted">
              <div className="mb-1"><i className="bi bi-geo-alt-fill me-1"></i> Rua do Açaí, 123</div>
              <div className="mb-1"><i className="bi bi-telephone-fill me-1"></i> (11) 98765-4321</div>
              <div><i className="bi bi-envelope-fill me-1"></i> contato@acaicentral.com</div>
            </address>
          </div>
        </div>
        
        <hr className="my-2" />
        <div className="text-center">
          <p className="text-muted mb-0" style={{ fontSize: '0.7rem' }}>&copy; {new Date().getFullYear()} Açaí Central</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;