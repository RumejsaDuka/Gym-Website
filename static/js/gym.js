// 1. Navbar Scroll Effect
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

// 2. Trajtimi i Formave (Netlify AJAX) - Kjo është pjesa e rëndësishme
document.addEventListener("DOMContentLoaded", () => {
    // Gjejmë të gjitha format në faqe
    const forms = document.querySelectorAll('form');

    forms.forEach((form) => {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); // Ndalojmë refresh-in e faqes

            const formData = new FormData(this);

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
            .then(() => {
                // LOGJIKA: Nëse u dërgua me sukses, shohim cila formë ishte

                // RASTI 1: Forma e Kontaktit (në fund të faqes)
                if (this.id === "contactForm" || this.name === "contact-general") {
                    this.style.display = "none"; // Fsheh formën
                    const successDiv = document.getElementById("contactConfirmationMessage");
                    if (successDiv) {
                        successDiv.style.display = "block"; // Shfaq mesazhin e suksesit
                    }
                } 
                // RASTI 2: Forma e Regjistrimit (në modal)
                else if (this.id === "gymForm" || this.name === "regjistrim-palestra") {
                    const regFormDiv = document.getElementById("registrationForm");
                    const confMsgDiv = document.getElementById("confirmationMessage");
                    
                    if (regFormDiv) regFormDiv.style.display = "none"; // Fsheh inputet
                    if (confMsgDiv) confMsgDiv.style.display = "block"; // Shfaq checkmark-un
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
    
    if (!data || !modal) return;

    document.getElementById("modalTitle").innerText = data.title;
    document.getElementById("modalText").innerText = data.text;

    let listHTML = "";
    data.points.forEach(p => {
        listHTML += `<li><i class="bi bi-check2-circle text-danger me-2"></i>${p}</li>`;
    });
    
    document.getElementById("modalList").innerHTML = listHTML;

    modal.style.display = "flex";
    // Pak vonesë për animacionin CSS (fade in)
    setTimeout(() => modal.classList.add("active"), 10);
}

function closeModal() {
    const modal = document.getElementById("serviceModal");
    if (!modal) return;
    
    modal.classList.remove("active");
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}

// 4. Update Plan Name (Për Modalin e Regjistrimit)
function updatePlanName(plan) {
    const text = document.getElementById("selectedPlanText");
    const input = document.getElementById("hiddenPlanInput");
    
    if (text) text.innerText = "Paketa e zgjedhur: " + plan;
    if (input) input.value = plan;
}

