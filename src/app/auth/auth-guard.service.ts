import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate{

constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router){}

canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
this.router.navigate(['/signin'],{relativeTo:this.route});
return this.authService.isAuthenticated();
}

}