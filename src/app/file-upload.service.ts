import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private isFileDataAvailable = new BehaviorSubject(false);
  private uploadedFileName = new BehaviorSubject('');

  currentIsFileDataAvailable = this.isFileDataAvailable.asObservable();
  currentUploadedFileName = this.uploadedFileName.asObservable();
  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', '/upload', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  updateFileAvailability(fileName: string, flag: boolean) {
    this.uploadedFileName.next(fileName);
    this.isFileDataAvailable.next(flag);
  }

  fetchFileData(fileName: string) {
    const params = new HttpParams().set('fileName', fileName);

    const req = new HttpRequest('GET', '/display-data', {
      responseType: 'json',
      params
    });

    return this.http.request(req);
  }

}
