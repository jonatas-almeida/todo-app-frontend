import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  baseUrl = environment.API_LOCAL;

  constructor(private http: HttpClient) { }

  // Get all activities
  getAllActivities(token): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/todo`, token);
  }

  // Add activity
  postActivity(payload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/todo`, payload)
  }

  // Delete activity
  deleteActivity(activityId): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/todo/${activityId}`);
  }

}
