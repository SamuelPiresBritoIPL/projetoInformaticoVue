<template>
  <div class="container-fluid">
    <h2>Gerir Confirmações das UC's</h2>
    <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="selectedCourse">
      <option value="null">Selecione um curso.</option>
      <option v-for="course in this.counterStore.courses" :key="course.id" v-bind:value="course.id">
      {{ "["+course.codigo+"] "+course.nome }}
      </option>
    </select>
    <div class="row">
      <div class="col-md-5">
        <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style="width: 100%; margin-top:5px;">
          <a class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
            <span class="fs-5 fw-semibold">Lista de pedidos</span>
          </a>
          <div class="list-group list-group-flush border-bottom scrollarea">
            <a v-for="pedido in this.counterStore.pedidosByCourse" :key="pedido.id" class="list-group-item list-group-item-action py-3 lh-tight" @click="openPedido(pedido)">
              <div class="d-flex w-100 align-items-center justify-content-between">
                <strong class="mb-1">{{ pedido.utilizador.login }}</strong>
                <small>{{ pedido.utilizador.nome }}</small>
              </div>
              <div class="col-10 mb-1 small">{{ pedido.utilizador.nome }}</div>
            </a>
            <a href="#" class="list-group-item list-group-item-action py-3 lh-tight">
              <div class="d-flex w-100 align-items-center justify-content-between">
                <strong class="mb-1">Número</strong>
                <small class="text-muted">Data</small>
              </div>
              <div class="col-10 mb-1 small">Nome</div>
            </a>
          </div>
        </div>
      </div>
      <div class="col-md-7">
          <a class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom" style="margin-top:5px;">
            <span class="fs-5 fw-semibold">Detalhes do pedido</span>
          </a>
          <div style="margin-left: 16px;">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Login:</label>
            <label class="col-sm-10 col-form-label">Todos</label>
            <label for="inputEmail3" class="col-sm-2 col-form-label">Nome:</label>
            <label class="col-sm-10 col-form-label">Todos</label>
            <label for="inputEmail3" class="col-sm-4 col-form-label" style="margin-top: 10px; margin-bottom: 10px;">Cadeiras requeridas:</label>
            <div v-for="cadeira in selectedPedido.cadeiras" :key="cadeira.id" style="margin-left: 30px;">
              <label class="form-check-label">
                {{ "["+cadeira.cadeira.codigo+"] "+cadeira.cadeira.nome }}
              </label>
              <input class="form-check-input" style="margin-left: 15px" type="checkbox" value="">
            </div>
            <div style="margin-left: 30px;">
              <label class="form-check-label">
                [codigo] nome cadeira
              </label>
              <input class="form-check-input" style="margin-left: 15px" type="checkbox" value="">
            </div>
            <label class="col-sm-2 col-form-label" style="margin-top: 15px;">Descrição:</label>
            <p>Texto descricao</p>
            <div style="text-align: center;">
              <button type="button" class="btn btn-primary" style="margin-right: 5px;">Aprovar</button>
              <button type="button" class="btn btn-danger">Rejeitar</button> 
            </div> 
          </div>
      </div>
    </div>
  </div>    
</template>

<script>
import { useCounterStore } from "../../stores/counter"
export default {
  name: "GerirConfirmacoes",
  component: {},
  setup() {
    const counterStore = useCounterStore()
    return { counterStore }
  },
  data() {
    return {
        selectedCourse: null,
        pedidoForm: false,
        selectedPedido: []
    };
  },
  methods: {
    openPedido(pedido){
      this.pedidoForm = true
      this.selectedPedido = pedido
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