document.addEventListener("DOMContentLoaded", () => {
  // 1. Navbar Scroll Effect
  const nav = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled", "shadow");
      nav.style.background = "rgba(0, 0, 0, 0.95)";
    } else {
      nav.classList.remove("scrolled", "shadow");
      nav.style.background = "black";
    }
  });

  // 2. Trajtimi i Formave (Netlify AJAX) - Versioni i Bashkuar
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const currentForm = this;

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
        .then(() => {
          // RASTI 1: Forma e Kontaktit
          if (
            currentForm.id === "contactForm" ||
            currentForm.name === "contact-general"
          ) {
            const formContent = document.getElementById("contactFormContent"); // Përmbajtja e formës
            const successDiv = document.getElementById(
              "contactConfirmationMessage",
            );

            // Tranzicioni: Fsheh përmbajtjen e formës, shfaq suksesin
            formContent.style.display = "none";
            successDiv.style.display = "block";
            successDiv.classList.add("fade-in");

            // AUTO-RESET: Pas 5 sekondash kthehet siç ishte
            setTimeout(() => {
              successDiv.classList.add("fade-out");

              setTimeout(() => {
                successDiv.style.display = "none";
                successDiv.classList.remove("fade-out", "fade-in");

                currentForm.reset(); // Pastron fushat

                // Shfaq prapë formën
                formContent.style.display = "block";
                formContent.classList.add("fade-in");

                // Hiq klasën e animacionit pas pak që të mund të përsëritet
                setTimeout(() => formContent.classList.remove("fade-in"), 800);
              }, 800);
            }, 5000);
          }

          // RASTI 2: Forma e Regjistrimit (Modal)
          else if (
            currentForm.id === "gymForm" ||
            currentForm.name === "regjistrim-palestra"
          ) {
            const regFormDiv = document.getElementById("registrationForm");
            const confMsgDiv = document.getElementById("confirmationMessage");

            if (regFormDiv) regFormDiv.style.display = "none";
            if (confMsgDiv) confMsgDiv.style.display = "block";
          }
        })
        .catch((error) => {
          console.error("Gabim:", error);
          alert("Pati një problem me dërgimin. Provoni përsëri.");
        });
    });
  });
});

// 3. Modal për Shërbimet
const serviceDetails = {
  body: {
    title: "Bodybuilding",
    text: "Transformo fizikun tënd me pajisjet më moderne në treg.",
    points: [
      "Pajisje Hammer Strength",
      "Zonë e madhe Free Weights",
      "Asistencë teknike",
    ],
  },
  cross: {
    title: "Crossfit",
    text: "Sfidoni limitet e forcës dhe kondicionit.",
    points: [
      "WOD të ndryshme çdo ditë",
      "Trajnerë të certifikuar",
      "Komunitet motivues",
    ],
  },
  personal: {
    title: "Trajnim Personal",
    text: "Arritni qëllimet tuaja 3x më shpejt.",
    points: [
      "Plan ushqimor",
      "Monitorim 1-më-1",
      "Analizë e përbërjes trupore",
    ],
  },
};

function openModal(type) {
  const modal = document.getElementById("serviceModal");
  const data = serviceDetails[type];

  if (!data || !modal) return;

  document.getElementById("modalTitle").innerText = data.title;
  document.getElementById("modalText").innerText = data.text;

  let listHTML = "";
  data.points.forEach((p) => {
    listHTML += `<li><i class="bi bi-check2-circle text-danger me-2"></i>${p}</li>`;
  });

  document.getElementById("modalList").innerHTML = listHTML;

  modal.style.display = "flex";
  setTimeout(() => {
    modal.classList.add("active");
  }, 10);
}

function closeModal() {
  const modal = document.getElementById("serviceModal");
  if (!modal) return;

  modal.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

// 4. Update Plan Name
function updatePlanName(plan) {
  const text = document.getElementById("selectedPlanText");
  const input = document.getElementById("hiddenPlanInput");

  if (text) text.innerText = "Paketa e zgjedhur: " + plan;
  if (input) input.value = plan;
}
