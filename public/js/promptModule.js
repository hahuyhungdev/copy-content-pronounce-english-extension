// Function to create and configure a container div
function createContainerDiv() {
  const containerDiv = document.createElement("div");
  containerDiv.style.width = "100%";
  containerDiv.style.textAlign = "center";
  containerDiv.style.marginBottom = "10px";
  return containerDiv;
}

// Function to create and configure an input element
function createInputElement() {
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
  return inputElement;
}

// Function to create and configure a submit button for input
function createSubmitInputButton(optionsSelect, updateSelectOptions) {
  const submitInput = document.createElement("button");
  submitInput.textContent = "Submit";
  submitInput.classList.add(
    "px-2",
    "h-8",
    "rounded-lg",
    "bg-white",
    "text-black"
  );

  submitInput.addEventListener("click", function () {
    const inputValue = inputElement.value.trim();
    if (inputValue) {
      optionsSelect.push(inputValue);
      localStorage.setItem("promptOptions", JSON.stringify(optionsSelect));
      updateSelectOptions(optionsSelect);
      inputElement.value = "";
    }
  });

  return submitInput;
}

// Function to create and configure a select (dropdown) element
function createSelectElement(optionsSelect) {
  const selectElement = document.createElement("select");
  selectElement.classList.add("px-2", "rounded-lg", "bg-white", "text-black");
  selectElement.style.width = "250px";

  function updateSelectOptions(options) {
    selectElement.innerHTML = "";
    options.forEach((optionText) => {
      const option = document.createElement("option");
      option.value = optionText;
      option.textContent = optionText;
      selectElement.appendChild(option);
    });
  }

  updateSelectOptions(optionsSelect);

  return selectElement;
}

// Function to create and configure a submit button for selecting an option
function createSubmitSelectButton(textareaElement) {
  const submitSelect = document.createElement("button");
  submitSelect.textContent = "Submit Option";
  submitSelect.classList.add(
    "px-2",
    "h-8",
    "rounded-lg",
    "bg-white",
    "text-black"
  );

  submitSelect.addEventListener("click", function () {
    const selectedOption = selectElement.value;
    if (selectedOption && textareaElement) {
      textareaElement.value += selectedOption + " ";
    } else {
      console.error('Element with ID "prompt-textarea" not found');
    }
  });

  return submitSelect;
}

export {
  createContainerDiv,
  createInputElement,
  createSubmitInputButton,
  createSelectElement,
  createSubmitSelectButton,
};
