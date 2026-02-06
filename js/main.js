/* =========================
   MAIN JS – S.S.S.N.R.D.
   Stable • Fast • Production
========================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE NAVBAR TOGGLE
  ========================= */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  /* =========================
     STICKY HEADER SHADOW
  ========================= */
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.style.boxShadow =
        window.scrollY > 10
          ? "0 2px 10px rgba(0,0,0,0.08)"
          : "none";
    });
  }

  /* =========================
     HERO CAROUSEL (SIMPLE + FAST)
  ========================= */
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dots .dot");

  if (slides.length > 0) {
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
        dots[i]?.classList.toggle("active", i === index);
      });
    }

    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 4000);
  }

  /* =========================
     ADMISSION ENQUIRY SUBMIT
  ========================= */
  const form = document.getElementById("admissionForm");
  const statusText = document.getElementById("formStatus");

  if (form && statusText) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      statusText.textContent = "Submitting enquiry...";
      statusText.style.color = "#555";

      const formData = new FormData(form);

      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbzxgr2tGSjN7Omo3LLu6bB9eHOhH_0LcfZbU3q5Ml_LHlZjGNlTjwgfd01YpJ2FRpkh/exec",
          {
            method: "POST",
            body: formData
          }
        );

        const result = await response.json();

        if (result.success) {
          statusText.textContent =
            "✅ Enquiry submitted successfully. School will contact you soon.";
          statusText.style.color = "green";
          form.reset();
        } else {
          throw new Error("Failed");
        }

      } catch (error) {
        statusText.textContent =
          "❌ Network error. Please try again or call the school.";
        statusText.style.color = "red";
      }
    });
  }

  /* =========================
     CONSOLE BRANDING
  ========================= */
  console.log(
    "%cS.S.S.N.R.D. Inter College & Public School",
    "color:#0a3d62;font-size:14px;font-weight:bold;"
  );

});
// ===============================
// CONTACT MESSAGE SUBMIT
// ===============================
const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

if (contactForm && contactStatus) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    contactStatus.textContent = "Sending message...";
    contactStatus.style.color = "#555";

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzxgr2tGSjN7Omo3LLu6bB9eHOhH_0LcfZbU3q5Ml_LHlZjGNlTjwgfd01YpJ2FRpkh/exec",
        {
          method: "POST",
          body: formData
        }
      );

      const result = await response.json();

      if (result.success) {
        contactStatus.textContent =
          "✅ Message sent successfully. We will contact you soon.";
        contactStatus.style.color = "green";
        contactForm.reset();
      } else {
        throw new Error("Failed");
      }

    } catch (err) {
      contactStatus.textContent =
        "❌ Unable to send message. Please call the school.";
      contactStatus.style.color = "red";
    }
  });
}
const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");
let index = 0;

setInterval(() => {
  slides[index].classList.remove("active");
  dots[index].classList.remove("active");

  index = (index + 1) % slides.length;

  slides[index].classList.add("active");
  dots[index].classList.add("active");
}, 5000);