import AdhereError from "./error";
import checkType from "./type-check";

const nth = (n) => {
  return ["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th";
};

export const validateObject = (types, obj, argNumber) => {
  const keys = Object.keys(types);
  for (let i = 0; i < keys.length; i++) {
    const isOptional = Array.isArray(types[keys[i]]);
    const key = keys[i];
    const type = Array.isArray(types[key]) ? types[key][0] : types[key];

    if (isOptional && obj[key] === undefined) {
      return true;
    }

    if (typeof type === "object") {
      return validateObject(type, obj[key], argNumber);
    } else if (!checkType(type)(obj[key])) {
      throw new AdhereError(
        `Expected object property "${key}" to be "${type.name}" but got "${obj[key].constructor.name}"`
      );
    }
  }
  return true;
};

export const validateArgs = (types, args) => {
  for (let i = 0; i < types.length; i++) {
    let isOptional = Array.isArray(types[i]);
    let type = Array.isArray(types[i]) ? types[i][0] : types[i];
    let arg = args[i];

    if (isOptional && arg === undefined) continue;

    if (!isOptional && arg === undefined) {
      throw new AdhereError(`${i + 1}${nth(i + 1)} argument is required`);
    } else if (typeof type === "object") {
      validateObject(type, arg, i + 1);
    } else if (!checkType(type)(arg)) {
      throw new AdhereError(
        `Expected ${i + 1}${nth(i + 1)} argument to be "${
          type.name
        }" but got "${arg.constructor.name}"`
      );
    }
  }
};
