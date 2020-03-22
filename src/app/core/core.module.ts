import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OmdbService as OmdbService } from './omdb/omdb.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    OmdbService
  ]
})
export class CoreModule { }
