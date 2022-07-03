export function findProductBySku(products, sku) {
  if (sku) {
    return products.filter(product => product.sku === Number(sku))[0]
  }
}
