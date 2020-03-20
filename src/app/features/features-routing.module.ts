import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
  {
    path: "",
    redirectTo: "movies/list",
    pathMatch: "full"
  },
  {
    path: "movies",
    redirectTo: "movies/list",
    pathMatch: "full"
  },
  {
    path: "movies",
    loadChildren: () => import("./movies/movies.module").then(m => m.MoviesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
