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

// 2. Efekti Fade In për elementet
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("Butoni u shtyp!"); // Kjo do të vërtetojë nëse punon
            
            let formData = new FormData(this);
            fetch('/regjistro', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                this.reset();
            })
            .catch(err => console.error(err));
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

// 4. Dërgimi i Formës me AJAX (Fetch)
const regForm = document.getElementById('registrationForm');
if (regForm) {
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true; // Çaktivizon butonin që të mos shtypet përsëri

    let formData = new FormData(this);

    fetch('/regjistro', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        submitBtn.disabled = false; // E aktivizon përsëri pas përgjigjes
        this.reset();
    })
    .catch(error => {
        submitBtn.disabled = false;
        console.error('Gabim:', error);
    });
});
}

const serviceDetails = {
    'body': {
        title: 'Bodybuilding',
        text: 'Programi ynë i bodybuilding është krijuar për ata që duan rezultate maksimale në rritjen e masës muskulore.',
        points: ['Pajisje moderne Hammer Strength', 'Instruktorë kampionë', 'Plane specifike ushqimore']
    },
    'cross': {
        title: 'Crossfit',
        text: 'Një disiplinë që kombinon forcën, gjimnastikën dhe qëndrueshmërinë kardiovaskulare.',
        points: ['Klasa në grup çdo orë', 'Trajnerë të certifikuar', 'Komunitet motivues']
    },
    'personal': {
        title: 'Trajnim Personal',
        text: 'Nëse kërkoni vëmendje 1-me-1 dhe një plan fiks për trupin tuaj.',
        points: ['Vlerësim fillestar i trupit', 'Monitorim 24/7', 'Arritje e qëllimeve 2x më shpejt']
    }
};

function openModal(type) {
    const data = serviceDetails[type];
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalText').innerText = data.text;
    
    let listHTML = '';
    data.points.forEach(point => listHTML += `<li>✅ ${point}</li>`);
    document.getElementById('modalList').innerHTML = listHTML;
    
    document.getElementById('serviceModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('serviceModal').style.display = 'none';
}