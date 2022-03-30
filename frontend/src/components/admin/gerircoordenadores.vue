<template>
  <div class="container-fluid">
    <h2>Gerir Coordenadores</h2>
    <div class="card text-center">
      <div class="card-header">
        Coordenadores e sub coordenadores de cada curso
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Curso</th>
              <th scope="col">Nº de Coordenadores</th>
              <th scope="col">Nome </th>
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
    <br>
    <div class="card border-light mb-3" style="max-width: 18rem;">
      <div class="card-header">Adicionar Coordenadores</div>
      <div class="card-body">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Curso</label>
          <select class="form-select form-select-sm" aria-label=".form-select-sm example">
            <option selected>Selecione um curso</option>
            <option value="1">EI</option>
            <option value="2">EGI</option>
            <option value="3">EM</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Tipo de Coordenador:</label>
          <select class="form-select form-select-sm" aria-label=".form-select-sm example">
            <option selected>Selecione um curso</option>
            <option value="1">Coordenador</option>
            <option value="2">Subcoordenador</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Login</label>
          <input type="name" class="form-control" id="exampleFormControlInput1" placeholder="name">
        </div>
      </div>
    </div>
  </div>    
</template>

<script>
export default {
  name: "GerirCoordenadores",
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