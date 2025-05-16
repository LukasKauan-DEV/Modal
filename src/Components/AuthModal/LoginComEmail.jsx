import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';

const LoginComEmail = ({ onContinue, loading }) => {
  const [email, setEmail] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      onContinue(email);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          ref={inputRef}
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" variant="primary" className="w-100" disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : <>Continuar <i className="bi bi-arrow-right ms-2"></i></>}
      </Button>
    </Form>
  );
};

export default LoginComEmail;
