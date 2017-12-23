import { OnInit, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'

export class ShoppingListService implements OnInit {
ingredientsChanged = new EventEmitter<Ingredient>();

private ingredients:Ingredient[] = [new Ingredient('Ginger Garlic Paste',200),new Ingredient('Tomatoes',100),new Ingredient('Green Chillies',200)];
  
  getIngredients(){
  return this.ingredients.slice();
  }
  
  AddIngtoList(IngData:Ingredient){
  this.ingredients.push(IngData);
  this.ingredientsChanged.emit(this.ingredients);
  }
  
  DeleteIngtoList(IngData:Ingredient){
  this.ingredients.slice(IngData,1);
  }
  
  AddIngstoList(IngData:Ingredient){
  //for( let ing of IngData)
  //{
    //this.AddIngtoList(ing);
  //}
  this.ingredients.push(...IngData);
  this.ingredientsChanged.emit(this.ingredients);
  }
}
