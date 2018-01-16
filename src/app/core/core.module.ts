import { NgModule } from '@angular/core';

import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipesService } from '../recipes/recipes.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth-guard.service';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app.routing.module';

@NgModule({
declarations:[
HeaderComponent,
HomeComponent
],
imports:[AppRoutingModule, SharedModule],
exports:[AppRoutingModule, HeaderComponent],
providers: [ShoppingListService, RecipesService, DataStorageService, AuthService, AuthGuard],
})

export class CoreModule{}