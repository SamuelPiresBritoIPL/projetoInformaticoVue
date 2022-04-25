<template>
  <div class="container-fluid">
    <h2 v-if="this.cadeira != null">Gerir Cadeira {{ this.cadeira.nome}}</h2>
    <div class="card text-center">
      <div class="card-body">
        <div v-if="this.cadeira != null" style="margin-bottom:20px;">
            <span style="margin-right: 35px; font-size: 20px;" class="" v-bind:class="{ 'turnoactive': activeTurno[0]}" @click="getStats()">Todos</span>
            <span style="margin-right: 35px; font-size: 20px;" class="" v-for="(turno,index) in this.cadeira.turnos" :key="turno" @click="getStatsTurno(turno.id)" v-bind:class="{ 'turnoactive': activeTurno[(index+1)]}">{{ turno.numero != 0 ? turno.tipo+turno.numero : turno.tipo }}</span>
          </div>
        <div class="row">
            <div class="col">
                <div class="card bg-light mb-3" style="max-width: 18rem;">
                    <div class="card-header card-title"><h6>Total de Inscritos</h6></div>
                    <div class="card-body">
                        {{this.totalinscritos}}
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card bg-light mb-3" style="max-width: 18rem;">
                    <div class="card-header"><h6>Não Repetentes</h6></div>
                    <div class="card-body">
                        {{this.totalnaorepetentes}}
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card bg-light mb-3" style="max-width: 18rem;">
                    <div class="card-header"><h6>Repetentes</h6></div>
                    <div class="card-body">
                        {{this.totalrepetentes}}
                    </div>
                </div>
            </div>
            <div class="col">
                <div v-if="this.totalnaoinscritos != null" class="card bg-light mb-3" style="max-width: 18rem;">
                    <div class="card-header"><h6>Não Inscritos</h6></div>
                    <div class="card-body">
                        {{this.totalnaoinscritos}}
                    </div>
                </div>
                <div v-else class="card bg-light mb-3" style="max-width: 18rem;">
                    <div class="card-header"><h6>Número de vagas</h6></div>
                    <div class="card-body">
                        {{this.totalinscritos + "/" + (this.nrvagasturno == null ? "-" : this.nrvagasturno)}}
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Atualizar dados</h5>
            <p class="card-text">cenas</p>
            <div class="card-body ">

            </div>
          </div>
        </div>
        <table class="table" style="text-align:left;">
          <thead>
            <tr>
              <th scope="col">Número</th>
              <th scope="col">Nome do Aluno</th>
              <th scope="col">Email</th>
              <th scope="col">Repetente </th>
              <th scope="col">Inscrito</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="aluno in dadosInscritos" :key="aluno">
              <td>{{ aluno.login }}</td>
              <td>{{ aluno.nome }}</td>
              <td></td>
              <td>{{ aluno.nrinscricoes == 1 ? "Não" : "Sim"}}</td>
              <td>{{ aluno.idTurno != null ? "Sim" : "Não" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>    
  <br><br>
</template>

<script>
import { useCounterStore } from "../../stores/counter"
export default {
  name: "GerirCadeira",
  component: {},
  setup() {
    const counterStore = useCounterStore()
    return { counterStore }
  },
  data() {
    return {
        dadosInscritos:[],
        totalinscritos:0,
        totalrepetentes:0,
        totalnaorepetentes:0,
        totalnaoinscritos:0,
        nrvagasturno:0,
        cadeira:null,
        activeTurno:[]
    };
  },
  methods: {
    getStats(){
      this.$axios.get("cadeiras/stats/"+this.$route.params.cadeiraId)
        .then((response) => {
          console.log(response.data);
          this.totalinscritos = response.data.totalinscritos
          this.totalrepetentes = response.data.totalrepetentes
          this.totalnaorepetentes = response.data.totalnaorepetentes
          this.totalnaoinscritos = response.data.totalnaoinscritos
          this.dadosInscritos = response.data.alunos
          this.activeTurno.forEach((value, index) => {
              this.activeTurno[index] = false
          });
          this.activeTurno[0] = true;
          console.log(this.dadosInscritos)
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    getStatsTurno(turnoid = this.counterStore.turnoToManage){
      this.$axios.get("turno/stats/"+turnoid)
        .then((response) => {
          console.log(response.data);
          this.totalinscritos = response.data.totalinscritos
          this.totalrepetentes = response.data.totalrepetentes
          this.totalnaorepetentes = response.data.totalnaorepetentes
          this.totalnaoinscritos = response.data.totalnaoinscritos
          this.dadosInscritos = response.data.alunos
          this.cadeira.turnos.forEach((value, index) => {
            if(value.id == turnoid){
              this.nrvagasturno = value.vagastotal
              this.activeTurno[index+1] = true
            }else{
              this.activeTurno[index+1] = false
            }
          });
          this.activeTurno[0] = false;
          console.log(this.dadosInscritos)
          console.log(this.dadosInscritos);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    getCadeiraInfo(){
      this.$axios.get("cadeiras/"+this.$route.params.cadeiraId)
        .then((response) => {
          console.log(response.data);
          this.cadeira = response.data
          this.activeTurno.splice(0)
          this.activeTurno.push(false)
          this.cadeira.turnos.forEach((value, index) => {
              this.activeTurno.push(false)
          });
          console.log(this.activeTurno)
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  },
  mounted() {
    this.getCadeiraInfo()
    if(this.counterStore.turnoToManage == null){
      this.getStats()
    }else{
      this.getStatsTurno()
    }
  },
};
</script>

<style>
.centered {
  position: absolute;
  left: 50%;
  margin-left: -100px;
}
.turnoactive {
  font-weight: bold;
  text-decoration: underline;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>