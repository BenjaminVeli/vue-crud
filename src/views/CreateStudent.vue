<script setup>
import { reactive, ref, onMounted } from 'vue';
import { postStudent } from '../api/students';  // Asegúrate de tener getGrades implementado
import { getGrades } from '../api/grades';


// Estado reactivo para los campos del estudiante
const student = reactive({
    name: '',
    email: '',
    phone: '',
    language: '',
    grade_id: ''
});

// Estado para manejar los grados obtenidos
const grades = ref([]);

// Estados de éxito y error
const success = ref(false);
const error = ref(null);

// Función para obtener los grados
const fetchGrades = async () => {
    try {
        const response = await getGrades();
        grades.value = response;  // Asume que la respuesta es un arreglo de grados
        console.log('Grados obtenidos:', grades.value);
    } catch (err) {
        console.error('Error obteniendo grados:', err);
        error.value = 'Error al obtener los grados';
    }
};

// Función para crear un estudiante
const createStudent = async () => {
    try {
        const response = await postStudent(student);  // Pasa el objeto completo del estudiante
        success.value = true;
        error.value = null;
        console.log('Estudiante creado:', response);

        // Espera 1 segundo antes de redirigir
        setTimeout(() => {
            // Redirigir a la ruta principal
            useRouter().push('/');
        }, 1000); // 1000 ms = 1 segundo

    } catch (err) {
        success.value = false;
        error.value = 'Error al crear el estudiante.';
        console.error('Error creando estudiante:', err);
    }
};

// Cargar grados cuando el componente se monte
onMounted(fetchGrades);
</script>

<template>
    <div class="container">
        <h1>Crear un Estudiante</h1>

        <form @submit.prevent="createStudent">
            <div class="form-group">
                <label for="name">Nombre</label>
                <input type="text" v-model="student.name" id="name" required />
            </div>
            <div class="form-group">
                <label for="email">Correo</label>
                <input type="email" v-model="student.email" id="email" required />
            </div>
            <div class="form-group">
                <label for="phone">Teléfono</label>
                <input type="text" v-model="student.phone" id="phone" required />
            </div>
            <div class="form-group">
                <label for="language">Idioma</label>
                <select v-model="student.language" id="language" required>
                    <option value="English">Inglés</option>
                    <option value="Spanish">Español</option>
                    <option value="French">Francés</option>
                </select>
            </div>
            <div class="form-group">
                <label for="grade_id">Grado</label>
                <select v-model="student.grade_id" id="grade_id" required>
                    <option value="" disabled>Seleccione un grado</option>
                    <option v-for="grade in grades" :key="grade.id" :value="grade.id">
                        {{ grade.level }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <button type="submit" class="button1">Crear Estudiante</button>
                <router-link to="/" class="button-link2">Lista de Estudiantes</router-link>
            </div>
        </form>

        <div v-if="error" class="error">
            <p>{{ error }}</p>
        </div>
        <div v-if="success" class="success">
            <p>Estudiante creado con éxito!</p>
        </div>
    </div>
</template>

<style scoped>

.button1{
    margin-right: 10px;
}

.button-link2{
    padding: 12px 12px;
    background: black;
    width: 200px;
    border-radius: 4px;
}

.container {
    width: 400px;
    margin: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    color: #0612bd;
}

form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 20px;
}

label {
    font-size: 14px;
    color: #555;
    margin-bottom: 5px;
    display: block;
}

input,
select {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
}

input:focus,
select:focus {
    border-color: #4CAF50;
    outline: none;
}

button {
    padding: 12px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}

button:disabled {
    background-color: #ccc;
}

.error {
    margin-top: 20px;
    color: red;
    font-size: 14px;
}

.success {
    margin-top: 20px;
    color: green;
    font-size: 14px;
}
</style>
