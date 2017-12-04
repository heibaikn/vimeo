import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../services/index'

@Component({
  moduleId: module.id,
  selector: 'app-register-form',
  templateUrl: './app-register-form.component.html',
  styleUrls: ['./app-register-form.component.css']
})
export class AppRegisterFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService) {
  }

  ngOnInit() {
  }

  register(): void {
  }
}
