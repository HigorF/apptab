import { ToastService } from './../../core/shared/toast.service';
import { CarrinhoService } from './../shared/carrinho.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from 'src/app/produtos/shared/produtos.service';

@Component({
  selector: 'app-form-item-pedido',
  templateUrl: './form-item-pedido.page.html',
  styleUrls: ['./form-item-pedido.page.scss'],
})
export class FormItemPedidoPage implements OnInit {
produto: any = {}
form: FormGroup;
total: number = 0;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
              private router: Router, private produtosService: ProdutosService,
              private carrinhoService: CarrinhoService,
              private toast: ToastService) { }

  ngOnInit(){
    this.criarFormulario();
    let key = this.route.snapshot.paramMap.get('key');
    if (key) {
      const subscribe = this.produtosService.getByKey(key).subscribe( (produto: any) => {
        subscribe.unsubscribe();
        this.produto = produto;

        this.form.patchValue({
          produtoKey: produto.key,
          produtoNome: produto.nome,
          produtoDescricao: produto.descricao,
          produtoPreco: produto.preco,
          quantidade: 1
        })
        this.executaCalcularTotal();

      })
    }
  }

  criarFormulario() {
    this.form = this.formBuilder.group({
      produtoKey: [''],
      produtoNome: [''],
      produtoDescricao: [''],
      produtoPreco: [''],
      quantidade: [''],
      observacao: [''],
      total: ['']
    })
  }

  executaCalcularTotal(){
    this.atualizaTotal(this.form.value.quantidade);
  }

  adicionarQuantidade(){
    let qtd = this.form.value.quantidade;
    qtd++;
    this.atualizaTotal(qtd);
  }

  removerQuantidade(){
    let qtd = this.form.value.quantidade;
    qtd--;
    if(qtd <=0)
      qtd=1;
    
    this.atualizaTotal(qtd);
  }

  atualizaTotal(quantidade: number){
    this.total = this.produto.preco * quantidade;
    this.form.patchValue({quantidade:quantidade, total: this.total});
  }

  onSubmit(){

  }

}
