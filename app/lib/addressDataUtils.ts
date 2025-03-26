function getAddressData() {
  const addressFromSessionStorage = sessionStorage.getItem("addressFormData");

  if (addressFromSessionStorage === null)
    return {
      shipping: {},
      billing: {},
    };

  const addressData = JSON.parse(addressFromSessionStorage);
  console.log(addressData);

  return {
    shipping: addressData.shipping,
    billing: addressData.billing,
  };
}

function isBillingSameAsShipping() {
  const { shipping, billing } = getAddressData();

  return JSON.stringify(shipping) === JSON.stringify(billing);
}

export { getAddressData, isBillingSameAsShipping };
