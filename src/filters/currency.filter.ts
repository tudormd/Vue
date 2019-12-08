import moment from "moment";

export default (value: number, currency: any, lang = navigator.language) => {
  return new Intl.NumberFormat(
    `${moment.locale(lang)}-${moment.locale().toUpperCase()}`,
    {
      style: "currency",
      currency: currency.currencies_name.toLowerCase()
    }
  ).format(value);
};
