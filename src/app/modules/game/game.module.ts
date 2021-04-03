import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from '@game/components/game/game.component';
import { BinComponent } from './components/bin/bin.component';
import { BombComponent } from './components/bomb/bomb.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DraggableDirective } from './directives/draggable.directive';


@NgModule({
  declarations: [
    GameComponent,
    BinComponent,
    BombComponent,
    DraggableDirective,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    FlexLayoutModule,
  ]
})
export class GameModule {}
