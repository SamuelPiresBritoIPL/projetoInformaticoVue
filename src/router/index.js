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
import AlunoRoot from '../components/aluno/alunoroot.vue'
import ConfirmacaoUCs from '../components/aluno/confirmacaoucs.vue'
import InscricaoTurnos from '../components/aluno/inscricaoturnos.vue'
import PaginaInicial from '../components/aluno/paginainicial.vue'
import AdminLogin from '../components/admin/adminlogin.vue'
import CoordenadorLogin from '../components/coordenador/coordenadorlogin.vue'
import AlunoLogin from '../components/aluno/login.vue'
import ProfessorLogin from '../components/professor/professorlogin.vue'
import GerirCadeiraProf from '../components/professor/gerircadeira.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/adminlogin',
      name: 'adminlogin',
      component: AdminLogin,
      meta: { requiresAuth: false, title: "Login - Administrador" },
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("coordenadorState") && sessionStorage.getItem("tokenCoordenador") ||
        localStorage.getItem("professorState") && sessionStorage.getItem("tokenProfessor") ||
        localStorage.getItem("alunoState") && sessionStorage.getItem("tokenAluno")) {
          next({
            name: "not-found",
          });
        } else {
          next();
        }
      },
    },
    {
      path: '/coordenadorlogin',
      name: 'coordenadorlogin',
      component: CoordenadorLogin,
      meta: {requiresAuth: false, title: "Login - Coordenador" },
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("adminState") && sessionStorage.getItem("tokenAdmin") ||
        localStorage.getItem("professorState") && sessionStorage.getItem("tokenProfessor") ||
        localStorage.getItem("alunoState") && sessionStorage.getItem("tokenAluno")) {
          next({
            name: "not-found",
          });
        } else {
          next();
        }
      },
    },
    {
      path: '/login',
      name: 'alunologin',
      component: AlunoLogin,
      meta: { requiresAuth: false, title: "Login" },
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("adminState") && sessionStorage.getItem("tokenAdmin") ||
        localStorage.getItem("professorState") && sessionStorage.getItem("tokenProfessor") ||
        localStorage.getItem("coordenadorState") && sessionStorage.getItem("tokenCoordenador")) {
          next({
            name: "not-found",
          });
        } else {
          next();
        }
      },
    },
    {
      path: '/loginprofessor',
      name: 'professorlogin',
      component: ProfessorLogin,
      meta: { requiresAuth: false, title: "Login" },
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("adminState") && sessionStorage.getItem("tokenAdmin") ||
        localStorage.getItem("alunoState") && sessionStorage.getItem("tokenAluno") ||
        localStorage.getItem("coordenadorState") && sessionStorage.getItem("tokenCoordenador")) {
          next({
            name: "not-found",
          });
        } else {
          next();
        }
      },
    },
    {
      path: '/admin',
      name: 'adminroot',
      component: AdminRoot,
      meta: { requiresAuth: true },
      redirect: {
        name: "dashboard",
      },
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("coordenadorState") && sessionStorage.getItem("tokenCoordenador") ||
        localStorage.getItem("professorState") && sessionStorage.getItem("tokenProfessor") ||
        localStorage.getItem("alunoState") && sessionStorage.getItem("tokenAluno")) {
          next({
            name: "not-found",
          });
        } else {
          next();
        }
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
          path: "gerircadeira/:cadeiraId",
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
      meta: { requiresAuth: true },
      redirect: {
        name: "dashboardC",
      },
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("adminState") && sessionStorage.getItem("tokenAdmin") ||
        localStorage.getItem("professorState") && sessionStorage.getItem("tokenProfessor") ||
        localStorage.getItem("alunoState") && sessionStorage.getItem("tokenAluno")) {
          next({
            name: "not-found",
          });
        } else {
          next();
        }
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
          path: "gerircadeira/:cadeiraId",
          name: "gerircadeiraC",
          component: GerirCadeira,
          meta: { title: "Gerir Cadeira" },
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
      meta: { requiresAuth: true },
      redirect: {
        name: "dashboardprofessor",
      },
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("adminState") && sessionStorage.getItem("tokenAdmin") ||
        localStorage.getItem("alunoState") && sessionStorage.getItem("tokenAluno") ||
        localStorage.getItem("coordenadorState") && sessionStorage.getItem("tokenCoordenador")) {
          next({
            name: "not-found",
          });
        } else {
          next();
        }
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
        {
          path: "gerircadeira/:cadeiraId",
          name: "gerircadeiraprof",
          component: GerirCadeiraProf,
          meta: { title: "Unidade curricular" },
        },
      ],
    },
    {
      path: '/',
      name: 'alunoroot',
      component: AlunoRoot,
      meta: { requiresAuth: true },
      redirect: {
        name: "paginainicial",
      },
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("adminState") && sessionStorage.getItem("tokenAdmin") ||
        localStorage.getItem("professorState") && sessionStorage.getItem("tokenProfessor") ||
        localStorage.getItem("coordenadorState") && sessionStorage.getItem("tokenCoordenador")) {
          next({
            name: "not-found",
          });
        } else {
          next();
        }
      },
      children: [
        {
          path: " ",
          name: "paginainicial",
          component: PaginaInicial,
          meta: { title: "Página Inicial" },
        },
        {
          path: "confirmacaoucs",
          name: "confirmacaoucs",
          component: ConfirmacaoUCs,
          meta: { title: "Confirmação de UCs" },
        },
        {
          path: "inscricaoturnos",
          name: "inscricaoturnos",
          component: InscricaoTurnos,
          meta: { title: "Inscrição nos Turnos" },
        },
      ],
    }
  ]
})

import { useCounterStore } from "../stores/counter"

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if ((!localStorage.getItem("adminState") && !localStorage.getItem("coordenadorState") && !localStorage.getItem("alunoState") && !localStorage.getItem("professorState")) ||
      (!sessionStorage.getItem("tokenAdmin") && !sessionStorage.getItem("tokenCoordenador") && !sessionStorage.getItem("tokenAluno") && !sessionStorage.getItem("tokenProfessor"))) {
      next({
        name: "alunologin",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
