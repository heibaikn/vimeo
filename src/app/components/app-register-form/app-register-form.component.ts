import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroupDirective, NgForm, FormGroup, Validators, FormControl } from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AccountService } from '../../services/index'

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))
  }
}

@Component({
  moduleId: module.id,
  selector: 'app-register-form',
  templateUrl: './app-register-form.component.html',
  styleUrls: ['./app-register-form.component.css']
})
export class AppRegisterFormComponent implements OnInit {

  registerFormGroup: FormGroup
  accountData = {
    email: '',
    password: '',
    gender: 0,
    nickname: ''
  }
  showPassword = false

  matcher = new MyErrorStateMatcher()

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    this.registerFormGroup = new FormGroup({
      'emailFormControl': new FormControl(this.accountData.email, [
        Validators.required,
        Validators.email
      ]),
      'passwordFormControl': new FormControl(this.accountData.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]),
      'nicknameFormControl': new FormControl(this.accountData.nickname, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]),
      'genderFormControl': new FormControl(this.accountData.gender, [
        Validators.required,
      ]),
    });
  }

  get emailFormControl() { return this.registerFormGroup.get('emailFormControl'); }
  get passwordFormControl() { return this.registerFormGroup.get('passwordFormControl'); }
  get nicknameFormControl() { return this.registerFormGroup.get('nicknameFormControl'); }
  get genderFormControl() { return this.registerFormGroup.get('genderFormControl'); }
}
