import { createRouter, createWebHistory } from 'vue-router'
import AdminRoot from '../components/admin/adminroot.vue'
import Dashboard from '../components/admin/dashboard.vue'
import GerirAlunos from '../components/admin/geriralunos.vue'
import GerirCoordenadores from '../components/admin/gerircoordenadores.vue'
import GerirCursos from '../components/admin/gerircursos.vue'
import AtualizarDados from '../components/admin/atualizardados.vue'
import GerirConfirmacoes from '../components/admin/gerirconfirmacoes.vue'
import GerirPeriodos from '../components/admin/gerirperiodos.vue'
import Logs from '../components/admin/logs.vue'
import CoordenadorRoot from '../components/coordenador/coordenadorroot.vue'
import ProfessorRoot from '../components/professor/professorroot.vue'
import DashboardProfessor from '../components/professor/dashboardprofessor.vue'
import VerCadeiras from '../components/professor/vercadeiras.vue'
import GerirCadeira from '../components/admin/gerircadeira.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'adminroot',
      component: AdminRoot,
      redirect: {
        name: "dashboard",
      },
      children: [
        {
          path: " ",
          name: "dashboard",
          component: Dashboard,
          meta: { title: "Dashboard" },
        },
        {
          path: "geriralunos",
          name: "geriralunos",
          component: GerirAlunos,
          meta: { title: "Gerir Alunos" },
        },
        {
          path: "gerircoordenadores",
          name: "gerircoordenadores",
          component: GerirCoordenadores,
          meta: { title: "Gerir Coordenadores" },
        },
        {
          path: "gerircursos",
          name: "gerircursos",
          component: GerirCursos,
          meta: { title: "Gerir Cursos" },
        },
        {
          path: "atualizardados",
          name: "atualizardados",
          component: AtualizarDados,
          meta: { title: "Atualizar Base de Dados" },
        },
        {
          path: "gerirconfirmacoes",
          name: "gerirconfirmacoes",
          component: GerirConfirmacoes,
          meta: { title: "Gerir Confirmações" },
        },
        {
          path: "gerirperiodos",
          name: "gerirperiodos",
          component: GerirPeriodos,
          meta: { title: "Gerir Cursos" },
        },
        {
          path: "gerircadeira",
          name: "gerircadeira",
          component: GerirCadeira,
          meta: { title: "Gerir Cadeira" },
        },
        {
          path: "logs",
          name: "logs",
          component: Logs,
          meta: { title: "Logs" },
        },
      ],
    },
    {
      path: '/coordenador',
      name: 'coordenadorroot',
      component: CoordenadorRoot,
      redirect: {
        name: "dashboardC",
      },
      children: [
        {
          path: " ",
          name: "dashboardC",
          component: Dashboard,
          meta: { title: "Dashboard" },
        },
        {
          path: "geriralunos",
          name: "geriralunosC",
          component: GerirAlunos,
          meta: { title: "Gerir Alunos" },
        },
        {
          path: "gerircoordenadores",
          name: "gerircoordenadoresC",
          component: GerirCoordenadores,
          meta: { title: "Gerir Coordenadores" },
        },
        {
          path: "gerircursos",
          name: "gerircursosC",
          component: GerirCursos,
          meta: { title: "Gerir Cursos" },
        },
        {
          path: "gerirconfirmacoes",
          name: "gerirconfirmacoesC",
          component: GerirConfirmacoes,
          meta: { title: "Gerir Confirmações" },
        },
        {
          path: "gerirperiodos",
          name: "gerirperiodosC",
          component: GerirPeriodos,
          meta: { title: "Gerir Cursos" },
        },
      ],
    },
    {
      path: '/professor',
      name: 'professor',
      component: ProfessorRoot,
      redirect: {
        name: "dashboardprofessor",
      },
      children: [
        {
          path: " ",
          name: "dashboardprofessor",
          component: DashboardProfessor,
          meta: { title: "Dashboard" },
        },
        {
          path: "vercadeiras",
          name: "vercadeiras",
          component: VerCadeiras,
          meta: { title: "Cadeiras" },
        },
      ],
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

router.beforeEach((to, from, next) => {
  next();
});

export default router
