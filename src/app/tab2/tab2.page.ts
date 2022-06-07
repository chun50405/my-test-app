import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, delay } from 'rxjs/operators';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject} from '@awesome-cordova-plugins/file-transfer/ngx';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  testServerUrl:string = 'https://192.168.10.44:5679'
  theUserList:any
  constructor(private transfer: FileTransfer, private http: HttpClient, private httpIonic: HTTP) {}


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
    let fileName;
    if(image.path) {
      fileName = image.path.split('/').pop()
    }
    if(image.webPath) {
      fileName = image.webPath.split('/').pop()
    }
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

  }

  async getUser() {

    return this.http.get(this.testServerUrl + '/user/list')
    .toPromise()
    .then((data) => {
      console.log('data=', data)
      this.theUserList = data
    })
    .catch((error) => {
      console.error(error)
    })
  }






  async ionViewWillEnter() {
     await this.getUser()

   }

  async doRefresh(event) {
     await this.getUser()

   }
}
