import moment from "moment";

export default (value: number, currency: any) => {
  return new Intl.NumberFormat(
    `${moment.locale(navigator.language)}-${moment.locale().toUpperCase()}`,
    {
      style: "currency",
      currency: currency.currencies_name.toLowerCase()
    }
  ).format(value);
};
