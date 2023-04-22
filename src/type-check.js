export default (type) => (value) => {
  let accepts = [];
  if (
    typeof type === "string" &&
    (type === "*" || type.toLowerCase() === "any")
  ) {
    return true;
  }
  if (typeof type === "string") {
    accepts = type.split("|").map((t) => t.toLowerCase());
  }
  if (type === String || accepts.includes("string")) {
    return typeof value === "string";
  }
  if (type === Number || accepts.includes("number")) {
    return !isNaN(value);
  }
  if (type === BigInt || accepts.includes("bigint")) {
    return typeof value === "bigint";
  }
  if (type === Boolean || accepts.includes("boolean")) {
    return typeof value === "boolean";
  }
  if (type === Symbol || accepts.includes("symbol")) {
    return typeof value === "symbol";
  }
  if (type === Array || accepts.includes("array")) {
    return Array.isArray(value);
  }
  if (type === undefined || accepts.includes("undefined")) {
    return value === undefined;
  }
  if (type === null || accepts.includes("null")) {
    return value === null;
  }
  if (type === Error || accepts.includes("error")) {
    return value instanceof Error;
  }
  if (typeof type === "function" && type !== Function) {
    return !!type(value);
  }

  return value instanceof type;
};
