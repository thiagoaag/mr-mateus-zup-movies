import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxLoadingModule } from 'ngx-loading';
import { MoviesDetailsComponent } from "./movies-details.component";
import { MoviesDetailsService } from './movies-details.service';

@NgModule({
  declarations: [MoviesDetailsComponent],
  imports: [
    CommonModule,
    NgxLoadingModule
  ],
  providers: [ MoviesDetailsService]
})
export class MoviesDetailsModule {
}
