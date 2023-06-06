import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of, switchMap } from 'rxjs';
import { User } from '../interfaces/user';
import { City, User2 } from '../interfaces/user2';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http: HttpClient) { }

  //Ejerccio 2
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("https://6390b47b65ff4183111c4b91.mockapi.io/users/users");
  }


  //Ejerccio 4
  getUsers2(): Observable<User2[]> {
    return this.http.get<User2[]>("https://646b8fc77d3c1cae4ce3ffe0.mockapi.io/commonapi/users");
  }

  getCity(id: string): Observable<City> {
    return this.http.get<City>(`https://646b8fc77d3c1cae4ce3ffe0.mockapi.io/commonapi/cities/${id}`);
  }

  getUsersCity(): Observable<User2[]> {
    return this.getUsers2().pipe(
      switchMap((users: User2[]) => {
        const usersO: Observable<User2>[] = users.map(user => {
          return this.getCity(user.id).pipe(
            switchMap((city: City) => {
              user.city = city;
              return of(user);
            })
          );
        });
        return forkJoin(usersO);
      })
    );
  }
}
