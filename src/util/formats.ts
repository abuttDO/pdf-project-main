import React from "react";

export function formatCPF(cpf: string) {
  //retira os caracteres indesejados...
  cpf = cpf.replace(/[^\d]/g, "");

  //realizar a formatação...
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formatTelefone(value: string) {
  if (value) {
    const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;
    var str = value.replace(/[^0-9]/g, "").slice(0, 11);
    const result = str.replace(regex, "($1) $2-$3");
    return result;
  }

  return value;
}

export function formatOnChangeCPF(cpf: string) {
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return cpf;
}

export function formatCurrency(value: any) {
  if (value) {
    const valueNumber = parseFloat(value);
    return valueNumber.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }
  return "R$ 0,00";
}

export function formatDate(value: string) {
  if (value) {
    const valueNumber = new Date(value);
    return valueNumber.toLocaleDateString();
  }
  return "";
}

export function onlyNumbers(str: string | undefined) {
  let result = str;

  // if (result) result = result.replace(/[^0-9]+/g, '');
  if (result) result = result.replace(/\D+/g, "");
  return result;
}

export async function handleInputData(formRef: any) {
  const json: any = {};
  [...formRef.current].forEach((input) => {
    const ipt = input;
    if (ipt.name && ipt.name !== "" && ipt.value && ipt.value !== "") {
      const name = ipt.name;
      const value = ipt.value;

      if (
        ipt.name === "valor" ||
        ipt.name === "cpf" ||
        ipt.name === "telefone"
      ) {
        json[name] = onlyNumbers(value);
      } else {
        json[name] = value;
      }
    }
  });
  return json;
}
