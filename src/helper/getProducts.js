export function getProducts(products, cat, style) {

  if (!style) {
    const selection = products.filter(product => {
      return (product.disp && product.category.toLowerCase() === cat.toLowerCase())
    })
    return selection;
  }

  const selection = products.filter(product => {
    return (product.disp && product.category.toLowerCase() === cat.toLowerCase() && product.style === style)
  })
  
  return selection;
}

