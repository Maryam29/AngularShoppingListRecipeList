import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
 ingredients:Ingredient[] = [new Ingredient('Ginger Garlic Paste',200),new Ingredient('Tomatoes',100),new Ingredient('Green Chillies',200)];
 
  constructor() { }

  ngOnInit() {
  }
  AddIngtoList(IngData:Ingredient){
  this.ingredients.push(IngData);
  }

}
