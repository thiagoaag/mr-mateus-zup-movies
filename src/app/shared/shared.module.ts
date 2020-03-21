import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchBoxModule } from './search-box/search-box.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SearchBoxModule
  ],
  exports: [SearchBoxModule],
})
export class SharedModule { }
