import {ModuleWithProviders, NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'


import {AppRegisterFormComponent} from './app-register-form/app-register-form.component'


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AppRegisterFormComponent],
  exports: [
    AppRegisterFormComponent
  ]
})
export class ComponentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ComponentsModule,
    };
  }
}
