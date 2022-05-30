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
                <div v-if="this.buttonArray.length == 0 && noInscricoes && Object.keys(this.aberturas).length == 0" class="alert alert-danger" role="alert" style="margin-letf: 35px; margin-top: 35px;">
                  <p style="text-align: center;">Não existe nenhum periodo de inscrições definido.</p>
                </div>
                <div v-if="this.buttonArray.length == 0 && noInscricoes && Object.keys(this.aberturas).length > 0">
                  <div v-for="aberturaCurso in aberturas" :key="aberturaCurso">
                    <div v-for="aberturaAno in aberturaCurso" :key="aberturaAno.idCurso" style="text-align: center;">
                      <h4>{{ "["+aberturaAno.codigo+"] "+aberturaAno.nome }}</h4>
                      <div class="alert alert-info" role="alert" style="margin-letf: 35px; margin-top: 35px;">
                        O periodo de Inscrição nos Turnos para as UC´s <b>{{ aberturaAno.ano == 0 ? "de todos os anos" : "do ano "+aberturaAno.ano }}</b> terá <b>início</b> a <b>{{ aberturaAno.dataAbertura.replace(':00.000000Z', '').replace('T', ' ') }}h</b> ({{aberturaAno.menosdeumdia ? "falta "+aberturaAno.diasAteAbertura : (aberturaAno.diasAteAbertura == 1 ? "falta " + aberturaAno.diasAteAbertura + " dia." : "faltam " + aberturaAno.diasAteAbertura + " dias.") }})
                      </div> 
                    </div>
                  </div>
                </div>
                <div v-if="this.buttonArray.length > 0 && hasButtonSelected" style="text-align: center; margin-bottom: 25px;">
                  <small>Selecione o respetivo botão para iniciar com a inscrição nos turnos.</small>
                </div>
                <div v-for="(inscricaoucs, index) in cadeirasWithTurnosPorCurso" :key="inscricaoucs.id">
                  <div v-if="this.buttonArray.length > 0" style="margin-left: 85px; margin-right: 85px;">
                    <div v-for="aberturaCurso in aberturas" :key="aberturaCurso" style="text-align: center;">
                      <div v-if="(aberturaCurso[0].idCurso == index && noButtonSelectedMsgs) || (aberturaCurso[0].idCurso == index && buttonArray[index])">
                        <h4 style="margin-bottom: 15px;">{{ "["+aberturaCurso[0].codigo+"] "+aberturaCurso[0].nome }}</h4>
                        <div v-for="aberturaAno in aberturaCurso" :key="aberturaAno.idCurso" class="alert alert-success" role="alert">
                          O periodo de Inscrição nos Turnos <b>estará aberto</b> para <b>{{ aberturaAno.ano == 0 ? "todos os anos " : "o ano "+aberturaAno.ano }}</b> até a <b>{{ aberturaAno.dataEncerar.replace(':00.000000Z', '').replace('T', ' ') }}h</b> ({{aberturaAno.menosdeumdiatermino ? "falta "+aberturaAno.diasAteTerminar : (aberturaAno.diasAteTerminar == 1 ? "falta " + aberturaAno.diasAteTerminar + " dia." : "faltam " + aberturaAno.diasAteTerminar + " dias.") }})
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="hasButtonSelected">
                    <div style="text-align: center; margin-bottom: 25px;">
                      <button v-if="!buttonArray[index] && hasButtonSelected" type="button" class="btn btn-primary" @click="buttonArray[index] = !buttonArray[index]; noInscricoes = false; noButtonSelectedMsgs = false">Inscrever nos Turnos</button>
                    </div>
                  </div>
                  <div v-else>
                    <div style="text-align: center">
                      <button v-if="!buttonArray[index] && hasButtonSelected" type="button" class="btn btn-primary" @click="buttonArray[index] = !buttonArray[index]; noInscricoes = false; noButtonSelectedMsgs = false">Inscrever nos Turnos</button>
                    </div>
                  </div>
                  <div v-if="buttonArray[index]" style="margin-top: 15px; text-align: left; margin-bottom: 35px;">
                    <div v-for="(inscricaoucs, index2) in cadeirasWithTurnosPorCurso" :key="inscricaoucs.id">
                      <div v-if="index == index2">
                        <label class="col-5 col-form-label"><strong>Unidade Curricular </strong>(código/nome)</label>   
                        <label class="col-7 col-form-label"><strong>Turnos diponíveis </strong>(inscritos/vagas)</label>
                        <br>
                        <div v-for="(cadeira, cadeiraIndex) in inscricaoucs" :key="cadeira.cadeira.id">
                          <div v-if="cadeira.cadeira.turnos.length != 0">
                            <label class="col-5 col-form-label" style="vertical-align: middle; float: left;">{{ "["+cadeira.cadeira.codigo+"] "+cadeira.cadeira.nome }}</label>   
                            <label class="col-7 col-form-label">
                              <span v-for="(turno, index) in cadeira.cadeira.turnos" :key="turno" style="margin-right: 20px;">
                                <span style="margin-left: 10px;" v-for="(turnotipo) in turno" :key="turnotipo.id">
                                  <input class="form-check-input" type="radio" :value="turnotipo.id" v-model="arrayVmodel[cadeiraIndex][index]" style="margin-right: 3px" @click="clearRadio(cadeiraIndex, index, turnotipo.id)">
                                  <label class="form-check-label" :class="{redcolor: turnotipo.vagasocupadas >= turnotipo.vagastotal }">
                                    {{ turnotipo.numero == 0 ? turnotipo.tipo : turnotipo.tipo+turnotipo.numero }}<small> ({{ turnotipo.vagasocupadas }}/{{ turnotipo.vagastotal }})</small>
                                  </label>
                                </span>
                                <br>
                              </span>
                            </label>
                          </div>
                        </div>
                        <div style="margin-top: 20px; text-align: center;">
                          <button type="button" style="margin-right: 10px;" class="btn btn-warning" @click="clearRadios()">Limpar escolhas</button>
                          <button type="button" style="margin-right: 10px;" class="btn btn-primary" @click="submitInscricao()">Submeter</button>
                          <button v-if="buttonArray[index]" type="button" class="btn btn-primary" @click="buttonArray[index] = !buttonArray[index]; noButtonSelectedMsgs = true">Voltar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="!buttonArray[index] && noButtonSelectedMsgs && filterInscricoesInscritas(index).length > 0" style="text-align: center; margin-bottom: 35px;">
                    <h5>Turnos atualmente inscritos: </h5>
                    <p v-for="(inscricao) in filterInscricoesInscritas(index)" :key="inscricao.id">{{inscricao.nome + ": " + inscricao.tipo + inscricao.numero}}</p>
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
      cadeirasWithTurnosPorCursoWebSocket: [],
      isncricoes: [],
      aberturas: [],
      arrayVmodel: [],
      allTurnosIds: [],
      showTurnosRejeitados: false,
      turnosRejeitados: [],
      showInscricaoForm: false,
      buttonArray: [],
      buttonBlockArray: [],
      noInscricoes: false,
      myUCsIds: [],
      noButtonSelectedMsgs: true
    };
  },
  sockets: {
    newInscricao(response) {
      this.myUCsIds.forEach(myIdCadeira => {
        response.forEach(responseIdCadeira => {
          if (myIdCadeira == responseIdCadeira) {
            this.getCadeirasWithTurnosWebSocket()
            console.log(this.cadeirasWithTurnosPorCurso)
            return 
          }
        })
      });
    }
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
    filterInscricoesInscritas (idCurso) {
      return this.inscricoes.filter( inscricao => {
          return inscricao.idCurso == idCurso
      })
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
            inscricaoucs.forEach((cadeira, cadeiraIndex) => {
              this.buttonArray[cadeira.idCurso] = false
              this.arrayVmodel.push([])
              this.myUCsIds.push(cadeira.id)
              console.log(this.myUCsIds)
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
    getCadeirasWithTurnosWebSocket(){
      this.$axios.get("cadeirasaluno/utilizador")
        .then((response) => {
          this.cadeirasWithTurnosPorCursoWebSocket = response.data.cursos
          Object.values(this.cadeirasWithTurnosPorCurso).forEach((inscricaoucs) => {
            inscricaoucs.forEach((cadeira) => {
              Object.values(cadeira.cadeira.turnos).forEach((turno) => {
                turno.forEach((turnotipo, index) => {
                  Object.values(this.cadeirasWithTurnosPorCursoWebSocket).forEach((inscricaoucsNovo) => {
                    inscricaoucsNovo.forEach((cadeiraNovo) => {
                      Object.values(cadeiraNovo.cadeira.turnos).forEach((turnoNovo) => {
                        turnoNovo.forEach((turnotipoNovo, indexNovo) => {
                          if ((turnotipo.vagasocupadas != turnotipoNovo.vagasocupadas) && (index == indexNovo) && (turnotipo.id == turnotipoNovo.id)) {
                            turnotipo["vagasocupadas"] = turnotipoNovo.vagasocupadas
                          }
                        })
                      })
                    });
                  })
                })
              })
            });
          })
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
            if (response.data.rejeitados && response.data != 201) {
              this.showTurnosRejeitados = true
              this.turnosRejeitados = response.data.rejeitados
            }
            this.$socket.emit("newInscricao", response.data.idsCadeiras);
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
.redcolor {
  color:red;
}
</style>