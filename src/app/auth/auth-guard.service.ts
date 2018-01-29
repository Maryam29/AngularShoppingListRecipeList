import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad{

constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromApp.AppState>){}

canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){

return  this.store.select('auth').take(1).map((authState:fromAuth.State) => {
console.log("Can activate",authState.authenticated);
     if(!authState.authenticated){
        this.router.navigate(['/signin'],{relativeTo:this.route});
        }
        return authState.authenticated;
     });
}

//canLoad works with take(1)
canLoad(route:Route){
return this.store.select('auth').take(1).map((authState:fromAuth.State) => {
    if(!authState.authenticated)
    {
        this.router.navigate(['/signin'],{relativeTo:this.route});
    }
     console.log("CanLoad", authState.authenticated);
     return authState.authenticated;
    });

}

}