import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription} from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
 @ViewChild('f') form: NgForm;
  EditMode:boolean= false;
  subscription : Subscription;
  EditIngredientItem : Ingredient;
  IngData:Ingredient;
 
   constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(
    data => {
    if(data.EditItemIndex > -1){
        this.EditIngredientItem = data.EditItemIngredient;
        this.EditMode = true;
        this.form.setValue({name:this.EditIngredientItem.name,amount:this.EditIngredientItem.amount});
    }
    else{
        this.EditMode = false;
    }
    });
  }
  AddIngredient(form:NgForm){
    const value = form.value;
    this.IngData = new Ingredient(value.name,value.amount);
    if(this.EditMode)
        this.store.dispatch(new ShoppingListActions.UpdateIngredient(this.IngData));
     else{
        this.store.dispatch(new ShoppingListActions.AddIngredient(this.IngData));
    }
    form.reset();
    this.EditMode = false;
 }
 
 ClearForm(){
  this.form.reset();
  this.EditMode = false;
 }
 
  DeleteItem(){
  this.store.dispatch(new ShoppingListActions.DeleteIngredient());
  this.ClearForm();
 }
 
ngOnDestroy(){
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }
}
