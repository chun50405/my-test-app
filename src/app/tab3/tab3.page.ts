import { Component } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@awesome-cordova-plugins/media-capture/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject} from '@awesome-cordova-plugins/file-transfer/ngx';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private file: File, private mediaCapture: MediaCapture, private httpIonic: HTTP, private transfer: FileTransfer) {

  }
  recordingVideo() {
    let options: CaptureVideoOptions = { limit: 1, quality: 1}
    let uploadUrl = 'https://192.168.10.44:5679/file/uploadVideo'
    return this.mediaCapture.captureVideo(options)
    .then(
      (data: MediaFile[]) => {
        console.log(data)
        let fileName = data[0].name
        let path = data[0].fullPath
        let type = data[0].type
        const fileTransfer: FileTransferObject = this.transfer.create();

        let options: FileUploadOptions = {
         fileKey: 'file',
         fileName: `${fileName}`,

         mimeType: `${type}`,
         params: {
           type: type
         }
       }
       fileTransfer.upload(path, uploadUrl, options, true)
       .then((data) => {
         console.log('data=', data)
       })
       .catch((err) => {
         console.log('err=', err)
       })


      },
      (err: CaptureError) => {console.error(err)}
    );
  }



}
