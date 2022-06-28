import { onlyNumbers } from "./formats";

export function isValidCPF(value: string | undefined): boolean {
  let strCPF = value;
  strCPF = onlyNumbers(strCPF);

  if (strCPF) {
    const CPF_BLACKLIST = [
      "00000000000",
      "11111111111",
      "22222222222",
      "33333333333",
      "44444444444",
      "55555555555",
      "66666666666",
      "77777777777",
      "88888888888",
      "99999999999",
      "12345678909",
    ];

    let Soma;
    let Resto;
    Soma = 0;

    if (strCPF.length !== 11) return false;

    if (CPF_BLACKLIST.includes(strCPF)) return false;

    for (let i = 1; i <= 9; i += 1)
      Soma += parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(9, 10), 10)) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i += 1)
      Soma += parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(10, 11), 10)) return false;
  }
  return true;
}
