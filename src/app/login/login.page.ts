import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  loginData: any = {}
  ApiUrl: string = 'https://localhost:5679/';
  constructor(private router: Router, private alertController: AlertController, private http: HttpClient) { }


  async login() {
    console.log(this.loginData)
    const loginInfo = {
      account: this.loginData.account,
      password: this.loginData.password
    }

    try {
      const result = await this.http.post(this.ApiUrl + 'user/login', loginInfo).toPromise();

      this.router.navigate(['/tabs'])

    } catch (error) {
      console.log('error =>', error)
      this.presentAlert(error.error)
    }

  }

  async presentAlert(errorMessage) {
    const alert = await this.alertController.create({
      header: '警告',
      message: errorMessage,
      buttons: [
        {
          text: '確定',
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

  //登入成功後清除登入資訊
  ionViewWillLeave() {
    this.loginData = {}
  }

}
