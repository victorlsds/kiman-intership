// @flow

import moment from 'moment';

export const phoneRegex = /^(\(?[0-9]{2}\)?)\s?([0-9]{4,5}-?\s?)([0-9]{4}?)$/;
export const cepRegex = /^([0-9]{5})-?\s?([0-9]{3}?)$/;
export const numberRegex = /^\d+$/;
export const dateRegex = /([0-9]{2})\/?\s?([0-9]{2})\/?\s?([0-9]{4})/;
export const cpfRegex = /^([0-9]{3}).?\s?([0-9]{3}?).?([0-9]{3})-?\s?([0-9]{2})$/;
export const cnpjRegex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/;
export const percentageRegex = /^([0-9]{3}).?\s?([0-9]{2}?)/;
export const emailRegex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;

export const mask = (value, type) => {
  let newValue;
  switch (type) {
    case 'text':
      value = textMask(value);
      break;
    case 'phone':
      newValue = phoneMask(value);
      break;
    case 'cep':
      newValue = cepMask(value);
      break;
    case 'number':
      newValue = numberMask(value);
      break;
    case 'date':
      newValue = dateMask(value);
      break;
    case 'document':
      newValue = cpfMask(value);
      break;
    case 'cpf':
      newValue = cpfMask(value);
      break;
    case 'cnpj':
      newValue = cnpjMask(value);
      break;
    case 'email':
      newValue = emailMask(value);
      break;

    case 'reserveDateMask':
      newValue = reserveDateMask(value);
    case 'default':
      newValue = defaultMask(value);
      break;

    default:
      break;
  }
};

export const textMask = value => value.replace(/\b[a-z]/g, f => f.toUpperCase());

export const phoneMask = value => {
  if (value != null) {
    const cleanValueSpaces = value.replace(/[^0-9]/g, '').trim();
    const result = cleanValueSpaces.replace(phoneRegex, '($1) $2-$3');
    return result;
  }
};

export const cepMask = value => {
  if (value != null) {
    const cleanValueSpaces = value.replace(/[^0-9]/g, '').trim();
    const result = cleanValueSpaces.replace(cepRegex, '$1-$2');
    return result;
  }
};

export const numberMask = value => {
  const cleanValueSpaces = value.replace(/[^0-9]/g, '').trim();
  const result = cleanValueSpaces.replace(numberRegex, '$1');
  return result;
};

export const cpfMask = value => {
  if (value != null) {
    const cleanValueSpaces = value.replace(/[^0-9]/g, '').trim();
    const result = cleanValueSpaces.replace(cpfRegex, '$1.$2.$3-$4');
    return result;
  }
  return '';
};

export const cnpjMask = value => {
  if (value != null) {
    const cleanValueSpaces = value.replace(/[^0-9]/g, '').trim();
    const result = cleanValueSpaces.replace(cnpjRegex, '$1.$2.$3/$4-$5');
    return result;
  }
  return '';
};

export const percentageMask = value => {
  if (value != null) {
    let result = value;
    if (typeof value === 'string') result = Number(value.replace(/[^0-9]/g, '').trim());
    return `${result.toFixed(2).replace('.', ',')}%`;
  }
  return '-';
};

export const dateMask = value => {
  if (value != null) {
    if (value._isAMomentObject) {
      value = value.format('YYYY-MM-DD');
    }
    value = value.split('-').reverse().join();
    const cleanValueSpaces = value.replace(/[^0-9]/g, '').trim();
    const result = cleanValueSpaces.replace(dateRegex, '$1/$2/$3');
    return result;
  }
  return '';
};

export const reserveDateMask = value => {
  if (value != null) {
    if (value._isAMomentObject) {
      return value.format('YYYY-MM-DD');
    } else {
      value = value.split('/').reverse().join();
      const cleanValueSpaces = value.replace(/[^0-9]/g, '').trim();
      const result = cleanValueSpaces.replace(dateRegex, '$1-$2-$3');
      return result;
    }
  }
  return '';
};

export const emailMask = value => {
  if (value != null) {
    const result = value.replace(emailRegex, '$1');
    return result;
  }
};

export const defaultMask = value => value;

export const monetaryMask = value => {
  if (value != null) {
    let result = value;
    if (typeof value === 'string') {
      result = Number(value.replace(/[^0-9]/g, '').trim());
    }
    return result.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, '$1.');
  }
  return '0,00';
};

export const monetaryUnmask = value => {
  if (value != null) {
    return Number(value.replace(/\./g, '').replace(',', '.'));
  }
  return '0';
};

export const realMask = value => 'R$ '.concat(monetaryMask(value));

export const cotaMask = value => {
  if (value != null) {
    return value.toFixed(8).replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, '$1.');
  }
  return '0.00000000';
};

export const formataAgenciaBancaria = (numAgencia, digitoAgencia) => {
  return digitoAgencia ? numAgencia + '-' + digitoAgencia : numAgencia;
};

export const adicionarCaracteresEsquerda = (value, totalWidth, paddingChar) => {
  var length = totalWidth - value.toString().length + 1;
  if (length < 0) {
    return value;
  }
  return Array(length).join(paddingChar || '0') + value;
}

export const formataEnderecoCompleto = (endereco = {}) => {
  let enderecoFormatado = '';
  if (endereco.tipoLogradouro) {
    enderecoFormatado += endereco.tipoLogradouro + ' ';
  }
  if (endereco.logradouro) {
    enderecoFormatado += endereco.logradouro;
  }
  if (endereco.numero) {
    enderecoFormatado += ', ' + endereco.numero;
  }
  if (endereco.bairro) {
    enderecoFormatado += ' - ' + endereco.bairro;
  }
  if (endereco.cidade) {
    enderecoFormatado += ', ' + endereco.cidade;
  }
  if (endereco.UF) {
    enderecoFormatado += ' - ' + endereco.UF;
  }
  return enderecoFormatado;
}

export const formataContaBancaria = (contaBancaria = {}) => {
  let contaFormatado = '';
  if (contaBancaria.codBanco) {
    contaFormatado += contaBancaria.codBanco;
  }
  if (contaBancaria.nomeBanco) {
    contaFormatado += '-' + contaBancaria.nomeBanco;
  }
  if (contaBancaria.codAgencia) {
    contaFormatado += ' - AG: ' + contaBancaria.codAgencia;
  }
  if (contaBancaria.digitoAgencia) {
    contaFormatado += '-' + contaBancaria.digitoAgencia;
  }
  if (contaBancaria.tipoConta) {
    contaFormatado += ' - ' + contaBancaria.tipoConta;
  }
  if (contaBancaria.numConta) {
    contaFormatado += ': ' + contaBancaria.numConta;
  }
  if (contaBancaria.digitoConta) {
    contaFormatado += '-' + contaBancaria.digitoConta;
  }
  return contaFormatado;
}

export const toMoment = (data) => {
  if (data) {
    return moment(data);
  }
  return null;
}