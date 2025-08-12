export function handleError(error: unknown, logMessage: string, alertMessage: string) {
  console.error(logMessage, error);
  alert(alertMessage);
}
