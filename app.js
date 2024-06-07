document.addEventListener('DOMContentLoaded', () => {
    const personaList = document.getElementById('persona-list');
    const personaForm = document.getElementById('persona-form');
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const direccionInput = document.getElementById('direccion');
    const telefonoInput = document.getElementById('telefono');

    // Function to fetch and display personas
    const fetchPersonas = async () => {
        try {
            const response = await fetch('http://localhost:8080/persona/api/v1/all');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const personas = await response.json();
            personaList.innerHTML = '';
            personas.forEach(persona => {
                const li = document.createElement('li');
                li.textContent = `${persona.nombre} ${persona.apellido}, ${persona.direccion}, ${persona.telefono}`;
                personaList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching personas:', error);
        }
    };

    // Function to save a new persona
    const savePersona = async (event) => {
        event.preventDefault();
        const nombre = nombreInput.value.trim();
        const apellido = apellidoInput.value.trim();
        const direccion = direccionInput.value.trim();
        const telefono = telefonoInput.value.trim();
        if (!nombre || !apellido || !direccion || !telefono) return;

        try {
            const response = await fetch('http://localhost:8080/persona/api/v1/save/null', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, apellido, direccion, telefono })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            nombreInput.value = '';
            apellidoInput.value = '';
            direccionInput.value = '';
            telefonoInput.value = '';
            fetchPersonas();
        } catch (error) {
            console.error('Error saving persona:', error);
        }
    };

    // Initial fetch
    fetchPersonas();

    // Event listener for the form submission
    personaForm.addEventListener('submit', savePersona);
});
