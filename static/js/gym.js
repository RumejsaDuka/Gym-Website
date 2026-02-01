// 1. Menaxhimi i Navbarit (Scroll)
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    nav.style.padding = "10px 0";
    nav.style.background = "rgba(0, 0, 0, 0.95)";
  } else {
    nav.style.padding = "20px 0";
    nav.style.background = "rgba(0, 0, 0, 0.8)";
  }
});

// 2. Dërgimi i Formës me AJAX (Që të mos largohet nga faqja)
document.addEventListener("DOMContentLoaded", function () {
  // Kapim të gjitha format që kanë Netlify-true
  const forms = document.querySelectorAll('form[data-netlify="true"]');

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const myForm = e.target;
      const formData = new FormData(myForm);
      const submitBtn = myForm.querySelector('button[type="submit"]');
      const successDiv = myForm.querySelector("#confirmationMessage"); // Kërkon div-in brenda kësaj forme

      submitBtn.disabled = true;
      const originalText = submitBtn.innerText;
      submitBtn.innerText = "Duke u dërguar...";

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
        .then(() => {
          // Shfaq mesazhin nëse ekziston
          if (successDiv) {
            successDiv.style.display = "block";
          } else {
            alert("Regjistrimi u krye me sukses!");
          }

          myForm.reset();

          setTimeout(() => {
            if (successDiv) successDiv.style.display = "none";

            // Mbyll modalin nëse forma ishte brenda një materiali modal
            const modalElement = document.getElementById("planModal");
            if (modalElement) {
              const modal = bootstrap.Modal.getInstance(modalElement);
              if (modal) modal.hide();
            }
          }, 3000);
          const registrationForm = document.getElementById("registrationForm");
          const confirmationMessage = document.getElementById(
            "confirmationMessage",
          );

          if (registrationForm && confirmationMessage) {
            registrationForm.style.display = "none";
            confirmationMessage.style.display = "block";
          }
        })
        .catch((error) => alert("Gabim: " + error))
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        });
    });
  });
});

// 3. Përditësimi i Paketës së zgjedhur
function updatePlanName(planName) {
  const planText = document.getElementById("selectedPlanText");
  const planInput = document.getElementById("hiddenPlanInput");

  if (planText) planText.innerText = "Ju po zgjidhni paketën: " + planName;
  if (planInput) planInput.value = planName;
}

// 4. Detajet e Shërbimeve (Modal)
const serviceDetails = {
  body: {
    title: "Bodybuilding",
    text: "Arritni fizikun që keni ëndërruar gjithmonë. Ambienti ynë ofron atmosferën perfekte për disiplinë dhe rritje maksimale.",
    points: [
      "Hapësirë e dedikuar për pesha të lira",
      "Makineri profesionale Panatta",
      "Konsulta falas për suplementet",
    ],
  },
  cross: {
    title: "Crossfit",
    text: "Sfidoni veten në një sport që kombinon forcën dhe qëndrueshmërinë.",
    points: [
      "Plan ushqimor i personalizuar",
      "Klasa në grup me energji të lartë",
      "Trajnerë të certifikuar",
    ],
  },
  personal: {
    title: "Trajnim Personal",
    text: "Me një trajner personal, ju eliminoni hamendësimet dhe fokusoheni 100% te rezultatet.",
    points: [
      "Program unik stërvitor",
      "Ndjekje rigoroze e progresit",
      "Fleksibilitet me oraret",
    ],
  },
};

function openModal(type) {
  const data = serviceDetails[type];
  const modal = document.getElementById("serviceModal");

  document.getElementById("modalTitle").innerText = data.title;
  document.getElementById("modalText").innerText = data.text;

  let listHTML = "";
  data.points.forEach((point) => (listHTML += `<li>✅ ${point}</li>`));
  listHTML += `<br><a href="#contact" onclick="closeModal()" class="btn-regjistro-modal">REGJISTROHU TANI</a>`;
  document.getElementById("modalList").innerHTML = listHTML;

  modal.style.display = "flex";
  setTimeout(() => {
    modal.classList.add("active");
  }, 10);
}

function closeModal() {
  const modal = document.getElementById("serviceModal");
  modal.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
  }, 400);
}

window.addEventListener("click", function (event) {
  const modal = document.getElementById("serviceModal");
  if (event.target === modal) {
    closeModal();
  }
});
