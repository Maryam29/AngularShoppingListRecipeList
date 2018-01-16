import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { NgModule } from "@angular/core";

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './auth/auth-guard.service';

const appRoutes:Routes = [
{   path: '', redirectTo:'/home', pathMatch:'full'},
{   path: 'recipes', loadChildren:'./recipes/recipes.module#RecipesModule', canLoad:[AuthGuard]}, // if we add path of recipes in import it wont load lazily, whole recipeComponent is loaded when we visit /recipes.
{   path:'shopping-list', component:ShoppingListComponent},
{   path:'home', component:HomeComponent}
];

@NgModule({
imports: [RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})],  //CanLoad is given priority over Preloadingstrategies.
exports: [RouterModule]
})

export class AppRoutingModule{}


