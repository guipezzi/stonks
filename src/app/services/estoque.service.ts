import { Injectable } from '@angular/core';
import { IEstoque, createIEstoque } from 'src/models/estoque.model';
import { Firestore, addDoc, collection, collectionData, query, doc, setDoc, getDocs, deleteDoc, DocumentData, docSnapshots } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EstoqueService {
  private itens: IEstoque[] = [];

  constructor(public firestore: Firestore) {}
  public async add(novoItem: IEstoque): Promise<IEstoque> {
    const docRef = await addDoc(
      collection(this.firestore, 'Itens em Estoque'),
      {
        nome: novoItem.nome,
        marca: novoItem.marca,
        tipo: novoItem.tipo,
        quantidade: novoItem.quantidade,
        precoUnit: novoItem.precoUnit,
        estoqueMinimo: novoItem.estoqueMin,
      }
    );

    console.log('Documento salvo com o ID:', docRef.id);
    console.log('Salvar --> Novo Item', novoItem);
    this.itens.push(novoItem);
    return this.itens[this.itens.length - 1];
  }

  public getAll(): Observable<IEstoque[]> {
    const tCollection = collection(this.firestore, 'Itens em Estoque');
    return collectionData(tCollection, { idField: 'id' }).pipe(
      map((novoItem) => novoItem as IEstoque[])
    );
  }

  public delete(id: string): number {
    const index = this.getIndex(id);
    const document = doc(this.firestore, 'Itens em Estoque', id);
    deleteDoc(document);
    if (index >= 0) {
      this.itens.splice(index, 1);
    }
    return index;
  }

  get(id: string): Observable<IEstoque> {
    const document = doc(this.firestore, 'Itens em Estoque', id);
    return docSnapshots(document).pipe(
      map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as IEstoque;
      })
    );
  }
  public incrementQuant(id:string): number {
    
  }

  public getIndex(id: string): number {
    const index = this.itens.findIndex((obj) => {
      return obj.id === id;
    });
    return index;
  }
}
