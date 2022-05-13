<template>
  <div class="container-fluid">
    <h2>Gerir Periodos</h2>
    <div v-if="hasMoreThanOneCurso" class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Curso a gerir periodos:</label>
      <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="selectedCourse" v-on:change="this.counterStore.getAberturasByCourse(selectedCourse)">
        <option value="null">Selecione um curso.</option>
        <option v-for="course in this.counterStore.courses" :key="course.id" v-bind:value="course.id">
        {{ "["+course.codigo+"] "+course.nome }}
        </option>
      </select>
    </div>
    <div v-if="this.counterStore.aberturasByCourse.nome != null" class="card text-center">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <a class="nav-link" role="button" :class="{ active: navTabConfirmacaoUCs == true }" @click="navTabConfirmacaoUCs = true">Confirmação de UCs</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" role="button" :class="{ active: navTabConfirmacaoUCs == false }" @click="navTabConfirmacaoUCs = false">Inscrição nos Turnos</a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <!-- GESTÃO DE ABERTURAS - CONFIRMAÇÕES -->
        <div v-if="navTabConfirmacaoUCs == true">
          <h6 class="card-title" style="margin-bottom:25px;">Periodo de confirmação de UCs - {{ "["+this.counterStore.aberturasByCourse.codigo+"] "+this.counterStore.aberturasByCourse.nome }}</h6>
          <div v-if="formConfirmacao == false">
            <div v-if="this.counterStore.aberturaConfirmacaoTodos.dataEncerar > new Date().toLocaleString() || this.counterStore.aberturaConfirmacao1.dataEncerar > new Date().toLocaleString() || this.counterStore.aberturaConfirmacao2.dataEncerar > new Date().toLocaleString() || this.counterStore.aberturaConfirmacao3.dataEncerar > new Date().toLocaleString()" class="row" style="text-align:left;">
              <div v-if="this.counterStore.aberturaConfirmacaoTodos.length != 0" class="row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Ano do curso:</label>
                <label class="col-sm-10 col-form-label">Todos</label>
                <label for="inputEmail3" class="col-sm-2 col-form-label">Data de abertura:</label>
                <label class="col-sm-10 col-form-label">{{ this.counterStore.aberturaConfirmacaoTodos.dataAbertura.replace(':00.000000Z', '').replace('T', ' ') }}</label>
                <label for="inputPassword3" class="col-sm-2 col-form-label">Data de encerrar:</label>
                <label class="col-sm-10 col-form-label">{{ this.counterStore.aberturaConfirmacaoTodos.dataEncerar.replace(':00.000000Z', '').replace('T', ' ') }}</label>
                <div>
                  <button type="button" class="btn btn-primary" style="margin-right: 5px;" @click="openEditarConfirmacao(this.counterStore.aberturaConfirmacaoTodos)">Editar</button>
                  <button type="button" class="btn btn-danger" @click="deleteAbertura(this.counterStore.aberturaConfirmacaoTodos.id)">Encerrar</button> 
                </div>
              </div>
              <div v-else>
                <div v-if="this.counterStore.aberturaConfirmacao123.length != 0" >
                  <div v-for="anoAbertura in this.counterStore.aberturaConfirmacao123" :key="anoAbertura" class="row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Ano do curso:</label>
                    <label class="col-sm-10 col-form-label">{{ anoAbertura.ano }}</label>
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Data de abertura:</label>
                    <label class="col-sm-10 col-form-label">{{ anoAbertura.dataAbertura.replace(':00.000000Z', '').replace('T', ' ') }}</label>
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Data de encerrar:</label>
                    <label class="col-sm-10 col-form-label">{{ anoAbertura.dataEncerar.replace(':00.000000Z', '').replace('T', ' ') }}</label>
                    <div>
                      <button type="button" class="btn btn-primary" style="margin-right: 5px;" @click="openEditarConfirmacao(anoAbertura)">Editar</button>
                      <button type="button" class="btn btn-danger" @click="deleteAbertura(anoAbertura.id)">Encerrar</button> 
                    </div> 
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <p style="margin-bottom:25px;">O periodo de confirmação de UCs não se encontra ativo neste momento</p>
            </div>
            <button v-if="this.counterStore.aberturaConfirmacaoTodos.length == 0 && (this.counterStore.aberturaConfirmacao1.length == 0 || this.counterStore.aberturaConfirmacao2.length == 0 || this.counterStore.aberturaConfirmacao3.length == 0)" type="button" class="btn btn-primary" @click="formConfirmacao = true; iniciarConfirmacao = true">Iniciar</button>
          </div>
          <!-- CRIAR/EDITAR ABERTURAS - CONFIRMAÇÃO -->
          <div v-if="formConfirmacao == true">
            <p v-if="editarConfirmacao == true">Edição de abertura</p>
            <p v-if="iniciarConfirmacao == true">Iniciação de abertura</p>
            <form>
              <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Ano do curso</label>
                <div class="col-sm-10">
                  <select v-if="this.counterStore.yearsCourse.length > 2" class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="selectedYear">
                    <option value="null">Selecione uma opção.</option>
                    <option  v-for="year in this.counterStore.yearsCourse" :key="year" v-bind:value="year">
                    {{ year != 0 ? year : "Todos" }}
                    </option>
                  </select>
                  <select v-else class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="selectedYear">
                    <option value="null">Selecione uma opção.</option>
                    <option value="1">1</option>
                  </select>
                  <div v-if="hasErrorAno" class="errorMessages">
                    <small style="color: #a94442; margin-left: 5px;">{{ errorIniciarPC.ano[0] }}</small>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Data de abertura</label>
                <div class="col-sm-10">
                  <input type="datetime-local" class="form-control" v-model="dataAbertura">
                  <div v-if="hasErrorDataAbertura" class="errorMessages">
                    <small style="color: #a94442; margin-left: 5px;">{{ errorIniciarPC.dataAbertura[0] }}</small>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputPassword3" class="col-sm-2 col-form-label">Data de encerrar</label>
                <div class="col-sm-10">
                  <input type="datetime-local" class="form-control" v-model="dataEncerrar">
                  <div v-if="hasErrorDataEncerrar" class="errorMessages">
                    <small style="color: #a94442; margin-left: 5px;">{{ errorIniciarPC.dataEncerar[0] }}</small>
                  </div>
                </div>
              </div>
              <button v-if="editarConfirmacao == true" type="button" class="btn btn-primary" style="margin-right: 5px;" 
                @click="updateAbertura(selectedYear, dataAbertura, dataEncerrar)"
                >Confifmar Edição</button>
              <button v-if="iniciarConfirmacao == true" type="button" class="btn btn-primary" style="margin-right: 5px;" 
                @click="createAbertura(this.counterStore.aberturasByCourse.id, selectedYear, 0, dataAbertura, dataEncerrar)"
                >Confirmar Iniciação</button>
              <button type="button" class="btn btn-warning" @click="cancelarEdicaoIniciacao()">Cancelar</button>
            </form>
          </div>
          <!-- EDITAR ABERTURAS - CONFIRMAÇÃO -->
        </div>
        <!-- GESTÃO DE ABERTURAS - INSCRIÇÕES -->
        <div v-else>
          <h6 class="card-title" style="margin-bottom:25px;">Periodo de inscrição nos turnos - {{ "["+this.counterStore.aberturasByCourse.codigo+"] "+this.counterStore.aberturasByCourse.nome }}</h6>
          <div v-if="formInscricao == false">
            <div v-if="this.counterStore.aberturaInscricaoTodos.dataEncerar > new Date().toLocaleString() || this.counterStore.aberturaInscricao1.dataEncerar > new Date().toLocaleString() || this.counterStore.aberturaInscricao2.dataEncerar > new Date().toLocaleString() || this.counterStore.aberturaInscricao3.dataEncerar > new Date().toLocaleString()" class="row" style="text-align:left;">
              <div v-if="this.counterStore.aberturaInscricaoTodos.length != 0" class="row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Ano do curso:</label>
                <label class="col-sm-10 col-form-label">Todos</label>
                <label for="inputEmail3" class="col-sm-2 col-form-label">Data de abertura:</label>
                <label class="col-sm-10 col-form-label">{{ this.counterStore.aberturaInscricaoTodos.dataAbertura.replace(':00.000000Z', '').replace('T', ' ') }}</label>
                <label for="inputPassword3" class="col-sm-2 col-form-label">Data de encerrar:</label>
                <label class="col-sm-10 col-form-label">{{ this.counterStore.aberturaInscricaoTodos.dataEncerar.replace(':00.000000Z', '').replace('T', ' ') }}</label>
                <div>
                  <button type="button" class="btn btn-primary" style="margin-right: 5px;" @click="openEditarInscricao(this.counterStore.aberturaInscricaoTodos)">Editar</button>
                  <button type="button" class="btn btn-danger" @click="deleteAbertura(this.counterStore.aberturaInscricaoTodos.id)">Encerrar</button> 
                </div>
              </div>
              <div v-else>
                <div v-if="this.counterStore.aberturaInscricao123.length != 0" >
                  <div v-for="anoAbertura in this.counterStore.aberturaInscricao123" :key="anoAbertura" class="row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Ano do curso:</label>
                    <label class="col-sm-10 col-form-label">{{ anoAbertura.ano }}</label>
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Data de abertura:</label>
                    <label class="col-sm-10 col-form-label">{{ anoAbertura.dataAbertura.replace(':00.000000Z', '').replace('T', ' ') }}</label>
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Data de encerrar:</label>
                    <label class="col-sm-10 col-form-label">{{ anoAbertura.dataEncerar.replace(':00.000000Z', '').replace('T', ' ') }}</label>
                    <div>
                      <button type="button" class="btn btn-primary" style="margin-right: 5px;" @click="openEditarInscricao(anoAbertura)">Editar</button>
                      <button type="button" class="btn btn-danger" @click="deleteAbertura(anoAbertura.id)">Encerrar</button> 
                    </div> 
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <p style="margin-top:25px; margin-bottom:25px;">O periodo de inscrição nos turnos não se encontra ativo neste momento</p>
            </div>
            <button v-if="this.counterStore.aberturaInscricaoTodos.length == 0 && (this.counterStore.aberturaInscricao1.length == 0 || this.counterStore.aberturaInscricao2.length == 0 || this.counterStore.aberturaInscricao3.length == 0)" type="button" class="btn btn-primary" @click="formInscricao = true; iniciarInscricao = true">Iniciar</button>
          </div>
          <!-- CRIAR/EDITAR ABERTURA - INSCRIÇÕES -->
          <div v-if="formInscricao == true">
            <form>
              <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Ano do curso</label>
                <div class="col-sm-10">
                  <select v-if="this.counterStore.yearsCourse.length > 2" class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="selectedYear">
                    <option value="null">Selecione uma opção.</option>
                    <option v-for="year in this.counterStore.yearsCourse" :key="year" v-bind:value="year">
                    {{ year != 0 ? year : "Todos" }}
                    </option>
                  </select>
                  <select v-else class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="selectedYear">
                    <option value="null">Selecione uma opção.</option>
                    <option value="1">1</option>
                  </select>
                  <div v-if="hasErrorAno" class="errorMessages">
                    <small style="color: #a94442; margin-left: 5px;">{{ errorIniciarPC.ano[0] }}</small>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Data de abertura</label>
                <div class="col-sm-10">
                  <input type="datetime-local" class="form-control" v-model="dataAbertura">
                  <div v-if="hasErrorDataAbertura" class="errorMessages">
                    <small style="color: #a94442; margin-left: 5px;">{{ errorIniciarPC.dataAbertura[0] }}</small>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputPassword3" class="col-sm-2 col-form-label">Data de encerrar</label>
                <div class="col-sm-10">
                  <input type="datetime-local" class="form-control" v-model="dataEncerrar">
                  <div v-if="hasErrorDataEncerrar" class="errorMessages">
                    <small style="color: #a94442; margin-left: 5px;">{{ errorIniciarPC.dataEncerar[0] }}</small>
                  </div>
                </div>
              </div>
              <button v-if="editarInscricao == true" type="button" class="btn btn-primary" style="margin-right: 5px;"
              @click="updateAbertura(selectedYear, dataAbertura, dataEncerrar)">Confirmar Edição</button>
              <button v-if="iniciarInscricao == true" type="button" class="btn btn-primary" style="margin-right: 5px;"
              @click="createAbertura(this.counterStore.aberturasByCourse.id, selectedYear, 1, dataAbertura, dataEncerrar)">Confirmar Iniciação</button>
              <button type="button" class="btn btn-warning" @click="cancelarEdicaoIniciacao()">Cancelar</button>
            </form>
          </div>
          <!-- EDITAR ABERTURAS - INSCRIÇÕES -->
        </div>
      </div>
    </div>
  </div>    
</template>

<script>
import { useCounterStore } from "../../stores/counter"
export default {
  name: "GerirPeriodos",
  component: {},
  setup() {
    const counterStore = useCounterStore()
    return { counterStore }
  },
  data() {
    return {
      selectedCourse: null,
      navTabConfirmacaoUCs: true,
      formConfirmacao: false,
      formInscricao: false,
      selectedYear: null,
      dataAbertura: null,
      dataEncerrar: null,
      iniciarInscricao: false,
      editarInscricao: false,
      iniciarConfirmacao: false,
      editarConfirmacao: false,
      aberturaToEdit: null,
      errorIniciarPC: null
    };
  },
  computed: {
    hasMoreThanOneCurso(){
      if (this.counterStore.courses.length > 1) {
        return true
      }
      return false
    },
    hasErrorDataAbertura(){
      if (this.errorIniciarPC != null) {
        if (this.errorIniciarPC.dataAbertura) {
          return true
        }  
      }
      return false
    },
    hasErrorDataEncerrar(){
      if (this.errorIniciarPC != null) {
        if (this.errorIniciarPC.dataEncerar) {
          return true
        }
      }
      return false
    },
    hasErrorAno(){
      if (this.errorIniciarPC != null) {
        if (this.errorIniciarPC.ano) {
          return true
        }
      }
      return false
    },
  },
  methods: {
    openEditarConfirmacao(abertura){
      this.errorIniciarPC = null
      this.editarConfirmacao = true
      this.formConfirmacao = true 
      this.aberturaToEdit = abertura.id
      this.selectedYear = abertura.ano
      this.dataAbertura = abertura.dataAbertura.replace(':00.000000Z', '')
      this.dataEncerrar = abertura.dataEncerar.replace(':00.000000Z', '')
    },
    cancelarEdicaoIniciacao(){
      this.errorIniciarPC = null
      this.formConfirmacao = false
      this.editarConfirmacao = false
      this.iniciarConfirmacao = false
      this.formInscricao = false
      this.editarInscricao = false
      this.iniciarInscricao = false
      this.selectedYear = null
      this.dataAbertura = null
      this.dataEncerrar = null
    },
    openEditarInscricao(abertura){
      this.errorIniciarPC = null
      this.editarInscricao = true
      this.formInscricao = true 
      this.aberturaToEdit = abertura.id
      this.selectedYear = abertura.ano
      this.dataAbertura = abertura.dataAbertura.replace(':00.000000Z', '')
      this.dataEncerrar = abertura.dataEncerar.replace(':00.000000Z', '')
    },
    createAbertura(courseId, year, type, dataAbertura, dataEncerrar){
      this.$axios.post("abertura/"+courseId, {
            "ano": year,
            "tipoAbertura": type,
            "dataAbertura": dataAbertura,
            "dataEncerar": dataEncerrar,
            "semestre": this.counterStore.semestre,
            "idAnoletivo": this.counterStore.selectedAnoletivo
          })
        .then((response) => {
          this.$toast.success("Periodo de abertura criado com sucesso!");
          this.counterStore.getAberturasByCourse(courseId)
          this.cancelarEdicaoIniciacao();
        })
        .catch((error) => {
          this.errorIniciarPC = error.response.data
          if(error.response.data.erros){
            this.$toast.error(error.response.data.erros);
          }else{
            this.$toast.error("Não foi possível criar a abertura!");
          }
        });
    },
    updateAbertura(year, dataAbertura, dataEncerrar){
      this.$axios.put("abertura/"+this.aberturaToEdit, {
            "ano": year,
            "dataAbertura": dataAbertura,
            "dataEncerar": dataEncerrar
          })
        .then((response) => {
          this.$toast.success("Periodo de abertura editado com sucesso!",);
          this.counterStore.getAberturasByCourse(this.counterStore.aberturasByCourse.id)
          this.cancelarEdicaoIniciacao();
        })
        .catch((error) => {
          this.errorIniciarPC = error.response.data
          this.$toast.error("Não foi possível editar a abertura!");
        });
    },
    deleteAbertura(aberturaId){
      this.$axios.delete("abertura/" + aberturaId)
        .then((response) => {
          this.$toast.success("Abertura encerrada com sucesso!");
          this.counterStore.getAberturasByCourse(this.counterStore.aberturasByCourse.id)
          console.log(this.counterStore.aberturasByCourse.id)
        })
        .catch((error) => {
          this.$toast.error("Não foi possível encerrar esta abertura!");
        });
    }
  },
  mounted() {
    this.counterStore.getCourses(2)
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