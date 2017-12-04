import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/index'

@Component({
    moduleId: module.id,
    selector: 'app-register-page',
    templateUrl: 'register-page.component.html',
    styleUrls: ['register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

    constructor(private accountService: AccountService,
        private router: Router) {
    }

    ngOnInit() {
    }
}
