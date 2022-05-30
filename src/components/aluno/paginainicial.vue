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
              <small v-if="showInfoPUC" class="card-text">Nesta página é possível efetuar pedidos de adição de Unidades Curriculares à aplicação, no caso de ainda não o estarem.<br> Com o objetivo de possibilitar o estudante de se inscrever-se nos turnos sem perder a oportunidade. 
            <br>Durante o periodo definido pela coordenação de curso o aluno pode então requerir a adição da(s) UC('s) que pretender, justificando devidamente.<br> A coordenação posteriormente irá decidir justamente se aprova ou rejeita o 
            pedido.<br> </small>
              <div>
                <button @click="showInfoPUC = !showInfoPUC" type="button" class="btn btn-link">{{ !showInfoPUC ? "Saber mais..." : "Saber menos." }}</button>
              </div>
              <button type="button" class="btn btn-primary" style="width: 200px; margin-top: 10px;">Unidades Currículares</button>
            </div>
          </div>          
          <div class="card w-100">
            <div class="card-body">
              <h6 class="card-title">Página de Inscrição nos Turnos das Unidades Curriculares que pretende frequentar durante o semestre.</h6>
              <small v-if="showInfoPIT" class="card-text">Nesta página é possível efetuar a inscrição nos turnos das Unidades Curriculares nas quais o estudante se encontra inscrito na aplicação, e no qual a coordenação do curso assim o definiu.
              <br>Durante o periodo definido para tal o estudante tem a liberdade de escolher os seus turnos consoante a disponibilidade das vagas e horário de cada turno.<br> </small>
              <div>
                <button @click="showInfoPIT = !showInfoPIT" type="button" class="btn btn-link">{{ !showInfoPIT ? "Saber mais..." : "Saber menos." }}</button>
              </div>
              <button type="button" class="btn btn-primary" style="width: 200px; margin-top: 10px;">Inscrição nos Turnos</button>
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
      showInfoPIT: false
    };
  },
  methods: {
    
  },
  mounted() {}
}
</script>

<style>

</style>