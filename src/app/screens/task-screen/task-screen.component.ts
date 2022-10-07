import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import TaskListModel from 'src/app/models/tasklistmodel';
import TaskModel from 'src/app/models/taskmodel';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-screen',
  templateUrl: './task-screen.component.html',
  styleUrls: ['./task-screen.component.css']
})
export class TaskScreenComponent implements OnInit {


  tasklist: TaskListModel[] = []
  tasks: TaskModel[] = []
  taskListId: string = '';

  constructor(private taskservice: TaskService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.taskservice.getAlltasklist().subscribe(allTaskLists => { this.tasklist = allTaskLists; /* this.router.navigate(['task-list', this.tasklist[0]['_id']]) */ })



    this.route.paramMap.subscribe(
      (params: Params) => {
        this.taskListId = params.get('taskListId');

        if (this.taskListId) {
          this.taskservice.getAllTasksForATaskList(this.taskListId).subscribe((tasks => this.tasks = tasks));
        }
      })





  }
  taskClicked(task: TaskModel) {
    this.taskservice.updateTaskStatus(this.taskListId, task)

      .subscribe(() => task.completed = !task.completed)
  }

  deletetask(task: TaskModel) {
    this.taskservice.deleteaparticularTask(this.taskListId, task._id).subscribe(
      () => {
        this.tasks = this.tasks.filter(t => t._id != task._id);
      })
  }

  deleteTaskList(taskList: TaskListModel) {
    this.taskservice.deletetaskList(taskList._id).subscribe(() => {
      this.tasklist = this.tasklist.filter(tL => tL._id != taskList._id)
    })
  }

  addnewtask() {

    if (this.taskListId) {
      //route user to add task screen for the selected task
      this.router.navigate(['./new-task'], { relativeTo: this.route })

    }
    else {
      alert("Please select approprite tasklist")
    }



  }
}

