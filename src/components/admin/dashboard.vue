<template>
  <div class="container-fluid">
    <h2>Dashboard</h2>
    <div class="card text-center">
      <div class="card-header">
        Periodos de Inscrição e de Confirmação de UC´s de cada Curso
      </div>
      <div v-if="hasValue" class="card-body">
        <table class="table" style="text-align:left;">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Curso</th>
              <th scope="col">Periodo de Confirmação </th>
              <th scope="col">Periodo de Inscrição</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in coursesWithAberturas" :key="course">
              <td>{{ course.id }}</td>
              <td>{{ "["+course.codigo+"] "+course.nome }}</td>
              <td>
                <div>
                  <p v-for="abertura in course.aberturas" :key="abertura.id">{{ abertura.tipoAbertura == 0 ? "Ano: "+abertura.ano : ''}}<br>
                  {{ abertura.tipoAbertura == 0 ? "Início: "+abertura.dataAbertura.replace(':00.000000Z', '').replace('T', ' ') : ''}}<br> 
                  {{ abertura.tipoAbertura == 0 ? "Fim: "+ abertura.dataEncerar.replace(':00.000000Z', '').replace('T', ' ') : ''}}</p>
                </div>
              </td>
              <td>
                <div>
                  <p v-for="abertura in course.aberturas" :key="abertura.id">{{ abertura.tipoAbertura == 1 ? "Ano: "+abertura.ano : ''}}<br>
                  {{ abertura.tipoAbertura == 1 ? "Início: "+abertura.dataAbertura.replace(':00.000000Z', '').replace('T', ' ') : ''}}<br> 
                  {{ abertura.tipoAbertura == 1 ? "Fim: "+abertura.dataEncerar.replace(':00.000000Z', '').replace('T', ' ') : ''}}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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