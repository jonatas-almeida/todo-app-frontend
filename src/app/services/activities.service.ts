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
    return this.http.get<any>(`${this.baseUrl}/todo`);
  }

  // Search an activity
  searchActivity(activityName): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/todo/${activityName}`)
  }

  // Add activity
  postActivity(payload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/todo/new_activity`, payload)
  }

  // Delete activity
  deleteActivity(activityId): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/todo/${activityId}`);
  }

}
