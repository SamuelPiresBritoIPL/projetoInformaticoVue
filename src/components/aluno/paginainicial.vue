<template>
    <div class="container-fluid">
      <div style="text-align: center;">
        <h3 style="margin-top: 35px; margin-bottom: 15px;">Aplicação de Gestão de Inscrições nos Turnos</h3>
        <h5 v-if="counterStore.utilizadorLogado.length != 0">{{ "["+counterStore.utilizadorLogado.codigoCurso+"] "+counterStore.utilizadorLogado.curso }}</h5>
        <p class="card-title" style="text-align: center;">Ano Letivo: {{ counterStore.ano }}</p>
        <p class="card-title" style="margin-bottom: 15px; text-align: center;">Semestre: {{ counterStore.semestre }}</p>
      </div>
      <div class="row" style="text-align: center;">
        <div class="col-2">
        </div>
        <div class="col-8">
          <div class="card w-100" style="margin-bottom: 5px;">
            <div class="card-body">
              <h6 class="card-title">Página com as Unidades Currículares que o estudante pretende frequentar durante o semestre.</h6>
              <hr style="margin-bottom: 0px;">
              <small v-if="showInfoPUC" class="card-text">Nesta página é possível efetuar pedidos de adição de Unidades Curriculares à aplicação, no caso de ainda não o estarem.<br> Com o objetivo de possibilitar o estudante de se inscrever-se nos turnos sem perder a oportunidade. 
            <br>Durante o periodo definido pela coordenação de curso o aluno pode então requerir a adição da(s) UC('s) que pretender, justificando devidamente.<br> A coordenação posteriormente irá decidir justamente se aprova ou rejeita o 
            pedido.<br> </small>
              <div>
                <button @click="showInfoPUC = !showInfoPUC" type="button" class="btn btn-link" style="margin-top: 10px;">{{ !showInfoPUC ? "Saber mais..." : "Saber menos." }}</button>
              </div>
              <div v-if="!hasPedidos" class="alert alert-danger" role="alert" style="margin-left: 25px; margin-right: 25px; margin-top: 15px;">
                <p style="text-align: center;">Não existe nenhum periodo de pedidos de alteração de UC's definido.</p>
              </div>
              <div v-if="!isPedidosOpen && Object.keys(infoPedidos).length > 0" class="alert alert-info" role="alert" style="margin-left: 25px; margin-right: 25px; margin-top: 15px;">
                O periodo de Pedidos de Alteração de UC's <b>terá inicio</b> a <b>{{ infoPedidos.dataAbertura.replace(':00.000000Z', '').replace('T', ' ') }}h</b> ({{infoPedidos.menosdeumdia ? "falta "+infoPedidos.diasAteAbertura : (infoPedidos.diasAteAbertura == 1 ? "falta " + infoPedidos.diasAteAbertura + " dia." : "faltam " + infoPedidos.diasAteAbertura + " dias.") }})
              </div>
              <div v-if="isPedidosOpen && Object.keys(infoPedidos).length > 0" class="alert alert-success" role="alert" style="margin-left: 25px; margin-right: 25px; margin-top: 15px;">
                O periodo de Pedidos de Alteração de UC's <b>estará aberto</b> até a <b>{{ infoPedidos.dataAbertura.replace(':00.000000Z', '').replace('T', ' ') }}h</b> ({{infoPedidos.menosdeumdiatermino ? "falta "+infoPedidos.diasAteTerminar : (infoPedidos.diasAteTerminar == 1 ? "falta " + infoPedidos.diasAteTerminar + " dia." : "faltam " + infoPedidos.diasAteTerminar + " dias.") }})
              </div>
              <button type="button" class="btn btn-primary" style="width: 200px; margin-top: 10px;" @click="buttonUnidadesCurriculares()">Unidades Currículares</button>
            </div>
          </div>          
          <div class="card w-100">
            <div class="card-body">
              <h6 class="card-title">Página de Inscrição nos Turnos das Unidades Curriculares que pretende frequentar durante o semestre.</h6>
              <hr style="margin-bottom: 0px;">
              <small v-if="showInfoPIT" class="card-text">Nesta página é possível efetuar a inscrição nos turnos das Unidades Curriculares nas quais o estudante se encontra inscrito na aplicação, e no qual a coordenação do curso assim o definiu.
              <br>Durante o periodo definido para tal o estudante tem a liberdade de escolher os seus turnos consoante a disponibilidade das vagas e horário de cada turno.<br> </small>
              <div>
                <button @click="showInfoPIT = !showInfoPIT" type="button" class="btn btn-link" style="margin-top: 10px;">{{ !showInfoPIT ? "Saber mais..." : "Saber menos." }}</button>
              </div>
              <div v-if="!hasInscricoes" class="alert alert-danger" role="alert" style="margin-left: 25px; margin-right: 25px; margin-top: 15px;">
                <p style="text-align: center;">Não existe nenhum periodo de inscrições definido.</p>
              </div>
              <div v-if="infoInscricoes.length > 0 && !isInscricoesOpen" class="alert alert-info" role="alert" style="margin-left: 25px; margin-right: 25px; margin-top: 15px;">
                <div v-for="inscricao in infoInscricoes" :key="inscricao" style="text-align: center;">
                  O periodo de Inscrição nos Turnos para as UC´s <b>{{ inscricao.ano == 0 ? "de todos os anos" : "do ano "+inscricao.ano }}</b> terá <b>inicio</b> a <b>{{ inscricao.dataAbertura.replace(':00.000000Z', '').replace('T', ' ') }}h</b> ({{inscricao.menosdeumdia ? "falta "+inscricao.diasAteAbertura : (inscricao.diasAteAbertura == 1 ? "falta " + inscricao.diasAteAbertura + " dia." : "faltam " + inscricao.diasAteAbertura + " dias.") }})
                </div>
              </div>
              <div v-if="infoInscricoes.length > 0 && isInscricoesOpen" class="alert alert-success" role="alert" style="margin-left: 25px; margin-right: 25px; margin-top: 15px;">
                <div v-for="inscricao in infoInscricoes" :key="inscricao" style="text-align: center;">
                  O periodo de Inscrição nos Turnos <b>estará aberto</b> para <b>{{ inscricao.ano == 0 ? "todos os anos " : "o ano "+inscricao.ano }}</b> até a <b>{{ inscricao.dataEncerar.replace(':00.000000Z', '').replace('T', ' ') }}h</b> ({{inscricao.menosdeumdiatermino ? "falta "+inscricao.diasAteTerminar : (inscricao.diasAteTerminar == 1 ? "falta " + inscricao.diasAteTerminar + " dia." : "faltam " + inscricao.diasAteTerminar + " dias.") }})
                </div>
              </div>
              <button type="button" class="btn btn-primary" style="width: 200px; margin-top: 10px;" @click="buttonInscricaoTurnos()">Inscrição nos Turnos</button>
            </div>
          </div>
        </div> 
      </div>
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