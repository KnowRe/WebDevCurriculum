export const validateDoc = doc => {
  const keys = ['id', 'name', 'text'];
  const propertyCheck = keys.every(key => Reflect.has(doc, key));
  const valueNullishCheck = keys.every(key => {
    return !(doc[key] === null || doc[key] === undefined);
  });

  return propertyCheck && valueNullishCheck;
};
