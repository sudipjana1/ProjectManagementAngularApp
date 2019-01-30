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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  model;
  startdate;
  enddate;
  tomorrow;
  modeldate = {
    "year": 0,
    "month": 0,
    "day": 0
  };;

  projectManager: any = "";

  userSearch: any = "";
  marked = false;
  theCheckbox = false;
  parenttasks: any = [];
  projects: any = [];
  users: any = [];
  buttonText: String = "Add";
  projectdetails: any = [];
  parentTaskSelected: any = { parentid: 0, parenttask: "" };
  projectSelected: any = { projectid: 0, projectname: "", startdate: "", enddate: "", priority: 0 };
  userSelected: any = { userid: 0, firstname: "", lastname: "", employeeid: 0, project: "", task: "" };
  taskSelected: any = { taskname: '', startdate: '', enddate: '', priority: 0, active: 1, parenttask: '', project: '' };


  addProjectForm = new FormGroup({
    parenttask: new FormControl(),
    project: new FormControl(),
    user: new FormControl(),
    projectpriority: new FormControl(),
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
  @Input() taskuser = { userid: 0, firstname: '', lastname: '', employeeid: 0, project: '', task: '' };
  @Input() projectInp = { projectid: 0, projectname: '', startdate: '', enddate: '', priority: 0 };



  constructor(public rest: ParenttaskService, public rest1: TaskService, public rest2: ProjectService,
    public rest3: UserService, private route: ActivatedRoute, private router: Router,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.getProjects();
    //this.model = Date.now();
    this.disableFields();
    this.model = new Date();
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);

    console.log(this.datePipe.transform(this.tomorrow, 'yyyy-MM-dd'));
    this.modeldate.year = parseInt(this.datePipe.transform(this.model, 'yyyy'), 10);
    this.modeldate.month = parseInt(this.datePipe.transform(this.model, 'MM'), 10);
    this.modeldate.day = parseInt(this.datePipe.transform(this.model, 'dd'), 10);

  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }
  addData() {
    ;
    this.projectSelected = this.projectInp
    console.log(this.projectSelected);

    console.log(this.taskuser);
    if (this.taskuser == null || this.taskuser.employeeid == null || this.taskuser.firstname == ""
      || this.taskuser.lastname == "") {
      alert("Please Select Manager")
      return;
    }
    this.taskuser.project = this.projectSelected;

    if (this.taskuser.project == null) {
      alert("Please Enter Project Name")
      return;
    }
    if (this.projectInp.startdate >= this.projectInp.enddate) {
      alert("End date should be greater than Start date")
      return;
    }

    this.rest3.addData(this.taskuser).subscribe((result) => {
      this.getProjects();
      this.resetData();
    }, (err) => {
      console.log(err)
    });

    this.buttonText = "Add";


  }
  getParentTask() {
    this.parenttasks = [];
    this.rest.getAll().subscribe((data: {}) => {
      console.log(data);
      this.parenttasks = data;
    });
  }
  getProjects() {
    this.projectdetails = [];
    this.rest2.getAllProjectDetails().subscribe((data: {}) => {
      console.log(data);
      this.projectdetails = data;
      if (this.projectdetails.errorMessage == "Empty users") {
        console.log("No Project");
        this.projectdetails = [];
      }
    }, (err) => {
      console.log(err)
    });
  }
  getSortbyStartDate() {
    this.projectdetails = [];
    this.rest2.getSortbyStartDate().subscribe((data: {}) => {
      console.log(data);
      this.projectdetails = data;
    });
  }

  getSortbyEndDate() {
    this.projectdetails = [];
    this.rest2.getSortbyEndDate().subscribe((data: {}) => {
      console.log(data);
      this.projectdetails = data;
    });
  }
  getSortbyPriority() {
    this.projectdetails = [];
    this.rest2.getSortbyPriority().subscribe((data: {}) => {
      console.log(data);
      this.projectdetails = data;
    });
  }
  getSortbyCompleted() {
    this.projectdetails = [];
    this.rest2.getSortbyCompleted().subscribe((data: {}) => {
      console.log(data);
      this.projectdetails = data;
    });
  }

  getUsers() {
    this.users = [];
    this.rest3.getAll().subscribe((data: {}) => {
      console.log(data);
      this.users = data;
      console.log(this.users);
    });
  }

  editProject(editproject) {
    console.log(editproject);
    this.taskuser = editproject.user;
    console.log(editproject);
    this.projectInp = editproject.project;
    if (editproject.user == null) {
      console.log("No PM Selected");
      this.projectManager = "";
    } else {
      this.userSelected = editproject.user;
      this.projectManager = this.userSelected.firstname;
    }
    this.buttonText = "Update";
  }

  deleteProject(deleteproject) {
    console.log(deleteproject);
    this.rest3.updateUserByTaskProject(deleteproject.project.projectid).subscribe((data: {}) => {
      console.log(data);
      this.rest1.updateByProjectId(deleteproject.project.projectid).subscribe((data: {}) => {
        console.log(data);
        this.rest2.deleteData(deleteproject.project.projectid).subscribe((data: {}) => {
          console.log(data);
          this.taskuser = deleteproject.user;
          if (this.taskuser != null) {
            this.taskuser.project = null;
            this.rest3.addData(this.taskuser).subscribe((result) => {
              this.getProjects();
            }, (err) => {
              console.log(err)
            });
          }
        });
      });
    });
  }

  resetData() {
    this.addProjectForm.reset();
    this.buttonText = "Add";
    this.getProjects();
    // this.projectInp.projectid = 0;
    // this.projectInp.projectname = "";
    // this.projectInp.priority = 0;
    // this.projectInp.startdate = "";
    // this.projectInp.enddate = "";
  }
  toggleVisibility(e) {
    this.marked = e.target.checked;
    console.log('toggle')

    if (this.marked == true) {
      console.log('enable')
      this.enableFields();
      this.projectInp.startdate = this.datePipe.transform(this.model, 'yyyy-MM-dd');
      this.projectInp.enddate = this.datePipe.transform(this.tomorrow, 'yyyy-MM-dd');
    } else {
      this.disableFields();

    }
  }
  disableFields() {
    this.addProjectForm.controls['startdate'].disable();
    this.addProjectForm.controls['enddate'].disable();

  }
  enableFields() {
    this.addProjectForm.controls['startdate'].enable();
    this.addProjectForm.controls['enddate'].enable();
  }


  onAreaUserControlChanged() {
    //console.log(JSON.stringify(event.parentid));
    console.log(JSON.stringify(this.userSelected));
    if (this.userSelected == null) {
      //this.taskuser = this.userSelected;
    } else {
      if (this.userSelected.project != null) {
        alert(this.userSelected.firstname + " Already Project Manager of " + this.userSelected.project.projectname);
      } else {
        this.taskuser = this.userSelected;
        this.projectManager = this.taskuser.firstname;
      }
    }
    console.log("projectManager" + this.projectManager);
    //this.parentTaskSelected = this.selectedProject;
    //this.task.project = this.projectSelected;
    // this.getProjects();
    // this.getUsers();
  }
}
