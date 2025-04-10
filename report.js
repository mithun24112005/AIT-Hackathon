function setupDropzone(dropzoneId, maxSizeMB) {
    const dropzone = document.getElementById(dropzoneId);
    const input = dropzone.querySelector('input');
  
    dropzone.addEventListener("click", () => input.click());
  
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("drag-over");
    });
  
    dropzone.addEventListener("dragleave", () => {
      dropzone.classList.remove("drag-over");
    });
  
    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("drag-over");
  
      const file = e.dataTransfer.files[0];
      if (file) {
        const sizeMB = file.size / (1024 * 1024);
        if (sizeMB > maxSizeMB) {
          alert(`File too large! Max size: ${maxSizeMB} MB`);
          return;
        }
  
        // Optional: Show file name or preview
        dropzone.querySelector("p").innerHTML = `<strong>${file.name}</strong><br><span>${sizeMB.toFixed(2)} MB</span>`;
      }
    });
  
    // Handle manual file selection
    input.addEventListener("change", () => {
      const file = input.files[0];
      if (file) {
        const sizeMB = file.size / (1024 * 1024);
        if (sizeMB > maxSizeMB) {
          alert(`File too large! Max size: ${maxSizeMB} MB`);
          return;
        }
        dropzone.querySelector("p").innerHTML = `<strong>${file.name}</strong><br><span>${sizeMB.toFixed(2)} MB</span>`;
      }
    });
  }
  
  // Setup all zones
  setupDropzone("photoDrop", 5);
  setupDropzone("fileDrop", 5);
  setupDropzone("videoDrop", 25);
  
  const allPincodes = [
    "560001", "560002", "560003", "560004", "560005", 
    "560010", "560011", "560020", "560025", "560100",
    "560103", "560104", "560105", "561203", "561204"
  ];
  
  const input = document.getElementById("pincodeInput");
  const suggestionsBox = document.getElementById("pincodeSuggestions");
  
  input.addEventListener("input", () => {
    const query = input.value.trim();
    suggestionsBox.innerHTML = "";
  
    if (query.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }
  
    const matches = allPincodes.filter(pincode => pincode.startsWith(query));
    if (matches.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }
  
    matches.forEach(match => {
      const li = document.createElement("li");
      li.textContent = match;
      li.addEventListener("click", () => {
        input.value = match;
        suggestionsBox.style.display = "none";
      });
      suggestionsBox.appendChild(li);
    });
  
    suggestionsBox.style.display = "block";
  });
  
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".autocomplete-container")) {
      suggestionsBox.style.display = "none";
    }
  });
  