import { Injectable } from "@angular/core";
import { LocalStorage } from "./local-storage.service";

const TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'auth-refreshtoken';

@Injectable({
    providedIn: 'root'
  })
export class JwtService {

  constructor(private storage: LocalStorage) {}

  public clear(): void {
   this.storage.removeItem(TOKEN_KEY);
   this.storage.removeItem(REFRESH_TOKEN_KEY);
  }

  public saveToken(token: string): void {
   this.storage.removeItem(TOKEN_KEY);
   this.storage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return this.storage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
   this.storage.removeItem(REFRESH_TOKEN_KEY);
   this.storage.setItem(REFRESH_TOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return this.storage.getItem(REFRESH_TOKEN_KEY);
  }
}