import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators'

const endpoint = 'http://localhost:8090/projectmanagement/api/project';
//const endpoint = 'https://jsonplaceholder.typicode.com/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  private extractData(res:Response){
    let body = res;
    return body || {};
  }

  getAll(): Observable<any>{
    return this.http.get(endpoint + '/').pipe(map(this.extractData));
  }
  getAllProjectDetails(): Observable<any>{
    return this.http.get(endpoint + '/getall/').pipe(map(this.extractData));
  }
  getSortbyStartDate(): Observable<any>{
    return this.http.get(endpoint + '/sortbystartdate/').pipe(map(this.extractData));
  }
  getSortbyEndDate(): Observable<any>{
    return this.http.get(endpoint + '/sortbyenddate/').pipe(map(this.extractData));
  }
  getSortbyPriority(): Observable<any>{
    return this.http.get(endpoint + '/sortbypriority/').pipe(map(this.extractData));
  }
  getSortbyCompleted(): Observable<any>{
    return this.http.get(endpoint + '/sortbycompleted/').pipe(map(this.extractData));
  }

  getById(id): Observable<any>{
    return this.http.get(endpoint + '/id/' + id).pipe(map(this.extractData));
  }

  getProjectByProjectName(id): Observable<any>{
    return this.http.get(endpoint + '/projectname/' + id).pipe(map(this.extractData));
  }

  addData(post): Observable<any>{
    console.log(post);
    return this.http.post<any>(endpoint + '/', JSON.stringify(post),httpOptions).pipe(
      tap((post)=> console.log('added Data ')),
      catchError(this.handleError<any>('addData'))
    )
  }

  updateData(id,post): Observable<any>{
    console.log(post);
    return this.http.put(endpoint + '/id/' + id, JSON.stringify(post),httpOptions).pipe(
      tap((post)=> console.log('updated Dtaa id='+ {id})),
      catchError(this.handleError<any>('updateData'))
    )
  }

  deleteData(id): Observable<any>{
    return this.http.delete<any>(endpoint + '/id/' + id, httpOptions).pipe(
      tap((post)=> console.log('deleted Post with id='+ {id})),
      catchError(this.handleError<any>('deletePost'))
    )
  }

  private handleError<T> (operation = 'operation',result?: T){
    return (error: any): Observable<T> =>{
      console.log(error);
      return of(result as T);
    };
  }
}

