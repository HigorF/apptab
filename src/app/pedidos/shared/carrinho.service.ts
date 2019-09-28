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

  //conexão da rota para adicionar o produto, concatenando a rota do carrinho/id do usuário/e o produto
  getCarrinhoProdutosRef() {
    const path = `${FirebasePath.CARRINHO}${this.afAuth.auth.currentUser.uid}/${FirebasePath.PRODUTOS}`;
    return this.db.list(path);
  }

  //insere o produto no carrinho
  insert(itemProduto: any) {
    return this.getCarrinhoProdutosRef().push(itemProduto);
  }

  //faz a consulta dentro do carrinho para saber se tem algum produto lá
  carrinhoPossuiItens(){
    return this.getCarrinhoProdutosRef().snapshotChanges().pipe(
    map(changes => {
      return changes.length > 0
    })
    )
  }

  //retorna o valor da operação
  calcularTotal(preco: number, quantidade: number){
    return preco * quantidade;
  }

  //encontra o produto pela key e recebe dados para serem alterados
  update(key: string, quantidade: number, total: number){
    return this.getCarrinhoProdutosRef(). update(key, {quantidade: quantidade, total: total})
  }

  //serve para remover o item selecionado, que o banco trás pela key
  remove(key: string){
    return this.getCarrinhoProdutosRef(). remove(key);
  }

  
  getAll(){
    return this.getCarrinhoProdutosRef(). snapshotChanges(). pipe(
      map(changes => {
        return changes.map(m => ({key: m.payload.key, ...m.payload.val() }) )
      })
    )
  }

  getTotalPedido(){
    return this.getCarrinhoProdutosRef(). snapshotChanges(). pipe(
      map(changes => {
        return changes
        .map( (m: any) => (m.payload.val(). total))
        .reduce( (prev: number, current: number) => {
          return prev + current;
        })
      })
    )
  }

  clear(){

  }

}
