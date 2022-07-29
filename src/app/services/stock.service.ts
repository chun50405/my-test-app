import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StockService {

  // ex_ch=tse_2330.tw
  //證交所url
  // twseUrl: string = "https://mis.twse.com.tw/stock/api/getStockInfo.jsp"
  constructor(private http: HttpClient) { }


  async getStockInfo(stockList = ['tse_2330.tw', 'tse_0050.tw']) {
    let result = []


    let query = {
      ex_ch: stockList.join('|')
    }

    let headers = new HttpHeaders({

    })



    let stockInfo:any = await this.http.get('/stock/api/getStockInfo.jsp', {params: query, headers: headers, responseType: 'json'}).toPromise();
    console.log('stockInfo=', stockInfo.msgArray, typeof stockInfo)


    for(let oneStock of stockInfo.msgArray) {
      //因為證交所API的當下成交價格有可能為空的 所以就拿委賣(委買也可以)的第一筆當作成交價格
      //可能會有些不準確 但也沒辦法
      if(oneStock.z == '-') {
        oneStock.z = oneStock.a.split('_')[0]
      }
      let stockObj = {
        name: oneStock.n,
        code: oneStock.c,
        price: oneStock.z,
        upAndDown: Math.abs(oneStock.z - oneStock.y),
        range: (Math.abs(oneStock.z - oneStock.y) / oneStock.y),
        singleAmount: oneStock.ps,
        totalAmount: oneStock.v,
        buyAmount: oneStock.g.split('_')[0],
        sellAmount: oneStock.g.split('_')[0],
        highestPrice: oneStock.h,
        lowestPrice: oneStock.l,
        openPrice: oneStock.o,
        yesterdayPrice: oneStock.y,
        time: oneStock.t,
        color: Math.abs(oneStock.z - oneStock.y) > 0 ? 'danger' : 'success'
      }
      result.push(stockObj)
    }

    return result
    // return {qqq: '芭比Ｑ拉'}
  }

}
