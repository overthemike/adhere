import { validateArgs } from "./validate";

export default (...types) => {
  const handler = {
    apply(target, thisArg, args) {
      validateArgs(types, args);

      return Reflect.apply(target, thisArg, args);
    },
    construct(target, args) {
      validateArgs(types, args);

      return Reflect.construct(target, args);
    },
  };

  return function (fn) {
    return new Proxy(fn, handler);
  };
};
