import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class DataStorageService{
  constructor(private http:Http, private RecipesService: RecipesService, private authService: AuthService){}

  saveRecipes(){
  const token = this.authService.getToken();
  return this.http.put('https://udemy-shopping-recipe-project.firebaseio.com/recipes.json?auth='+ token,this.RecipesService.getRecipes()).subscribe(
  (data:Response) => {},
  (error:Response) => console.log(error)
  );
  }
  
getRecipes(){
const token = this.authService.getToken();

  return this.http.get('https://udemy-shopping-recipe-project.firebaseio.com/recipes.json?auth='+ token)
  .map(
  (data:Response) => {
    let recipes: Recipe [] = data.json();
    if(recipes === null)
        recipes = [];
    for(let recipe of recipes){
    
     if(!recipe['ingredients']){
        console.log(recipe);
        recipe.ingredients = [];
        }
    }
    return recipes;
    }
  )
  .subscribe(
    (recipes: Recipe []) => {
    this.RecipesService.setRecipes(recipes);
    });
  }
}
