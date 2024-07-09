function productValidator(product) {
  // retorna o erros ou nosso oobj default
  const erros = [];

  if (!(product.id.length >= 2 && product.id.length <= 20)) {
    erros.push(`id: invalid length, current [${product.id}] expected to be between 2 and 20`)
  }

  if (/(\W|\d)/.test(product.name)) {
    erros.push(`name: invalid value, current [${product.name}] expected to have only words`)
  }

  if (!(product.price >= 1 && product.price <= 1000)) {
    erros.push(`price: invalid value, current [${product.price}] expected to be between 1 and 1000`)
  }

  if (!(['eletronic', 'organic'].includes(product.category))) {
    erros.push(`category: invalid value, current [${product.category}] expected to be eletronic or organic`)
  }

  return {
    result: erros.length === 0,
    erros,
  }
}

module.exports = { productValidator }