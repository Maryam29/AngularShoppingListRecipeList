import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription} from 'rxjs/Subscription'

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];
  subscription : Subscription;
  constructor(private RecipesService: RecipesService,private route: ActivatedRoute, private router:Router) { };

  ngOnInit() {
  this.recipes = this.RecipesService.getRecipes();
  this.subscription = this.RecipesService.recipeChanged.subscribe((recipes : Recipe[]) => {
  this.recipes = recipes;
  })
  };
  
  OnNewRecipe(){
  //console.log(this.route);
  this.router.navigate(['new'],{relativeTo:this.route});
  }
  
  ngOnDestroy(){
  this.subscription.unsubscribe();
  }
}
