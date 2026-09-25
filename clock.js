function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById("navbar-time").textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();

