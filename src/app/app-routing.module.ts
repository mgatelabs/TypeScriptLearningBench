import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloWorldGameComponent } from './games/hello-world-game/hello-world-game.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {path: 'games/helloworld', component: HelloWorldGameComponent},
  {path: '', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
