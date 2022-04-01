<template>
  <div class="container-fluid">
    <h2>Dashboard</h2>
    <div class="card text-center">
      <div class="card-header">
        Periodos de Inscrição e de Confirmação de UC´s de cada Curso
      </div>
      <div class="card-body">
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
export default {
  name: "Dashboard",
  component: {},
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
    this.getCoursesAberturas()
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