import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZupSearchComponent } from './zup-search.component';

@NgModule({
  declarations: [ZupSearchComponent],
  imports: [
    CommonModule
  ],
  exports: [ZupSearchComponent]
})
export class ZupSearchModule { }
