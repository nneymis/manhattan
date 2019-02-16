import { MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MatProgressSpinnerModule,
        MatSnackBarModule
    ],
    exports: [
        MatProgressSpinnerModule,
        MatSnackBarModule
    ]
})

export class MaterialModule { }