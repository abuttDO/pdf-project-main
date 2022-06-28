import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import List from "../components/list";
import NavBar from "../components/navbar";
import api from "../services/api";
import { collection } from "../services/db";
import { onlyNumbers, formatCurrency } from "../util/formats";

const SendMessages: React.FC = () => {
  const [data, setData] = React.useState({});

  const handleSendMessage = React.useCallback(async () => {
    try {
      const res = await collection.find();
      let envios = 0;
      setData(res);
      //   const hour = new Date().getHours();
      //   let welcomeText = "";
      //   const welcomeTypes = ["Bom dia", "Boa Tarde", "Boa Noite"];
      //   if (hour < 12) welcomeText = welcomeTypes[0];
      //   else if (hour < 18) welcomeText = welcomeTypes[1];
      //   else welcomeText = welcomeTypes[2];

      res.forEach(async (person: any) => {
        const msg = `Olá Sr(a) *${person.nm_pessoa?.toUpperCase()}*,

        Trabalhamos com pedidos de restituição de seguros cobrados indevidamente em contratos de financiamento, as famosas *VENDAS CASADAS!*
        
        Em seu contrato com o *Banco Itaú* referente financiamento do veículo, existe uma cobrança indevida do Banco de um Seguro no valor de *${formatCurrency(
          person.valor
        )}*💰.
        
        Podemos solicitar a *restituição de até 100%* desse valor, cobramos 30% somente após a restituição. O dinheiro já cai direto na sua conta e você não paga antes de receber.
        
        *A restituição será feita em até 10 dias úteis direito na sua conta!* 
        
        *Vamos dar entrada no pedido de restituição?* Digite SIM para falar com um especialista.
        
        Visite o nosso site: www.restituirvendacasada.com!
        `;
        if (
          person.telefone &&
          person.telefone !== "" &&
          person.status &&
          person.status === "N"
        ) {
          await api()
            .get(`${import.meta.env.VITE_TOKEN}`, {
              params: {
                cmd: "chat",
                to: `55${onlyNumbers(person.telefone)}@c.us`,
                msg,
                id: Math.floor(Math.random()),
              },
            })
            .then(async (resp) => {
              await collection.updateOne(
                { _id: person._id },
                { $set: { status: "S" } }
              );
              envios += 1;
            })
            .catch((err) => {
              console.log("err update mongoDB", err);
            });
        }
      });
      alert(`Mensagens enviadas com sucesso!`);
    } catch (err: any) {
      alert(`Erro ao enviar msg ${err.message}`);
    }
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <Row className="justify-content-center">
          <Col xl={8}>
            <Card>
              <Card.Body>
                <Card.Title>Envio de Mensagens</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Lista de clientes
                </Card.Subtitle>
                <Card.Text>
                  <List />
                </Card.Text>
                <Card.Footer>
                  <Col xl={12}>
                    <Button
                      className="mr-3"
                      variant="success"
                      type="button"
                      onClick={handleSendMessage}
                    >
                      Enviar Mensagens
                    </Button>
                    <Button
                      className="ml-1"
                      variant="secondary"
                      onClick={() => window.location.reload()}
                      style={{ marginLeft: 10 }}
                    >
                      Atualizar Lista
                    </Button>
                  </Col>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SendMessages;
