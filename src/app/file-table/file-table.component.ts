import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { Person } from './person';
import { FileUploadService } from './../file-upload.service';

declare var $;

@Component({
    selector: 'app-file-table',
    templateUrl: './file-table.component.html',
    styleUrls: ['./file-table.component.scss']
})
export class FileTableComponent implements OnInit {
    @ViewChild(DataTableDirective)

    isDataAvailable: Boolean = false;
    fileName: string = '';
    showTable: Boolean = false;

    customerData: Array<Object> = [];
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();


    constructor(private http: HttpClient, private fileUploadService: FileUploadService) { }

    ngOnInit() {
        this.fileUploadService.currentIsFileDataAvailable.subscribe(flag => {
            this.isDataAvailable = flag;
        });
        this.fileUploadService.currentUploadedFileName.subscribe(fileName => this.fileName = fileName);

        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true
        };
    }

    handleShowTable() {
        this.showTable = true;

        this.fileUploadService.fetchFileData(this.fileName).subscribe(event => {
            if (event instanceof HttpResponse) {
                this.customerData = event.body;
            }
            this.dtTrigger.next();
        }, (err) => {
            console.log("Error while fetching:", err);
        });
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }
}
