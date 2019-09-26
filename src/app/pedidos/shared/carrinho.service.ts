import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { FirebasePath } from 'src/app/core/shared/firebase-path';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  getCarrinhoProdutosRef() {
    const path = `${FirebasePath.CARRINHO}${this.afAuth.auth.currentUser.uid}/${FirebasePath.PRODUTOS}`;
    return this.db.list(path);
  }

  insert(itemProduto: any) {
    return this.getCarrinhoProdutosRef().push(itemProduto);
  }

  carrinhoPossuiItens(){
    return this.getCarrinhoProdutosRef().snapshotChanges().pipe(
    map(changes => {
      return changes.length > 0
    })
    )
  }

}
