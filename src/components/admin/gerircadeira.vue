<template>
  <div class="container-fluid">
    <h2 v-if="this.cadeira != null">Gerir UC {{ this.cadeira.nome}}</h2>
    <h5 v-if="this.cadeira != null">{{ this.cadeira.curso.nome}}</h5>
    <div v-if="hasValue" class="card">
      <div class="card-body">
        <div v-if="this.cadeira != null" style="margin-bottom:20px;" class="text-center">
            <span style="margin-right: 35px; font-size: 20px;" class="hoverclick" v-bind:class="{ 'turnoactive': activeTurno[0]}" @click="getStats()">Todos</span>
            <span style="margin-right: 35px; font-size: 20px;" class="hoverclick" v-for="(turno,index) in this.cadeira.turnos" :key="turno" @click="getStatsTurno(turno.id)" v-bind:class="{ 'turnoactive': activeTurno[(index+1)]}">{{ turno.numero != 0 ? turno.tipo+turno.numero : turno.tipo }}</span>
          </div>
        <div class="row text-center">
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
        <div v-if="this.cadeira != null" class="card">
          <div class="card-body">
            <h5 class="card-title">Gerir</h5>
            <label for="exampleFormControlInput1" class="form-label">Adicionar aluno a unidade curricular</label>
            <div class="input-group mb-3">
              <input type="name" class="form-control" id="exampleFormControlInput1" placeholder="número/email" v-model="numeroadicionar">
              <div class="input-group-append">
                <button class="btn btn-primary" @click="addStudentToUC(numeroadicionar)">Adicionar</button>
              </div>
            </div>
            
            <label for="exampleFormControlInput1" class="form-label">Adicionar aluno a um turno</label>
            <div class="input-group mb-3">
              <input type="name" class="form-control" id="exampleFormControlInput2" placeholder="número/email" v-model="numeroadicionarTurno">
                <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="turnoescolhido">
                  <option v-for="turno in this.cadeira.turnos" :key="turno.id" v-bind:value="turno.id">{{ turno.numero != 0 ? turno.tipo+turno.numero : turno.tipo }}</option>
                </select>
              <div class="input-group-append">
                <button class="btn btn-primary" @click="addStudentToTurno(numeroadicionarTurno,turnoescolhido)">Adicionar</button>
              </div>
            </div>
            <div class="card" v-if="this.turno != null">
              <div class="card-body">
                <label for="exampleFormControlInput3" class="form-label">Alterar número de vagas</label>
                <div class="input-group mb-3">
                  <input type="number" class="form-control" id="exampleFormControlInput3" placeholder="número de vagas" v-model="turno.vagastotal">
                </div>
                <input type="checkbox" id="checkboxvisivel" v-model="turno.visivel" true-value="1" false-value="0">
                <label for="checkboxvisivel">Turno visivel</label>
                <br>
                <input type="checkbox" id="checkboxrepetentes" v-model="turno.repetentes" true-value="1" false-value="0">
                <label for="checkboxrepetentes">Turno aceita repetentes</label>
                <br>
                <button class="btn btn-primary text-right" @click="changeTurnoData()">Guardar Alterações</button>
              </div>
            </div>
          </div>
        </div>
        <br>
        <div v-if="this.turno == null" class="card">
          <div class="card-body">
            <h5 class="card-title">Alterar vagas turnos</h5>
            <label for="exampleFormControlInput1" class="form-label">Alterar vagas para todos os turnos ao mesmo tempo</label>
            <div v-for="info in turnoInfo" :key="info" class="input-group mb-3">
              <label class="col-sm-1 col-form-label">{{info.turno + " (" + info.numeroturnos + ")  "}}</label>
              <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="número de vagas" v-model="info.valor">
              <span class="col-form-label">&nbsp;&nbsp;{{"Média de vagas por turno: " + info.mediavagas}}</span>
            </div>
            <button class="float-end btn btn-primary text-right" @click="saveTurnoVagas()">Guardar número de vagas por turno</button>
          </div>
        </div>
        <br>
        <button v-if="this.turno != null" class="float-end btn btn-success text-right" @click="downloadExcel()">Download lista alunos (.xls)</button>
        <button v-else class="float-end btn btn-success text-right" @click="downloadExcelCadeira()">Download lista alunos (.xls)</button>
        <br>
        <br>
        <select v-if="this.turno != null" class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="turnoSelected">
          <option value="null">Selecione um turno.</option>
          <option v-for="(turno) in filteredArray" :key="turno.id" v-bind:value="turno.id">
          {{ turno.tipo + (turno.numero == 0 ? "" : turno.numero) }}
          </option>
        </select>
        <button v-if="this.turno != null" class="float-end btn btn-success text-right" @click="moverEstudantes()">Mover estudantes</button>
        <br>
        <table class="table" style="text-align:left;">
          <thead>
            <tr>
              <th scope="col">Número</th>
              <th scope="col">Nome do Aluno</th>
              <th scope="col">Email</th>
              <th scope="col">Repetente </th>
              <th scope="col">{{this.counterStore.turnoToManage == null ? "Inscrito Turno" : "Remover"}}</th>
              <th scope="col" v-if="this.counterStore.turnoToManage != null">Selecionado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(aluno,index) in dadosInscritos" :key="aluno">
              <td>{{ aluno.login }}</td>
              <td>{{ aluno.nome }}</td>
              <td></td>
              <td>{{ aluno.nrinscricoes == 1 ? "Não" : "Sim"}}</td>
              <td v-if="this.turno != null"> 
                <button class="btn btn-xs btn-danger" @click="deleteInscricao(aluno.id,index)">
                  <BootstrapIcon style="" icon="dash-circle"/>
                </button>
              </td>
              <td v-else>{{ aluno.idTurno != null ? "Sim" : "Não" }}</td>
              <td v-if="this.counterStore.turnoToManage != null">
                <input type="checkbox" :value="aluno.id" v-model="estudantesSelected">
              </td>
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
        numeroadicionarTurno:null,
        totalinscritos:0,
        totalrepetentes:0,
        totalnaorepetentes:0,
        totalnaoinscritos:0,
        nrvagasturno:0,
        cadeira:null,
        activeTurno:[],
        numeroadicionar: null,
        turnoescolhido: null,
        turnovisivel:0,
        turno: null,
        turnoInfo: [],
        turnorepetentes:0,
        estudantesSelected: [],
        turnoSelected: null,
    };
  },
  computed: {
    hasValue(){
      if (this.counterStore.selectedAnoletivo != null && this.counterStore.semestre != null) {
        this.getCadeiraInfo()
        if(this.counterStore.turnoToManage == null){
          this.getStats()
        }else{
          this.getStatsTurno()
        }
        return true
      } 
      return false
    },
    filteredArray() {
      return this.cadeira.turnos.filter(turno => turno.id != this.turno.id);
    },
  },
  methods: {
    getStats(){
      this.$axios.get("cadeiras/stats/"+this.$route.params.cadeiraId + "/" + this.counterStore.selectedAnoletivo)
        .then((response) => {
          this.totalinscritos = response.data.totalinscritos
          this.totalrepetentes = response.data.totalrepetentes
          this.totalnaorepetentes = response.data.totalnaorepetentes
          this.totalnaoinscritos = response.data.totalnaoinscritos
          this.dadosInscritos = response.data.alunos
          this.activeTurno.forEach((value, index) => {
              this.activeTurno[index] = false
          });
          this.activeTurno[0] = true;
          this.counterStore.turnoToManage = null
          this.turno = null
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    getStatsTurno(turnoid = this.counterStore.turnoToManage){
      this.$axios.get("turno/stats/"+turnoid)
        .then((response) => {
          this.totalinscritos = response.data.totalinscritos
          this.totalrepetentes = response.data.totalrepetentes
          this.totalnaorepetentes = response.data.totalnaorepetentes
          this.totalnaoinscritos = response.data.totalnaoinscritos
          this.dadosInscritos = response.data.alunos
          this.turno = response.data.turno
          this.cadeira.turnos.forEach((value, index) => {
            if(value.id == turnoid){
              this.nrvagasturno = value.vagastotal
              this.activeTurno[index+1] = true
            }else{
              this.activeTurno[index+1] = false
            }
          });
          this.activeTurno[0] = false;
          this.counterStore.turnoToManage = turnoid
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCadeiraInfo(){
      this.$axios.get("cadeiras/"+this.$route.params.cadeiraId+"/"+this.counterStore.selectedAnoletivo)
        .then((response) => {
          this.cadeira = response.data.cadeiras
          this.turnoInfo = response.data.info
          this.turnoInfo.forEach(function (element) {
            element.valor = null;
          });
          this.activeTurno.splice(0)
          this.activeTurno.push(false)
          this.cadeira.turnos.forEach((value, index) => {
              this.activeTurno.push(false)
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    addStudentToUC(){
      this.$axios.post("cadeiras/addaluno/"+this.cadeira.id, {
            "login": this.numeroadicionar
          })
        .then((response) => {
          this.$toast.success(response.data);
          if(this.counterStore.turnoToManage == null){
            this.getStats()
          }else{
            this.getStatsTurno()
          }
          this.numeroadicionar = null
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    addStudentToTurno(numeroadicionarTurno,turnoescolhido){
      this.$axios.post("cadeiras/addalunoturno/"+turnoescolhido, {
            "login": numeroadicionarTurno
          })
        .then((response) => {
          this.$toast.success(response.data);
          if(this.counterStore.turnoToManage == null){
            this.getStats()
          }else{
            this.getStatsTurno()
          }
          this.numeroadicionarTurno = null
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    changeTurnoData(){
      var objToSend = {
        "visivel": this.turno.visivel,
        "repetentes": this.turno.repetentes
      };
      if(this.turno.vagastotal != null){
        objToSend = {
          "visivel": this.turno.visivel,
          "repetentes": this.turno.repetentes,
          "vagastotal": this.turno.vagastotal
        };
      }
      this.$axios.put("turno/"+this.turno.id, objToSend)
        .then((response) => {
          this.$toast.success(response.data);
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    deleteInscricao(inscricaoid,indexTable){
      this.$axios.delete("cadeirasaluno/inscricao/" + inscricaoid)
        .then((response) => {
          this.getStatsTurno();
          this.$toast.success(response.data);
          this.dadosInscritos.splice(indexTable,1)
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    saveTurnoVagas(){
      //fazer o endpoint
      var dataToSend = [];
      var dataToSend2 = [];
      this.turnoInfo.forEach((value, index) => {
              dataToSend.push(value.turno)
              dataToSend2.push(value.valor)
          });
      this.$axios.put("cadeiras/turnovagas/" + this.cadeira.id + "/" + this.counterStore.selectedAnoletivo, {
            "tipoturno": dataToSend,
            "vagas": dataToSend2
          }).then((response) => {
          this.$toast.success(response.data);
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    downloadExcel(){
      this.$axios.get("turno/export/" + this.counterStore.turnoToManage, {
            headers: {"Accept": "application/vnd.ms-excel"},
            responseType: "blob"
          })
        .then((response) => {
          //let filename = response.headers['content-disposition'].split('filename=')[1];
          const url = URL.createObjectURL(new Blob([response.data], {
              type: 'application/vnd.ms-excel'
          }))
          const link = document.createElement('a')
          link.href = url
          console.log(this.turno)
          link.setAttribute('download', "turnos_" + this.turno.tipo + (this.turno.numero == 0 ? "" : this.turno.numero) + "_" + this.turno.cadeira.nome + ".xls")
          document.body.appendChild(link)
          link.click()
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    downloadExcelCadeira(){
      console.log(this.cadeira)
      this.$axios.get("cadeirasprofessor/export/" + this.cadeira.id, {
            headers: {"Accept": "application/vnd.ms-excel"},
            responseType: "blob"
          })
        .then((response) => {
          //let filename = response.headers['content-disposition'].split('filename=')[1];
          const url = URL.createObjectURL(new Blob([response.data], {
              type: 'application/vnd.ms-excel'
          }))
          const link = document.createElement('a')
          link.href = url
          console.log(this.turno)
          link.setAttribute('download', this.cadeira.nome + ".xls")
          document.body.appendChild(link)
          link.click()
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    moverEstudantes(){
      console.log(this.estudantesSelected)
      this.$axios.put("cadeiras/mudarturno/"+this.turnoSelected, {
          "inscricaoIds": this.estudantesSelected
        })
        .then((response) => {
          this.$toast.success(response.data)
          this.estudantesSelected = []
          console.log(this.estudantesSelected)
          this.getStatsTurno(this.turno.id)
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    }
  },
  mounted() {
   
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
.hoverclick:hover{
  cursor: pointer;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>