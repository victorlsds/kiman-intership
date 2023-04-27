export const selectMain = (array = []) => {
  let principal = {};
  array.forEach(record => {
    record.principal ? (principal = record) : null;
  });
  return principal;
};

export const selectFirst = (array = []) => array && array.length > 0 ? array[0] : null;

export const formataEndereco = (endereco = {}) => {
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
  return enderecoFormatado;
}

export const isNumber = value => {
  const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
  if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
    return true;
  }
  return false;
};

export const groupBy = (list, by) =>
  list.reduce((r, a) => {
    r[a[by]] = r[a[by]] || [];
    r[a[by]].push(a);
    return r;
  }, {});

export const removeDuplicados = (array, prop) => {
  return array.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}

export const find = (array = [], property, value) => {
  return array.find(item => item[property] === value)
}

export const filter = (array = [], property, value) => {
  return array.filter(item => item[property] === value)
}

export const orderBy = (array = [], property) => {
  return array.sort((a, b) => {
    if (a[property] < b[property]) {
      return -1;
    } else if (a[property] > b[property]) {
      return 1;
    }
    return 0;
  })
} 