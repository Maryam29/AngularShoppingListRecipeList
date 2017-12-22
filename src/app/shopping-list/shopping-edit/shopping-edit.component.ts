import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
 @ViewChild('IngredientName') name: ElementRef;
 @ViewChild('IngredientAmount') amount: ElementRef;
 @Output() IngredientAdded = new EventEmitter<Ingredient>();
 
  constructor() { }

  ngOnInit() {
  }
 AddIngredient(){
 this.IngredientAdded.emit(new Ingredient(this.name.nativeElement.value,this.amount.nativeElement.value));
 }
}