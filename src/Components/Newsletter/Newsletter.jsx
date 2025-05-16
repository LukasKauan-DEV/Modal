import React from 'react';

const Newsletter = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="bg-light p-5 rounded-3 shadow-sm">
              <h2 className="mb-4">Receba nossas promoções</h2>
              <p className="text-muted mb-4">Cadastre-se e receba ofertas exclusivas no seu e-mail</p>
              <form className="row g-2 justify-content-center">
                <div className="col-md-8">
                  <div className="input-group">
                    <input 
                      type="email" 
                      className="form-control form-control-lg" 
                      placeholder="Seu melhor e-mail" 
                      aria-label="Seu melhor e-mail"
                    />
                    <button className="btn btn-primary btn-lg" type="submit">
                      Cadastrar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;