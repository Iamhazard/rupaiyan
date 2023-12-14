import React from "react";

const currencyUtils = (amount) => {
  const formatter = Intl.NumberFormat("en-NP", {
    currency: "NPR",
    style: "currency",
  });
  return formatter.format(amount);
};

export default currencyUtils;
