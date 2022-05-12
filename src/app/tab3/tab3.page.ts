import { Component } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@awesome-cordova-plugins/media-capture/ngx';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private file: File, private mediaCapture: MediaCapture, private httpIonic: HTTP) {

  }
  recordingVideo() {
    let options: CaptureVideoOptions = { limit: 1, quality: 1}
    let uploadUrl = 'https://192.168.10.44:5679/file/uploadVideo'
    return this.mediaCapture.captureVideo(options)
    .then(
      (data: MediaFile[]) => {
        console.log(data)
        let fpath = data[0].fullPath;
        let name = data[0].name;
        let path = fpath.replace(name, '');
        console.log(path, name)
        return this.file.readAsArrayBuffer(path, name)
        .then((dataText) => {
          console.log('dataText=', dataText)
        })
        // this.httpIonic.setDataSerializer('multipart')
        // this.httpIonic.setServerTrustMode('nocheck')
        // // let postData = new FormData();
        // // postData.append('file',data)
        // return this.httpIonic.post(uploadUrl, data, {})
        // .then((response) => {
        //   console.log('response=', response)
        // })
        // .catch((err) => {
        //   console.log('err=', err)
        // })
      // return this.file.resolveDirectoryUrl(this.file.applicationStorageDirectory + '/tmp')
      // .then((rootDir) => {
      //   console.log('rootDir=', rootDir)
      //   return this.file.getFile(rootDir, data[0].name, {create: false})
      // })
      // .then((fileEntry) => {
      //   fileEntry.file((theFile) => {
      //     console.log('theFile=', theFile)
      //     let videoData = new FormData();
      //     videoData.append('file', theFile, 'blob')
      //     videoData.append('fileName', data[0].name)
      //     videoData.append('type', data[0].type)
      //
      //     this.httpIonic.setDataSerializer('multipart')
      //     this.httpIonic.setServerTrustMode('nocheck')
      //
      //     this.httpIonic.post(uploadUrl, videoData, {})
      //     // this.httpIonic.uploadFile(uploadUrl, {}, {}, theFile.localURL, theFile.name)
      //     .then((response) => {
      //       console.log('response=', response)
      //     })
      //     .catch((err) => {
      //       console.log('err=', err)
      //     })
      //   })
      // })




      },
      (err: CaptureError) => {console.error(err)}
    );
  }



}
