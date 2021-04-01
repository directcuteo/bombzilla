import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Bomb } from '../../../../core/types/bombs/bomb.type';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/state';
import { GameActionsTypes } from '../../../../core/state/game/game.actions';
import { BombsActionsTypes } from '../../../../core/state/bombs/bombs.actions';

@UntilDestroy()
@Component({
  selector: 'app-bomb',
  templateUrl: './bomb.component.html',
  styleUrls: ['./bomb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BombComponent implements OnInit {

  @Input() bomb: Bomb;

  bombLifetime$: Observable<number>;
  bombLifetime: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.bombLifetime = this.bomb.lifetime;
    this.createBombTimer();
  }

  private createBombTimer(): void {
    this.bombLifetime$ = timer(0, 1000)
      .pipe(
        untilDestroyed(this),
        map(() => {
          const remaining = --this.bombLifetime;
          if (remaining === 0) {
            this.detonateBomb();
          }
          return remaining;
        })
      );
  }

  private detonateBomb(): void {
    this.store.dispatch({ type: GameActionsTypes.DecreaseScore });
    this.store.dispatch({ type: BombsActionsTypes.DeleteBomb, payload: this.bomb.id });
  }
}
