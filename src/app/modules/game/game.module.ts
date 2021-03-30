import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from '@game/components/game/game.component';
import { BinComponent } from './components/bin/bin.component';
import { BombComponent } from './components/bomb/bomb.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    GameComponent,
    BinComponent,
    BombComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    FlexLayoutModule
  ]
})
export class GameModule {}
