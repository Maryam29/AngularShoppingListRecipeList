import { Actions,Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducers';
import { Recipe } from '../recipe.model';
import { HttpClient,HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class RecipeEffects{
@Effect()
recipeFetch = this.actions$
.ofType(RecipeActions.FETCH_RECIPES)
.switchMap((action:RecipeActions.FetchRecipes) => {
    return this.httpClient.get<Recipe[]>('https://udemy-shopping-recipe-project.firebaseio.com/recipes.json',{observe:'body', responseType:'json'}) 
})
.map(
  (recipes) => {
    if(recipes === null)
        recipes = [];
    for(let recipe of recipes){
    
     if(!recipe['ingredients']){
        recipe['ingredients'] = [];
        }
    }
    return {
    type: RecipeActions.SET_RECIPES,
    payload: recipes
    };
    })
    
@Effect({dispatch :  false})
recipeStore = this.actions$
.ofType(RecipeActions.STORE_RECIPES)
.withLatestFrom(this.store.select('recipes'))
.switchMap(([action,state]) => {
    const req = new HttpRequest('PUT','https://udemy-shopping-recipe-project.firebaseio.com/recipes.json',state.recipes,
    {
        reportProgress:true
    });
    return this.httpClient.request(req);
});
    
constructor(private actions$ : Actions, private httpClient:HttpClient, private store: Store<fromRecipe.FeatureState>){}
}