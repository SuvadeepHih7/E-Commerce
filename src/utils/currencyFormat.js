// Utility: Format numbers as US currency (e.g., $12,345.67)
export const formatCurrency = (amount) => {
  if (isNaN(amount)) return "$0.00";
  
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
