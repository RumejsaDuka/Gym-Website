// 1. Menaxhimi i Navbarit (Scroll)
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.padding = '10px 0';
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        nav.style.padding = '20px 0';
        nav.style.background = 'rgba(0, 0, 0, 0.8)';
    }
});

// 2. Dërgimi i Formës me AJAX (Që të mos largohet nga faqja)
document.addEventListener('DOMContentLoaded', function() {
    // Kapim të gjitha format që kanë Netlify-true
    const forms = document.querySelectorAll('form[data-netlify="true"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const myForm = e.target;
            const formData = new FormData(myForm);
            const submitBtn = myForm.querySelector('button[type="submit"]');
            
            submitBtn.disabled = true;
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Duke u dërguar...";

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
            .then(() => {
                // Kontrollo nëse është forma e regjistrimit në modal
                if (myForm.id === 'gymForm') {
                    // Fsheh formën
                    document.getElementById('registrationForm').style.display = 'none';
                    // Shfaq mesazhin e konfirmimit
                    document.getElementById('confirmationMessage').style.display = 'block';
                    
                    // Mbyll modalin automatikisht pas 5 sekondash
                    setTimeout(() => {
                        const modalElement = document.getElementById('planModal');
                        if (modalElement) {
                            const modal = bootstrap.Modal.getInstance(modalElement);
                            if (modal) modal.hide();
                            
                            // Reset modal pas mbylljes
                            setTimeout(() => {
                                document.getElementById('registrationForm').style.display = 'block';
                                document.getElementById('confirmationMessage').style.display = 'none';
                                myForm.reset();
                            }, 500);
                        }
                    }, 5000);
                } else {
                    // Për format e tjera (si forma e kontaktit)
                    alert("Mesazhi u dërgua me sukses! Do të kontaktohemi me ju së shpejti.");
                    myForm.reset();
                }
            })
            .catch((error) => alert("Gabim: " + error))
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
            });
        });
    });
    
    // Reset modal kur mbyllet
    const planModal = document.getElementById('planModal');
    if (planModal) {
        planModal.addEventListener('hidden.bs.modal', function () {
            document.getElementById('registrationForm').style.display = 'block';
            document.getElementById('confirmationMessage').style.display = 'none';
            document.getElementById('gymForm').reset();
        });
    }
});

// 3. Përditësimi i Paketës së zgjedhur
function updatePlanName(planName) {
    const planText = document.getElementById('selectedPlanText');
    const planInput = document.getElementById('hiddenPlanInput');
    
    if (planText) planText.innerText = "Ju po zgjidhni paketën: " + planName;
    if (planInput) planInput.value = planName; 
}

// 4. Detajet e Shërbimeve (Modal)
const serviceDetails = {
    'body': {
        title: 'Bodybuilding',
        text: 'Arritni fizikun që keni ëndërruar gjithmonë. Ambienti ynë ofron atmosferën perfekte për disiplinë dhe rritje maksimale.',
        points: ['Hapësirë e dedikuar për pesha të lira', 'Makineri profesionale Panatta', 'Konsulta falas për suplementet']
    },
    'cross': {
        title: 'Crossfit',
        text: 'Sfidoni veten në një sport që kombinon forcën dhe qëndrueshmërinë.',
        points: ['Plan ushqimor i personalizuar', 'Klasa në grup me energji të lartë', 'Trajnerë të certifikuar']
    },
    'personal': {
        title: 'Trajnim Personal',
        text: 'Me një trajner personal, ju eliminoni hamendësimet dhe fokusoheni 100% te rezultatet.',
        points: ['Program unik stërvitor', 'Ndjekje rigoroze e progresit', 'Fleksibilitet me oraret']
    }
};

function openModal(type) {
    const data = serviceDetails[type];
    const modal = document.getElementById('serviceModal');
    
    if (!modal) return; // Nëse nuk ekziston modali, mos vazhdo
    
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalText').innerText = data.text;
    
    let listHTML = '';
    data.points.forEach(point => listHTML += `<li>✅ ${point}</li>`);
    listHTML += `<br><a href="#contact" onclick="closeModal()" class="btn-regjistro-modal">REGJISTROHU TANI</a>`;
    document.getElementById('modalList').innerHTML = listHTML;
    
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('active'); }, 10);
}

function closeModal() {
    const modal = document.getElementById('serviceModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 400);
}

window.onclick = function(event) {
    const modal = document.getElementById('serviceModal');
    if (modal && event.target == modal) closeModal();
}