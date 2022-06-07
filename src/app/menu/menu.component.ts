import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private menu: MenuController, private router: Router) { }


  openMenu() {
    this.menu.open()
  }

  logout() {
    this.router.navigate(['/login'])
  }

  ngOnInit() {}

}
