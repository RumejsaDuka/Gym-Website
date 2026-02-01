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
    const form = document.getElementById('registrationForm') || document.getElementById('gymForm');
    const successDiv = document.getElementById('successMessage');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const myForm = e.target;
            const formData = new FormData(myForm);
            const submitBtn = myForm.querySelector('button[type="submit"]');
            
            submitBtn.disabled = true;
            submitBtn.innerText = "Duke u dërguar...";

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
            .then(() => {
                // 1. Shfaq mesazhin e bukur jeshil
                if (successDiv) {
                    successDiv.style.display = 'block';
                }

                // 2. Pastro formën
                myForm.reset();

                // 3. Pas 4 sekondash, fshih mesazhin dhe mbyll dritaren
                setTimeout(() => {
                    if (successDiv) successDiv.style.display = 'none';
                    
                    const modalElement = document.getElementById('planModal');
                    if (modalElement) {
                        const modal = bootstrap.Modal.getInstance(modalElement);
                        if (modal) modal.hide();
                    }
                }, 4000);
            })
            .catch((error) => {
                alert("Gabim: " + error);
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerText = "DËRGO KËRKESËN";
            });
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
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 400);
}

window.onclick = function(event) {
    const modal = document.getElementById('serviceModal');
    if (event.target == modal) closeModal();
}