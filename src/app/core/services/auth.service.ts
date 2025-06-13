import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';

const baseUrl = environment.baseUrl;

const userStorage = localStorage.getItem('user');

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private _user = signal<User | null>(
    userStorage ? JSON.parse(userStorage) : null
  );
  private _isLoading = signal<boolean>(false);

  readonly isLoading = computed(() => this._isLoading());
  readonly isAuthenticated = computed(() => !!this._user());
  readonly user = computed(() => this._user());

  changeLoadingState = (value: boolean) => this._isLoading.set(value);
  changeUser = (user: User) => this._user.set(user);

  async findUserByEmail(email: string): Promise<boolean> {
    this._isLoading.set(true);
    return await firstValueFrom(
      this.http.get<User>(`${baseUrl}/users/${email}/`).pipe(
        map((res) => this.handleAuthSuccess(res)),
        catchError((_) => {
          return this.handleAuthError();
        })
      )
    );
  }

  addUser(email: string): Observable<boolean> {
    this._isLoading.set(true);
    return this.http.post<User>(`${baseUrl}/users/`, { email }).pipe(
      map((res) => this.handleAuthSuccess(res)),
      catchError((_) => {
        return this.handleAuthError();
      })
    );
  }

  logout() {
    this._user.set(null);
    this._isLoading.set(false);

    localStorage.clear();
  }

  private handleAuthSuccess(user: User) {
    this._user.set(user);
    this._isLoading.set(false);

    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }

  private handleAuthError() {
    this.logout();
    return of(false);
  }
}
