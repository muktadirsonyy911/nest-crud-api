import { Injectable } from "@nestjs/common"; 

@Injectable({})
export class AuthService{

   login(){
   return { msg: 'You have logged in' };
   }

   signUp(){
    return { msg: 'You have signed up' };
   }
} 