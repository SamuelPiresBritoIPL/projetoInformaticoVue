<template>
    <div class="container-fluid">
        <div class="row">
          <div class="col-md-1">
          </div>
          <div class="col-md-10">
            <br>
            <div class="card">
              <div class="card-body">
                <h5 class="card-title" style="margin-bottom: 20px; text-align: center;">Inscrição nos Turnos</h5>
                <p class="card-title" style="text-align: center;">Ano Letivo: {{ counterStore.ano }}</p>
                <p class="card-title" style="margin-bottom: 25px; text-align: center;">Semestre: {{ counterStore.semestre }}</p>
                <hr>
                <p v-if="this.cadeirasWithTurnosPorCurso.length == 0" style="text-align: center;">Não existe nenhum periodo de inscrições aberto.</p>
                <div v-for="(inscricaoucs, index) in cadeirasWithTurnosPorCurso" :key="inscricaoucs.id">
                  <button v-if="!buttonArray[index] && hasButtonSelected" type="button" class="btn btn-primary" style="text-align: center;" @click="buttonArray[index] = !buttonArray[index]">{{ inscricaoucs[0].nomeCurso }}</button>
                  <div v-if="buttonArray[index]" style="margin-top: 35px; text-align: left;">
                    <label class="col-sm-4 col-form-label"><strong>Unidade Curricular </strong>(código/nome)</label>   
                    <label class="col-sm-8 col-form-label"><strong>Turnos diponíveis </strong>(inscritos/vagas)</label>
                    <br><br>
                    <div v-for="(inscricaoucs, index2) in cadeirasWithTurnosPorCurso" :key="inscricaoucs.id">
                      <div v-if="index == index2">
                        <h5>{{ inscricaoucs[0].nomeCurso }}</h5>
                        <div v-for="(cadeira, cadeiraIndex) in inscricaoucs" :key="cadeira.cadeira.id">
                          <div v-if="cadeira.cadeira.turnos.length != 0">
                            <label class="col-sm-4 col-form-label" style="vertical-align: middle; float: left;">{{ "["+cadeira.cadeira.codigo+"] "+cadeira.cadeira.nome }}</label>   
                            <label class="col-sm-8 col-form-label">
                              <span v-for="(turno, index) in cadeira.cadeira.turnos" :key="turno" style="margin-right: 20px;">
                                <span style="margin-left: 10px;" v-for="(turnotipo) in turno" :key="turnotipo.id">
                                  <input class="form-check-input" type="radio" :value="turnotipo.id" v-model="arrayVmodel[cadeiraIndex][index]" style="margin-right: 3px">
                                  <label class="form-check-label">
                                    {{ turnotipo.numero == 0 ? turnotipo.tipo : turnotipo.tipo+turnotipo.numero }}<small> (0/30)</small>
                                  </label>
                                </span>
                                <br>
                              </span>
                            </label>
                          </div>
                        </div>
                        <div style="margin-top: 20px; text-align: center;">
                          <button type="button" class="btn btn-primary" @click="submitInscricao()">Submeter</button>
                        </div>
                      </div>
                    </div>
                    <button v-if="buttonArray[index]" type="button" class="btn btn-primary" @click="buttonArray[index] = !buttonArray[index]">Voltar</button>
                  </div>
                </div> 
                <div v-if="showTurnosRejeitados == true" style="color: red">
                  <hr>
                  <div>Turnos Rejeitados por falta de Vagas:
                    <div v-for="turnoRejeitado in turnosRejeitados" :key="turnoRejeitado">
                      <small>
                        Turno - {{ turnoRejeitado.tipo }} (UC: {{ turnoRejeitado.cadeira }} / Curso: {{ turnoRejeitado.curso }})
                      </small> 
                    </div>
                  </div>
                  <hr>
                </div> 
              </div>
            </div>  
          </div>
        </div>
    </div> 
</template>

<script>
import { useCounterStore } from "../../stores/counter"
export default {
  name: "InscricaoTurnos",
  component: {},
  setup() {
    const counterStore = useCounterStore()
    return { counterStore }
  },
  data() {
    return {
      cadeirasWithTurnosPorCurso: [],
      arrayVmodel: [],
      allTurnosIds: [],
      showTurnosRejeitados: false,
      turnosRejeitados: [],
      showInscricaoForm: false,
      buttonArray: [],
      buttonBlockArray: []
    };
  },
  computed: {
    hasButtonSelected(){
      for (let index = 0; index < this.buttonArray.length; index++) {
        if (this.buttonArray[index] == true) {
          console.log(this.buttonArray[index])
          return false
        }
      }
      return true
    }
  },
  methods: {
    getCadeirasWithTurnos(){
      this.$axios.get("cadeirasaluno/utilizador")
        .then((response) => {
          this.cadeirasWithTurnosPorCurso = response.data;
          console.log(this.cadeirasWithTurnosPorCurso)
          Object.values(this.cadeirasWithTurnosPorCurso).forEach((inscricaoucs, index) => {
            this.buttonArray.push(false)
            inscricaoucs.forEach((cadeira, index) => {
              console.log(cadeira)
              this.arrayVmodel.push([])
            });
          })
          console.log(this.buttonArray)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitInscricao(){
      this.turnosRejeitados = null
      this.arrayVmodel.forEach((cadeira) => {
        if (cadeira.TP != undefined) {
          this.allTurnosIds = this.allTurnosIds.concat(cadeira.TP)
        }
        if (cadeira.PL != undefined) {
          this.allTurnosIds = this.allTurnosIds.concat(cadeira.PL)
        }
        if (cadeira.T != undefined) {
          this.allTurnosIds = this.allTurnosIds.concat(cadeira.T)  
        }
        if (cadeira.P != undefined) {
          this.allTurnosIds = this.allTurnosIds.concat(cadeira.P)
        }
        if (cadeira.E != undefined) {
          this.allTurnosIds = this.allTurnosIds.concat(cadeira.E)
        }
        if (cadeira.OT != undefined) {
          this.allTurnosIds = this.allTurnosIds.concat(cadeira.OT)
        }   
      });
      this.$axios.post("cadeirasaluno/inscricao", {
            "idUtilizador": this.counterStore.utilizadorLogado.id,
            "turnosIds": this.allTurnosIds
          })
        .then((response) => {
            this.$toast.success("Inscrição feita com sucesso");
            if (response.data) {
              this.showTurnosRejeitados = true
              this.turnosRejeitados = response.data
            }
            this.allTurnosIds = []
        })
        .catch((error) => {
          this.$toast.error("Não foi possível inscrever! " + error.response.data);
          this.allTurnosIds = []
        });
    }
  },
  mounted() {
    this.getCadeirasWithTurnos()
  }
}
</script>

<style>

</style>