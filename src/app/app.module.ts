import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {DatePipe} from '@angular/common';
import { IBMComponent } from './Components/ibm/ibm.component';
@NgModule({
  declarations: [
    IBMComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [IBMComponent]
})
export class AppModule { }
