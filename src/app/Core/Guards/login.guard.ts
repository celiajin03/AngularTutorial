import { CanActivateChildFn } from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../Services/account.service";

let loggedIn:boolean = false;
export const loginGuard: CanActivateChildFn = (childRoute, state) => {

  inject(AccountService).isLoggedIn.subscribe(data => {
    loggedIn = data;
  });
  if (loggedIn) {
    return true;
  }
  else {
    return false;
  }
};
