import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userToken: any;

  baseUrl = environment.API_LOCAL

  constructor(public http: HttpClient) { }

  userLogin(userName, userPassword): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/login", {
      username: userName,
      user_password: userPassword,
    })
  }

  createUser(userName, userEmail, userFullName, userPassword): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/register", {
      username: userName,
      user_email: userEmail,
      user_full_name: userFullName,
      user_password: userPassword,
    });
  }

  verifyExistingUser(username): Observable<any> {
    return this.http.get(this.baseUrl + `/todo/search_username/${username}`)
  }

}
