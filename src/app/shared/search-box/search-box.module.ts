import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box.component';
import { SearchBoxPresenter } from './search-box.presenter';

@NgModule({
  declarations: [SearchBoxComponent],
  imports: [
    CommonModule
  ],
  exports: [SearchBoxComponent],
  providers: [SearchBoxPresenter]
})
export class SearchBoxModule { }
