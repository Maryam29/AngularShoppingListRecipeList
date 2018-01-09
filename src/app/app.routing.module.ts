import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { RecipesComponent } from './recipes/recipes.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
//import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
//import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
//import { RecipesItemComponent } from './recipes/recipes-list/recipes-item/recipes-item.component';

const appRoutes:Routes = [
{   path: '', redirectTo:'/recipes', pathMatch:'full' },
{   path:'recipes', component:RecipesComponent, children:[
    {path:'', component:RecipeStartComponent},
    {path:'new', component:RecipeEditComponent},
    {path:':id', component:RecipesDetailComponent},
    {path:':id/edit', component:RecipeEditComponent}
]},
{   path:'shopping-list', component:ShoppingListComponent}
];

@NgModule({
imports: [RouterModule.forRoot(appRoutes)],
exports: [RouterModule]
})

export class AppRoutingModule{}


