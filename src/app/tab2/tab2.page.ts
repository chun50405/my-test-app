import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, delay } from 'rxjs/operators';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { HTTP } from '@ionic-native/http/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private http: HttpClient, private httpIonic: HTTP) {}


  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      saveToGallery: true,
      resultType: CameraResultType.Base64,
      promptLabelHeader: '照片',
      promptLabelCancel: '取消',
      promptLabelPhoto: '從相簿中',
      promptLabelPicture: '拍張照片吧'
    })
    console.log('image=', image)

    let uploadUrl = 'https://192.168.10.44:5679/image/upload';




    // let postData = new FormData();
    // postData.append('file', image.base64String)
    // postData.append('type', image.format)


    // let uploadResult =  await this.http.post(uploadUrl, postData).toPromise()
    this.httpIonic.setServerTrustMode('nocheck')
    // let uploadResult = await this.httpIonic.post(uploadUrl, postData, {})

    // console.log('uploadResult=', uploadResult)
    let postData = {
      file: image.base64String,
      type: image.format
    }
    this.httpIonic.post(uploadUrl, postData, {})
    .then(function(data) {
      console.log('data=', data)
    })
    .catch(function(err) {
      console.log('err=', err)
    })
  }


  ngOnInit() {

  }
}
