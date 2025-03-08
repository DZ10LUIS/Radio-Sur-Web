// Configuración de Firebase (reemplaza con tu configuración)
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

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Obtiene una referencia a la base de datos
const database = firebase.database();

// Obtiene una referencia al número de WhatsApp
const whatsappNumberRef = database.ref('LinkWpp');

// Lee el número de WhatsApp desde la base de datos
whatsappNumberRef.on('value', (snapshot) => {
    const whatsappNumber = snapshot.val();
    if (whatsappNumber) {
        // Actualiza el enlace de WhatsApp en el HTML
        const whatsappLink = document.querySelector('.title6 a[href^="https://wa.me/"]');
        if (whatsappLink) {
            whatsappLink.href = `https://wa.me/${whatsappNumber}`;
        }
    } else {
        console.error('No se encontró el número de WhatsApp en la base de datos.');
    }
});