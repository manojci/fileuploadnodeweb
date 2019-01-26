import { NgModule } from '@angular/core';
import { MatToolbarModule, MatCardModule, MatButtonModule, MatGridListModule, MatProgressBarModule, MatSnackBarModule } from '@angular/material';

@NgModule({
    imports: [
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatGridListModule,
        MatProgressBarModule,
        MatSnackBarModule
    ],
    exports: [
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatGridListModule,
        MatProgressBarModule,
        MatSnackBarModule
    ]
})

export class MaterialModule { }