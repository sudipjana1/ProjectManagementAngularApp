import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AddProjectComponent } from '../add-project/add-project.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { ViewTaskComponent } from '../view-task/view-task.component';

const routepaths = [


{path: '', component:AddProjectComponent, data:{title: 'Add Project'}},
{path: 'add-project', component:AddProjectComponent, data:{title: 'Add Project'}},
{path: 'add-task', component:AddTaskComponent, data:{title: 'Add Task'}},
{path: 'edit-task/:id', component:AddTaskComponent, data:{title: 'Edit Task'}},
{path: 'add-user', component:AddUserComponent, data:{title: 'Add User'}},
{path: 'view-task', component:ViewTaskComponent, data:{title: 'View Task'}}

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routepaths),
    HttpClientModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
