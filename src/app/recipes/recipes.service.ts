import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service'

@Injectable()
export class RecipesService{

recipeSelected = new EventEmitter<Recipe>();

constructor(private ShoppingListService:ShoppingListService){}

private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 
    'This is simply a test', 
    'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    [
    new Ingredient('Buns',2),
    new Ingredient('Onion Sauce',1)
    ]),
    new Recipe('Another Test Recipe', 'This is simply another test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    [
    new Ingredient('Buns',2),
    new Ingredient('Onion Sauce',1)
    ])
  ];
  
  getRecipes(){
  return this.recipes.slice();// .slice() pass object by value not by reference, else anyone could change the value of array.
  }
  
  AddIngstoShoppingList(ingredients: Ingredient[]){
  //console.log(ingredients)
  this.ShoppingListService.AddIngstoList(ingredients);
  }
}
