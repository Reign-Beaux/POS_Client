import { Taxes } from "../consts";

const calculateValues = (quantitySold: number, price: number) => {
  const subtotal = quantitySold * price;
  const iva = subtotal * Taxes.IVA;
  const total = subtotal + iva;

  return {
    subtotal,
    taxes: iva,
    total,
  };
};

export default calculateValues;