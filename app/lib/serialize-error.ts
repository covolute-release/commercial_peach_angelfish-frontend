interface SerializedError {
  type: "error";
  source: "frontend-runtime" | "backend-runtime";
  timestamp: string;
  name?: string;
  message: string;
  stack?: string;
}

export function serializeError(error: unknown, source: "frontend-runtime" | "backend-runtime"): string {
  const payload: SerializedError = {
    type: "error",
    source: source,
    timestamp: new Date().toISOString(),
    name: "UnknownError",
    message: "An unknown error occurred.",
    stack: undefined,
  };

  if (error instanceof Error) {
    payload.name = error.name;
    payload.message = error.message;
    payload.stack = typeof error.stack === "string" ? error.stack : undefined;
  } else if (typeof error === "string") {
    payload.message = error;
  } else {
    try {
      payload.message = `Non-Error object caught: ${JSON.stringify(error)}`;
    } catch {
      payload.message = "Non-Error object caught, unable to stringify.";
    }
  }

  try {
    return JSON.stringify(payload);
  } catch (stringifyError) {
    return JSON.stringify({
      type: "error",
      source: source,
      timestamp: new Date().toISOString(),
      name: "SerializationError",
      message: "Failed to serialize the original error object.",
      originalErrorType: payload.name,
    });
  }
}
