import { Injectable } from '@angular/core';
import { ApiconfigService } from './apiconfig.service';
import TaskModel from './models/taskmodel';
import TaskListModel from './models/tasklistmodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiconfigservice: ApiconfigService) { }

  getAlltasklist() {
    return this.apiconfigservice.get('tasklists');
  }
  //create tasklist
  createTasklist(title: string) {
    let data = { 'title': title }
    return this.apiconfigservice.post('tasklists', data);
  }

  getAllTasks(taskListId: string) {
    return this.apiconfigservice.getTasks(`tasklists/${taskListId}`)

  }
  //to fetch all tasks of a task list
  //http://localhost:3000/tasklists/6336ee20aac59c2d223f055f/task
  getAllTasksForATaskList(taskListId: string) {
    return this.apiconfigservice.getTasks(`tasklists/${taskListId}/task`);

  }

  createTaskInsideTaskList(taskListId: string, title: string) {
    let data = { 'title': title }
    return this.apiconfigservice.post(`tasklists/${taskListId}/task`, data)
  }


  deletetaskList(taskListId: string) {
    return this.apiconfigservice.delete(`tasklists/${taskListId}`)
  }

  deleteaparticularTask(taskListId: string, taskId: string): Observable<TaskModel> {
    return this.apiconfigservice.delete(`tasklists/${taskListId}/task/${taskId}`)

  }
  updateTaskStatus(taskListId: string, taskObj: TaskModel): Observable<TaskModel> {
    let updateData = { 'completed': !taskObj.completed }
    console.log(taskListId)
    console.log(updateData)
    return this.apiconfigservice.put(`tasklists/${taskListId}/task/${taskObj._id}`, updateData)

  }
}
