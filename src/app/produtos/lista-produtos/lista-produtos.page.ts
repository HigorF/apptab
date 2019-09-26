import { CarrinhoService } from './../../pedidos/shared/carrinho.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutosService } from '../shared/produtos.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.page.html',
  styleUrls: ['./lista-produtos.page.scss'],
})
export class ListaProdutosPage implements OnInit {
produtos: Observable<any[]>;
categorias: Observable<any[]>;
categoriaSelecionada: string;
carrinhoPossuiItens: boolean = false;

  constructor(private router: Router,
              private produtosService: ProdutosService,
              private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.produtos = this.produtosService.getAll(null);
    this.categorias = this.produtosService.getcategoriasAll();
    this.carrinhoService.carrinhoPossuiItens().subscribe( (existemItens: boolean) => {
      this.carrinhoPossuiItens = existemItens;
    })
  }
//busca do produto pela categoria
  buscarProdutos(){
    this.produtos = this.produtosService.getAll(this.categoriaSelecionada);
  }
//o clique no produto que leva para adição de quantidade.
  adicionarProduto(produtoKey: string){
    this.router.navigate(['pedido/carrinho/novo-item/', produtoKey]);
  }

}
