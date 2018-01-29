import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducers';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  constructor(private store: Store<fromRecipe.FeatureState>,private route: ActivatedRoute, private router:Router) { };

  ngOnInit() {
  this.recipeState = this.store.select('recipes'); // name here is same as specified in StoreModule
  };
  
  OnNewRecipe(){
  this.router.navigate(['new'],{relativeTo:this.route});
  }
}
