let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  let header = document.querySelector("header");

  header.classList.toggle("sticky", window.screenY > 100);

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .services-container, .portfolio-box, .contact form, .education-box, .skills-box",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

const typed = new Typed(".multiple-text", {
  strings: ["Backend developer", "Machine Learning Engineer", "Data Analyst"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

const skills = document.querySelectorAll(".skills-content .progress");

function getRandomPercentage() {
  return Math.floor(Math.random() * 100) + 1;
}

function updateSkills() {
  skills.forEach((skill) => {
    const bar = skill.querySelector(".bar span");
    const percentageText = skill.querySelector("h3 span");

    const currentPercentage = parseInt(
      percentageText.getAttribute("data-percentage")
    );
    const newPercentage = getRandomPercentage();

    percentageText.setAttribute("data-temp-percentage", `${newPercentage}%`);
    bar.style.setProperty("--width", `${newPercentage}%`);
  });
}

setInterval(() => {
  updateSkills();
}, 300);

function submitForm() {
  const formData = {
    fullName: document.getElementById("full-name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  if (
    formData.fullName.trim() === "" ||
    formData.email.trim() === "" ||
    formData.message.trim() === ""
  ) {
    alert("Please fill out all required fields before sending.");
    return;
  }

  fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Message sent successfully!");
        document.getElementById("contact-form").reset();
      } else {
        alert("Failed to send message.");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred. Please try again.");
    });
}
