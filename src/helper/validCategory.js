export function  validCategory(categories, data) {
  let result = false;
  for (const category of categories) {
    if (category.cat.toLowerCase() === data.toLowerCase()) result = true;
  }
  return result;
}

