import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { Button, Form } from 'react-bootstrap';

const CadastroCompleto = ({ email, onSuccess }) => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const handleCadastro = async () => {
    setErro('');
    setCarregando(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Salva os dados no Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        nome,
        email,
        telefone,
        criadoEm: new Date(),
        provider: "email"
      });

      // Chama callback para fechar modal e exibir toast no AuthModal
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div>
      <h4>Complete seu cadastro</h4>

      <Form.Control type="email" value={email} disabled className="mb-2" />
      <Form.Control
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="mb-2"
      />
      <Form.Control
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="mb-2"
      />
      <Form.Control
        type="text"
        placeholder="Telefone / WhatsApp"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        className="mb-3"
      />

      {erro && <div className="text-danger mb-2">{erro}</div>}

      <Button onClick={handleCadastro} disabled={carregando}>
        {carregando ? 'Carregando...' : '✔ Confirmar'}
      </Button>
    </div>
  );
};

export default CadastroCompleto;
