import { createRouter, createMemoryHistory, createWebHistory } from "vue-router";
import StudentList from "../views/StudentList.vue";
import CreateStudent from "../views/CreateStudent.vue";

const routes = [
    {
        path: '/',
        name: 'StudentList',
        component: StudentList
    },
    {
        path: '/create',
        name: 'CreateStudent',
        component: CreateStudent
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
