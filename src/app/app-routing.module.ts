import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatFormComponent } from './creatform/creatform.component';
import { GameComponent } from './game/game.component';
import { WaitComponent } from './wait/wait.component';
import { GameEndComponent } from './game-end/game-end.component';

const appRoutes: Routes=[
    {path:'', component: CreatFormComponent},
    {path:'game', component: GameComponent},
    {path:'wait', component: WaitComponent},
    {path:'win', component:GameEndComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
