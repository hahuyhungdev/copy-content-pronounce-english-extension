// Function to copy content to clipboard
function copyToClipboard(element) {
  // showTooltip(element, "Copied!");
  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  try {
    document.execCommand("copy");
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy content", err);
    // showTooltip(element, "Failed to copy");
  }
  selection.removeAllRanges();
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Add event listeners to elements with throttling
document.querySelectorAll(".ipa.dipa.lpr-2.lpl-1").forEach(function (element) {
  element.addEventListener(
    "click",
    throttle(function () {
      copyToClipboard(element);
    }, 3000)
  ); // 3 seconds throttle
});
