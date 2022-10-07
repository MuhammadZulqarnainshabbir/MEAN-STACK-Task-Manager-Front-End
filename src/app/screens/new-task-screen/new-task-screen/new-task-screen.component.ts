import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task-screen',
  templateUrl: './new-task-screen.component.html',
  styleUrls: ['./new-task-screen.component.css']
})
export class NewTaskScreenComponent implements OnInit {

  taskListId: string = ''


  constructor(private taskserveice: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.taskListId = params.taskListId;
      }


    )
  }


  ngOnInit(): void {
  }
  addtask(title: string) {
    if (title) {
      this.taskserveice.createTaskInsideTaskList(this.taskListId, title).subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute })
      });

    } else {
      alert("please write the task title")
    }

  }

}
