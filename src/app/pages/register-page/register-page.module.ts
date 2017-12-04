import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterPageRoutingModule } from './register-page-routing.module'
import { RegisterPageComponent } from './register-page.component'
import { ComponentsModule } from '../../components/components.module'

@NgModule({
    imports: [CommonModule, RegisterPageRoutingModule, ComponentsModule],
    declarations: [RegisterPageComponent],
    exports: [RegisterPageComponent]
})
export class RegisterPageModule {
}
