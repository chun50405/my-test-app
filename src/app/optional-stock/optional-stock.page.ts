import { Component, OnInit } from '@angular/core';
import { StockService } from '../services/stock.service';
@Component({
  selector: 'app-optional-stock',
  templateUrl: './optional-stock.page.html',
  styleUrls: ['./optional-stock.page.scss'],
})

export class OptionalStockPage implements OnInit {
  showModeList = ['經典', '方塊'];
  showModeIndex = 0;
  stockInfoList: any;
  titleList = ['商品', '成交', '漲跌', '幅度'];
  // titleList = ['商品', '成交', '漲跌', '幅度','單量', '總量', '買量', '賣量', '最高', '最低', '開盤', '作收', '時間'];

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
    console.log('this.stockInfoList=', this.stockInfoList)
  //  setInterval(async () => {
  //   this.stockInfoList = await this.stockService.getStockInfo();
  // }, 10000)

  }

}
