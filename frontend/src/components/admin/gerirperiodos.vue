<template>
  <div class="container-fluid">
    <h2>Gerir Periodos</h2>
    <div class="mb-3">
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
        <div v-if="navTabConfirmacaoUCs == true">
          <h6 class="card-title" style="margin-bottom:25px;">Periodo de confirmação de UCs - {{ "["+this.counterStore.aberturasByCourse.codigo+"] "+this.counterStore.aberturasByCourse.nome }}</h6>
          <div v-if="iniciarConfirmacao == false">
            <div v-if="this.counterStore.aberturasByCourse.aberturas.length == 0">
              <p style="margin-bottom:25px;">O periodo de confirmação de UCs não encontra ativo neste momento</p>
            </div>
            <div v-else class="row" style="text-align:left;">
              <div class="row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Ano do curso:</label>
                <label class="col-sm-10 col-form-label">Ano</label>
                <label for="inputEmail3" class="col-sm-2 col-form-label">Data de abertura:</label>
                <label class="col-sm-10 col-form-label">Data</label>
                <label for="inputPassword3" class="col-sm-2 col-form-label">Data de encerrar:</label>
                <label class="col-sm-10 col-form-label">Data</label>
              </div>
            </div>
            <button v-if="this.counterStore.aberturasByCourse.aberturas.length == 0" type="button" class="btn btn-primary" @click="iniciarConfirmacao = true">Iniciar</button>
            <button v-if="this.counterStore.aberturasByCourse.aberturas.length != 0" type="button" class="btn btn-primary" style="margin-right: 5px;" @click="iniciarConfirmacao = true">Editar</button>
            <button v-if="this.counterStore.aberturasByCourse.aberturas.length != 0" type="button" class="btn btn-danger" @click="iniciarConfirmacao = true">Encerrar</button> 
          </div>
          <div v-if="iniciarConfirmacao == true">
            <form>
              <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Ano do curso</label>
                <div class="col-sm-10">
                  <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="null">Selecione uma opção.</option>
                    <option value="todos">Todos os anos</option>
                    <!-- <option v-for="course in this.counterStore.courses" :key="course.id" v-bind:value="course.id">
                    {{ "["+course.codigo+"] "+course.nome }}
                    </option> -->
                  </select>
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Data de abertura</label>
                <div class="col-sm-10">
                  <input type="datetime-local" class="form-control">
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputPassword3" class="col-sm-2 col-form-label">Data de encerrar</label>
                <div class="col-sm-10">
                  <input type="datetime-local" class="form-control">
                </div>
              </div>
              <button type="submit" class="btn btn-primary" style="margin-right: 5px;">Confimar</button>
              <button type="button" class="btn btn-warning" @click="iniciarConfirmacao = false">Cancelar</button>
            </form>
          </div>
        </div>
        <div v-else>
          <h6 class="card-title">Periodo de inscrição nos turnos - {{ "["+this.counterStore.aberturasByCourse.codigo+"] "+this.counterStore.aberturasByCourse.nome }}</h6>
          <div v-if="iniciarInscricao == false">
            <div v-if="this.counterStore.aberturasByCourse.aberturas.length == 0">
              <p style="margin-top:25px; margin-bottom:25px;">O periodo de inscrição nos turnos não encontra ativo neste momento</p>
            </div>
            <div v-else class="row" style="text-align:left;">
              <div class="row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Ano do curso:</label>
                <label class="col-sm-10 col-form-label">Ano</label>
                <label for="inputEmail3" class="col-sm-2 col-form-label">Data de abertura:</label>
                <label class="col-sm-10 col-form-label">Data</label>
                <label for="inputPassword3" class="col-sm-2 col-form-label">Data de encerrar:</label>
                <label class="col-sm-10 col-form-label">Data</label>
              </div>
            </div>
            <button v-if="this.counterStore.aberturasByCourse.aberturas.length == 0" type="button" class="btn btn-primary" @click="iniciarInscricao = true">Iniciar</button>
            <button v-if="this.counterStore.aberturasByCourse.aberturas.length != 0" type="button" class="btn btn-primary" style="margin-right: 5px;" @click="iniciarConfirmacao = true">Editar</button>
            <button v-if="this.counterStore.aberturasByCourse.aberturas.length != 0" type="button" class="btn btn-danger" @click="iniciarConfirmacao = true">Encerrar</button> 
          </div>
          <div v-if="iniciarInscricao == true">
            <form>
              <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Ano do curso</label>
                <div class="col-sm-10">
                  <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="null">Selecione uma opção.</option>
                    <option value="todos">Todos os anos</option>
                    <!-- <option v-for="course in this.counterStore.courses" :key="course.id" v-bind:value="course.id">
                    {{ "["+course.codigo+"] "+course.nome }}
                    </option> -->
                  </select>
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Data de abertura</label>
                <div class="col-sm-10">
                  <input type="datetime-local" class="form-control">
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputPassword3" class="col-sm-2 col-form-label">Data de encerrar</label>
                <div class="col-sm-10">
                  <input type="datetime-local" class="form-control">
                </div>
              </div>
              <button type="submit" class="btn btn-primary" style="margin-right: 5px;">Confimar</button>
              <button type="button" class="btn btn-warning" @click="iniciarInscricao = false">Cancelar</button>
            </form>
          </div>
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
      iniciarConfirmacao: false,
      iniciarInscricao: false
    };
  },
  methods: {
    
  },
  mounted() {
    this.counterStore.getCourses()
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