import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';

import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponentComponent } from './page-not-found/page-not-found-component.component';

import { AuthService } from './auth/auth.service';

import { Guard } from './auth/guard';

import { CKEditorModule } from './ckeditor/ckeditor.module';


const appRoutes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', loadChildren: './root/root.module', canActivate: [Guard] },
  { path: '**', component: PageNotFoundComponentComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PageNotFoundComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    CKEditorModule
  ],
  providers: [
    AuthService,
    Guard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
