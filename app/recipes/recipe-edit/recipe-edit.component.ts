import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode = false;
  recipeEditForm : FormGroup;
  
  constructor(private route: ActivatedRoute, private router:Router, private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
  this.route.params.subscribe((params: Params) => {
  this.id = +params['id'];
  this.editMode = params['id']?true:false;
  //console.log(this.editMode)
  });
  this.initForm();
  };
  
  private initForm(){
   let recipeName = '';
   let recipeImagePath = '';
   let recipeDescription = '';
   let recipeIngredients = new FormArray([])
   
   if(this.editMode){
   this.store.select('recipes').take(1).subscribe((recipeState:fromRecipe.State)=>
    {
        let recipe = recipeState.recipes[this.id-1];
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if(recipe['ingredients']){
            for(let ingredient of recipe.ingredients){
                recipeIngredients.push(
                    new FormGroup({
                        'name' : new FormControl(ingredient.name,Validators.required),
                        'amount' : new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
                    })
                )}
            }
    });
   

   }
   
    this.recipeEditForm = new FormGroup({
    'recipeName' : new FormControl(recipeName,Validators.required),
    'imagePath' : new FormControl(recipeImagePath,Validators.required),
    'description' : new FormControl(recipeDescription,Validators.required),
    'ingredients' : recipeIngredients
  })
  }
  
  onSubmit(){
    const recipe = new Recipe(
    this.recipeEditForm.value['recipeName'],
    this.recipeEditForm.value['description'],
    this.recipeEditForm.value['imagePath'],
    this.recipeEditForm.value['ingredients'],
    )
    if(this.editMode){
    this.store.dispatch(new RecipeActions.UpdateRecipe({index:this.id-1,recipe: recipe})
    
    );
    }
    else{
    this.store.dispatch(new RecipeActions.AddRecipe(recipe));
    }
    this.router.navigate(['../'],{relativeTo:this.route});
  };
  
  AddNewIngredient(){
    const ingredient = new FormGroup({
        name : new FormControl(null,Validators.required ),
        amount : new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
        });
    (<FormArray>this.recipeEditForm.get('ingredients')).push(ingredient);
  };
  
  OnCancelRecipe(){
    this.router.navigate(['../'],{relativeTo:this.route});
  };

  OnCancelIng(index:number){
    (<FormArray>this.recipeEditForm.get('ingredients')).removeAt(index);
  };
  
  getControls(){
   return (<FormArray>this.recipeEditForm.get('ingredients')).controls;
  }
 
}
