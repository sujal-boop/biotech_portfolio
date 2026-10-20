const menuButton = document.querySelector(".menu-toggle");
const header = document.querySelector(".site-header");

if (menuButton && header) {
  const mobileNav = document.createElement("nav");
  mobileNav.className = "mobile-nav";
  mobileNav.setAttribute("aria-label", "Mobile navigation");
  mobileNav.hidden = true;

  document.querySelectorAll(".nav-links a").forEach((link) => {
    const mobileLink = link.cloneNode(true);
    mobileLink.addEventListener("click", () => {
      mobileNav.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
      menuButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path></svg>';
    });
    mobileNav.append(mobileLink);
  });

  header.after(mobileNav);
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    mobileNav.hidden = isOpen;
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    menuButton.innerHTML = isOpen
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>';
  });
}

const interestCategories = [
  "Life sciences",
  "Life sciences",
  "Healthcare",
  "Food & sustainability",
];
const interestCards = [...document.querySelectorAll(".interest-card")];
interestCards.forEach((card, index) => {
  card.dataset.category = interestCategories[index];
});

document.querySelectorAll(".filter-row button").forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.textContent.trim();
    document.querySelectorAll(".filter-row button").forEach((filter) => {
      const active = filter === button;
      filter.dataset.active = String(active);
      filter.setAttribute("aria-pressed", String(active));
    });

    interestCards.forEach((card) => {
      card.hidden = selected !== "All interests" && card.dataset.category !== selected;
    });
  });
});

const learningDetails = [
  "My current focus is developing a solid understanding of biotechnology, biological systems, and the scientific principles behind laboratory work.",
  "I aim to turn theoretical knowledge into practical understanding through laboratory learning, academic projects, and opportunities to observe science in action.",
  "My long-term goal is to develop industry-ready knowledge and practical skills, with a particular interest in pharmaceutical biotechnology and food technology.",
];

const plusIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>';
const minusIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus" aria-hidden="true"><path d="M5 12h14"></path></svg>';

document.querySelectorAll(".learning-trigger").forEach((button, index) => {
  let answer = document.getElementById(button.getAttribute("aria-controls"));
  if (!answer) {
    answer = document.createElement("p");
    answer.id = button.getAttribute("aria-controls");
    answer.className = "learning-answer";
    button.after(answer);
  }
  answer.textContent = learningDetails[index];

  button.addEventListener("click", () => {
    const shouldOpen = button.getAttribute("aria-expanded") !== "true";
    document.querySelectorAll(".learning-trigger").forEach((otherButton) => {
      const otherAnswer = document.getElementById(otherButton.getAttribute("aria-controls"));
      const active = otherButton === button && shouldOpen;
      otherButton.setAttribute("aria-expanded", String(active));
      if (otherAnswer) otherAnswer.hidden = !active;
      otherButton.querySelector("svg")?.replaceWith(
        document.createRange().createContextualFragment(active ? minusIcon : plusIcon).firstElementChild,
      );
    });
  });
});

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  const nameInput = contactForm.querySelector('[name="name"]');
  const emailInput = contactForm.querySelector('[name="email"]');
  const messageInput = contactForm.querySelector('[name="message"]');
  const honeypot = contactForm.querySelector('[name="company"]');

  [nameInput, emailInput, messageInput].forEach((field) => {
    if (field) field.required = true;
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (honeypot?.value || !contactForm.reportValidity()) return;

    const subject = `Website message from ${nameInput.value.trim()}`;
    const body = [
      `Name: ${nameInput.value.trim()}`,
      `Email: ${emailInput.value.trim()}`,
      `Phone: ${contactForm.querySelector('[name="phone"]').value.trim() || "Not provided"}`,
      "",
      messageInput.value.trim(),
    ].join("\n");

    window.location.href = `mailto:Sujalnanda1976@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
