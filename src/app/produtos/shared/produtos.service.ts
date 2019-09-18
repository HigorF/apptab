import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FirebasePath } from 'src/app/core/shared/firebase-path';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private db: AngularFireDatabase) { }

  getAll(categoriaKey: string = null) {
    return this.db.list(FirebasePath.PRODUTOS, q => {
      if (categoriaKey) {
        return q.orderByChild('categoriaKey').equalTo(categoriaKey);
      } else {
        return q.orderByChild('nome');
      }
    }).snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({key: m.payload.key, ...m.payload.val() }));
      })
    )
  }
}
