import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import axios from 'axios';
import { BASEURL, TOKEN } from './utils/config';

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
        return false;
      }
    } catch (error) {
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
        return false;
      }
    } catch (error) {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
