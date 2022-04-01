<template>
  <div class="container-fluid">
    <h2>Gerir Curso</h2>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Curso a gerir:</label>
      <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="selectedCourse" v-on:change="getCourseUCs(selectedCourse)">
        <option value="null">Selecione um curso.</option>
        <option v-for="course in this.counterStore.courses" :key="course.id" v-bind:value="course.id">
        {{ "["+course.codigo+"] "+course.nome }}
        </option>
      </select>
    </div>
    <div v-if="course.nome" class="card text-center">
      <div class="card-header">
        Cadeiras de: {{ "["+course.codigo+"] "+course.nome }}
      </div>
      <div class="card-body">
        <table class="table" style="text-align: left;">
          <thead>
            <tr>
              <th scope="col">Cadeira</th>
              <th scope="col">Inscritos</th>
              <th scope="col">Turnos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cadeira in course.cadeiras" :key="cadeira">
              <td>{{ "["+cadeira.codigo+"] "+cadeira.nome }}</td>
              <td>{{ cadeira.semestre }}</td>
              <td>
                <a  v-for="turno in cadeira.turnos" :key="turno"><u>{{ turno.tipo }}</u>&nbsp;&nbsp;</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>    
</template>

<script>
import { useCounterStore } from "../../stores/counter"
export default {
  
  name: "GerirCursos",
  component: {},
  setup() {
    const counterStore = useCounterStore()
    return { counterStore }
  },
  data() {
    return {
        selectedCourse: null,
        course: []
    };
  },
  methods: {
    getCourseUCs(courseId){
       this.$axios.get("curso/cadeiras/" + courseId)
        .then((response) => {
          console.log(response.data);
          this.course = response.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
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