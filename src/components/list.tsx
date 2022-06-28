import React from "react";
import { Badge, Table } from "react-bootstrap";

import { collection, db } from "../services/db";
import {
  formatCPF,
  formatCurrency,
  formatDate,
  formatTelefone,
} from "../util/formats";

const List: React.FC = (Props) => {
  const [data, setData] = React.useState<any>([]);
  React.useEffect(() => {
    getUsers();
  }, []);

  const getUsers = React.useCallback(async () => {
    const result = await collection.find();
    setData(result);
  }, [db]);

  const handleDivStatus = (status: any) => {
    if (status === "S") {
      return <Badge bg="success">Enviado</Badge>;
    } else if (status === "N") {
      return (
        <Badge bg="warning" text="dark">
          Pendente
        </Badge>
      );
    }
    return <Badge bg="danger">Sem informação</Badge>;
  };

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>Valor</th>
          <th>Telefone</th>
          <th>Dt. de Nasc.</th>
          <th>STATUS</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 &&
          data.map((user: any, idx: number) => {
            return (
              <tr key={`#${idx.toString()}`}>
                <td>{user.nm_pessoa}</td>
                <td>{user.cpf ? formatCPF(user.cpf) : ""}</td>
                <td>{user.valor ? formatCurrency(user.valor) : ""}</td>
                <td>{user.telefone ? formatTelefone(user.telefone) : ""}</td>
                <td>
                  {user.dt_nascimento ? formatDate(user.dt_nascimento) : ""}
                </td>
                <td>{handleDivStatus(user.status)}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default List;
