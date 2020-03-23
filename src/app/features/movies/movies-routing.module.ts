import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MoviesListComponent } from "./movies-list/movies-list.component";
import { MoviesDetailsComponent } from "./movies-details/movies-details.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "list",
        component: MoviesListComponent
      },
      {
        path: "details/:id",
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
