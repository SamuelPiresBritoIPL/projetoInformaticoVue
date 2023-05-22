<template>
  <nav class="navbar navbar-expand-xl">
    <div class="container-fluid">
      <!-- <a class="navbar-brand">{{ counterStore.utilizadorLogado.nome ? counterStore.utilizadorLogado.nome.replace(/([a-z]+) .* ([a-z]+)/i, "$1 $2") : " " }} ({{ counterStore.utilizadorLogado.login }})</a> -->
      <a class="navbar-brand">{{
        counterStore.utilizadorLogado.nome
          ? counterStore.utilizadorLogado.nome.replace(
              /([a-z]+) .* ([a-z]+)/i,
              "$1 $2"
            )
          : " "
      }}</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul
          class="navbar-nav nav-underline me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 150px"
        >
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $route.name === 'paginainicial' }"
              :to="{ name: 'paginainicial' }"
              ><i class="align-baseline bi bi-display"></i> Página
              Inicial</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $route.name === 'confirmacaoucs' }"
              :to="{ name: 'confirmacaoucs' }"
              ><i class="align-baseline bi bi-ui-checks"></i> Inscrições
              UC's</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $route.name === 'inscricaoturnos' }"
              :to="{ name: 'inscricaoturnos' }"
              ><i class="align-baseline bi bi-calendar-week-fill"></i>
              Inscrições Turnos</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $route.name === 'sobre' }"
              :to="{ name: 'sobre' }"
              ><i class="align-baseline bi bi-info-lg"></i> Sobre
            </router-link>
          </li>
        </ul>
        <div class="d-flex justify form">
          <button
            class="mx-1 btn btn-secondary"
            type="button"
            @click="logout()"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>

  <router-view></router-view>
</template>

<script>
import { useCounterStore } from "../../stores/counter";
export default {
  name: "AlunoRoot",
  component: {},
  setup() {
    const counterStore = useCounterStore();
    return { counterStore };
  },
  data() {
    return {
      utilizadorLogado: [],
    };
  },
  methods: {
    logout() {
      sessionStorage.removeItem("tokenAluno");
      localStorage.removeItem("alunoState");
      this.$router.push("/login");
    },
    getAnosLetivos() {
      this.$axios
        .get("anoletivo")
        .then((response) => {
          this.anosLetivos = response.data;
          this.anosLetivos.forEach((anoLetivo) => {
            if (anoLetivo.ativo == 1) {
              this.counterStore.selectedAnoletivo = anoLetivo.id;
              this.counterStore.ano = anoLetivo.anoletivo;
              if (anoLetivo.semestreativo != null) {
                this.counterStore.semestre = anoLetivo.semestreativo;
              }
            }
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    getInfoUtilizadorLogado() {
      this.$axios
        .get("utilizadorlogado")
        .then((response) => {
          this.counterStore.utilizadorLogado = response.data.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
  mounted() {
    this.getAnosLetivos();
    this.getInfoUtilizadorLogado();
  },
};
</script>

<style scoped>
/* .mx-auto {
	margin-left: 0px !important;
} */
</style>
