import { toast } from "./toast";

export function handleError(
  error: unknown,
  logMessage: string,
  alertMessage: string
) {
  console.error(logMessage, error);
  toast(alertMessage);
}
