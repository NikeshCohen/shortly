"use strict";

// DOM Elements //

const mobileBtn = document.querySelector(".mobile-menu-btn");
const mobileNav = document.querySelector(".mobile-nav");
const linksSection = document.querySelector(".links-section");
const input = document.querySelector(".input-flied");
const inputBtn = document.querySelector(".input-btn");

// // Variables //

let longUrl;
let shortUrl;

// Functions //

const responseAdded = (event) => {
  const copyBtn = document.querySelector(".copy-btn");
  const link = document.querySelector(".short-link").innerHTML;

  navigator.clipboard.writeText(link);
  copyBtn.innerHTML = "Copied!";
  copyBtn.classList.add("copied-btn");
};

async function apiRequest() {
  const longUrl = input.value;

  const myHeaders = new Headers();
  myHeaders.append("apikey", "WfpeGneu2wFBfxZyxdSJkFO6pezNju9x");

  const requestOptions = {
    method: "POST",
    redirect: "follow",
    headers: myHeaders,
    body: longUrl,
  };

  try {
    const response = await fetch(
      "https://api.apilayer.com/short_url/hash",
      requestOptions
    );
    const result = await response.json();
    const shortUrl = result.short_url;

    const clientResponse = `
      <div class="flex response">
        <p class="original-link">${longUrl}</p>
        <div class="flex output">
          <a href="${shortUrl}" target="”_blank”" class="short-link">
            ${shortUrl}
          </a>
          <button onclick="responseAdded()" class="btn copy-btn">Copy</button>
        </div>
      </div>
    `;

    inputBtn.innerHTML = "Shorten it!";
    linksSection.innerHTML += clientResponse;
  } catch (error) {
    console.error("error", error);
  }
}

// Event Listeners //

inputBtn.addEventListener("click", () => {
  if (!input.value) {
    input.classList.add("error");

    setTimeout(() => {
      input.classList.remove("error");
    }, 2000);
  } else {
    inputBtn.innerHTML = "Loading...";
    apiRequest();
  }
});

mobileBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("show-mobile");
});
