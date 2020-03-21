import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MoviesListContainerComponent } from "./movies-list/movies-list.container";
import { MoviesDetailsComponent } from "./movies-details/movies-details.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "list",
        component: MoviesListContainerComponent
      },
      {
        path: "details",
        component: MoviesDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {}
