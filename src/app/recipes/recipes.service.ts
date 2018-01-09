import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipesService{

recipeChanged = new Subject<Recipe[]>();

constructor(private ShoppingListService:ShoppingListService){}

private recipes: Recipe[] = [
    new Recipe('Burger', 
    'This is simply a test', 
    'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    [
    new Ingredient('Buns',2),
    new Ingredient('Onion Sauce',1)
    ]),
    new Recipe('Sandwich', 'This is simply another test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    [
    new Ingredient('Buns',2),
    new Ingredient('Onion Sauce',1)
    ])
  ];
  
  getRecipes(){
  return this.recipes.slice();// .slice() pass object by value not by reference, else anyone could change the value of array.
  }
  
  getRecipeById(Id){
  return this.recipes[Id-1];
  }
  
  AddRecipe(recipe:Recipe){
  this.recipes.push(recipe));
  this.recipeChanged.next(this.recipes.slice());
  }
  
  UpdateRecipe(index:number,newrecipe:Recipe){
  this.recipes[index] = newrecipe;
  //console.log(index,this.recipes[index]);
  this.recipeChanged.next(this.recipes.slice());
  }
  
  AddIngstoShoppingList(ingredients: Ingredient[]){
  //console.log(ingredients)
  this.ShoppingListService.AddIngstoList(ingredients);
  }
  
  RemoveRecipe(index:number){
   this.recipes.splice(index,1);
   this.recipeChanged.next(this.recipes.slice());
  }
}
