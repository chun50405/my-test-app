import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, delay } from 'rxjs/operators';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { HTTP } from '@ionic-native/http/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject} from '@awesome-cordova-plugins/file-transfer/ngx';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private http: HttpClient, private httpIonic: HTTP, private file: File, private transfer: FileTransfer) {}


  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      saveToGallery: true,
      resultType: CameraResultType.Uri,
      promptLabelHeader: '照片',
      promptLabelCancel: '取消',
      promptLabelPhoto: '從相簿中',
      promptLabelPicture: '拍張照片吧'
    })
    console.log('image=', image)

    let uploadUrl = 'https://192.168.10.44:5679/file/uploadImage';
    let fileName = image.path.split('/').pop()
    let fileType = image.format
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
     fileKey: 'file',
     fileName: `${fileName}`,
     // mimeType: "multipart/form-data",
     mimeType: `image/${fileType}`,
     params: {
       type: fileType
     }
   }

   fileTransfer.upload(image.path, uploadUrl, options, true)
   .then((data) => {
     console.log('data=', data)
   })
   .catch((err) => {
     console.log('err=', err)
   })
    // let postData = new FormData();
    // postData.append('file', image.base64String)
    // postData.append('type', image.format)
    //
    // this.httpIonic.setDataSerializer('multipart')
    // this.httpIonic.setServerTrustMode('nocheck')
    //
    // this.httpIonic.post(uploadUrl, postData, {})
    // .then(function(data) {
    //   console.log('data=', data)
    // })
    // .catch(function(err) {
    //   console.log('err=', err)
    // })
  }


  ngOnInit() {

  }
}
