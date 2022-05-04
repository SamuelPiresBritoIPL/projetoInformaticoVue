<template>
    <div class="container-fluid">
        <div class="row">
          <div class="col-md-1">
          </div>
          <div class="col-md-10">
            <br>
            <div class="card">
              <div class="card-body">
                <h5 class="card-title" style="margin-bottom: 25px; text-align: center;">Inscrição nos Turnos</h5>
                <p class="card-title" style="margin-bottom: 25px; text-align: center;">[9119] Licenciatura em Engenharia Informática</p>
                <hr>
                <div style="margin-top: 35px; text-align: left;">
                  <label class="col-sm-4 col-form-label"><strong>Unidade Curricular </strong>(código/nome)</label>   
                  <label class="col-sm-8 col-form-label"><strong>Turnos diponíveis </strong>(inscritos/vagas)</label>
                  <br><br>
                  <div v-for="(cadeira, cadeiraIndex) in cadeirasWithTurnos" :key="cadeira.cadeira.id">
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
                <div style="margin-top: 20px; text-align: center;">
                  <button type="button" class="btn btn-primary" @click="submitInscricao()">Submeter</button>
                </div>
              </div>
            </div>  
          </div>
        </div>
    </div> 
</template>

<script>
export default {
  name: "InscricaoTurnos",
  component: {},
  data() {
    return {
      cadeirasWithTurnos: [],
      arrayVmodel: [],
      allTurnosIds: [],
      showTurnosRejeitados: false,
      turnosRejeitados: []
    };
  },
  methods: {
    getCadeirasWithTurnos(){
      this.$axios.get("cadeirasaluno/utilizador/3134")
        .then((response) => {
          this.cadeirasWithTurnos = response.data;
          this.cadeirasWithTurnos.forEach((cadeira, index) => {
            console.log(cadeira)
            this.arrayVmodel.push([])
          });
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
            "idUtilizador": 3134,
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