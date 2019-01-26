import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { FileUploadService } from './../file-upload.service';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
    @ViewChild('FileInput') currentInputFile;

    selectedFile: File = null;
    isUploading: Boolean = false;
    progress: { percentage: number } = { percentage: 0 };

    constructor(private fileUploadService: FileUploadService, private snackBar: MatSnackBar) { }

    ngOnInit() {
    }

    handleFileInput(event) {
        this.selectedFile = <File>event.target.files[0];
    }

    onUpload() {
        this.progress.percentage = 0;
        this.isUploading = true;
        this.fileUploadService.uploadFile(this.selectedFile).subscribe(event => {
            if (event.type == HttpEventType.UploadProgress) {
                this.progress.percentage = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
                console.log('File is completely loaded!');
            }
        }, (err) => {
            console.log("Upload Error:", err);
        }, () => {
            console.log("Upload done");
            this.snackBar.open('Successfully uploaded!', 'Close');
            this.fileUploadService.updateFileAvailability(this.selectedFile.name, true);
            this.onClear();
        });
    }

    onClear() {
        this.selectedFile = null;
        this.currentInputFile.nativeElement.value = "";
        this.progress.percentage = 0;
        this.isUploading = false;
    }
}
