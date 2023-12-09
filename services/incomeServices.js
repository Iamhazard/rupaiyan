//create new product
const createIncome = async (formData) => {
  const response = await fetch("/api/income", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to add income");
  }
  const responseData = await response.json();
  return responseData;
};

const incomeServices = {
  createIncome,
};
export default incomeServices;
