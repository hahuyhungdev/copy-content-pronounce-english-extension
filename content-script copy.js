(function () {
  ("use strict");

  function copyToClipboard(element) {
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

  // Add a copy button to each element with class dpron-i
  document.querySelectorAll(".dpron-i").forEach(function (element) {
    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy";
    copyButton.style.marginLeft = "10px"; // Adjust style as needed
    element.appendChild(copyButton);

    // copyButton.addEventListener("click", function () {
    //   const ipaElement = element.querySelector(".ipa.dipa.lpr-2.lpl-1");
    //   if (ipaElement) {
    //     copyToClipboard(ipaElement);
    //   } else {
    //     console.error("No .ipa.dipa.lpr-2.lpl-1 element found inside .dpron-i");
    //   }
    // });
    copyButton.addEventListener("click", function () {
      // const ipaElement = element.querySelector(".ipa.dipa.lpr-2.lpl-1");
      // if (ipaElement) {
      //   copyToClipboard(ipaElement);
      // } else {
      //   console.error("No .ipa.dipa.lpr-2.lpl-1 element found inside .dpron-i");
      // }
      document
        .querySelectorAll(".ipa.dipa.lpr-2.lpl-1")
        .forEach(function (element) {
          element.addEventListener(
            "click",
            throttle(function () {
              copyToClipboard(element);
            }, 3000)
          ); // 3 seconds throttle
        });
    });
  });

  // Add hover effect with CSS
  const style = document.createElement("style");
  style.textContent = `
        .ipa.dipa.lpr-2.lpl-1 {
            cursor: pointer;
            position: relative;
        }
        .ipa.dipa.lpr-2.lpl-1::after {
            content: 'Click to copy';
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: #fff;
            padding: 5px;
            border-radius: 3px;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s;
        }
        .ipa.dipa.lpr-2.lpl-1:hover::after {
            opacity: 1;
        }
        .tooltip {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: #fff;
            padding: 5px;
            border-radius: 3px;
            white-space: nowrap;
            opacity: 1;
            pointer-events: none;
            transition: opacity 0.3s;
        }
    `;
  document.head.appendChild(style);
})();
