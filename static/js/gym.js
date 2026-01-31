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

// 2. Dërgimi i Formës (Versioni për Netlify)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            // Ne nuk përdorim e.preventDefault() këtu që Netlify ta kapë dërgimin
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.disabled = true; 
            submitBtn.innerText = "Duke u dërguar...";
            
            // Forma do të dërgohet automatikisht te Netlify
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
        text: 'Arritni fizikun që keni ëndërruar gjithmonë. Ambienti ynë ofron atmosferën perfekte për disiplinë dhe rritje maksimale, i pajisur me teknologjinë më të fundit për izolimin e muskujve.',
        points: ['Hapësirë e dedikuar për pesha të lira deri në 150kg', 'Makineri profesionale të markave Panatta dhe Hammer Strength', 'Konsulta falas për suplementet dhe proteinat' , 'Ambient i monitoruar për siguri maksimale gjatë stërvitjes']
    },
    'cross': {
        title: 'Crossfit',
        text: 'Një Sfidoni veten në një sport që kombinon forcën dhe qëndrueshmërinë. Programet tona të Crossfit janë të dizajnuara për të rritur performancën tuaj atletike në kohë rekord. që kombinon forcën, gjimnastikën dhe qëndrueshmërinë kardiovaskulare.',
        points: ['Plan ushqimor i personalizuar bazuar në metabolizmin tuaj.', 'Klasa në grup me energji të lartë dhe muzikë motivuese', 'Trajnerë të certifikuar që korrigjojnë teknikën në çdo lëvizje.' ,'Komunitet motivues']
    },
    'personal': {
        title: 'Trajnim Personal',
        text: 'Nuk ka rrugë të shkurtra, por ka rrugë më të zgjuara. Me një trajner personal, ju eliminoni hamendësimet dhe fokusoheni 100% te rezultatet që dëshironi të arrini.',
        points: ['Plan ushqimor i personalizuar bazuar në metabolizmin tuaj.', 'Program stërvitor unik për qëllimet tuaja (rënie në peshë ose rritje mase).', 'Fleksibilitet me oraret sipas nevojave tuaja ditore.']
    }
};

function openModal(type) {
    const data = serviceDetails[type];
    const modal = document.getElementById('serviceModal');
    
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalText').innerText = data.text;
    
    let listHTML = '';
    data.points.forEach(point => listHTML += `<li>✅ ${point}</li>`);
// regjistrohu tani te shkoj te kontankti 
    listHTML += `<br><a href="#contact" onclick="closeModal()" class="btn-regjistro-modal">REGJISTROHU TANI</a>`;
    document.getElementById('modalList').innerHTML = listHTML;
    
    modal.style.display = 'flex';
    
    // Vonesë 10ms që animacioni të fillojë pasi të shfaqet dritarja
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('active');
    
    // Prisni sa të mbarojë animacioni para se ta fshihni plotësisht
    setTimeout(() => {
        modal.style.display = 'none';
    }, 400);
}

window.onclick = function(event) {
    const modal = document.getElementById('serviceModal');
    if (event.target == modal) {
        closeModal();
    }
}