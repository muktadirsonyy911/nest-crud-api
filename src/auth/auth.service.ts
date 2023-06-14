import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable({})
export class AuthService {
   constructor(private prismaService: PrismaService) { }

   async signUp(dto: AuthDto) {
      // generate the password hash
      const hash = await argon.hash(dto.password);
      try {
         //save the new user in the db
         const user = await this.prismaService.user.create({
            data: {
               email: dto.email,
               hash: hash
            }

         })

         //don't wanna show user password
         delete user.hash;
         //return the saved user
         return user;
      } catch (error) {
         if (error.code === 'P2002') {
            throw new ForbiddenException(
               'This email already exists',
            );
         }

         throw error;
      }
   }
   async login(dto: AuthDto) {
      //find the user by email
      const user = await this.prismaService.user.findUnique({
         where: {
            email: dto.email
         }
      })
      //if user does not exist, throw exception
      if (!user) {
         throw new ForbiddenException(
            'This email is not registered yet'
         );
      }
      //compare password
      const pwMatches = await argon.verify(
         user.hash,
         dto.password
      );
      //if password is incorrect, throw exception
      if (!pwMatches) {
         throw new ForbiddenException(
            'Password is incorrect'
         );
      }
      //send back the user
      delete user.hash
      return user;
   }


} 