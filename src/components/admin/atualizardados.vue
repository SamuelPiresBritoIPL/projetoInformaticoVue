<template>
  <div class="container-fluid">
    <h2>Atualizar Base de Dados</h2>
    <p>Todas as ações poderam demorar algum tempo (não dar refresh a página).</p>
    <div class="row">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Atualizar cursos/professores</h5>
            <p class="card-text">Selecione o ano letivo e o semestre para ir buscar os novos dados dos cursos e professores.</p>
            <div class="card-body ">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Ano letivo</label>
                <input type="number" class="form-control" list="anosletivos" id="exampleFormControlInput1" placeholder="Anoletivo (ex: 202122)" v-model="anoletivocurso">
                <datalist id="anosletivos">
                  <option v-for="anoletivo in this.counterStore.anosletivos" :key="anoletivo.id" v-bind:value="anoletivo.anoletivo">
                  {{ anoletivo.ativo == 1 ? "Ativo (" + anoletivo.semestreativo + "º Semestre)" : ""}}
                  </option>
                </datalist>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Semestre</label>
                <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="semestrecurso">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <button :disabled='blocked' class="btn btn-primary" @click="updateCourseInformation(anoletivocurso, semestrecurso)">
                  <span v-if="loading1" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Atualizar dados
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Atualizar inscrições alunos/alunos</h5>
            <p class="card-text">Selecione o ano letivo e o semestre para ir buscar os novos dados dos alunos e das suas respetivas inscrições nas ucs.</p>
            <div class="card-body ">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Ano letivo</label>
                <input type="number" class="form-control" list="anosletivos" id="exampleFormControlInput1" placeholder="Anoletivo (ex: 202122)" v-model="anoletivoinscricoes">
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Semestre</label>
                <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="semestreinscricoes">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <button :disabled='blocked' class="btn btn-primary" @click="updateInscricaoInformation(anoletivoinscricoes, semestreinscricoes, 2)">
                  <span v-if="loading2" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Atualizar dados
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <br>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Atualizar ucs feitas pelos alunos</h5>
            <p class="card-text">Selecione o ano letivo e o semestre para ir buscar os novos dados dos alunos e das ucs já feitas pelo mesmo.</p>
            <div class="card-body ">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Ano letivo</label>
                <input type="number" class="form-control" list="anosletivos" id="exampleFormControlInput1" placeholder="Anoletivo (ex: 202122)" v-model="anoletivoaprovacoes">
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Semestre</label>
                <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="semestreaprovacoes">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <button :disabled='blocked' class="btn btn-primary" @click="updateInscricaoInformation(anoletivoaprovacoes, semestreaprovacoes, 3, 'webservice/inscricaoaprovados')">
                  <span v-if="loading3" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Atualizar dados
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <br>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Alterar ano letivo/semestre em vigor</h5>
            <p class="card-text">Selecione o ano letivo e o semestre para por os mesmo em vigor.</p>
            <div class="card-body ">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Ano letivo</label>
                <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="anoletivoativo">
                  <option v-for="anoletivo in this.counterStore.anosletivos" :key="anoletivo.id" v-bind:value="anoletivo.id">
                  {{anoletivo.anoletivo + (anoletivo.ativo == 1 ? " => Ativo (" + anoletivo.semestreativo + "º Semestre)" : "")}}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Semestre</label>
                <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="semestreativo">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <button :disabled='blocked' class="btn btn-primary" @click="updateAnoletivoAtivo(anoletivoativo, semestreativo)">
                  <span v-if="loading4" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Atualizar dados
              </button>
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
  name: "AtualizarDados",
  component: {},
  methods: {
    
  },
  setup() {
    const counterStore = useCounterStore()
    return { counterStore }
  },
  data() {
    return {
        loading1: false,
        loading2: false,
        loading3: false,
        loading4: false,
        blocked: false,
        anoletivocurso: null,
        semestrecurso: 1,
        anoletivoinscricoes: null,
        semestreinscricoes: 1,
        anoletivoaprovacoes: null,
        semestreaprovacoes: 1,
        anoletivoativo: null,
        semestreativo: 1,
        anosletivos: []
    };
  },
   methods: {
     updateAnoletivoAtivo(anoletivo, semestre){
      this.loading4 = true
      this.blocked = true
      this.$axios.put("anoletivo/" + anoletivo, {
            "semestre": semestre
          })
        .then((response) => {
          this.counterStore.getAnosLetivos()
          this.$toast.success("Dados atualizados");
          this.anoletivoativo = null
          this.semestreativo = 1
        })
        .catch((error) => {
          this.$toast.error(error);
        })
        .finally(() => {
          this.loading4 = false
          this.blocked = false
        });
    },
    updateInscricaoInformation(anoletivo, semestre, numero, url="webservice/inscricao"){
      if (numero == 2) {
        this.loading2 = true
      } else {
        this.loading3 = true
      }
      this.blocked = true
      this.$axios.post(url, {
            "anoletivo": anoletivo,
            "semestre": semestre
          })
        .then((response) => {
          console.log(response)
          this.$toast.success("Dados atualizados");
          this.anoletivoaprovacoes = null
          this.semestreaprovacoes = 1
        })
        .catch((error) => {
          this.$toast.error(error);
        })
        .finally(() => {
          this.loading2 = false
          this.loading3 = false
          this.blocked = false
        });
    },
    updateCourseInformation(anoletivo, semestre){
      this.loading1 = true
      this.blocked = true
      this.$axios.post("webservice/curso", {
            "anoletivo": anoletivo,
            "semestre": semestre
          })
        .then((response) => {
          this.$toast.success("Dados atualizados");
          this.anoletivocurso = null
          this.semestrecurso = 1
        })
        .catch((error) => {
          this.$toast.error(error);
        })
        .finally(() => {
          this.loading1 = false
          this.blocked = false
        });
    },
  },
  mounted() {
    this.counterStore.getAnosLetivos()
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

</style>