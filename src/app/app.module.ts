import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';

import { HttpClientModule } from '@angular/common/http';

import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import { Media } from '@awesome-cordova-plugins/media/ngx';

import { File } from '@awesome-cordova-plugins/file/ngx';

import { StreamingMedia } from '@awesome-cordova-plugins/streaming-media/ngx';

//實際上是用cordova-plugins-n0sm-media-capture 修正過後的內容複製到原始的
//cordova-plugins-media-capture 再重新@awesome-cordova-plugins/media-capture
//修正內容(ios 的captureOptions 可以輸入quality參數 ex: 0, 0.5, 1 表示 低, 中, 高 畫質)

import { MediaCapture } from '@awesome-cordova-plugins/media-capture/ngx';



//此套件在ios上面會build失敗 需要至XCode中的 CDVFileTransfer.m 拿掉 107 ~ 110行 程式如下
/*

NSString* userAgent = [self.commandDelegate userAgent];
    if (userAgent) {
        [req setValue:userAgent forHTTPHeaderField:@"User-Agent"];
    }

 */
import { FileTransfer} from '@awesome-cordova-plugins/file-transfer/ngx';

@NgModule({
  declarations: [AppComponent, MenuComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [MenuComponent, HTTP, Media, File, StreamingMedia, MediaCapture, FileTransfer, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
