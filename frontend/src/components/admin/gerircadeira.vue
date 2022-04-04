<template>
  <div class="container-fluid">
    <h2>Gerir Cadeira {{ this.$route.params.cadeiraId}}</h2>
    <div class="card text-center">
      <div class="card-body">
        <div style="margin-bottom:20px;">
            <a style="margin-right: 35px; font-size: 20px;"><u>Todos</u></a>
            <a style="margin-right: 35px; font-size: 20px;" v-for="turno in this.counterStore.cadeiraToManage.turnos" :key="turno"><u>{{ turno.numero != 0 ? turno.tipo+turno.numero : turno.tipo }}</u></a>
        </div>
        <div class="row">
            <div class="col">
                <div class="card bg-light mb-3" style="max-width: 18rem;">
                    <div class="card-header card-title"><h6>Total de Inscritos</h6></div>
                    <div class="card-body">
                        
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card bg-light mb-3" style="max-width: 18rem;">
                    <div class="card-header"><h6>Não Repetentes</h6></div>
                    <div class="card-body">
                        
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card bg-light mb-3" style="max-width: 18rem;">
                    <div class="card-header"><h6>Repetentes</h6></div>
                    <div class="card-body">
                        
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card bg-light mb-3" style="max-width: 18rem;">
                    <div class="card-header"><h6>Não Inscritos</h6></div>
                    <div class="card-body">
                        
                    </div>
                </div>
            </div>
        </div>
        <table class="table" style="text-align:left;">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome do Aluno</th>
              <th scope="col">Email</th>
              <th scope="col">Repetente </th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in coursesWithAberturas" :key="course">
              <td>{{ course.id }}</td>
              <td>{{ "["+course.codigo+"] "+course.nome }}</td>
              <td></td>
              <td>
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
  name: "GerirCadeira",
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
  methods: {
    getCoursesAberturas(){
      this.$axios.get("curso/aberturas")
        .then((response) => {
          console.log(response.data);
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
.centered {
  position: absolute;
  left: 50%;
  margin-left: -100px;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>