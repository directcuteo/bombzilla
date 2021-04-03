import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/state';
import { Observable } from 'rxjs';
import { Game } from '../core/types/game/game.type';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomePageComponent implements OnInit {

  game$: Observable<Game>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getGameState();
  }

  private getGameState(): void {
    this.game$ = this.store.select(state => state.gameState.game).pipe(untilDestroyed(this));
  }
}
