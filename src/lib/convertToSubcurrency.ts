const convertToSubcurrency = (amount: number): number => {
    // Assuming the amount is in dollars and needs to be converted to cents
    return Math.round(amount * 100);
  };
  
  export default convertToSubcurrency;
  