import { User } from 'src/app/interfaces/user';
import { User2 } from './../../interfaces/user2';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent {

  detailView!: User[]
  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService
  ) {

    //Ejercicio 1
    /* this.detailView = [
      {
        name: "Prueba 1",
        age: 12
      }
    ] */

    //Ejerccio 2
    this.getUsers();

    //Ejercicio 4
    this.getUsers2();

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  //Ejercicio 1
  /* changeUsers(): void {
    this.detailView = [
      {
        name: "Prueba 2",
        age: 34
      }
    ]
  } */

  //Ejerccio 2
  getUsers(): void {
    this.userService.getUsers().pipe(takeUntil(this.destroy$)).subscribe(users => this.detailView = users)
  }

  //Ejercicio 3
  incrementar(user: User): void {
    console.log("El usuario " + user.name + " se le ha incrementado la edad a " + user.age);
  }

  //Ejercicio 4
  getUsers2() : void {
    this.userService.getUsersCity().pipe(takeUntil(this.destroy$)).subscribe(users=> console.log(users));
  }

}
