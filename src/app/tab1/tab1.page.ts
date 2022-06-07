import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, delay } from 'rxjs/operators';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  ApiUrl: string = 'https://localhost:5679/';
  theNewsList: any
  constructor(private http: HttpClient) {}




  getNewList() {
    return this.http.get(this.ApiUrl + 'news/stock')
    .toPromise()
    .then((data) => {
      console.log('data=', data)
      this.theNewsList = data
    })
  }


  openNews(url) {
    console.log('url=', url)
    window.open(url, '_blank')
  }

 ionViewWillEnter() {
   this.getNewList()
 }

 doRefresh(event) {

   this.getNewList()
 }
}
