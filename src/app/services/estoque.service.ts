import { Injectable } from '@angular/core';
import { IEstoque, createIEstoque } from 'src/models/estoque.model';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  query,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  DocumentData,
  docSnapshots,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable, lastValueFrom } from 'rxjs';
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
        estoqueMin: novoItem.estoqueMin,
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
    const document = this.get(id);
    deleteDoc(document);
    if (index >= 0) {
      this.itens.splice(index, 1);
    }
    return index;
  }

  public get(id: string) {
    return doc(this.firestore, 'Itens em Estoque', id);
  }

  public getIndex(id: string): number {
    const index = this.itens.findIndex((obj) => {
      return obj.id === id;
    });
    return index;
  }

  public async update(item: IEstoque) {
    const itemRef = this.get(item.id);
    updateDoc(itemRef, { ...item });
  }

  //Métodos do Update
  getUpdate(id: string): Observable<IEstoque> {
    const document = doc(this.firestore, 'Itens em Estoque', id);
    return docSnapshots(document).pipe(
      map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as IEstoque;
      })
    );
  }

  public updateItem(estoque: IEstoque): IEstoque {
    const index = this.getIndex(estoque.id);
    const document = doc(this.firestore, 'Itens em Estoque', estoque?.id);
    const { id, ...data } = estoque;
    setDoc(document, data);
    if (index >= 0) {
      this.itens[index] = estoque;
      return this.itens[index];
    } else {
      return createIEstoque();
    }
  }
}
