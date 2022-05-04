import { defineStore } from 'pinia'
import axios from "axios";

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    selectedAnoletivo: null,
    semestre: null,
    anosletivos: [],
    courses: [],
    courseWithUCs: [],
    turnoToManage: null,
    aberturasByCourse: [],
    yearsCourse: [],
    pedidosByCourse: [],
    aberturaConfirmacaoTodos: [],
    aberturaConfirmacao123: [],
    aberturaConfirmacao1: [],
    aberturaConfirmacao2: [],
    aberturaConfirmacao3: [],
    aberturaInscricaoTodos: [],
    aberturaInscricao123: [],
    aberturaInscricao1: [],
    aberturaInscricao2: [],
    aberturaInscricao3: [],
    utilizadorLogado: []
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    async getAnosLetivos() {
      try {
        let response = await axios.get("anoletivo")
        this.anosletivos = response.data
        return response.data;
      } catch (error) {
        console.log(error.response)
        throw error
      }
    },
    async getCourses() {
      try {
        let response = await axios.get("curso")
        this.courses = response.data
        return response.data;
      } catch (error) {
        console.log(error.response)
        throw error
      }
    },
    async getCourseWithUCs(courseId){
      try {
        let response = await axios.get("curso/cadeiras/" + courseId + "/" + this.selectedAnoletivo + "/" + this.semestre)
        this.courseWithUCs = response.data;
      } catch {
        console.log(error.response);
        throw error
      }        
    },
    async getPedidosByCourse(courseId){
      if(this.pedidosByCourse.length != 0){
        this.pedidosByCourse = []
      }
      try {
        let response = await axios.get("curso/pedidos/" + courseId + "/1/2")
        this.pedidosByCourse = response.data;
      } catch {
        console.log(error.response);
        throw error
      }        
    },
    async getAberturasByCourse(courseId){
      try {
        let response = await axios.get("curso/aberturas/" + courseId + "/1/2")
        this.aberturasByCourse = response.data;
        this.yearsCourse = []
        for (let i = 0; i <= this.aberturasByCourse.totalanos; i++) {
          this.yearsCourse.push(i)
        }
        this.aberturaConfirmacaoTodos = []
        this.aberturaConfirmacao123 = []
        this.aberturaConfirmacao1 = []
        this.aberturaConfirmacao2 = []
        this.aberturaConfirmacao3 = []
        this.aberturaInscricaoTodos = []
        this.aberturaInscricao123 = []
        this.aberturaInscricao1 = []
        this.aberturaInscricao2 = []
        this.aberturaInscricao3 = []
        if(this.aberturasByCourse.aberturas.length != 0){
          this.aberturasByCourse.aberturas.forEach(abertura => {
            if(abertura.ano == 0 && abertura.tipoAbertura == 0){
              this.aberturaConfirmacaoTodos = abertura
            } else if(abertura.tipoAbertura == 0){
              this.aberturaConfirmacao123.push(abertura)
              if(abertura.ano == 1){
                this.aberturaConfirmacao1 = abertura
              } else if(abertura.ano == 2){
                this.aberturaConfirmacao2 = abertura
              } else if(abertura.ano == 3){
                this.aberturaConfirmacao3 = abertura
              }
            } else if(abertura.ano == 0 && abertura.tipoAbertura == 1){
              this.aberturaInscricaoTodos = abertura
            } else if(abertura.tipoAbertura == 1){
              this.aberturaInscricao123.push(abertura)
              if(abertura.ano == 1){
                this.aberturaInscricao1 = abertura
              } else if(abertura.ano == 2){
                this.aberturaInscricao2 = abertura
              } else if(abertura.ano == 3){
                this.aberturaInscricao3 = abertura
              }
            }
          });
        }
      } catch {
        console.log(error.response);
        throw error
      }
    },
    async login(credentials) {
        localStorage.removeItem("adminState");
        localStorage.removeItem("coordenadorState");
        localStorage.removeItem("professorState");
        localStorage.removeItem("alunoState");
      try {
        let response = await axios.post("login", credentials);
        console.log(response.data)
        if (response.data.access_token && response.data.tipo == 3) {
          sessionStorage.setItem("tokenAdmin", response.data.access_token);
          localStorage.setItem("adminState", true);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${sessionStorage.tokenAdmin}`;
        }
        if (response.data.access_token && response.data.tipo == 2) {
          sessionStorage.setItem("tokenCoordenador", response.data.access_token);
          localStorage.setItem("coordenadorState", true);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${sessionStorage.tokenCoordenador}`;
        }
        if (response.data.access_token && response.data.tipo == 1) {
          sessionStorage.setItem("tokenProfessor", response.data.access_token);
          localStorage.setItem("professorState", true);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${sessionStorage.tokenProfessor}`;
        }
        if (response.data.access_token && response.data.tipo == 0) {
          sessionStorage.setItem("tokenAluno", response.data.access_token);
          localStorage.setItem("alunoState", true);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${sessionStorage.tokenAluno}`;
        }
        this.utilizadorLogado = response.data
      } catch (error) {
        delete axios.defaults.headers.common.Authorization;
        sessionStorage.removeItem("tokenAdmin");
        localStorage.removeItem("adminState");
        sessionStorage.removeItem("tokenCoordenador");
        localStorage.removeItem("coordenadorState");
        sessionStorage.removeItem("tokenProfessor");
        localStorage.removeItem("professorState");
        sessionStorage.removeItem("tokenAluno");
        localStorage.removeItem("alunoState");
        this.utilizadorLogado = null
        console.log(error)
        throw error;
      }
    },
  }
})
