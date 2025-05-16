import React, { useState } from 'react';
import { Modal, Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import { FaGoogle, FaFacebook, FaCheck, FaArrowRight } from 'react-icons/fa';
import { auth, db } from '../../firebase/config';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { checarEmail } from '../../firebase/authUtils';

import LoginComEmail from './LoginComEmail';

const AuthModal = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [form, setForm] = useState({ nome: '', senha: '', telefone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  const handleFormChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetModal = () => {
    setStep(1);
    setEmail('');
    setSenha('');
    setForm({ nome: '', senha: '', telefone: '' });
    setError('');
    setLoading(false);
    onHide();
  };

  const showCustomToast = (msg, variant = 'success') => {
    setToastMessage(msg);
    setToastVariant(variant);
    setShowToast(true);
  };

  const handleLoginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, 'usuarios', user.uid), {
        nome: user.displayName || '',
        email: user.email,
        uid: user.uid,
        foto: user.photoURL || '',
        metodo: 'google',
      });

      showCustomToast('Login com Google concluído com sucesso!');
      resetModal();
    } catch (error) {
      console.error('Erro ao logar com Google:', error);
      showCustomToast('Erro ao logar com Google', 'danger');
    }
  };

  const handleLoginFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, 'usuarios', user.uid), {
        nome: user.displayName || '',
        email: user.email,
        uid: user.uid,
        foto: user.photoURL || '',
        metodo: 'facebook',
      });

      showCustomToast('Login com Facebook concluído com sucesso!');
      resetModal();
    } catch (error) {
      console.error('Erro ao logar com Facebook:', error);
      showCustomToast('Erro ao logar com Facebook', 'danger');
    }
  };

  const handleEmailSubmit = async (emailDigitado) => {
    setEmail(emailDigitado);
    setError('');
    setLoading(true);

    try {
      const existe = await checarEmail(emailDigitado);
      if (existe) {
        setStep(2.5);
      } else {
        setStep(3);
      }
    } catch (err) {
      console.error('Erro ao verificar/cadastrar:', err);
      setError('Erro ao verificar o e-mail ou realizar login.');
      showCustomToast('Erro ao verificar o e-mail', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginComSenha = async () => {
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      showCustomToast('Login concluído com sucesso!', 'success');
      resetModal();
    } catch (err) {
      console.error('Erro ao logar com senha:', err);
      setError('Senha incorreta ou erro ao logar.');
      showCustomToast('Senha incorreta ou erro ao logar.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handleEnviarResetSenha = async () => {
    if (!email) {
      showCustomToast('Informe o e-mail primeiro.', 'danger');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      showCustomToast('E-mail de redefinição enviado com sucesso.', 'success');
    } catch (err) {
      console.error('Erro ao enviar redefinição:', err);
      showCustomToast('Erro ao enviar e-mail de redefinição.', 'danger');
    }
  };

  return (
    <Modal
      show={show}
      onHide={resetModal}
      centered
      backdrop="static"
      keyboard={false}
      enforceFocus={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {step === 1 && 'Como deseja continuar?'}
          {step === 2 && 'Informe seu e-mail'}
          {step === 2.5 && 'Informe sua senha'}
          {step === 3 && 'Complete seu cadastro'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 && (
          <div className="d-flex flex-column gap-2">
            <Button variant="dark" className="py-2" onClick={() => setStep(2)}>
              <strong>Continuar com E-mail</strong>
            </Button>
            <div className="d-flex gap-2">
              <Button variant="danger" className="flex-fill" onClick={handleLoginGoogle}>
                <FaGoogle className="me-2" /> Google
              </Button>
              <Button variant="primary" className="flex-fill" onClick={handleLoginFacebook}>
                <FaFacebook className="me-2" /> Facebook
              </Button>
            </div>
            <small className="text-center mt-2">
              Ao continuar, você concorda com os{' '}
              <a href="#">Termos de Uso</a> e{' '}
              <a href="#">Políticas de Privacidade</a>.
            </small>
          </div>
        )}

        {step === 2 && (
          <LoginComEmail onContinue={handleEmailSubmit} loading={loading} />
        )}

        {step === 2.5 && (
          <div className="d-flex flex-column gap-3">
            <Form.Control type="email" value={email} disabled />
            <Form.Control
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            {error && <div className="text-danger">{error}</div>}
            <Button
              variant="primary"
              className="py-2"
              onClick={handleLoginComSenha}
              disabled={loading}
            >
              {loading ? 'Carregando...' : <><FaArrowRight className="me-2" /> Entrar com senha</>}
            </Button>
            <div className="text-center text-muted">ou</div>
            <div className="text-center">
              <a href="#" onClick={handleEnviarResetSenha} style={{ fontSize: '0.85rem' }}>
                Esqueci minha senha
              </a>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="d-flex flex-column gap-3">
            <Form.Control type="email" value={email} disabled />
            <Form.Control
              type="text"
              placeholder="Nome"
              name="nome"
              value={form.nome}
              onChange={handleFormChange}
            />
            <Form.Control
              type="password"
              placeholder="Senha"
              name="senha"
              value={form.senha}
              onChange={handleFormChange}
            />
            <Form.Control
              type="text"
              placeholder="Telefone / WhatsApp"
              name="telefone"
              value={form.telefone}
              onChange={handleFormChange}
            />
            {error && <div className="text-danger">{error}</div>}
            <small className="text-center">
              Ao continuar, você concorda com os{' '}
              <a href="#">Termos de Uso</a> e{' '}
              <a href="#">Políticas de Privacidade</a>.
            </small>
            <Button
              variant="primary"
              className="py-2"
              onClick={handleConfirmCadastro}
              disabled={loading}
            >
              {loading ? 'Carregando...' : <><FaCheck className="me-2" /> Confirmar</>}
            </Button>
          </div>
        )}
      </Modal.Body>

      {/* ✅ TOAST VISUAL COM BOOTSTRAP */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg={toastVariant}
        >
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Modal>
  );
};

export default AuthModal;
