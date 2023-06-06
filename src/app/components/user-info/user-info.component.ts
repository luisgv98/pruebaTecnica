import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnChanges {

  @Input() userInfo!: User[];
  @Output() incrementacion = new EventEmitter<User>()

  constructor() { }

  //Ejercicio 1
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["userInfo"]) {
      console.log("Realizamos funcion");
    }
  }

  //Ejercicio 3
  incrementar(user: User) {
    user.age ++;
    this.incrementacion.emit(user);
  }

}
