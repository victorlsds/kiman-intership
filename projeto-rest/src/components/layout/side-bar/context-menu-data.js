import { faBarcode, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

export const data = {
  administrativo: [
    {
      to: '/administrativo/produto',
      label: 'Produto',
      iconType: faBarcode
    },
    {
      to: '/administrativo/cliente',
      label: 'Cliente',
      iconType: faUser
    },
    {
      to: '/administrativo/pedido',
      label: 'Pedido',
      iconType: faShoppingCart
    }
  ]
};
