import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userSearch: number;
  users: any =[];

  buttonText: String = "Add";

  addUserForm = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    employeeid: new FormControl(),
  });

  @Input() taskuser = { userid: 0, firstname: '', lastname: '', employeeid: null};

  constructor(public rest3: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  addData() {
    console.log(this.taskuser);
    if(this.taskuser.employeeid == null || this.taskuser.firstname == "" || this.taskuser.lastname == ""){
      alert("Input Field should not be Blank")
      return;
    } 
      this.rest3.addData(this.taskuser).subscribe((result) => {
        this.getUsers();
        this.resetUser();
      }, (err) => {
        console.log(err)
      });  
      this.buttonText = "Add";
      

  }

  getUsers() {
    this.users = [];
    this.rest3.getAll().subscribe((data: {}) => {
      console.log(data);
      this.users = data;
      if(this.users.errorMessage == "Empty users"){
        console.log("No User");
        this.users = [];
      }
    });
  }
  getByEmployeeId(){
    console.log(isNaN(this.userSearch));
    if(this.userSearch == null || isNaN(this.userSearch)){
      alert("Pleaes enter Employee ID");
      return;
    }
    this.rest3.getByEmployeeId(this.userSearch).subscribe((data: {}) => {
      console.log(data);
      this.users = data;
      if(this.users.errorMessage != null){
        console.log("No User");
        alert(this.users.errorMessage );
        this.users = [];
      }
    });

  }
  editUser(edituser){
    console.log(edituser);
    this.taskuser = edituser;
    this.buttonText = "Update";
  }

  deleteUser(edituser){
    console.log(edituser);
    // this.taskuser = edituser;
    // this.buttonText = "Update";
    this.rest3.deleteData(edituser.userid).subscribe((result) => {this.getUsers()
    }, (err) => {
      console.log(err)
    }); 
    alert("User Deleted: " + edituser.firstname);
  }
  resetUser(){
    this.addUserForm.reset();
    this.getUsers();
  }
  getSortbyFirstName(){
    this.rest3.getSortbyFirstName().subscribe((data: {}) => {
      console.log(data);
      this.users = data;
    });

  }
  getSortbyLastName(){
    this.rest3.getSortbyLastName().subscribe((data: {}) => {
      console.log(data);
      this.users = data;
    });
  }
  getSortbyEmployeeId(){
    this.rest3.getSortbyEmployeeId().subscribe((data: {}) => {
      console.log(data);
      this.users = data;
    });
  }
}
