import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription} from 'rxjs/Subscription';
import { Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
 ingredients:Ingredient[] = [];
 private subscription:Subscription;
 
 constructor(private ShoppingListService:ShoppingListService) { }

 ngOnInit() {
  this.ingredients = this.ShoppingListService.getIngredients(); // Here we are getting copy of Ing. hence its not updated when Ing list is updated. Therefore we use push notifications in service
  
   this.subscription = this.ShoppingListService.ingredientsChanged.subscribe((ingredients:Ingredient[]) => {
   this.ingredients = ingredients;
  });
  }
  
  EditSelectedItem(i:number){
  //console.log(i);
    this.ShoppingListService.EditIngredient.next(i);
  }
  
  ngOnDestroy(){
  this.subscription.unsubscribe(); // this is imp to unsuscribe to avoid memory leaks
  }
}
