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
                  <label class="col-sm-4 col-form-label"><strong>Cadeira </strong>(código/nome)</label>   
                  <label class="col-sm-8 col-form-label"><strong>Turnos diponíveis </strong>(selecione um de cada tipo caso exista (TP, PL, T, P, E, OT))</label>
                  <br><br>
                  <div v-for="cadeira in cadeirasWithTurnos" :key="cadeira.cadeira.id">
                    <label class="col-sm-4 col-form-label">{{ "["+cadeira.cadeira.codigo+"] "+cadeira.cadeira.nome }}</label>   
                    <label class="col-sm-8 col-form-label">
                      <span v-for="turno in cadeira.cadeira.turnos" :key="turno" style="margin-right: 20px;">
                        <span v-for="turnotipo in turno" :key="turnotipo.id">
                          <input class="form-check-input" type="radio" :name="flexRadioDefault+turnotipo.tipo+cadeira.cadeira.nome" :value="turnotipo.id" v-model="turnosToSelect" style="margin-right: 3px">
                          <label class="form-check-label">
                            {{ turnotipo.numero == 0 ? turnotipo.tipo : turnotipo.tipo+turnotipo.numero+" " }}
                          </label>
                        </span>
                        <br>
                      </span>
                    </label>  
                  </div>
                </div>  
                <div style="margin-top: 20px; text-align: center;">
                  <button type="button" class="btn btn-primary">Submeter</button>
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
        cadeirasWithTurnos: []
    };
  },
  methods: {
    getCadeirasWithTurnos(){
      this.$axios.get("cadeiras/utilizador/5181")
        .then((response) => {
          this.cadeirasWithTurnos = response.data;
        })
        .catch((error) => {
          console.log(error.response);
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