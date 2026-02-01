// 1. Efekti i Navbarit gjatë Scroll-it
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled", "shadow");
    nav.style.background = "rgba(0, 0, 0, 0.95)";
  } else {
    nav.classList.remove("scrolled", "shadow");
    nav.style.background = "black";
  }
});

// 2. Trajtimi i Formave (Netlify AJAX)
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll('form[data-netlify="true"]');

  forms.forEach((form) => {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;

      submitBtn.disabled = true;
      submitBtn.innerText = "Duke u dërguar...";

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
      .then(() => {
        if (this.name === "contact-general") {
          this.style.display = "none";
          document.getElementById("contactConfirmationMessage").style.display = "block";
        }
        
        if (this.name === "regjistrim-palestra") {
          document.getElementById("registrationForm").style.display = "none";
          document.getElementById("confirmationMessage").style.display = "block";
          this.reset();
        }
      })
      .catch(() => alert("Ndodhi një gabim. Provoni përsëri."))
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
      });
    });
  });
});

// 3. Funksioni për Modal-in e Shërbimeve
const serviceDetails = {
  body: {
    title: "Bodybuilding",
    text: "Transformo fizikun tënd me pajisjet më moderne në treg.",
    points: ["Pajisje Hammer Strength", "Zonë e madhe Free Weights", "Asistencë teknike"]
  },
  cross: {
    title: "Crossfit",
    text: "Sfidoni limitet e forcës dhe kondicionit.",
    points: ["WOD të ndryshme çdo ditë", "Trajnerë të certifikuar", "Komunitet motivues"]
  },
  personal: {
    title: "Trajnim Personal",
    text: "Arritni qëllimet tuaja 3x më shpejt.",
    points: ["Plan ushqimor", "Monitorim 1-më-1", "Analizë e përbërjes trupore"]
  }
};

function openModal(type) {
  const modal = document.getElementById("serviceModal");
  const data = serviceDetails[type];
  if(!data) return;

  document.getElementById("modalTitle").innerText = data.title;
  document.getElementById("modalText").innerText = data.text;
  
  let listHTML = "";
  data.points.forEach(p => listHTML += `<li><i class="bi bi-check2-circle text-danger me-2"></i>${p}</li>`);
  document.getElementById("modalList").innerHTML = listHTML;

  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("active"), 10);
}

function closeModal() {
  const modal = document.getElementById("serviceModal");
  modal.classList.remove("active");
  setTimeout(() => modal.style.display = "none", 300);
}

// 4. Përditësimi i Paketës në Modal-in e Regjistrimit
function updatePlanName(plan) {
    const text = document.getElementById('selectedPlanText');
    const input = document.getElementById('hiddenPlanInput');
    if(text) text.innerText = "Paketa e zgjedhur: " + plan;
    if(input) input.value = plan;
}
// Shto këtë pjesë brenda fetch().then() te gym.js
if (this.name === "contact-general") {
    this.style.display = "none";
    const successDiv = document.getElementById("contactConfirmationMessage");
    successDiv.style.display = "block";
    // Kjo ndez animacionin e checkmark-ut
    successDiv.classList.add("active-animation"); 
}