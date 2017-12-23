import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
 @ViewChild('IngredientName') name: ElementRef;
 @ViewChild('IngredientAmount') amount: ElementRef;
 IngData:Ingredient;
   constructor(private ShoppingListService:ShoppingListService) { }

  ngOnInit() {
  }
  
 AddIngredient(){
 this.IngData = new Ingredient(this.name.nativeElement.value,this.amount.nativeElement.value);
 this.ShoppingListService.AddIngtoList(this.IngData);
 }
}
