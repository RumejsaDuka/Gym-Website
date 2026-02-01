// 1. Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (!nav) return;

  if (window.scrollY > 50) {
    nav.style.padding = "10px 0";
    nav.style.background = "rgba(0, 0, 0, 0.95)";
  } else {
    nav.style.padding = "20px 0";
    nav.style.background = "rgba(0, 0, 0, 0.8)";
  }
});

// 2. NETLIFY FORMS – AJAX (Contact + Registration)
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll('form[data-netlify="true"]');

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;

      submitBtn.disabled = true;
      submitBtn.innerText = "Duke u dërguar...";

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
        .then(() => {
          // ==========================
          // CONTACT FORM CONFIRMATION
          // ==========================
          if (form.name === "contact-general") {
            const msg = document.getElementById("contactConfirmationMessage");

            form.style.display = "none";
            msg.style.display = "block";
          }

          // ==========================
          // REGISTRATION FORM (MODAL)
          // ==========================
          if (form.name === "regjistrim-palestra") {
            const registrationForm =
              document.getElementById("registrationForm");
            const confirmationMessage = document.getElementById(
              "confirmationMessage",
            );

            if (registrationForm && confirmationMessage) {
              registrationForm.style.display = "none";
              confirmationMessage.style.display = "block";
            }

            form.reset();

            setTimeout(() => {
              const modalElement = document.getElementById("planModal");
              if (modalElement) {
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) modal.hide();
              }

              if (registrationForm && confirmationMessage) {
                registrationForm.style.display = "block";
                confirmationMessage.style.display = "none";
              }
            }, 3500);
          }
        })
        .catch(() => alert("Ndodhi një gabim. Ju lutem provoni përsëri."))
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        });
    });
  });
});

// 3. Paketat
function updatePlanName(planName) {
  const planText = document.getElementById("selectedPlanText");
  const planInput = document.getElementById("hiddenPlanInput");

  if (planText) planText.innerText = "Ju po zgjidhni paketën: " + planName;
  if (planInput) planInput.value = planName;
}

// 4. Service Modal
const serviceDetails = {
  body: {
    title: "Bodybuilding",
    text: "Arritni fizikun që keni ëndërruar gjithmonë.",
    points: [
      "Hapësirë e dedikuar për pesha",
      "Makineri profesionale",
      "Konsulta falas",
    ],
  },
  cross: {
    title: "Crossfit",
    text: "Sfidoni veten çdo ditë.",
    points: [
      "Klasa intensive",
      "Trajnerë të certifikuar",
      "Program i personalizuar",
    ],
  },
  personal: {
    title: "Trajnim Personal",
    text: "Fokus total tek rezultatet.",
    points: ["Program unik", "Ndjekje progresi", "Orar fleksibël"],
  },
};

function openModal(type) {
  const modal = document.getElementById("serviceModal");
  const data = serviceDetails[type];

  document.getElementById("modalTitle").innerText = data.title;
  document.getElementById("modalText").innerText = data.text;

  let listHTML = "";
  data.points.forEach((p) => (listHTML += `<li>✅ ${p}</li>`));
  listHTML += `<br><a href="#contact" onclick="closeModal()" class="btn-regjistro-modal">REGJISTROHU TANI</a>`;
  document.getElementById("modalList").innerHTML = listHTML;

  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("active"), 10);
}

function closeModal() {
  const modal = document.getElementById("serviceModal");
  modal.classList.remove("active");
  setTimeout(() => (modal.style.display = "none"), 300);
}

window.addEventListener("click", (e) => {
  const modal = document.getElementById("serviceModal");
  if (e.target === modal) closeModal();
});
