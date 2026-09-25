// --- Global Description Popup Function ---

function showDescription(text) {
  window.alert(text);
}


// --- Full-Page Magnifier ---

(function enableFullPageMagnifier() {
  const minimumZoom = 1;
  const maximumZoom = 2;
  const zoomStep = 0.1;
  let currentZoom = 1;

  const controls = document.createElement("div");
  controls.className = "page-magnifier-controls";
  controls.innerHTML = `
    <button type="button" class="page-zoom-out" aria-label="Zoom out">
      −
    </button>

    <span class="page-zoom-level">100%</span>

    <button type="button" class="page-zoom-in" aria-label="Zoom in">
      +
    </button>

    <button type="button" class="page-zoom-reset">
      Reset
    </button>

    <span class="page-zoom-help">
      Press the + sign to zoom in
    </span>
  `;

  document.body.appendChild(controls);

  const zoomLevel = controls.querySelector(".page-zoom-level");
  const zoomOutButton = controls.querySelector(".page-zoom-out");
  const zoomInButton = controls.querySelector(".page-zoom-in");
  const resetButton = controls.querySelector(".page-zoom-reset");
  const zoomTarget = document.querySelector("main") || document.body;

  function positionControls() {
    const navbar = document.querySelector(".navbar");
    const navbarBottom = navbar ? navbar.offsetHeight : 0;

    controls.style.top = `${navbarBottom + 2}px`;
  }

  function applyZoom() {
    zoomTarget.style.transformOrigin = "top center";
    zoomTarget.style.transform = `scale(${currentZoom})`;
    zoomLevel.textContent = `${Math.round(currentZoom * 100)}%`;

    zoomOutButton.disabled = currentZoom <= minimumZoom;
    zoomInButton.disabled = currentZoom >= maximumZoom;
  }

  zoomOutButton.addEventListener("click", () => {
    currentZoom = Math.max(
      minimumZoom,
      Number((currentZoom - zoomStep).toFixed(2))
    );

    applyZoom();
  });

  zoomInButton.addEventListener("click", () => {
    currentZoom = Math.min(
      maximumZoom,
      Number((currentZoom + zoomStep).toFixed(2))
    );

    applyZoom();
  });

  resetButton.addEventListener("click", () => {
    currentZoom = 1;
    applyZoom();
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement ||
      event.target instanceof HTMLSelectElement
    ) {
      return;
    }

    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      currentZoom = Math.min(
        maximumZoom,
        Number((currentZoom + zoomStep).toFixed(2))
      );
      applyZoom();
    }

    if (event.key === "-" || event.key === "_") {
      event.preventDefault();
      currentZoom = Math.max(
        minimumZoom,
        Number((currentZoom - zoomStep).toFixed(2))
      );
      applyZoom();
    }

    if (event.key === "0") {
      event.preventDefault();
      currentZoom = 1;
      applyZoom();
    }
  });

  window.addEventListener("resize", positionControls);
  positionControls();
  applyZoom();
})();