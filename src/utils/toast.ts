let container: HTMLDivElement | null = null;

export function toast(message: string) {
  if (typeof document === "undefined") return;
  if (!container) {
    container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "1rem";
    container.style.right = "1rem";
    container.style.zIndex = "9999";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "0.5rem";
    document.body.appendChild(container);
  }
  const toastElem = document.createElement("div");
  toastElem.textContent = message;
  toastElem.style.background = "#333";
  toastElem.style.color = "#fff";
  toastElem.style.padding = "0.5rem 1rem";
  toastElem.style.borderRadius = "4px";
  toastElem.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  toastElem.style.opacity = "1";
  toastElem.style.transition = "opacity 0.5s ease";
  container.appendChild(toastElem);
  setTimeout(() => {
    toastElem.style.opacity = "0";
  }, 2500);
  setTimeout(() => {
    toastElem.remove();
    if (container && container.childElementCount === 0) {
      container.remove();
      container = null;
    }
  }, 3000);
}

export default toast;
