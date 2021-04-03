import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Bin } from '../../../../core/types/bins/bin.type';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/state';
import { Observable, timer } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators';
import { BinsActionsTypes } from '../../../../core/state/bins/bins.actions';
import { Bomb } from '../../../../core/types/bombs/bomb.type';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BombsActionsTypes } from '../../../../core/state/bombs/bombs.actions';
import { Game } from '../../../../core/types/game/game.type';
import { GameActionsTypes } from '../../../../core/state/game/game.actions';
import { Router } from '@angular/router';

const BINS_SWITCH_FREQUENCY = 40;
const GAME_TIME = 120;

@UntilDestroy()
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('bombZone', { static: false }) private bombZone: ElementRef<HTMLDivElement>;

  game$: Observable<Game>;
  bins$: Observable<Bin[]>;
  bombs$: Observable<Bomb[]>;
  nextBinMix$: Observable<number>;
  gameRemainingTime$: Observable<string>;

  activeDraggingBomb: Bomb | undefined;

  private timeLeftForBinsSwitch = BINS_SWITCH_FREQUENCY;
  private gameRemainingTime = GAME_TIME;

  private activeHoveringBin: Bin | undefined;
  private game: Game;
  private planingBombsInterval: any;

  constructor(private store: Store<AppState>,
              private zone: NgZone,
              private router: Router) { }

  ngOnInit(): void {
    this.getBins();
    this.getBombs();
    this.getGameState();
    this.createBinsSwitchTimer();
    this.initGameTime();
  }

  ngAfterViewInit(): void {
    this.setupBombZoneBoundaries();
    this.startPlantingBombs();
  }

  private setupBombZoneBoundaries(): void {
    this.store.dispatch({ type: GameActionsTypes.ResetScore });
    this.store.dispatch({
      type: GameActionsTypes.UpdateBombZoneBoundaries,
      payload: {
        width: this.bombZone.nativeElement.clientWidth,
        height: this.bombZone.nativeElement.clientHeight
      }
    });
  }

  private getBins(): void {
    this.bins$ = this.store.select(state => state.binsState.bins).pipe(untilDestroyed(this));
  }

  private getBombs(): void {
    this.bombs$ = this.store.select(state => state.bombsState.bombs).pipe(untilDestroyed(this), delay(0));
  }

  private getGameState(): void {
    this.game$ = this.store.select(state => state.gameState.game).pipe(untilDestroyed(this));
    this.game$
      .pipe(untilDestroyed(this))
      .subscribe((value: Game) => {
        this.game = value;
      });
  }

  private createBinsSwitchTimer(): void {
    this.nextBinMix$ = timer(0, 1000)
      .pipe(
        untilDestroyed(this),
        filter(() => {
          if (this.gameRemainingTime > 0) {
            return true;
          }
          this.timeLeftForBinsSwitch = 0;
          return false;
        }),
        map(() => {
          if (this.timeLeftForBinsSwitch > 0) {
            return --this.timeLeftForBinsSwitch;
          }
          this.timeLeftForBinsSwitch = BINS_SWITCH_FREQUENCY;
          this.mixBins();
          return this.timeLeftForBinsSwitch;
        })
      );
  }

  private initGameTime(): void {
    const twoDigitValue = (value) => value.toString().length === 1 ? `0${value}` : value;
    this.gameRemainingTime$ = timer(0, 1000)
      .pipe(
        untilDestroyed(this),
        filter(() => {
          if (this.gameRemainingTime > 0) {
            return true;
          }
          this.exitGame();
          return false;
        }),
        map(() => {
          --this.gameRemainingTime;

          const minutes = Math.floor(this.gameRemainingTime / 60);
          const seconds = this.gameRemainingTime % 60;

          return twoDigitValue(minutes) + ':' + twoDigitValue(seconds);
        })
      );
  }

  private mixBins(): void {
    this.store.dispatch({ type: BinsActionsTypes.MixBins });
  }

  onBombDrag(bomb): void {
    this.activeDraggingBomb = bomb;
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
    this.activeDraggingBomb = undefined;
  }

  onMouseEnterBin(bin: Bin): void {
    this.activeHoveringBin = bin;
  }

  clearActiveBin(): void {
    this.activeHoveringBin = undefined;
  }

  private startPlantingBombs(): void {
    this.zone.runOutsideAngular(() => {
      let frequency = 5000;

      const increasingInterval = (): void => {
        clearInterval(this.planingBombsInterval);
        if (this.gameRemainingTime === 0) {
          return;
        }
        this.store.dispatch({ type: BombsActionsTypes.PlantRandomBomb });
        frequency = Math.max(500, frequency * 0.96);
        this.planingBombsInterval = setInterval(increasingInterval, frequency);
      };

      increasingInterval();
    });
  }

  private exitGame(): void {
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    clearInterval(this.planingBombsInterval);
    this.store.dispatch({ type: BombsActionsTypes.DeleteAllBombs });
  }
}
