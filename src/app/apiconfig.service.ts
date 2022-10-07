import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import TaskListModel from './models/tasklistmodel';
import TaskModel from './models/taskmodel';

@Injectable({
  providedIn: 'root'
})
export class ApiconfigService {

  BASE_URL = 'http://localhost:3000';
  constructor(private httpclient: HttpClient) { }
  //get Api call

  get(url: string) {
    return this.httpclient.get<TaskListModel[]>(`${this.BASE_URL}/${url}`);
  }
  getTasks(url: string) {
    return this.httpclient.get<TaskModel[]>(`${this.BASE_URL}/${url}`);
  }
  post(url: string, data: object) {
    return this.httpclient.post<TaskListModel>(`${this.BASE_URL}/${url}`, data);

  }
  put(url: string, data: object) {
    return this.httpclient.patch<TaskModel>(`${this.BASE_URL}/${url}`, data);

  }
  delete(url: string) {
    return this.httpclient.delete<TaskModel>(`${this.BASE_URL}/${url}`);
  }

}
function get(url: any, string: any) {
  throw new Error('Function not implemented.');
}

