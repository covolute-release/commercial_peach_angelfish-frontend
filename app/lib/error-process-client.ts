import { serializeError } from "./serialize-error";
import { throttle } from "lodash-es";

export const reportClientError = throttle((error: unknown) => {
  try {
    const serializedErrorString = serializeError(error, "frontend-runtime");

    if (window.parent && window.parent !== window) {
      window.parent.postMessage(
        {
          type: "IFRAME_ERROR",
          payload: serializedErrorString,
        },
        "*",
      );
    }
  } catch {
    //
  }
}, 1000, { trailing: false});
