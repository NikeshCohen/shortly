"use strict";

// DOM Elements //

const mobileBtn = document.querySelector(".mobile-menu-btn");
const mobileNav = document.querySelector(".mobile-nav");
const linksSection = document.querySelector(".links-section");
const input = document.querySelector(".input-flied");
const inputBtn = document.querySelector(".input-btn");

// // Variables //

let originalLink;
let shortLink = "https://shorturl.at/PX358";

// Functions //

const responseAdded = (event) => {
  const copyBtn = document.querySelector(".copy-btn");
  navigator.clipboard.writeText(shortLink);
  copyBtn.innerHTML = "Copied!";
  copyBtn.classList.add("copied-btn");
};

const insertHTML = () => {
  originalLink = input.value;

  const clientResponse = `
  <div class="flex response">
  <p class="original-link">${originalLink}</p>
  <div class="flex output">
    <a href="${shortLink}" target="”_blank”" class="short-link">
      ${shortLink}
    </a>
    <button onclick="responseAdded()" class="btn copy-btn">Copy</button>
  </div>
</div>`;

  linksSection.innerHTML += clientResponse;
};

// Event Listeners //

inputBtn.addEventListener("click", () => {
  if (!input.value) {
    input.classList.add("error");

    setTimeout(() => {
      input.classList.remove("error");
    }, 2000);
  } else {
    insertHTML();
  }
});

mobileBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("show-mobile");
  console.log("click");
});
