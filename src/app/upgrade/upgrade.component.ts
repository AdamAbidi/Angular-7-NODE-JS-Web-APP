import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface UserResponse {
  login: string;
  bio: string;
  company: string;
}
@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})


export class UpgradeComponent implements OnInit {
  ch:any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
    this.http.get<UserResponse>('https://api.github.com/users/seeschweiler').subscribe(data => {
      console.log("User Login: " + data.login);
      this.ch = data.login ;
      console.log("Bio: " + data.bio);
      console.log("Company: " + data.company);
    });
    
  }
}
