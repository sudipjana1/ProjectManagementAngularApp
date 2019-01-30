import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ParenttaskService } from '../parenttask.service';
import { TaskService } from '../task.service';
import { ProjectService } from '../project.service';
import { MatListModule } from '@angular/material/list';
import { UserService } from '../user.service';



@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  disableBtn = false;
  buttonText: String = "Add Task";
  edittaskid: number | undefined;
  edittaskuser: any;
  edittask: any;
  marked = false;
  searchproject: any = "";
  searchuser: any = "";
  searchparent: any = "";
  theCheckbox = false;
  parenttasks: any = [];
  projects: any = [];
  users: any = [];
  parentTaskSelected: any = { parentid: 0, parenttask: "" };
  projectSelected: any = { projectid: 0, projectname: "", startdate: "", enddate: "", priority: 0 };
  userSelected: any = { userid: 0, firstname: "", lastname: "", employeeid: 0, project: "", task: "" };
  taskSelected: any = { taskname: '', startdate: '', enddate: '', priority: 0, active: 1, parenttask: '', project: '' };


  addTaskForm = new FormGroup({
    parenttask: new FormControl(),
    project: new FormControl(),
    user: new FormControl(),
    taskpriority: new FormControl(),
    startdate: new FormControl(),
    enddate: new FormControl(),
    parenttaskcheck: new FormControl(),
    taskname: new FormControl(),
    parenttaskselect: new FormControl(),
    projectselect: new FormControl(),
    userselect: new FormControl(),



  });

  @Input() ptask = { parenttask: '' };
  @Input() task = { taskname: '', startdate: '', enddate: '', priority: 0, active: 1, parenttask: '', project: '' };
  @Input() taskuser = { userid: 0, firstname: '', lastname: '', employeeid: 0, task: '' };


  constructor(public rest: ParenttaskService, public rest1: TaskService, public rest2: ProjectService, public rest3: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.edittaskid = this.route.snapshot.params['id'];
    if(this.edittaskid === undefined){
      console.log("task ID:"+ "Add Task");
    }else{
      console.log("Edit Task ID:" + this.edittaskid)
      this.buttonText = "Edit Task";
      this.disableBtn = true;
      this.getUserByTaskID(this.edittaskid);
      this.getTaskByID(this.edittaskid);
    }
  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }
  addData() {
    console.log("Task:" + JSON.stringify(this.task));
    console.log(this.marked);
    if (this.marked == true) {
      this.ptask.parenttask = this.task.taskname;
      this.rest.addData(this.ptask).subscribe((result) => {
        alert(this.ptask.parenttask + " Added as Parent Task");
        this.resetFields();
      }, (err) => {
        console.log(err)
      });

    } else {
      this.taskSelected = this.task;
      this.taskuser.task = this.taskSelected;
      if(this.task.active == 2){
        alert(this.task.taskname + "is Completed Status");
        return;
      }

      if (this.taskuser.userid == 0 || this.task.taskname == null || this.task.project == "" ){
        alert("Please Fill all fields");
        return;
      }
      console.log("Task User:" + JSON.stringify(this.taskuser));
      this.rest3.addData(this.taskuser).subscribe((result) => {
        console.log("Task User:" + JSON.stringify(this.taskuser));

        alert(this.task.taskname + " Added as Task");
        this.resetFields();

      }, (err) => {
        console.log(err)
      });
    }
  }

  getParentTask() {
    this.parenttasks = [];
    this.rest.getAll().subscribe((data: {}) => {
      console.log(data);
      this.parenttasks = data;
    });
  }
  getTaskByID(id: number){
    this.rest1.getById(id).subscribe((data: {}) => {
      console.log(data);
      this.edittask = data;
      this.task = this.edittask;
      this.task.project = this.edittask.project;
      this.searchproject = this.edittask.project.projectname;
      this.task.parenttask = this.edittask.parenttask
      this.searchparent = this.edittask.parenttask.parenttask;
    });
  }

  getUserByTaskID(id: number){
    this.rest3.getUserByTaskId(id).subscribe((data: {}) => {
      console.log(data);
      this.edittaskuser = data;
      this.taskuser = this.edittaskuser;
      this.searchuser = this.edittaskuser.firstname;
    });
  }
  getProjects() {
    this.projects = [];
    this.rest2.getAll().subscribe((data: {}) => {
      console.log(data);
      this.projects = data;
      if(this.projects.errorMessage != null){
        alert(this.projects.errorMessage );
        this.projects = [];
      }
    });
  }

  getUsers() {
    this.projects = [];
    this.rest3.getAll().subscribe((data: {}) => {
      console.log(data);
      this.users = data;
    });
  }
  toggleVisibility(e) {
    this.marked = e.target.checked;
    console.log('toggle')

    if (this.marked == true) {
      console.log('disable')
      this.disableFields();
    } else {
      this.enableFields();
    }
  }
  resetFields(){
    this.addTaskForm.reset();
    this.disableBtn = false;
    this.buttonText = "Add Task"
    this.task.priority = 0;
  }
  disableFields() {
    this.addTaskForm.controls['startdate'].disable();
    this.addTaskForm.controls['enddate'].disable();
    this.addTaskForm.controls['taskpriority'].disable();
    this.addTaskForm.controls['parenttask'].disable();

  }
  enableFields() {
    this.addTaskForm.controls['startdate'].enable();
    this.addTaskForm.controls['enddate'].enable();
    this.addTaskForm.controls['taskpriority'].enable();
    this.addTaskForm.controls['parenttask'].enable();

  }
  onAreaParentControlChanged() {
    console.log(JSON.stringify(this.parentTaskSelected));
    this.task.parenttask = this.parentTaskSelected;
    this.searchparent = this.parentTaskSelected.parenttask;
    console.log("searchparent: "+ this.searchparent);
  }

  onAreaProjectControlChanged() {
    console.log(JSON.stringify(this.projectSelected));
    this.task.project = this.projectSelected;
    this.searchproject = this.projectSelected.projectname;
  }

  onAreaUserControlChanged() {
    console.log(JSON.stringify(this.userSelected));
    
    if (this.userSelected == null) {
      //this.taskuser = this.userSelected;
    } else {
      if (this.userSelected.task != null) {
        alert(this.userSelected.firstname + " Already assigned to " + this.userSelected.task.taskname);
      } else {
        this.taskuser = this.userSelected;
        this.searchuser = this.userSelected.firstname;
      }
    }
  }

  validateTask(){

  }

  validateParentTask(){

  }
}
