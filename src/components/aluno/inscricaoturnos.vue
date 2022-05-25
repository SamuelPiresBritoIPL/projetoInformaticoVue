<template>
    <div class="container-fluid">
        <div class="row">
          <div class="col-md-1">
          </div>
          <div class="col-md-10">
            <br>
            <div class="card">
              <div class="card-body">
                <h3 class="card-title" style="margin-bottom: 20px; text-align: center;">Inscrição nos Turnos</h3>
                <p class="card-title" style="text-align: center;">Ano Letivo: {{ counterStore.ano }}</p>
                <p class="card-title" style="margin-bottom: 25px; text-align: center;">Semestre: {{ counterStore.semestre }}</p>
                <hr>
                <p v-if="this.buttonArray.length == 0 && noInscricoes && Object.keys(this.aberturas).length == 0" style="text-align: center;">Não existe nenhum periodo de inscrições definido.</p>
                <div v-if="this.buttonArray.length == 0 && noInscricoes && Object.keys(this.aberturas).length > 0">
                  <div v-for="aberturaCurso in aberturas" :key="aberturaCurso">
                    <div v-for="aberturaAno in aberturaCurso" :key="aberturaAno.idCurso" style="text-align: center;">
                      <h6>{{ "["+aberturaAno.codigo+"] "+aberturaAno.nome }}</h6>
                      <p>O periodo de Inscrição nos Turnos para as UC´s {{ aberturaAno.ano == 0 ? "de todos os anos" : "do ano "+aberturaAno.ano }} terá inicio a {{ aberturaAno.dataAbertura.replace(':00.000000Z', '').replace('T', ' ') }}h ({{aberturaAno.menosdeumdia ? "falta "+aberturaAno.diasAteAbertura : (aberturaAno.diasAteAbertura == 1 ? "falta " + aberturaAno.diasAteAbertura + " dia." : "faltam " + aberturaAno.diasAteAbertura + " dias.") }})</p>
                    </div>
                  </div>
                </div>
                <div v-if="this.buttonArray.length > 0 && hasButtonSelected" style="text-align: center; margin-bottom: 25px;">
                  <small>Selecione o respetivo botão para iniciar com a inscrição nos turnos.</small>
                </div>
                <div v-for="(inscricaoucs, index) in cadeirasWithTurnosPorCurso" :key="inscricaoucs.id">
                  <div v-if="this.buttonArray.length > 0">
                    <div v-for="aberturaCurso in aberturas" :key="aberturaCurso">
                      <div v-for="aberturaAno in aberturaCurso" :key="aberturaAno.idCurso" style="text-align: center;">
                        <h6>{{ "["+aberturaAno.codigo+"] "+aberturaAno.nome }}</h6>
                        <p>O periodo de Inscrição nos Turnos estará aberto até a {{ aberturaAno.dataEncerar.replace(':00.000000Z', '').replace('T', ' ') }}h ({{aberturaAno.menosdeumdiatermino ? "falta "+aberturaAno.diasAteTerminar : (aberturaAno.diasAteTerminar == 1 ? "falta " + aberturaAno.diasAteTerminar + " dia." : "faltam " + aberturaAno.diasAteTerminar + " dias.") }})</p>
                      </div>
                    </div>
                  </div>
                  <div style="text-align: center;">
                    <button v-if="!buttonArray[index] && hasButtonSelected" type="button" class="btn btn-primary" @click="buttonArray[index] = !buttonArray[index]; noInscricoes = false">Inscrever nos Turnos</button>
                  </div>
                  <div v-if="buttonArray[index]" style="margin-top: 15px; text-align: left;">
                    <div v-for="(inscricaoucs, index2) in cadeirasWithTurnosPorCurso" :key="inscricaoucs.id">
                      <div v-if="index == index2">
                        <label class="col-sm-4 col-form-label"><strong>Unidade Curricular </strong>(código/nome)</label>   
                        <label class="col-sm-8 col-form-label"><strong>Turnos diponíveis </strong>(inscritos/vagas)</label>
                        <br>
                        <div v-for="(cadeira, cadeiraIndex) in inscricaoucs" :key="cadeira.cadeira.id">
                          <div v-if="cadeira.cadeira.turnos.length != 0">
                            <label class="col-sm-4 col-form-label" style="vertical-align: middle; float: left;">{{ "["+cadeira.cadeira.codigo+"] "+cadeira.cadeira.nome }}</label>   
                            <label class="col-sm-8 col-form-label">
                              <span v-for="(turno, index) in cadeira.cadeira.turnos" :key="turno" style="margin-right: 20px;">
                                <span style="margin-left: 10px;" v-for="(turnotipo) in turno" :key="turnotipo.id">
                                  <input class="form-check-input" type="radio" :value="turnotipo.id" v-model="arrayVmodel[cadeiraIndex][index]" style="margin-right: 3px" @click="clearRadio(cadeiraIndex, index, turnotipo.id)">
                                  <label class="form-check-label">
                                    {{ turnotipo.numero == 0 ? turnotipo.tipo : turnotipo.tipo+turnotipo.numero }}<small> ({{ turnotipo.vagasocupadas }}/{{ turnotipo.vagastotal }})</small>
                                  </label>
                                </span>
                                <br>
                              </span>
                            </label>
                          </div>
                        </div>
                        <div style="margin-top: 20px; text-align: center;">
                          <button type="button" class="btn btn-warning" @click="clearRadios()">Limpar escolhas</button>
                          <button type="button" class="btn btn-primary" @click="submitInscricao()">Submeter</button>
                          <button v-if="buttonArray[index]" type="button" class="btn btn-primary" @click="buttonArray[index] = !buttonArray[index]">Voltar</button>
                        </div>
                      </div>
                    </div>
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
      isncricoes: [],
      aberturas: [],
      arrayVmodel: [],
      allTurnosIds: [],
      showTurnosRejeitados: false,
      turnosRejeitados: [],
      showInscricaoForm: false,
      buttonArray: [],
      buttonBlockArray: [],
      noInscricoes: false
    };
  },
  computed: {
    hasButtonSelected(){
      for (let index = 0; index < this.buttonArray.length; index++) {
        if (this.buttonArray[index] == true) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    clearRadio(cadeiraIndex, index, turnotipoId){
      if (this.arrayVmodel[cadeiraIndex][index] == turnotipoId) {
        this.arrayVmodel[cadeiraIndex][index] = []
      }
    },
    clearRadios(){
      for (let i = 0; i < this.arrayVmodel.length; i++) {
        this.arrayVmodel[i] = []
      }
      //para ir buscar turnos ja inscritos
      //this.getCadeirasWithTurnos()
    },
    getCadeirasWithTurnos(){
      this.$axios.get("cadeirasaluno/utilizador")
        .then((response) => {
          this.cadeirasWithTurnosPorCurso = response.data.cursos
          this.inscricoes = response.data.inscricoes
          this.aberturas = response.data.aberturas
          Object.values(this.cadeirasWithTurnosPorCurso).forEach((inscricaoucs, index3) => {
            this.buttonArray.push(false)
            inscricaoucs.forEach((cadeira, cadeiraIndex) => {
              this.arrayVmodel.push([])
              Object.values(cadeira.cadeira.turnos).forEach((turno, index) => {
                turno.forEach((turnotipo, index2) => {
                  this.inscricoes.forEach((inscricao) => {
                    if (cadeira.id == inscricao.idCadeira && turnotipo.id == inscricao.id && turnotipo.tipo === inscricao.tipo ) {
                      this.arrayVmodel[cadeiraIndex][inscricao.tipo] = inscricao.id
                    }
                  })
                })
              })
            });
          })
          this.noInscricoes = true
          console.log(this.cadeirasWithTurnosPorCurso)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitInscricao(){
      this.turnosRejeitados = null
      console.log(this.arrayVmodel)
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
            if (response.data && response.data != 201) {
              this.showTurnosRejeitados = true
              this.turnosRejeitados = response.data
              console.log(this.turnosRejeitados)
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