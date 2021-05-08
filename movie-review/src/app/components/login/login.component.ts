import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  displayErrorMessage = false;

  constructor(private authService: AuthenticationService, private fb:FormBuilder, private router: Router) {
    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  ngOnInit(): void {}

  login() {
    let val = this.form.value;
    if ((val.username != null) && (val.password != null)) {
      this.authService.login(val.username, val.password)
        .subscribe(
          (data) => {
            console.log('Data Access Token ' + data.accessToken);
            localStorage.setItem("id_token",data.accessToken)

            this.router.navigateByUrl('dashboard');
          },() =>{
            this.displayErrorMessage = true;
          }
        );
    }else{
      console.log('Invalid username and/or password.')
    }
  }
}
