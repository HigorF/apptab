import { Router } from '@angular/router';
import { UsuariosService } from './../shared/usuarios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
user: any = {};

  constructor(private usuariosService: UsuariosService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.usuariosService.getDadosUsuario();
  }

  sair(){
    this.usuariosService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
  }

}
