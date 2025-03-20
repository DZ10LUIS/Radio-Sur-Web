// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDB6Shw7TswouQ__wNGwy1fPNetFeDhj7s",
    authDomain: "sur-durango.firebaseapp.com",
    databaseURL: "https://sur-durango-default-rtdb.firebaseio.com",
    projectId: "sur-durango",
    storageBucket: "sur-durango.firebasestorage.app",
    messagingSenderId: "755002495720",
    appId: "1:755002495720:web:6ded3a5b2aa299f6cbef5d",
    measurementId: "G-54QF9V7T8R"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a la base de datos
const database = firebase.database();
const announcementsRef = database.ref('Anuncios');

// Formulario para agregar o modificar anuncios
const form = document.getElementById('announcement-form');
const keyInput = document.getElementById('key');
const contentInput = document.getElementById('content');

// Al enviar el formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const key = keyInput.value.trim();
    const content = contentInput.value.trim();

    if (key && content) {
        announcementsRef.child(key).set(content)
            .then(() => {
                alert('Anuncio guardado correctamente.');
                keyInput.value = '';
                contentInput.value = '';
            })
            .catch((error) => {
                console.error('Error al guardar el anuncio:', error);
            });
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Formulario para editar anuncios
const editForm = document.getElementById('edit-form');
const editKeyInput = document.getElementById('edit-key');
const editContentInput = document.getElementById('edit-content');

// Función para seleccionar un anuncio para editar
function selectAnnouncementForEdit(key, content) {
    editKeyInput.value = key; // Llave seleccionada
    editContentInput.value = content; // Contenido existente
}

// Evento de envío del formulario de edición
editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const key = editKeyInput.value.trim();
    const newContent = editContentInput.value.trim();

    if (key && newContent) {
        announcementsRef.child(key).set(newContent)
            .then(() => {
                alert(`Anuncio "${key}" actualizado correctamente.`);
                editKeyInput.value = '';
                editContentInput.value = '';
            })
            .catch((error) => {
                console.error('Error al actualizar el anuncio:', error);
            });
    } else {
        alert('Por favor, completa todos los campos para guardar los cambios.');
    }
});

// Cargar la lista de anuncios
const announcementsList = document.getElementById('announcements-list');

announcementsRef.on('value', (snapshot) => {
    const announcements = snapshot.val();
    announcementsList.innerHTML = '';

    if (announcements) {
        Object.keys(announcements).forEach((key) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${key}: ${announcements[key]}</span>
                <button onclick="deleteAnnouncement('${key}')">Eliminar</button>
                <button onclick="selectAnnouncementForEdit('${key}', '${announcements[key]}')">Editar</button>
            `;
            announcementsList.appendChild(li);
        });
    }
});

// Eliminar un anuncio
function deleteAnnouncement(key) {
    if (confirm(`¿Estás seguro de que deseas eliminar el anuncio "${key}"?`)) {
        announcementsRef.child(key).remove()
            .then(() => {
                alert('Anuncio eliminado correctamente.');
            })
            .catch((error) => {
                console.error('Error al eliminar el anuncio:', error);
            });
    }
}
// Referencia al formulario de WhatsApp
const whatsappForm = document.getElementById('whatsapp-form');
const whatsappNumberInput = document.getElementById('whatsapp-number');

// Evento de envío para actualizar el número de WhatsApp
whatsappForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newWhatsappNumber = whatsappNumberInput.value.trim();

    if (newWhatsappNumber) {
        const whatsappRef = database.ref('LinkWpp');
        whatsappRef.set(newWhatsappNumber)
            .then(() => {
                alert('Número de WhatsApp actualizado correctamente.');
                whatsappNumberInput.value = ''; // Limpia el campo
            })
            .catch((error) => {
                console.error('Error al actualizar el número de WhatsApp:', error);
            });
    } else {
        alert('Por favor, ingresa un número de WhatsApp válido.');
    }
});
