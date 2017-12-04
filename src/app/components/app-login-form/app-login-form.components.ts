import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../services/index'

@Component({
  moduleId: module.id,
  selector: 'app-login-form',
  templateUrl: './app-login-form.component.html',
  styleUrls: ['./app-login-form.component.css']
})
export class AppLoginFormComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  loginForm: FormGroup;
  errorMsg: string;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService) {
  }

  ngOnInit() {
  }

  login(): void {
  }
}
