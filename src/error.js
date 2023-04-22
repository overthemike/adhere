export default class AdhereError extends Error {
  constructor(message) {
    super(message);
    this.name = "AdhereError";
    this.message = `Invalid Arguments: ${message}`;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stacktrace: this.stack,
    };
  }
}
