import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, lastValueFrom, Observable } from 'rxjs';
import { StateService } from '../StateService/state.service';
import { JwtService } from '../JWTService/jwt.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    stateService = inject(StateService)
    jwtService = inject(JwtService)
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url.includes("refreshToken") || req.url.includes("getToken")){
            return next.handle(req)
        }
        return from(this.handle(req,next));
    }
    async handle(req: HttpRequest<any>, next: HttpHandler) : Promise<HttpEvent<any>>{
        await this.jwtService.refreshTokenIfCloseToEnd()
        let jwt = this.stateService.getCurrentJWT()
        if(jwt.accessToken == null){
            return lastValueFrom(next.handle(req));
        }
        const req1 = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${jwt.accessToken}`),
        });
        return await lastValueFrom(next.handle(req1));
    }
}