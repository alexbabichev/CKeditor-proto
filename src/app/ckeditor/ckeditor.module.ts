import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CKEditorComponent } from './ckeditor.component';
import { BaseButtonComponent } from './base-button/base-button.component';
import { Button2Component } from './button2/button2.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CKEditorComponent,
    BaseButtonComponent,
    Button2Component
  ],
  exports: [
    CKEditorComponent,
    BaseButtonComponent,
    Button2Component
  ]
})
export class CKEditorModule { }
