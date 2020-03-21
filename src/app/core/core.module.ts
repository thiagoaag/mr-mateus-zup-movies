import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { OMDBService } from './omdb/omdb.service';



@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    OMDBService
  ]
})
export class CoreModule { }
