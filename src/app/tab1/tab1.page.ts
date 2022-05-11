import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, delay } from 'rxjs/operators';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  ApiUrl: string = 'https://localhost:3100/';
  userList:any
  sexList:any
  constructor(private http: HttpClient) {}



   getUser() {
    return this.http.get(this.ApiUrl + 'medicalPersonnel')
    // .pipe(delay(3000))
    .toPromise()
    .then((response) => {

      this.userList = response
      for(let theUser of this.userList) {
        theUser.account = theUser.user ? theUser.user.account : ''

      }
      console.log('response=', response)
      console.log('  this.userList=',   this.userList)

    })
  }

   getSex() {
    return this.http.get(this.ApiUrl + 'sex')
    // .pipe(delay(2000))
    .toPromise()
    .then((response) => {
      this.sexList = response
      console.log('response=', response)
      console.log('this.sexList=', this.sexList)
    })
  }

  async ngOnInit() {
    // await this.getUser()
    // await this.getSex();
   }

  async ionViewWillEnter() {
     await this.getUser()
     await this.getSex();
   }

  async doRefresh(event) {
     await this.getUser()
     await this.getSex();
   }
}
