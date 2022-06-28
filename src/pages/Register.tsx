import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { json } from "stream/consumers";
import List from "../components/list";
import NavBar from "../components/navbar";
import { db, collection } from "../services/db";
import {
  formatCurrency,
  formatOnChangeCPF,
  handleInputData,
} from "../util/formats";

const Register: React.FC = (Props) => {
  const formRef = React.useRef<any>(null);
  const [value, setValue] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const handleSubmit = React.useCallback(
    async (e: any) => {
      e.preventDefault();
      const data = await handleInputData(formRef);
      try {
        await collection.insertOne({ ...data, status: "N" });
        alert("Registro Cadastrado");
        formRef.current?.reset();
      } catch (err: any) {
        alert(`Ocorreu um erro${err.message}`);
      }
    },
    [formRef.current]
  );
  function handleInputValue(e: any) {
    let valor = e.target.value;
    if (valor) {
      valor = valor + "";
      valor = parseInt(valor.replace(/[\D]+/g, ""));
      valor = valor + "";
      valor = valor.replace(/([0-9]{2})$/g, ",$1");

      if (valor.length > 6) {
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
      }
    }
    setValue(valor);
  }
  function handleInputPhone(e: any) {
    let value = e.target.value;

    if (value) {
      value = value.replace(/\D/g, "");
      value = value.replace(/^(\d{2})(\d)/g, "($1)$2");
      value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    }
    setPhone(value);
  }

  return (
    <>
      <NavBar />
      <Container>
        <Row className="justify-content-center">
          <Col xl={8}>
            <Card>
              <Card.Body>
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nome"
                      name="nm_pessoa"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCPF">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                      type="text"
                      name="cpf"
                      placeholder="CPF"
                      maxLength={14}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicValue">
                    <Form.Label>Valor</Form.Label>
                    <Form.Control
                      type="text"
                      name="valor"
                      placeholder="Valor"
                      onChange={handleInputValue}
                      value={value}
                      required
                      maxLength={10}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicBPhone">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                      type="text"
                      name="telefone"
                      placeholder="Telefone com DDD"
                      onChange={handleInputPhone}
                      value={phone}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicBirthdate">
                    <Form.Label>Data de Nascimento</Form.Label>
                    <Form.Control
                      type="date"
                      name="dt_nascimento"
                      placeholder="Data de Nascimento(Não Obrigatório)"
                    />
                  </Form.Group>
                  <Col xl={12}>
                    <Button className="mr-3" variant="primary" type="submit">
                      Cadastrar
                    </Button>
                    <Button
                      className="ml-1"
                      variant="secondary"
                      type="reset"
                      style={{ marginLeft: 10 }}
                    >
                      Resetar
                    </Button>
                  </Col>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
