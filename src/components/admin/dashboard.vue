<template>
  <div class="container-fluid">
    <h2>Dashboard</h2>
    <div class="card text-center">
      <div class="card-header">
        Periodos de Inscrição e de Confirmação de UC´s de cada Curso
      </div>
      <div v-if="hasValue" class="card-body">
        <div class="card w-100 border-dark" style="margin-top: 10px;" v-for="course in coursesWithAberturas" :key="course">
          <div class="card-body">
            <h6 class="card-title">{{ "["+course.codigo+"] "+course.nome }}</h6>
            <hr>
            <div class="row">
              <div class="col-sm-1">
              </div>
              <div class="col-sm-5">
                <div class="card border-info mb-3" style="max-width: 18rem;">
                  <div class="card-body">
                    <h6 class="card-title" style="margin-bottom: 20px;">Confirmação de UC's</h6>
                    <div style="text-align: left;" v-for="abertura in course.aberturas" :key="abertura.id">
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
                <div class="card border-info mb-3" style="max-width: 18rem;">
                  <div class="card-body">
                    <h6 class="card-title" style="margin-bottom: 20px;">Inscrição nos Turnos</h6>
                    <div style="text-align: left;" v-for="abertura in course.aberturas" :key="abertura.id">
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
        coursesWithAberturas: []
    };
  },
  computed: {
    hasValue(){
      if (this.counterStore.selectedAnoletivo != null && this.counterStore.semestre != null) {
        this.getCoursesAberturas()
        return true
      } 
      return false
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