<template>
  <div class="container-fluid">
    <h2>Gerir Curso</h2>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Curso a gerir:</label>
      <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="selectedCourse" v-on:change="this.counterStore.getCourseWithUCs(selectedCourse)">
        <option value="null">Selecione um curso.</option>
        <option v-for="course in this.counterStore.courses" :key="course.id" v-bind:value="course.id">
        {{ "["+course.codigo+"] "+course.nome }}
        </option>
      </select>
    </div>
    <div v-if="this.counterStore.courseWithUCs.nome" class="card text-center">
      <div class="card-header">
        Cadeiras de: {{ "["+this.counterStore.courseWithUCs.codigo+"] "+this.counterStore.courseWithUCs.nome }}
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
            <tr class="tableRow" v-for="cadeira in this.counterStore.courseWithUCs.cadeiras" :key="cadeira" @click="selectCadeiraToManage(cadeira)">
              <td>{{ "["+cadeira.codigo+"] "+cadeira.nome }}</td>
              <td>{{ cadeira.semestre }}</td>
              <td>
                <a  v-for="turno in cadeira.turnos" :key="turno"><u>{{ turno.numero != 0 ? turno.tipo+turno.numero :  turno.tipo }}</u>&nbsp;&nbsp;</a>
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
        selectedCourse: null
    };
  },
  methods: {
    selectCadeiraToManage(cadeira){
      this.counterStore.cadeiraToManage = cadeira
      this.$router.push("/admin/gerircadeira");
    }
  },
  mounted() {
    this.counterStore.getCourses()
  },
};
</script>

<style>
.tableRow:hover{
  background-color: aliceblue;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>