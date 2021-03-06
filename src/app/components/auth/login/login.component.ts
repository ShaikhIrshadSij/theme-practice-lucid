import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private toastrService: ToastrService
  ) {
    // redirect to home if already logged in
    if (this.accountService.isLoggedIn()) {
      this.router.navigate(['/app/dashboard']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/app/dashboard';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.accountService
      .login(this.f.username.value, this.f.password.value)
      .subscribe(
        (data: any) => {
          if (data.isSuccess) {
            localStorage.setItem('userInfo', JSON.stringify({
              userInfo: data.userInfo,
              token: data.token
            }));
            this.toastrService.success(data.message)
            this.router.navigate([this.returnUrl]);
          } else {
            this.loading = false;
            this.submitted = false
            this.toastrService.error(data.message)
          }
        },
        (error) => {
          this.loading = false;
        }
      );
  }
}
