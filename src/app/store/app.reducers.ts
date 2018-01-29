import { ActionReducerMap } from '@ngrx/store';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

export interface AppState {
shoppingList: fromShoppingList.State,
auth: fromAuth.State
}

// a js object
export const reducers: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.ShoppingListReducer, // Just adding the reference as we dont want to execute rightnow, just registering it
    auth: fromAuth.AuthReducer
}