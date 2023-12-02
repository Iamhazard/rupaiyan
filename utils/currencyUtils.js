import React from "react";

const currencyUtils = (amount) => {
  const formatter = Intl.NumberFormat("Nepal", {
    currency: "Nrs",
    style: "currency",
  });
  return formatter.format(amount);
};

export default currencyUtils;
