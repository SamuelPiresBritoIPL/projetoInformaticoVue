<template>
  <div class="container-fluid">
    <h3 style="margin-top: 20px; margin-bottom: 25px;">Dashboard</h3>
    <div v-if="adminLogged" class="card text-center">
      <div v-if="hasValue" class="card-body">
        <div class="card w-100" style="margin-top: 10px;" v-for="course in coursesWithAberturas" :key="course">
          <div class="card-body">
            <h6 class="card-title">{{ "["+course.codigo+"] "+course.nome }}</h6>
            <hr>
            <div class="row">
              <div class="col-sm-1">
              </div>
              <div class="col-sm-5">
                <div class="card text-dark bg-light mb-3" style="max-width: 18rem;">
                  <div class="card-header">Pedidos de UC's</div>
                  <div class="card-body">
                      <div style="text-align: left;" v-for="abertura in course.aberturas" :key="abertura.id">
                        <small>{{ abertura.tipoAbertura != 0 ? "Não está definido o periodo de pedidos de UC's" : ''}}</small>
                        <p style="margin-bottom: 2px;"><small><b>{{ abertura.tipoAbertura == 0 ? "Ano: " : ''}}</b></small>
                        {{ abertura.tipoAbertura == 0 ? (abertura.ano == 0 ? 'Todos' : abertura.ano) : ''}}</p>
                        <p style="margin-bottom: 2px;"><small><b>{{ abertura.tipoAbertura == 0 ? "Início: " : ''}}</b></small>
                        {{ abertura.tipoAbertura == 0 ? abertura.dataAbertura.replace(':00.000000Z', '').replace('T', ' ') : ''}}</p>
                        <p style="margin-bottom: 2px;"><small><b>{{ abertura.tipoAbertura == 0 ? "Fim: " : ''}}</b></small>
                        {{ abertura.tipoAbertura == 0 ? abertura.dataEncerar.replace(':00.000000Z', '').replace('T', ' ') : ''}}</p>
                      </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-5">
                <div class="card text-dark bg-light mb-3" style="max-width: 18rem;">
                  <div class="card-header">Inscrição nos Turnos</div>
                  <div class="card-body">
                    <div style="text-align: left;" v-for="abertura in course.aberturas" :key="abertura.id">
                      <small>{{ abertura.tipoAbertura != 1 ? "Não está definido o periodo de inscrição nos turnos" : ''}}</small>
                      <p style="margin-bottom: 2px;"><small><b>{{ abertura.tipoAbertura == 1 ? "Ano: " : ''}}</b></small>
                      {{ abertura.tipoAbertura == 1 ? (abertura.ano == 0 ? 'Todos' : abertura.ano) : ''}}</p> 
                      <p style="margin-bottom: 2px;"><small><b>{{ abertura.tipoAbertura == 1 ? "Início: " : ''}}</b></small>
                      {{ abertura.tipoAbertura == 1 ? abertura.dataAbertura.replace(':00.000000Z', '').replace('T', ' ') : ''}}</p> 
                      <p style="margin-bottom: 2px;"><small><b>{{ abertura.tipoAbertura == 1 ? "Fim: " : ''}}</b></small>
                      {{ abertura.tipoAbertura == 1 ? abertura.dataEncerar.replace(':00.000000Z', '').replace('T', ' ') : ''}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card border-warning mb-3 mx-auto" style="max-width: 15rem; text-align: center;">
              <div class="card-header">Pedidos de UC's pendentes</div>
              <div class="card-body">
                <p class="card-text">{{ course.totalpedidos }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <br>
  </div>    
</template>

<script>
import { useCounterStore } from "../../stores/counter"
export default {
  name: "Dashboard",
  component: {},
  setup() {
    const counterStore = useCounterStore()
    return { counterStore }
  },
  data() {
    return {
        coursesWithAberturas: [],
        adminLogged: false,
        coordenadorLogged: false
    };
  },
  computed: {
    hasValue(){
      if (this.counterStore.selectedAnoletivo != null && this.counterStore.semestre != null) {
        this.getCoursesAberturas()
        return true
      } 
      return false
    },
    hasPedidos(){
      for (let index = 0; index < this.buttonArray.length; index++) {
        if (this.buttonArray[index] == true) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    getCoursesAberturas(){
      this.$axios.get("curso/aberturas/"+this.counterStore.selectedAnoletivo+"/"+this.counterStore.semestre)
        .then((response) => {
          this.coursesWithAberturas = response.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  },
  mounted() {
    if (localStorage.getItem("adminState") && sessionStorage.getItem("tokenAdmin")) {
      this.adminLogged = true
    }
    if (localStorage.getItem("coordenadorState") && sessionStorage.getItem("tokenCoordenador")) {
      this.coordenadorLogged = true
    }
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