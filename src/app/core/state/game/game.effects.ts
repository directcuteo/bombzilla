import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GameActionsTypes, UpdateBombZoneBoundaries } from './game.actions';
import { map, withLatestFrom } from 'rxjs/operators';
import { BombsActionsTypes } from '../bombs/bombs.actions';
import { AppState } from '../index';
import { Store } from '@ngrx/store';
import { ObservedValueOf } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameEffects {

  initBombZoneBoundaries$ = createEffect(() => this.actions$.pipe(
    ofType(GameActionsTypes.UpdateBombZoneBoundaries),
    withLatestFrom(this.store, (action: UpdateBombZoneBoundaries, state: ObservedValueOf<Store<AppState>>) => ({ action, state })),
    map(({ action, state }) => ({ type: BombsActionsTypes.CreateBombs }))
  ));

  constructor(private store: Store<AppState>,
              private actions$: Actions) {}
}
