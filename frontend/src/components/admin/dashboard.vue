<template>
  <div class="container-fluid">
    <h2>Dashboard</h2>
    <div class="card text-center">
      <div class="card-header">
        Periodos de Inscrição e de Confirmação de UC´s de cada Curso
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Curso</th>
              <th scope="col">Periodo de Confirmação </th>
              <th scope="col">Periodo de Inscrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
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
  methods: {
    
  },
  data() {
    return {
        
    };
  },
  mounted() {},
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