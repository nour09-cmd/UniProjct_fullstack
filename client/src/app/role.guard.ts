import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import axios from 'axios';
import { BASEURL, TOKEN } from './utils/config';

// Guard for Barber Routes
@Injectable({
  providedIn: 'root',
})
export class RoleGuardBarber implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      const token = TOKEN();
      const res = await axios.get(`${BASEURL}/users/rollerChecker/`, {
        headers: { authorization: token },
      });

      if (res.data.barber === true) {
        return true;
      } else {
        // this.router.navigate(['/']);
        return false;
      }
    } catch (error) {
      console.error('Role check failed:', error);
      this.router.navigate(['/login']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class RoleGuardUSER implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      const token = TOKEN();
      const res = await axios.get(`${BASEURL}/users/rollerChecker/`, {
        headers: { authorization: token },
      });

      if (res.data.User === true) {
        return true;
      } else {
        // this.router.navigate(['/']);
        return false;
      }
    } catch (error) {
      console.error('Role check failed:', error);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
