// Get the textarea element by its ID
const textareaElement = document.getElementById("prompt-textarea");
const parentDiv = document.querySelector('div[role="presentation"]');

// Create a container div that spans the full width
const containerDiv = document.createElement("div");
containerDiv.style.width = "100%";
containerDiv.style.textAlign = "center"; // Center-align the contents
containerDiv.style.marginBottom = "10px"; // Add some bottom margin
containerDiv.style.zIndex = "1000"; // Ensure the container is on top

// Create an input field
const inputElement = document.createElement("input");
inputElement.placeholder = "Enter a prompt value";
inputElement.classList.add(
  "px-2",
  "h-8",
  "rounded-lg",
  "bg-white",
  "text-black",
  "ml-8"
);

// Create a submit button for the input
const submitInput = document.createElement("button");
submitInput.textContent = "Submit";
submitInput.classList.add(
  "px-2",
  "h-8",
  "rounded-lg",
  "bg-white",
  "text-black"
);

// Create a select (dropdown) element for prompt options
const selectElement = document.createElement("select");
selectElement.classList.add("px-2", "rounded-lg", "bg-white", "text-black");
selectElement.style.width = "250px";

// Function to update the select options
function updateSelectOptions(options) {
  selectElement.innerHTML = "";
  options.forEach((optionText) => {
    const option = document.createElement("option");
    option.value = optionText;
    option.textContent = optionText;
    selectElement.appendChild(option);
  });
}

const storedOptionsLocal = localStorage.getItem("promptOptions");
let parsedOptionLocal = storedOptionsLocal && JSON.parse(storedOptionsLocal);

// Add default prompt options to the select element
const defaultOptions = [
  "Translate the content below in to English, Correct Grammar, Correct Spelling; Better writing (more clear and clean) Translate the content below into English, Content",
  "You are a senior dev, pls improve code, optimize, clarify, efficiency, and ensuring it adheres to best practices.",
];
let optionsSelect = parsedOptionLocal || defaultOptions;

updateSelectOptions(optionsSelect);

// Add a click event listener to the submit button for adding new options
submitInput.addEventListener("click", function () {
  const inputValue = inputElement.value.trim();
  if (inputValue) {
    optionsSelect.push(inputValue);
    localStorage.setItem("promptOptions", JSON.stringify(optionsSelect));
    updateSelectOptions(optionsSelect); // Update the select options
    inputElement.value = "";
  }
});

// Create a submit button for selecting an option
const submitSelect = document.createElement("button");
submitSelect.textContent = "Submit Option";
submitSelect.classList.add(
  "px-2",
  "h-8",
  "rounded-lg",
  "bg-white",
  "text-black"
);

// Add a click event listener to the submit button for selecting options
submitSelect.addEventListener("click", function () {
  const selectedOption = selectElement.value;
  if (selectedOption && textareaElement) {
    textareaElement.value += selectedOption + " ";
    textareaElement.style.height = "70px !important";
    textareaElement.classList.add("h-[70px]");
  } else {
    console.error('Element with ID "prompt-textarea" not found');
  }
});

// Append the select element and submit button to the container div
containerDiv.appendChild(selectElement);
containerDiv.appendChild(submitSelect);
containerDiv.appendChild(inputElement);
containerDiv.appendChild(submitInput);

// Update the CSS for the children elements
inputElement.style.marginLeft = "20px"; // Example CSS for input
// Example CSS for selectElement

// Calculate the middle index of the child nodes within the parentDiv
const middleIndex = Math.floor(parentDiv.childNodes.length / 2);

// Append the container div to the parentDiv
parentDiv.insertBefore(containerDiv, parentDiv.childNodes[middleIndex]);
