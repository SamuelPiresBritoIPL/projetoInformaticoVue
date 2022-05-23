<template>
  <div class="container-fluid">
    <h3 style="margin-top: 20px; margin-bottom: 25px;">Atualizar Base de Dados</h3>
    <p>Todas as ações poderam demorar algum tempo (não dar refresh a página, o que implica também não sair da mesma).</p>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Atualizar os endpoints</h5>
            <p class="card-text">Os endpoints tem de terminar com "?" de forma a serem automaticamente colocados com o ano letivo e semestre</p>
            <div class="card-body ">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Url cursos/turnos</label>
                <input type="text" class="form-control" id="exampleFormControlInput0" placeholder="Url cursos (ex: http://www.dei.estg.ipleiria.pt/intranet/horarios/ws/inscricoes/turnos.php? )" v-model="urlcursos">
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Url inscrições</label>
                <input type="text" class="form-control" id="exampleFormControlInput0" placeholder="Url inscrições (ex: http://www.dei.estg.ipleiria.pt/intranet/horarios/ws/inscricoes/inscricoes_cursos.php? )" v-model="urlinscricoes">
              </div>
              <button :disabled='blocked' class="btn btn-primary" @click="updateUrls()">
                  <span aria-hidden="true"></span> Atualizar url's
              </button>
            </div>
          </div>
        </div>
        <br>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Atualizar turnos/cursos/professores</h5>
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
                  <span v-if="loading[0]" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Atualizar dados
              </button>
            </div>
          </div>
        </div>
      </div>
      <br>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Atualizar inscrições alunos</h5>
            <p class="card-text">Selecione o ano letivo e o curso para ir buscar os novos dados dos alunos e das suas respetivas inscrições nas ucs.</p>
            <div class="card-body ">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Ano letivo</label>
                <input type="number" class="form-control" list="anosletivos" id="exampleFormControlInput1" placeholder="Anoletivo (ex: 202122)" v-model="anoletivoinscricoes">
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Curso</label>
                <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="selectedCourse">
                  <option value="0">Todos</option>
                  <option v-for="course in this.counterStore.courses" :key="course.id" v-bind:value="course.id">
                  {{ "["+course.codigo+"] "+course.nome }}
                  </option>
                </select>

              </div>
              <button :disabled='blocked' class="btn btn-primary" @click="updateInscricaoInformation(anoletivoinscricoes, semestreinscricoes, 2)">
                  <span v-if="loading[1]" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Atualizar dados
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
                  <span v-if="loading[2]" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Atualizar dados
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <br>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Inscrever alunos nos turnos </h5>
            <p class="card-text">Selecione o ano letivo e o semestre para inscrever nos turnos (Apenas turnos únicos. ex: Turnos teóricos).</p>
            <div class="card-body ">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Ano letivo</label>
                <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="anoletivoinscreverturnos">
                  <option v-for="anoletivo in this.counterStore.anosletivos" :key="anoletivo.id" v-bind:value="anoletivo.id">
                  {{anoletivo.anoletivo + (anoletivo.ativo == 1 ? " => Ativo (" + anoletivo.semestreativo + "º Semestre)" : "")}}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Semestre</label>
                <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="semestreinscreverturnos">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <button :disabled='blocked' class="btn btn-primary" @click="updateInscricoes(anoletivoinscreverturnos, semestreinscreverturnos)">
                  <span v-if="loading[4]" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Atualizar dados
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
                  <span v-if="loading[3]" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Atualizar dados
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
        loading: [false,false,false,false,false],
        blocked: false,
        anoletivocurso: null,
        semestrecurso: 1,
        anoletivoinscricoes: null,
        semestreinscricoes: 1,
        anoletivoaprovacoes: null,
        semestreaprovacoes: 1,
        anoletivoativo: null,
        semestreativo: 1,
        anoletivoinscreverturnos: null,
        semestreinscreverturnos: 1,
        anosletivos: [],
        urlcursos: "",
        urlinscricoes: "",
        selectedCourse: 0
    };
  },
   methods: {
     updateAnoletivoAtivo(anoletivo, semestre){
      this.loading[3] = true
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
          this.loading[3] = false
          this.blocked = false
        });
    },
    updateInscricaoInformation(anoletivo, semestre, numero, url="webservice/inscricao"){
      if (numero == 2) {
        this.loading[1] = true
      } else {
        this.loading[2] = true
      }
      this.blocked = true
      this.$axios.post(url, {
            "anoletivo": anoletivo,
            "semestre": semestre,
            "idcurso": this.selectedCourse
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
          this.loading[1] = false
          this.loading[2] = false
          this.blocked = false
        });
    },
    updateCourseInformation(anoletivo, semestre){
      this.loading[0] = true
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
          this.loading[0] = false
          this.blocked = false
        });
    },
    updateUrls(){
      this.$axios.put("webservice/url", {
            "urlturnos": this.urlcursos,
            "urlinscricoes": this.urlinscricoes
          })
        .then((response) => {
          this.$toast.success("Dados atualizados");
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    getUrls(){
      this.$axios.get("webservice/url")
        .then((response) => {
          console.log(response.data);
          this.urlcursos = response.data.urlturnos;
          this.urlinscricoes = response.data.urlinscricoes;
          console.log(this.urlinscricoes)
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    updateInscricoes(anoletivo, semestre){
      this.loading[4] = true
      this.blocked = true
      this.$axios.post("webservice/inscriverturnos", {
            "anoletivo": anoletivo,
            "semestre": semestre
          })
        .then((response) => {
          console.log(response)
          this.$toast.success("Dados atualizados");
        })
        .catch((error) => {
          this.$toast.error(error);
        }).finally(() => {
          this.loading[4] = false
          this.blocked = false
        });
    },
  },
  mounted() {
    this.counterStore.getAnosLetivos()
    this.counterStore.getCourses()
    this.getUrls()
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