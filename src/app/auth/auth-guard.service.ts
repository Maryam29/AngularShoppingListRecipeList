import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad{

constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router){}

canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
const isAuthenticated = this.authService.isAuthenticated();
if(!isAuthenticated){
    //console.log(isAuthenticated);
    this.router.navigate(['/signin'],{relativeTo:this.route});
}
//console.log(isAuthenticated);
return isAuthenticated;
}

canLoad(route:Route){
const isAuthenticated = this.authService.isAuthenticated();
if(!isAuthenticated){
    //console.log(isAuthenticated);
    this.router.navigate(['/signin'],{relativeTo:this.route});
}
//console.log(isAuthenticated);
return isAuthenticated;
}

}