import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators'

const endpoint = 'http://localhost:8090/projectmanagement/api/user';
//const endpoint = 'https://jsonplaceholder.typicode.com/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private extractData(res:Response){
    let body = res;
    return body || {};
  }

  getAll(): Observable<any>{
    return this.http.get(endpoint + '/').pipe(map(this.extractData));
  }

  getSortbyFirstName(): Observable<any>{
    return this.http.get(endpoint + '/sortbyfirstname/').pipe(map(this.extractData));
  }

  getSortbyLastName(): Observable<any>{
    return this.http.get(endpoint + '/sortbylastname/').pipe(map(this.extractData));
  }
  getSortbyEmployeeId(): Observable<any>{
    return this.http.get(endpoint + '/sortbyemployeeid/').pipe(map(this.extractData));
  }
  getById(id): Observable<any>{
    return this.http.get(endpoint + '/id/' + id).pipe(map(this.extractData));
  }

  getByEmployeeId(id): Observable<any>{
    return this.http.get(endpoint + '/employeeid/' + id).pipe(map(this.extractData));
  }

  getUserByTaskId(id): Observable<any>{
    return this.http.get(endpoint + '/task/' + id).pipe(map(this.extractData));
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
      tap((post)=> console.log('updated Data id='+ {id})),
      catchError(this.handleError<any>('updateData'))
    )
  }

  updateUserByTaskProject(id): Observable<any>{
    return this.http.put(endpoint + '/project/' + id, httpOptions).pipe(
      tap((post)=> console.log('updated Data id='+ {id})),
      catchError(this.handleError<any>('updateData'))
    )
  }

  deleteData(id): Observable<any>{
    return this.http.delete<any>(endpoint + '/id/' + id, httpOptions).pipe(
      tap((post)=> console.log('deleted User with id='+ {id})),
      catchError(this.handleError<any>('deleteUser'))
    )
  }

  private handleError<T> (operation = 'operation',result?: T){
    return (error: any): Observable<T> =>{
      console.log(error);
      return of(result as T);
    };
  }
}

