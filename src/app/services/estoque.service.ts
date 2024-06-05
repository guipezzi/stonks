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
      novoItem
    );

    console.log('Documento salvo com o ID:', docRef.id);
    novoItem.id = docRef.id; // Atribuir o ID gerado ao item
    this.itens.push(novoItem);
    return novoItem;
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
    const index = this.itens.findIndex((obj) => obj.id === id);
    return index;
  }

  public async update(item: IEstoque) {
    const itemRef = this.get(item.id);
    updateDoc(itemRef, { ...item });
  }

  // Métodos do Update
  getUpdate(id: string): Observable<IEstoque> {
    const document = doc(this.firestore, 'Itens em Estoque', id);
    return docSnapshots(document).pipe(
      map((doc) => {
        const data = doc.data();
        const item = { ...data } as IEstoque;
        item.id = id;
        return item;
      })
    );
  }

  public updateItem(estoque: IEstoque): IEstoque {
    console.log('Update Item', estoque);
    const index = this.getIndex(estoque.id);
    const document = this.get(estoque.id);
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
