import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
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
export class GameComponent implements OnInit, AfterViewInit {

  @ViewChild('bombZone', { static: true }) private bombZone: ElementRef<HTMLDivElement>;

  game$: Observable<Game>;
  bins$: Observable<Bin[]>;
  bombs$: Observable<Bomb[]>;
  nextBinMix$: Observable<number>;
  gameRemainingTime$: Observable<string>;

  activeDraggingBomb: Bomb;

  private timeLeft = BINS_SWITCH_FREQUENCY;
  private gameTime = GAME_TIME;

  private activeHoveringBin: Bin | undefined;
  private game: Game;

  constructor(private store: Store<AppState>,
              private zone: NgZone) { }

  ngOnInit(): void {
    this.getBins();
    this.getBombs();
    this.getGameState();
    this.createBinsTimer();
    this.initGameTime();
    this.spawnBombs();
  }

  ngAfterViewInit(): void {
    this.setupBombZoneBoundaries();
  }

  private setupBombZoneBoundaries(): void {
    this.store.dispatch({
      type: GameActionsTypes.UpdateBombZoneBoundaries,
      payload: {
        width: this.bombZone.nativeElement.clientWidth,
        height: this.bombZone.nativeElement.clientHeight
      }
    });
  }

  private getBins(): void {
    this.bins$ = this.store.select(state => state.bins.bins).pipe(untilDestroyed(this));
  }

  private getBombs(): void {
    this.bombs$ = this.store.select(state => state.bombs.bombs).pipe(untilDestroyed(this));
  }

  private getGameState(): void {
    this.game$ = this.store.select(state => state.game.game).pipe(untilDestroyed(this));
    this.game$
      .pipe(untilDestroyed(this))
      .subscribe((value: Game) => {
        this.game = value;
      });
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
  }

  onMouseEnterBin(bin: Bin): void {
    this.activeHoveringBin = bin;
  }

  clearActiveBin(): void {
    this.activeHoveringBin = undefined;
  }

  private spawnBombs(): void {
    this.zone.runOutsideAngular(() => {
      let frequency = 5000;
      let interval;

      const increasingInterval = (): void => {
        clearInterval(interval);
        this.spawnNewBomb();
        frequency = Math.max(500, frequency * 0.96);
        interval = setInterval(increasingInterval, frequency);
      };

      increasingInterval();
    });
  }

  private spawnNewBomb(): void {
    const bomb = {
      id: GameComponent.getRandomInteger(),
      lifetime: GameComponent.getRandomInteger(5, 10),
      color: ['red', 'blue', 'green'][GameComponent.getRandomInteger(0, 2)],
      xPosition: this.getXPosition(),
      yPosition: this.getYPosition()
    } as Bomb;
    this.store.dispatch({ type: BombsActionsTypes.CreateBomb, payload: bomb });
  }

  private getXPosition(): number {
    const bombSize = 80;
    return GameComponent.getRandomInteger(0, this.game.bombZoneWidth - bombSize);
  }

  private getYPosition(): number {
    const bombSize = 80;
    return GameComponent.getRandomInteger(0, this.game.bombZoneHeight - bombSize);
  }

  private static getRandomInteger(min: number = 1, max: number = 1000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
