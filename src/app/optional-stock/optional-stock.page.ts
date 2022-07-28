import { Component, OnInit } from '@angular/core';
import { StockService } from '../services/stock.service';
@Component({
  selector: 'app-optional-stock',
  templateUrl: './optional-stock.page.html',
  styleUrls: ['./optional-stock.page.scss'],
})
export class OptionalStockPage implements OnInit {
  stockInfoList: any;


  constructor(private stockService: StockService) { }

  async ngOnInit() {
    this.stockInfoList = await this.stockService.getStockInfo();
   // setInterval(async () => {
   //  this.stockInfoList = await this.stockService.getStockInfo();
   // }, 5000)


  }

}
