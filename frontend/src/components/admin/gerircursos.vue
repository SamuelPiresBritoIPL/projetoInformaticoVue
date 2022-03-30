<template>
  <div class="container-fluid">
    <h2>Gerir Curso</h2>
    <div class="card text-center">
      <div class="card-header">
        Todas as cadeiras de 
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Cadeira</th>
              <th scope="col">Vagas</th>
              <th scope="col">Turnos </th>
              <th scope="col">Login </th>
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
  name: "GerirCursos",
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