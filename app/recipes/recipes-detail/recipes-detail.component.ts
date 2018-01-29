import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import * as ShoppingListActions  from '../../shopping-list/store/shopping-list.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  index:number
  
  constructor(private route:ActivatedRoute,private router:Router,private store: Store<fromRecipe.FeatureState>) { }
 
  ngOnInit() {
    this.route.params.subscribe(
        (params: Params) => {
        this.recipeState = this.store.select('recipes');
        this.index = +params['id'];
        console.log(params['id']);
        });
  }
  
  AddtoShoppingList(){
    this.store.select('recipes').take(1).subscribe((recipeState:fromRecipe.State)=>
    {
    console.log(this.index);
    this.store.dispatch(new ShoppingListActions.AddIngredients
    (recipeState.recipes[this.index-1].ingredients));
   });
  }
  
  DeleteRecipe(){
  console.log(this.index);
  this.store.dispatch(new RecipeActions.DeleteRecipe (this.index -1 ));
  this.router.navigate(['/recipes'],{relativeTo:this.route});
  }
}
