import { AlertService } from './../../core/shared/alert.service';
import { CarrinhoService } from './../shared/carrinho.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-item-pedido',
  templateUrl: './lista-item-pedido.page.html',
  styleUrls: ['./lista-item-pedido.page.scss'],
})
export class ListaItemPedidoPage implements OnInit {
itensPedido: Observable<any[]>;
total: number;

  constructor(private carrinhoService: CarrinhoService, private alert: AlertService) { }

  ngOnInit() {
    //trás os dados do carrinho, focando na key do produto
    this.itensPedido = this.carrinhoService.getAll();
    this.getTotalPedido();
  }

  //exibir o valor de cada item no carrinho.
  getTotalPedido(){
    const subscribe = this.carrinhoService.getTotalPedido(). subscribe( (total: number) => {
      subscribe.unsubscribe();
      this.total = total;
    })
  }

  //é a adição da quantidade do produto
  adicionarQuantidade(itemPedido: any){
    let qtd = itemPedido.quantidade;
    qtd++;

    this.atualizarTotal(itemPedido, qtd);
  }

  //remove quantidade de produtos/caso a quantidade chegar a zero irá fazer a remoção do produto do carrinho
  removerQuantidade(itemPedido: any){
    let qtd = itemPedido.quantidade;
    qtd--;

    if (qtd <=0){
      this.removerProduto(itemPedido);
    } else {
      this.atualizarTotal(itemPedido, qtd);
    }
  }

  //atualiza o preço total do pedido, a soma de todo o carrinho
  atualizarTotal(itemPedido: any, quantidade: number){
    const total = this.carrinhoService.calcularTotal(itemPedido.produtoPreco, quantidade);
    this. carrinhoService.update(itemPedido.key, quantidade, total);
    this.getTotalPedido();
  }

  //metodo que remove o item caso chegue a "0" a quantidade
  removerProduto(itemPedido: any){
    this.alert.ShowConfirmaExclusao(itemPedido.produtoNome, () =>{
      this.carrinhoService.remove(itemPedido.key);
      this.getTotalPedido();
    })
}

}
