import { CanMatchFn } from '@angular/router';
import {AccountService} from "../Services/account.service";
import {inject} from "@angular/core";

let isLoggedIn: boolean = false;
let isAdmin: boolean = false;

export const adminGuard: CanMatchFn = (route, segments) => {
  inject(AccountService).isLoggedIn.subscribe(data => {
    isLoggedIn = data;
  });

  inject(AccountService).currentUser.subscribe(data => {
    isAdmin = data.isAdmin;
  });

  if (isLoggedIn && isAdmin) {
    console.log("User is an Authorized Admin");
    return true;
  }
  if(isLoggedIn && !isAdmin) {
    console.log("User is logged in but is not an Authorized Admin");
    return false;
  }
  else {
    return false;
  }
};
