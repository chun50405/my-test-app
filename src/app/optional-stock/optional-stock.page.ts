import { Component, OnInit } from '@angular/core';
import { StockService } from '../services/stock.service';
import { Observable } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group
  // ...
} from '@angular/animations';
@Component({
  selector: 'app-optional-stock',
  templateUrl: './optional-stock.page.html',
  styleUrls: ['./optional-stock.page.scss'],
  animations: [
    // animation triggers go here
    trigger('priceChange', [
      state('priceChange', style({
        opacity: 0,
      })),
      state('priceNotChange', style({
        opacity: 1,
      })),
      transition('priceChange <=> priceNotChange', [
        animate('2s'),
      ]),
    ])
  ]
})

export class OptionalStockPage implements OnInit {
  showModeList = ['經典', '方塊'];
  showModeIndex = 0;
  stockInfoList: any;
  titleList = ['商品', '成交', '漲跌', '幅度'];
  // titleList = ['商品', '成交', '漲跌', '幅度','單量', '總量', '買量', '賣量', '最高', '最低', '開盤', '作收', '時間'];
  lastPriceList = []

  constructor(private stockService: StockService) { }

  changeMode() {
    if(this.showModeIndex == 0) {
      this.showModeIndex = 1
    } else {
      this.showModeIndex = 0
    }
  }



  async ngOnInit() {
    this.stockInfoList = await this.stockService.getStockInfo();
    for(const stockInfo of this.stockInfoList) {
      this.lastPriceList.push(stockInfo.price)
    }
    console.log('this.stockInfoList=', this.stockInfoList)
     setInterval(async () => {
      this.stockInfoList = await this.stockService.getStockInfo();
      for(let idx in this.stockInfoList) {
        if(this.lastPriceList[idx] != this.stockInfoList[idx].price) {
          this.stockInfoList[idx].priceChange = true
          this.lastPriceList[idx] = this.stockInfoList[idx].price
        } else {
          this.stockInfoList[idx].priceChange = false
        }
      }
      console.log('this.lastPriceList =>', this.lastPriceList)
    }, 10000)

  }

}
