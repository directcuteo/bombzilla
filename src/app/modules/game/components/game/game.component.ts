import { Component, OnInit } from '@angular/core';
import { Bin } from '../../../../core/types/bins/bin.type';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/state';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { BinsActionsTypes } from '../../../../core/state/bins/bins.actions';
import { Bomb } from '../../../../core/types/bombs/bomb.type';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BombsActionsTypes } from '../../../../core/state/bombs/bombs.actions';
import { Game } from '../../../../core/types/game/game.type';
import { GameActionsTypes } from '../../../../core/state/game/game.actions';

const BINS_SWITCH_FREQUENCY = 40;
const GAME_TIME = 120;

@UntilDestroy()
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game$: Observable<Game>;
  bins$: Observable<Bin[]>;
  bombs$: Observable<Bomb[]>;
  nextBinMix$: Observable<number>;
  gameRemainingTime$: Observable<string>;

  activeHoveringBin: Bin | undefined;

  private timeLeft = BINS_SWITCH_FREQUENCY;
  private gameTime = GAME_TIME;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getBins();
    this.getBombs();
    this.getGameState();
    this.createBinsTimer();
    this.initGameTime();
  }

  private getBins(): void {
    this.bins$ = this.store.select(state => state.bins.bins).pipe(untilDestroyed(this));
  }

  private getBombs(): void {
    this.bombs$ = this.store.select(state => state.bombs.bombs).pipe(untilDestroyed(this));
  }

  private getGameState(): void {
    this.game$ = this.store.select(state => state.game.game).pipe(untilDestroyed(this));
  }

  private createBinsTimer(): void {
    this.nextBinMix$ = timer(0, 1000)
      .pipe(
        untilDestroyed(this),
        map(() => {
          if (this.timeLeft > 0) {
            return --this.timeLeft;
          }
          this.timeLeft = BINS_SWITCH_FREQUENCY;
          this.mixBins();
          return this.timeLeft;
        })
      );
  }

  private initGameTime(): void {
    const twoDigitValue = (value) => value.toString().length === 1 ? `0${value}` : value;
    this.gameRemainingTime$ = timer(0, 1000)
      .pipe(
        untilDestroyed(this),
        map(() => {
          --this.gameTime;

          const minutes = Math.floor(this.gameTime / 60);
          const seconds = this.gameTime % 60;

          return twoDigitValue(minutes) + ':' + twoDigitValue(seconds);
        })
      );
  }

  private mixBins(): void {
    this.store.dispatch({ type: BinsActionsTypes.MixBins });
  }

  onBombDrop(bomb: Bomb): void {
    if (this.activeHoveringBin) {
      this.store.dispatch({ type: BombsActionsTypes.DeleteBomb, payload: bomb.id });
      if (bomb.color === this.activeHoveringBin.color) {
        this.store.dispatch({ type: GameActionsTypes.IncreaseScore });
      } else {
        this.store.dispatch({ type: GameActionsTypes.DecreaseScore });
      }
      this.clearActiveBin();
    }
  }

  onMouseEnterBin(bin: Bin): void {
    this.activeHoveringBin = bin;
  }

  clearActiveBin(): void {
    this.activeHoveringBin = undefined;
  }
}
