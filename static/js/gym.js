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