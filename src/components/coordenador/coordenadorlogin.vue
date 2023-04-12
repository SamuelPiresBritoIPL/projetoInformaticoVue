<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="mt-5 col-12 col-xl-4">
        <div class="card mb-3">
          <div class="card-header bg-transparent text-center">
            <label class="mt-2">
              AGIT - Aplicação de Gestão de Inscrição nos Turnos</label
            >
            <h5>Login - Coordenador</h5>
          </div>
          <div class="card-body">
            <div class="py-2 px-3">
              <div class="mb-3">
                <label for="formGroupExampleInput" class="form-label fw-bold"
                  ><i class="align-baseline bi bi-person"></i> Utilizador</label
                >
                <input
                  @keyup.enter="login()"
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput"
                  placeholder="Nome de Utilizador"
                  v-model="credentials.login"
                />
                <div v-if="hasNullLogin" class="errorMessages mt-1">
                  <small class="badge text-bg-danger text-wrap">{{
                    nullLogin
                  }}</small>
                </div>
              </div>
              <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label fw-bolder"
                  ><i class="align-baseline bi bi-lock"></i> Password</label
                >
                <input
                  @keyup.enter="login()"
                  type="password"
                  class="form-control"
                  id="formGroupExampleInput2"
                  placeholder="Password"
                  v-model="credentials.password"
                />
                <div v-if="hasNullPassword" class="errorMessages mt-1">
                  <small class="badge text-bg-danger text-wrap">{{
                    nullPassword
                  }}</small>
                </div>
                <div v-if="hasError" class="errorMessages mt-1">
                  <small class="badge text-bg-danger text-wrap">{{
                    messageError.message
                  }}</small>
                </div>
              </div>
              <div class="d-grid gap-2">
                <button
                  type="button"
                  class="btn btn-primary mb-1"
                  @click="login()"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCounterStore } from "../../stores/counter";
export default {
  name: "AdminRoot",
  component: {},
  setup() {
    const counterStore = useCounterStore();
    return { counterStore };
  },
  data() {
    return {
      credentials: {
        login: null,
        password: null,
      },
      nullLogin: null,
      nullPassword: null,
      messageError: null,
      amITryingToLogin: false,
    };
  },
  computed: {
    hasError() {
      if (this.messageError != null) {
        if (this.messageError.message) {
          return true;
        }
      }
      return false;
    },
    hasNullLogin() {
      if (this.nullLogin != null) {
        return true;
      }
      return false;
    },
    hasNullPassword() {
      if (this.nullPassword != null) {
        return true;
      }
      return false;
    },
  },
  methods: {
    async login() {
      if (this.amITryingToLogin) {
        return;
      }
      this.amITryingToLogin = true;
      this.nullLogin = null;
      this.nullPassword = null;
      this.messageError = null;
      if (this.credentials.login == null && this.credentials.password == null) {
        this.nullLogin = "Preencha o seu login";
        this.nullPassword = "Preencha a sua password";
        this.$toast.error("Não foi possível fazer login");
        //throw "Error";
        this.amITryingToLogin = false;
        return;
      } else if (
        this.credentials.password == null ||
        this.credentials.password.length < 1
      ) {
        this.nullPassword = "Preencha a sua password";
        this.$toast.error("Não foi possível fazer login");
        //throw "Error";
        this.amITryingToLogin = false;
        return;
      }
      var tipoLogin = 2;
      try {
        await this.counterStore.login(this.credentials, tipoLogin);
        if (this.counterStore.utilizadorLogado.tipo != 2) {
          if (this.counterStore.utilizadorLogado.isCoordenador == 0) {
            sessionStorage.removeItem("tokenAluno");
            localStorage.removeItem("alunoState");
            sessionStorage.removeItem("tokenAdmin");
            localStorage.removeItem("adminState");
            sessionStorage.removeItem("tokenProfessor");
            localStorage.removeItem("professorState");
            //throw "Não tem permissões!";
            this.amITryingToLogin = false;
            return;
          }
        }
        this.$router.push({ name: "coordenadorroot" });
      } catch (error) {
        if (error.response) {
          if (
            (this.credentials.login != null &&
              this.credentials.password != null) ||
            this.credentials.password != null
          ) {
            this.messageError = error.response.data;
            console.log(this.messageError.message);
          }
        }
        this.$toast.error("Não foi possível fazer login");
      }
      this.amITryingToLogin = false;
    },
  },
  mounted() {},
};
</script>

<style scoped>
/* .card {
	margin: 0 auto;
	float: none;
	margin-bottom: 10px;
} */
</style>
