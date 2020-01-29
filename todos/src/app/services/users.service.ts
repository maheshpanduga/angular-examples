import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient ) { }

  getUsers(): any {
    return this.http.get('https://fakerestapi.azurewebsites.net/api/Users');
  }

  saveUser(user:any): void {
    this.http.post('https://fakerestapi.azurewebsites.net/api/Users', user);
  }

  updateUser(user:any): void {
    this.http.put('https://fakerestapi.azurewebsites.net/api/Users'+user.ID, user);
  }

  deleteUser(user:any): void {
    this.http.delete('https://fakerestapi.azurewebsites.net/api/Users'+user.ID);
  }
}
