function submitForm() {
    // Datos
    const formData = new FormData(document.getElementById('profileForm'));

    // Valido las 3 habilidades
    const skills = formData.getAll('skills');
    if (skills.length > 3) {
        alert('Por favor, selecciona un máximo de 3 habilidades.');
        return;
    }

    // Leer la imagen y convertirla a Base64
    const photoFile = formData.get('photo');
    const reader = new FileReader();
    reader.onloadend = function () {
        const photoBase64 = reader.result;

        const profile = {
            fullName: formData.get('fullName'),
            profession: formData.get('profession'),
            photo: photoBase64,
            phone: formData.get('phone'),
            email: formData.get('email'),
            linkedin: formData.get('linkedin'),
            github: formData.get('github'),
            skills: skills
        };

        displayProfile(profile);
    };
    reader.readAsDataURL(photoFile);
}

function displayProfile(profile) {
    const profileDisplay = document.getElementById('profileDisplay');
    profileDisplay.innerHTML = `
        <div>
            <img src="${profile.photo}" alt="Profile Photo">
        </div>
        <h2>${profile.fullName}</h2>
        <p>${profile.profession}</p>
        <p>Teléfono: ${profile.phone}</p>
        <p>Email: ${profile.email}</p>
        ${profile.linkedin ? `<p>LinkedIn: <a href="${profile.linkedin}" target="_blank">${profile.linkedin}</a></p>` : ''}
        ${profile.github ? `<p>GitHub: <a href="${profile.github}" target="_blank">${profile.github}</a></p>` : ''}
        <div class="skills">
            ${profile.skills.map(skill => `<span>${skill}</span>`).join('')}
        </div>
    `;
}