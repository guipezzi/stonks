import { Injectable } from '@angular/core';
import { IEstoque, createIEstoque } from 'src/models/estoque.model';

@Injectable({
  providedIn: 'root',
})
export class EstoqueService {
  private itens: IEstoque[] = [];

  constructor() {}

  public getAll(): IEstoque[] {
    return this.itens;
  }
  
  public get(id: string): IEstoque {
    const resultado = this.itens.find((obj) => {
      return obj.id === id;
    });
    return resultado ? { ...resultado } : createIEstoque();
  }
  
  public add(novoItem: IEstoque): IEstoque {
    let uid: string = Date.now().toString(16);

    novoItem.id = uid;
    console.log('Salvar --> novaTarefa', novoItem);
    this.itens.push(novoItem);
    return this.itens[this.itens.length - 1];
  }
  
  public getIndex(id: string): number {
    const index = this.itens.findIndex((obj) => {
      return obj.id === id;
    });
    return index;
  }
  
  public update(estoque: IEstoque): IEstoque {
    const index = this.getIndex(estoque.id);

    if (index >= 0) {
      this.itens[index] = estoque;
      return this.itens[index];
    } else {
      return createIEstoque();
    }
  }

  public delete(id: string): number {
    const index = this.getIndex(id);
    if (index >= 0) {
      this.itens.splice(index, 1);
    }

    return index;
  }
}
