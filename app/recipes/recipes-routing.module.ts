import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { RecipesComponent } from './recipes.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { AuthGuard } from '../auth/auth-guard.service';


const RecipeRoutes:Routes = [
{   path:'', component:RecipesComponent, canActivate:[AuthGuard], children:[
    {path:'', component:RecipeStartComponent},
    {path:'new', component:RecipeEditComponent, canActivate:[AuthGuard]},
    {path:':id', component:RecipesDetailComponent},
    {path:':id/edit', component:RecipeEditComponent, canActivate:[AuthGuard]}
]}
];

@NgModule({
imports: [RouterModule.forChild(RecipeRoutes)],
exports: [RouterModule]
})

export class RecipesRoutingModule{}