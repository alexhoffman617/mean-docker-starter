import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public connected = false
  public users
  public name = ''
  public email = ''

  constructor(private http: HttpClient) {
    this.http.get(environment.api).subscribe(
      data => {
        this.connected = true
      },
      error => {
        this.connected = false
      }
    )

    this.http.get(environment.api + '/users').subscribe(data => {
      this.users = data
    })
  }

  addUser() {
    this.http
      .post(environment.api + '/users', {
        name: this.name,
        email: this.email
      })
      .subscribe((data: any) => {
        this.name = ''
        this.email = ''
        this.users.push(data.user)
      })
  }
}
