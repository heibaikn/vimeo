import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {RegisterPageComponent} from './register-page.component'

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'register', component: RegisterPageComponent}
    ])
  ],
  exports: [RouterModule]
})
export class RegisterPageRoutingModule {
}
