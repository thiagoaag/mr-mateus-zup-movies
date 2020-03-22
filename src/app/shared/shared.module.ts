import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxModule } from './search-box/search-box.module';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SearchBoxModule,
    NgxLoadingModule
  ],
  exports: [
    NgxLoadingModule,
    SearchBoxModule],
})
export class SharedModule { }
