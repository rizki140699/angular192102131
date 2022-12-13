import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtentikasiGuard implements CanActivate {

  constructor(private router : Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // mengecek data di session storage
    const user = sessionStorage.getItem("userId")

    switch(user){
      case null:
        break
      case 'undefined':
        break;
      case "":
        break;
      default:
        return true
    }

    // meredirect user ke halaman login
    this.router.navigate(['/login']);
    
    return false;
  }
  
}
