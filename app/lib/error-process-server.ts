import { serializeError } from "./serialize-error";

export function logServerError(error: unknown, context?: Record<string, any>): void {
  try {
    const serializedErrorString = serializeError(error, "backend-runtime");

    if (context) {
      console.error(serializedErrorString, JSON.stringify(context));
    } else {
      console.error(serializedErrorString);
    }
  } catch {
    //
  }
}
