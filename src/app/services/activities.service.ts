import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  baseUrl = environment.API_LOCAL;

  constructor(private http: HttpClient, private userService: UserService) { }

  // Get all activities
  getAllActivities(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/todo`, { token: this.userService.userToken });
  }

  // Add activity
  postActivity(payload): Observable<any> {
    const body = {
      activity_title: payload.activity_title,
      activity_description: payload.activity_description,
      user: payload.user,
      token: this.userService.userToken
    }
    return this.http.post<any>(`${this.baseUrl}/todo/new_activity`, body)
  }

  // Delete activity
  deleteActivity(activityId): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/todo/${activityId}`);
  }

}
