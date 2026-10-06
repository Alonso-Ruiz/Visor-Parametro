// Welcome remains usable while the map is loading.
(() => {
  const welcome = document.getElementById("welcomeModal");
  const enter = document.getElementById("enterButton");
  const workspace = document.querySelector(".workspace");
  const header = document.querySelector(".app-header");
  workspace.inert = true;
  header.inert = true;
  function dismissWelcome() {
    welcome.classList.add("is-hidden");
    workspace.inert = false;
    header.inert = false;
    document.getElementById("searchInput").focus({ preventScroll: true });
  }
  enter.addEventListener("click", dismissWelcome);
  document.getElementById("closeWelcome").addEventListener("click", dismissWelcome);
  requestAnimationFrame(() => enter.focus({ preventScroll: true }));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !welcome.classList.contains("is-hidden")) dismissWelcome();
    if (event.key !== "Tab") return;
    const dialog = [...document.querySelectorAll('[role="dialog"][aria-modal="true"]')].find((element) => !element.classList.contains("is-hidden"));
    if (!dialog) return;
    const focusable = [...dialog.querySelectorAll('button, input, select, summary, a[href], [tabindex="0"]')].filter((element) => !element.disabled && element.getClientRects().length && getComputedStyle(element).visibility !== "hidden");
    if (!focusable.length) return;
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
      event.preventDefault(); first.focus();
    }
  });
})();
