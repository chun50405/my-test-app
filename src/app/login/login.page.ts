import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  loginData: any = {}

  constructor(private router: Router, public alertController: AlertController) { }


  login() {
    console.log(this.loginData)
    let account = this.loginData.account
    let password = this.loginData.password
    if(account == 'test' && password == 'test') {
      this.router.navigate(['/tabs'])
    } else {
      this.presentAlert();
    }



  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Account or Password Wrong!!!',
      buttons: [
        {
          text: 'confirm',
          handler: () => {
            console.log('Confirm Ok')
          }
        }
      ]
    })

    await alert.present()
  }

  ngOnInit() {

  }

}
