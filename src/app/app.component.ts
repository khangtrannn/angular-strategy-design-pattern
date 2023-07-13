import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AsyncPipe, NgForOf } from '@angular/common';

interface User {
  name: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, NgForOf, HttpClientModule],
  template: `
    <h1>User list: </h1>
    <ul>
      <li *ngFor="let user of users$ | async">{{user.name}}</li>
    </ul>
  `,
})
export class AppComponent implements OnInit {
  // users$!: Observable<User[]>;
  users$!: Promise<User[]>;
  private http = inject(HttpClient);

  ngOnInit(): void {
    // this.users$ = this.http.get<User[]>(`https://jsonplaceholder.typicode.com/users`);
    this.users$ = fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json());
  }
}
