export const searchProducts = (query, products) => {
  return products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
};
