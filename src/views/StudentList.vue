<script setup>
import { ref, onMounted } from 'vue';
import { getStudents, deleteStudent } from '../api/students';

const students = ref([]);

onMounted(() => {
  getStudents()
    .then(data => {
      students.value = data;
    })
    .catch(error => {
      console.error('No se pudieron cargar los estudiantes:', error);
    });
});

// Función para eliminar estudiante
const handleDelete = (studentId) => {
  deleteStudent({ id: studentId }) // Pasamos el id del estudiante a eliminar
    .then(() => {
      // Actualizamos la lista de estudiantes eliminando el estudiante eliminado
      students.value = students.value.filter(student => student.id !== studentId);
      console.log(`Estudiante con id ${studentId} eliminado con éxito`);
    })
    .catch(error => {
      console.error('Error al eliminar el estudiante:', error);
    });
};
</script>

<template>
  <div class="container">
    <h1>Lista de Estudiantes</h1>
    <table class="student-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.id }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.email }}</td>
          <td>
            <button @click="editStudent(student.id)">Editar</button>
            <button @click="handleDelete(student.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link to="/create" class="button-link">Crear un Estudiante</router-link>
  </div>
</template>

<style scoped>
.button-link {
  padding: 10px 20px 10px 20px;
  background: white;
}

.container {
  max-width: 1900px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
  color: #1f3eca;
}

.student-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  margin-bottom: 40px;
}

.student-table th,
.student-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.student-table th {
  background-color: #ffffff;
  color: #555;
}



button {
  background-color: #4CAF50;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #45a049;
}

button:last-child {
  background-color: #f44336;
}

button:last-child:hover {
  background-color: #e53935;
}
</style>
