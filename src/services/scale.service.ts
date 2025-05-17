import { Injectable } from '@angular/core';
import { DEFINICOES_ESCALAS, FormulaEscala } from '../definitions/escalas.definitions';

@Injectable({
  providedIn: 'root'
})
export class ScaleService {
  escalas:FormulaEscala[] = [];

  constructor() {
    this.escalas = this.getEscalasSalvas();
  }

  getEscalasSalvas():FormulaEscala[] {
    return [...DEFINICOES_ESCALAS];
  }

  getNomesEscalas(): string[] {
    return this.escalas.map((e)=> e.nome);
  }

  getFormulaByName(name:string):FormulaEscala {
    return this.escalas.find(e=> e.nome == name) as FormulaEscala;
  }

  gerarEscala(tonica:number, formula:number[]):number[] {
    if (!formula || formula.length === 0) {
      console.error('Formula de escala inválida.');
      return [];
    }
    if (tonica < 0 || tonica > 11) {
      console.error('Nota inválida');
      return [];
    }
    return formula.map(intervalo => (tonica + intervalo) % 12);
  }

  gerarEscalaByName(tonica:number, name:string) :number[] {
    const formula = this.getFormulaByName(name);
    if (! formula) {
      console.error(`Escala com nome ${name} não encontrada`);
      return [];
    }
    return this.gerarEscala(tonica, formula.formula);
  }

  createNewFormula(formula:FormulaEscala){
    DEFINICOES_ESCALAS.push(formula);
    this.escalas = this.getEscalasSalvas();
  }

}
