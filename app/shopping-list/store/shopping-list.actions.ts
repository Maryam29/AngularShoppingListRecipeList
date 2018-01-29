import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_ING = 'ADD_ING';
export const ADD_INGS = 'ADD_INGS';
export const UPDATE_ING = 'UPDATE_ING';
export const DELETE_ING = 'DELETE_ING';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddIngredient implements Action {
readonly type = ADD_ING;
constructor(public payload : Ingredient){}
}

export class UpdateIngredient implements Action {
readonly type = UPDATE_ING;
constructor(public payload : Ingredient ){}
}

export class DeleteIngredient implements Action {
readonly type = DELETE_ING;
constructor(){}
}

export class AddIngredients implements Action {
readonly type = ADD_INGS;
constructor(public payload : Ingredient[] ){}
}

export class StartEdit implements Action {
readonly type = START_EDIT;
constructor(public payload : number ){}
}

export class StopEdit implements Action {
readonly type = STOP_EDIT;
constructor(){}
}

export type ShoppingListActions = AddIngredient | UpdateIngredient | DeleteIngredient | AddIngredients | StartEdit | StopEdit;