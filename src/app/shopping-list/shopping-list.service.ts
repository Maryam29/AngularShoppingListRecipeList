import { OnInit} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService implements OnInit {
//ingredientsChanged = new EventEmitter<Ingredient>();
ingredientsChanged = new Subject<Ingredient>();
EditIngredient = new Subject<number>();

private ingredients:Ingredient[] = [new Ingredient('Ginger Garlic Paste',200),new Ingredient('Tomatoes',100),new Ingredient('Green Chillies',200)];
  
  getIngredients(){
  return this.ingredients.slice();
  }
  
  getIngredientbyIndex(index){
  console.log(index);
  return this.ingredients[index];
  }
  AddIngtoList(IngData:Ingredient){
  this.ingredients.push(IngData);
  this.ingredientsChanged.next(this.ingredients.slice());
  }
  
  DeleteIngtoList(IngData:Ingredient){
  this.ingredients.slice(IngData,1);
  }
  
  AddIngstoList(IngData:Ingredient[]){
  this.ingredients.push(...IngData); // pushes an array of data in one go
  this.ingredientsChanged.next(this.ingredients.slice());
  }
  
  updateIngredient(index:number, newIngredient:Ingredient){
  this.ingredients[index] = newIngredient;
  this.ingredientsChanged.next(this.ingredients.slice());
  }
  
  deleteIngredient(index:number, newIngredient:Ingredient){
  this.ingredients.splice(index,1);
  this.ingredientsChanged.next(this.ingredients.slice());
  }
}
