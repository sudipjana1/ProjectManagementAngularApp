import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  tasks: any = [];
  tasksearch: any = "";
  projectSearch: any = "";
  project: any;
  projectInp = { projectid: 0, projectname: '', startdate: '', enddate: '', priority: 0 };
  task = { taskname: '', startdate: '', enddate: '', priority: 0, active: 1, parenttask: '', project: '' };

  @Input() taskInp = { taskname: '', startdate: '', enddate: '', priority: 0, active: 1, parenttask: '', project: '' };


  constructor(public rest: TaskService, public rest1: ProjectService, private route: ActivatedRoute, private router: Router,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.tasks = [];
    this.rest.getAll().subscribe((data: {}) => {
      console.log(data);
      this.tasksearch = data;
      if (this.tasksearch.errorMessage != null) {
        alert(JSON.stringify(this.tasksearch.errorMessage));
      }else{
        this.tasks = data;
      }
    });
  }

  getProjectByName() {
    if (this.projectSearch == "") {
      alert("Please enter Project Name");
      return;
    }
    this.rest1.getProjectByProjectName(this.projectSearch).subscribe((data: {}) => {
      console.log(data);
      this.project = data;

      if (this.project.errorMessage != null) {
        alert(JSON.stringify(this.project.errorMessage));
      } else {
        this.projectInp = this.project;
        this.getTasksByproject(this.projectInp.projectid);
      }
    });
  }

  getTasksByproject(id) {
    this.tasks = [];
    this.rest.getAllByProjectId(id).subscribe((data: {}) => {
      this.tasksearch = data;
      if (this.tasksearch.errorMessage != null) {
        alert(JSON.stringify(this.tasksearch.errorMessage));
      } else {
        this.tasks = data;
      }
    });

  }

  getSortbyStartDate() {
    if (this.projectSearch == "") {
      alert("Please enter Project Name");
      return;
    }

    this.rest1.getProjectByProjectName(this.projectSearch).subscribe((data: {}) => {
      console.log(data);
      this.project = data;

      if (this.project.errorMessage != null) {
        alert(JSON.stringify(this.project.errorMessage));
      } else {
        this.projectInp = this.project;
        this.tasks = [];
        this.rest.sortByStartdate(this.projectInp.projectid).subscribe((data: {}) => {
          this.tasksearch = data;
          if (this.tasksearch.errorMessage != null) {
            alert(JSON.stringify(this.tasksearch.errorMessage));
          } else {
            this.tasks = data;
          }
        });
      }
    });

  }

  getSortbyEndDate() {
    if (this.projectSearch == "") {
      alert("Please enter Project Name");
      return;
    }

    this.rest1.getProjectByProjectName(this.projectSearch).subscribe((data: {}) => {
      console.log(data);
      this.project = data;

      if (this.project.errorMessage != null) {
        alert(JSON.stringify(this.project.errorMessage));
      } else {
        this.projectInp = this.project;
        this.tasks = [];
        this.rest.sortByEnddate(this.projectInp.projectid).subscribe((data: {}) => {
          this.tasksearch = data;
          if (this.tasksearch.errorMessage != null) {
            alert(JSON.stringify(this.tasksearch.errorMessage));
          } else {
            this.tasks = data;
          }
        });
      }
    });


  }
  getSortbyPriority() {
    if (this.projectSearch == "") {
      alert("Please enter Project Name");
      return;
    }

    this.rest1.getProjectByProjectName(this.projectSearch).subscribe((data: {}) => {
      console.log(data);
      this.project = data;

      if (this.project.errorMessage != null) {
        alert(JSON.stringify(this.project.errorMessage));
      } else {
        this.projectInp = this.project;
        this.tasks = [];
        this.rest.sortByPriority(this.projectInp.projectid).subscribe((data: {}) => {

          this.tasksearch = data;
          if (this.tasksearch.errorMessage != null) {
            alert(JSON.stringify(this.tasksearch.errorMessage));
          } else {
            this.tasks = data;
          }
        });
      }
    });


  }
  getSortbyCompleted() {

    if (this.projectSearch == "") {
      alert("Please enter Project Name");
      return;
    }

    this.rest1.getProjectByProjectName(this.projectSearch).subscribe((data: {}) => {
      console.log(data);
      this.project = data;

      if (this.project.errorMessage != null) {
        alert(JSON.stringify(this.project.errorMessage));
      } else {
        this.projectInp = this.project;
        this.tasks = [];
        this.rest.sortByCompleted(this.projectInp.projectid).subscribe((data: {}) => {
          this.tasksearch = data;
          if (this.tasksearch.errorMessage != null) {
            alert(JSON.stringify(this.tasksearch.errorMessage));
          } else {
            this.tasks = data;
          }
        });
      }
    });


  }

  endTask(task) {
    this.task = task;
    this.task.active = 2;
    this.rest.addData(this.task).subscribe((result) => {
      alert(this.task.taskname + " Compeleted");
      this.getAllTasks();
    }, (err) => {
      console.log(err)
    });
  }
}
