import { HttpClient,HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { AuthService } from '../auth/auth.service';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';


@Injectable()
export class DataStorageService{
  constructor(private httpClient:HttpClient, private RecipesService: RecipesService, private authService: AuthService){}

  saveRecipes(){
  //const token = this.authService.getToken();
  //const params = new HttpParams().set('auth',token);
  
  const req = new HttpRequest('PUT','https://udemy-shopping-recipe-project.firebaseio.com/recipes.json',this.RecipesService.getRecipes(),
  {
  reportProgress:true
  });
  
  return this.httpClient.request(req).subscribe((response) => console.log(response));
  
 // const headers = new HttpHeaders.set('Authorization','SomeAuthorizationKey'); //.append() to add more keys
  
  //return this.httpClient.put('https://udemy-shopping-recipe-project.firebaseio.com/recipes.json',this.RecipesService.getRecipes(),
  //{observe:'events',
  ////headers:headers,
  //params:params
  //}
  //).subscribe(
  //(data:HttpEvent<Object>) => {
  //console.log(data.type === HttpEventType.Sent)
  //}
  //);
  }
getRecipes(){
//const token = this.authService.getToken();
//const params = new HttpParams().set('auth',token);
return this.httpClient.get<Recipe[]>('https://udemy-shopping-recipe-project.firebaseio.com/recipes.json',{observe:'body', responseType:'json'}) 
  .map(
  (recipes) => {
    //let recipes: Recipe [] = data.json();
    //console.log(recipes);
    if(recipes === null)
        recipes = [];
    for(let recipe of recipes){
    
     if(!recipe['ingredients']){
        recipe['ingredients'] = [];
        }
    }
    return recipes;
    }
  )
  .subscribe(
    (recipes: Recipe []) => {
    this.RecipesService.setRecipes(recipes);
    });
    //default option 
    //return this.httpClient.get<Recipe[]>('https://udemy-shopping-recipe-project.firebaseio.com/recipes.json?auth='+ token,{observe:'response', responseType:'text'})
  }
}
