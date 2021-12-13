import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getQuestions()
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getQuestions() {
    this.httpClient.get(`${environment.apiEndpoint}/questions/get`).subscribe((res: any) => {
      console.log(res.data)
    })
  }
}
