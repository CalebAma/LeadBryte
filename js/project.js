import { db, collection, addDoc, serverTimestamp } from './firebase-config.js';

// Project Form Handling
const projectForm = document.getElementById('project-form');
const flashMessage = document.getElementById('flash-message');
const submitBtn = projectForm?.querySelector('button[type="submit"]');

if (projectForm) {
    projectForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(projectForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const budget = formData.get('budget');
        const timeline = formData.get('timeline');
        const description = formData.get('description');
        
        // Get selected services (multiple checkboxes)
        const services = [];
        projectForm.querySelectorAll('input[name="service"]:checked').forEach(cb => {
            services.push(cb.value);
        });

        // Set loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending...</span>
            `;
        }

        try {
            // Save to Firestore
            await addDoc(collection(db, "project_requests"), {
                name,
                email,
                company,
                services,
                budget,
                timeline,
                description,
                createdAt: serverTimestamp()
            });

            console.log('Project request saved to Firebase');

            // Show success message
            flashMessage.classList.remove('opacity-0', 'translate-y-24');
            flashMessage.classList.add('opacity-100', 'translate-y-0');

            // Reset form
            projectForm.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                flashMessage.classList.remove('opacity-100', 'translate-y-0');
                flashMessage.classList.add('opacity-0', 'translate-y-24');
            }, 5000);

        } catch (error) {
            console.error('Error saving to Firebase:', error);
            alert('There was an error submitting your request. Please try again.');
        } finally {
            // Reset button state
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `
                    <span>Submit Request</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                `;
            }
        }
    });
}

