<template>
  <div class="container-fluid">
    <div class="row">
        <div style="margin-top: 65px">
            <div class="card mb-3" style="width: 30%">
                <div class="card-header bg-transparent" style="text-align: center">
                    <label style="margin-top: 10px;">Aplicação de Gestão/Inscrição nos Turnos</label>
                    <h5>Login - Coordenador</h5>
                </div>
                <div class="card-body text-dark">
                    <div style="padding: 10px 20px">
                        <div class="mb-3">
                            <label for="formGroupExampleInput" class="form-label"><b>Utilizador</b></label>
                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Nome de Utilizador" v-model="credentials.login">
                        </div>
                        <div class="mb-3">
                            <label for="formGroupExampleInput2" class="form-label"><b>Password</b></label>
                            <input type="password" class="form-control" id="formGroupExampleInput2" placeholder="Password" v-model="credentials.password">
                        </div>
                        <button type="button" class="btn btn-primary" style="margin-bottom: 5px; width: 100%" @click="login()">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>    
</template>

<script>
import { useCounterStore } from "../../stores/counter"
export default {
  name: "AdminRoot",
  component: {},
  setup() {
    const counterStore = useCounterStore()
    return { counterStore }
  },
  data() {
    return {
        credentials: {
            login: null,
            password: null
        }
    };
  },
  methods: {
    async login(){
        var tipoLogin = 2
        try {
            await this.counterStore.login(this.credentials, tipoLogin)
            if (this.counterStore.utilizadorLogado.tipo != 2) {
                if (this.counterStore.utilizadorLogado.isCoordenador == 0) {
                    sessionStorage.removeItem("tokenAluno");
                    localStorage.removeItem("alunoState");
                    sessionStorage.removeItem("tokenAdmin");
                    localStorage.removeItem("adminState");
                    sessionStorage.removeItem("tokenProfessor");
                    localStorage.removeItem("professorState");
                    throw "Não tem permissões!"
                }
            } 
            this.$toast.success("Login efetuado com sucesso!");
            this.$router.push({ name: "coordenadorroot" });
        } catch (error) {
            console.log(error.response)
            this.$toast.error("Não foi possível fazer login");
        }
      }
  },
  mounted() {

  },
};
</script>

<style scoped>
.card {
    margin: 0 auto;
    float: none;
    margin-bottom: 10px;
}

</style>