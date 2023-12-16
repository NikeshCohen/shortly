const mobileBtn = document.querySelector(".mobile-menu-btn");
const mobileNav = document.querySelector(".mobile-nav");
const linksSection = document.querySelector(".links-section");
const input = document.querySelector(".input-flied");
const inputBtn = document.querySelector(".input-btn");

// Function to handle the API request
async function apiRequest() {
  try {
    // Update input btn text
    inputBtn.innerHTML = "Loading...";

    // Collect Long and Short URL from user
    const longUrl = input.value;
    const shortUrl = await shortenUrl(longUrl);

    // Display response
    displayResult(longUrl, shortUrl);
  } catch (error) {
    handleApiError(error);
  } finally {
    // Update the button text, even in case of an error
    input.value = "";
    inputBtn.innerHTML = "Shorten it!";
  }
}

// Function to shorten the provided URl
async function shortenUrl(longUrl) {
  const headers = new Headers();
  headers.append("apikey", "WfpeGneu2wFBfxZyxdSJkFO6pezNju9x");

  const requestOptions = {
    method: "POST",
    redirect: "follow",
    headers: headers,
    body: longUrl,
  };

  const response = await fetch(
    "https://api.apilayer.com/short_url/hash",
    requestOptions
  );

  // Handle server response
  if (response.ok) {
    const data = await response.json();
    return data.short_url;
  } else {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }
}

// Display result to the user
const displayResult = (longUrl, shortUrl) => {
  const clientResponse = `
    <div class="flex response">
      <p class="original-link">${longUrl}</p>
      <div class="flex output">
        <a href="${shortUrl}" target="_blank" class="short-link">
          ${shortUrl}
        </a>
        <button class="btn copy-btn">Copy</button>
      </div>
    </div>
  `;

  input.value = "";
  linksSection.insertAdjacentHTML("afterbegin", clientResponse);
};

// Handle API error
const handleApiError = (error) => {
  console.error("Error:", error);
  inputBtn.innerHTML = "Error";
};

// Handle input error
const handleInputError = () => {
  input.classList.add("error");
  setTimeout(() => {
    input.classList.remove("error");
  }, 2000);
};

const copyBtnChange = () => {
  const copyBtn = document.querySelector(".copy-btn");
  copyBtn.classList.add("copied");
  copyBtn.innerHTML = "copied";
  setTimeout(() => {
    copyBtn.innerHTML = "copy";
    copyBtn.classList.remove("copied");
  }, 2000);
};

// Copy link to clip board
function linkCopied() {
  const closestShortLink = document.querySelector(".short-link");
  const copyLink = closestShortLink.href;
  navigator.clipboard.writeText(copyLink);
  copyBtnChange();
}

// Input btn event listener
inputBtn.addEventListener("click", () =>
  input.value ? apiRequest() : handleInputError()
);

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    input.value ? apiRequest() : handleInputError();
  }
});

// Copy button event listener, first check if element exists
linksSection.addEventListener("click", function (event) {
  event.target.classList.contains("copy-btn") ? linkCopied(event) : "";
});

// Hamburger btn event lister
mobileBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("show-mobile");
});
