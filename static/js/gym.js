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
          if (
            currentForm.id === "contactForm" ||
            currentForm.name === "contact-general"
          ) {
            const formContent = document.getElementById("contactFormContent");
            const successDiv = document.getElementById(
              "contactConfirmationMessage",
            );

            // Fsheh përmbajtjen e formës (por mban hapësirën që harta të mos lëvizë)
            formContent.style.opacity = "0";
            formContent.style.pointerEvents = "none";

            // Shfaq mesazhin e suksesit
            successDiv.style.display = "block";
            successDiv.classList.add("fade-in");

            setTimeout(() => {
              successDiv.classList.replace("fade-in", "fade-out");

              setTimeout(() => {
                successDiv.style.display = "none";
                successDiv.classList.remove("fade-out");

                currentForm.reset();
                formContent.style.opacity = "1";
                formContent.style.pointerEvents = "all";
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
  const data = serviceDetails[type];
  if (!data) return;

  // Mbushim titullin dhe tekstin
  document.getElementById("modalTitle").innerText = data.title;
  document.getElementById("modalText").innerText = data.text;

  // Mbushim listën me pikat
  let listHTML = "";
  data.points.forEach((p) => {
    listHTML += `<li class="mb-2"><i class="bi bi-check2-circle text-danger me-2"></i>${p}</li>`;
  });
  document.getElementById("modalList").innerHTML = listHTML;
}

function closeModal() {
  const modal = document.getElementById("serviceModal");
  if (!modal) return;

  modal.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}
// Mbyllja e modal-it kur klikohet jashtë kutisë (në background)
window.onclick = function(event) {
    const modal = document.getElementById("serviceModal");
    if (event.target === modal) {
        closeModal();
    }
};

// 4. Update Plan Name
function updatePlanName(plan) {
  const text = document.getElementById("selectedPlanText");
  const input = document.getElementById("hiddenPlanInput");

  if (text) text.innerText = "Paketa e zgjedhur: " + plan;
  if (input) input.value = plan;
}
