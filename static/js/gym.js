function updatePlanName(plan) {
    document.getElementById('selectedPlanText').innerText = "Paketa: " + plan;
    document.getElementById('hiddenPlanInput').value = plan;
}

// Funksioni për të kthyer formën e kontaktit në gjendje fillestare
function resetContactForm() {
    document.getElementById('contactConfirmation').style.display = 'none';
    document.getElementById('contactForm').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    const allForms = document.querySelectorAll('form[data-netlify="true"]');
    
    allForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const myForm = e.target;
            const formData = new FormData(myForm);
            const submitBtn = myForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.disabled = true;
            submitBtn.innerText = "Duke u dërguar...";

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
            .then(() => {
                if (myForm.getAttribute('name') === 'contact-general') {
                    // Shfaq suksesin te seksioni Contact
                    document.getElementById('contactForm').style.display = 'none';
                    document.getElementById('contactConfirmation').style.display = 'block';
                } else {
                    // Shfaq suksesin brenda Modalit të Paketave
                    document.getElementById('registrationFormContainer').style.display = 'none';
                    document.getElementById('modalSuccessVisual').style.display = 'block';
                    
                    // Mbylle modalin automatikisht pas 5 sekondash
                    setTimeout(() => {
                        const modalElement = document.getElementById('planModal');
                        const modal = bootstrap.Modal.getInstance(modalElement);
                        if (modal) modal.hide();
                        
                        // Reseto modalin që të jetë gati për herën tjetër
                        setTimeout(() => {
                            document.getElementById('registrationFormContainer').style.display = 'block';
                            document.getElementById('modalSuccessVisual').style.display = 'none';
                        }, 500);
                    }, 5000);
                }
                myForm.reset();
            })
            .catch((error) => alert("Gabim gjatë dërgimit: " + error))
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
            });
        });
    });
});