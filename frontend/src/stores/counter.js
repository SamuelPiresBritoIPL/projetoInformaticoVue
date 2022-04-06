import { defineStore } from 'pinia'
import axios from "axios";

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    courses: [],
    courseWithUCs: [],
    cadeiraToManage: [],
    aberturasByCourse: [],
    yearsCourse: [],
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
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
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
        let response = await axios.get("curso/cadeiras/" + courseId)
        this.courseWithUCs = response.data;
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
    }
  }
})
