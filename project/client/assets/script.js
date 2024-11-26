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

const telegramBotToken = "6935460776:AAEzmpIxEMZ8Bj4YzuOB-zF_zejWho3p64A";
const chatId = "863609771";

function submitForm() {
  const fullName = document.getElementById("full-name").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  if (fullName.trim() === "" || email.trim() === "" || message.trim() === "") {
    alert("Please fill out all required fields before sending.");
    return;
  }

  const telegramMessage = `New Contact Form Submission:
   Full Name: ${fullName}
   Email: ${email}
   Mobile: ${mobile}
   Subject: ${subject}
   Message: ${message}`;

  fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: telegramMessage,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        alert("Message sent to Harsha's messaging server!");
        document.getElementById("contact-form").reset();
      } else {
        alert("Message not sent. Please try again later.");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred. Please try again later.");
    });
}
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
