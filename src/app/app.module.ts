import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { RegisterPageModule } from './pages/register-page/register-page.module'
import { AppComponent } from './app.component'
import { AccountService } from './services/index'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RegisterPageModule,
    AppRoutingModule
  ],
  providers: [
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
