const has = Object.prototype.hasOwnProperty;

export const isEmpty = (prop) => {
  return (
    prop === null ||
    prop === undefined ||
    (has.call(prop, 'length') && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
  );
};


export const formatCurrency = (number) => {
  let s = parseInt(number)
  s = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(s)  
  // s = s.replace('₫', 'VNĐ')
  return s 
}