<template>
    <div class="container-fluid row">
        <h3 style="text-align: center; margin-top: 35px; margin-bottom: 35px;">Projeto Aplicação Web para Inscrição nos Turnos</h3>
        <hr style="margin-bottom: 25px;">
        <div class="row">
            <div class="col-md-2"></div>
            <div class="card border-info col-md-8" style="max-width: 70%; padding: 0px;">
                <div class="card-header bg-info text-white"><h3 style="text-align: center; margin-top: 15px; margin-bottom: 15px;">Autores</h3></div>
                <div class="card-body" style="text-align: center; font-size: 16px;">
                    <p style="margin-top: 15px;">2191727 - Francisco Melicais</p>
                    <p>2191740 - Daniel Sarreira</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2"></div>
            <div class="card border-info col-md-8" style="max-width: 70%; padding: 0px;">
                <div class="card-header bg-info text-white"><h4 style="text-align: center; margin-top: 15px; margin-bottom: 15px;">Manutenção e Suporte</h4></div>
                <div class="card-body" style="text-align: center; font-size: 16px;">
                    <p style="margin-top: 15px;">suporte@DEI</p>
                </div>
            </div>
        </div>
        <p style="text-align: center; margin-top: 25px; font-size: 18px;">Trabalho desenvolvido no âmbito da UC de Projeto Informático, do curso de Engenharia Informática.</p>
    </div> 
</template> 

<script>
import { useCounterStore } from "../../stores/counter"
export default {
  name: "PaginaInicial",
  component: {},
  setup() {
    const counterStore = useCounterStore()
    return { counterStore }
  },
  data() {
    return {
      showInfoPUC: false,
      showInfoPIT: false,
      infoPedidos: [],
      infoInscricoes: [],
      isPedidosOpen: false,
      isInscricoesOpen: false,
      hasInscricoes: true,
      hasPedidos: true
    };
  },
  methods: {
    getInfoPedidos(){
      this.$axios.get("cadeirasaluno/infoperiodos")
        .then((response) => {
          console.log(response.data)
          this.infoPedidos = response.data.infoPedidos
          this.infoInscricoes = response.data.infoInscricoes
          this.isPedidosOpen = response.data.isPedidosOpen
          this.isInscricoesOpen = response.data.isInscricoesOpen
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          if (this.infoInscricoes.length == 0) {
            this.hasInscricoes = false
          }
          if (Object.keys(this.infoPedidos).length == 0) {
            this.hasPedidos = false
          }
        })
    },
    buttonUnidadesCurriculares(){
      this.$router.push("/confirmacaoucs");
    },
    buttonInscricaoTurnos(){
      this.$router.push("/inscricaoturnos");
    }
  },
  mounted() {
    this.getInfoPedidos()
  }
}
</script>

<style>

</style>