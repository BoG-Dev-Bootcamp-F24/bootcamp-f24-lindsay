const numSparkles = 100;

function makeSparkle() {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  document.body.appendChild(sparkle);

  const size = Math.random() * 2 + 3 + "px"; //2 to 5 pixels
  sparkle.style.width = size;
  sparkle.style.height = size;
  sparkle.style.left = Math.random() * 100 + "vw"; //anywhere vertically
  sparkle.style.top = Math.random() * 100 + "vh"; //anywhere horizontally

  const duration = Math.random() * 2 + 2 + "s"; //2 to 4 seconds
  sparkle.style.animationDuration = duration;

  setTimeout(() => {
    sparkle.remove();
  }, parseFloat(duration) * 1000);
}

function playSparkles() {
  for (let i = 0; i < numSparkles; i++) {
    makeSparkle();
  }
}

document
  .getElementById("sparkle-button")
  .addEventListener("click", playSparkles);
