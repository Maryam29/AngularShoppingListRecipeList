import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
 @ViewChild('f') form: NgForm;
 
 EditIngredientItem: Ingredient = -1;
 EditMode:boolean= false;
 
 IngData:Ingredient;
   constructor(private ShoppingListService:ShoppingListService) { }

  ngOnInit() {
   this.ingredients = this.ShoppingListService.getIngredients(); // Here we are getting copy of Ing. hence its not updated when Ing list is updated. Therefore we use push notifications in service
   this.subscription = this.ShoppingListService.EditIngredient.subscribe((index:number) => {
   this.EditIngredientItem = this.ShoppingListService.getIngredientbyIndex(index);
   this.form.setValue({name:this.EditIngredientItem.name,amount:this.EditIngredientItem.amount});
   this.EditMode = true;
   this.EditItemIndex = index;
  });
  }
  
 //AddIngredient(){
 //this.IngData = new Ingredient(this.name.nativeElement.value,this.amount.nativeElement.value);
 //this.ShoppingListService.AddIngtoList(this.IngData);
 //}
 
  AddIngredient(form:NgForm){
    const value = form.value;
    this.IngData = new Ingredient(value.name,value.amount);
    if(this.EditMode)
        this.ShoppingListService.updateIngredient(this.EditItemIndex,this.IngData)
    else{
        this.ShoppingListService.AddIngtoList(this.IngData);
    }
    form.reset();
    this.EditMode = false;
 }
 
 ClearForm(){
  this.form.reset();
  this.EditMode = false;
 }
 
  DeleteItem(){
  this.ClearForm();
  this.ShoppingListService.deleteIngredient(this.EditItemIndex);
 }
 
}
