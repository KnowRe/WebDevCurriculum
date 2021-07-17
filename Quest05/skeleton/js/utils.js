export const type = (target, type) => {
  if (typeof type == "string") {
    if (typeof target !== type) throw `invalid type ${target} : ${type}`;
  } else if (!(target instanceof type))
    throw `invalid type ${target} : ${type}`;
  return target;
};
