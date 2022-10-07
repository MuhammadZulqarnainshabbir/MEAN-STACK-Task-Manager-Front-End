import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import TaskListModel from 'src/app/models/tasklistmodel';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task-list-screen',
  templateUrl: './new-task-list-screen.component.html',
  styleUrls: ['./new-task-list-screen.component.css']
})
export class NewTaskListScreenComponent implements OnInit {

  constructor(private taskserveice: TaskService,
    private router: Router) { }

  ngOnInit(): void {
  }
  addNewTaskList(title: string) {

    if (title) {
      this.taskserveice.createTasklist(title).subscribe(
        (newlycreatedTaskLits: TaskListModel) => {
          this.router.navigate(['task-list', newlycreatedTaskLits._id])

        }
      )
    }
    else {
      alert('Please enter a title');
      return
    }


  }
}
