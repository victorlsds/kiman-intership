import { phoneRegex, cepRegex, numberRegex, cpfRegex, emailRegex, dateRegex } from 'utils/mask';

export const inputValidate = (value, type) => {
  switch (type) {
    case 'text':
      return textValidate(value);
    case 'phone':
      return phoneValidate(value);
    case 'cep':
      return cepValidate(value);
    case 'number':
      return numberValidate(value);
    case 'document':
      return documentValidate(value);
    case 'date':
      return dateValidate(value);
    case 'email':
      return emailValidate(value);
    default:
      break;
  }
};

export const textValidate = value => {
  if (value.length !== 0) { return true; }
  return false;
};

export const phoneValidate = value => {
  const regex = phoneRegex;
  return regex.test(value);
};

export const cepValidate = value => {
  const regex = cepRegex;
  return regex.test(value);
};

export const numberValidate = value => {
  const regex = numberRegex;
  return regex.test(value);
};

export const documentValidate = value => {
  const regex = cpfRegex;
  return regex.test(value);
};

export const dateValidate = value => {
  const regex = dateRegex;
  return regex.test(value);
};

export const emailValidate = value => {
  const regex = emailRegex;
  return regex.test(value);
};

