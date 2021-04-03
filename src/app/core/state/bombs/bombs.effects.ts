import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { BombsActionsTypes, CreateBombs, PlantRandomBomb } from './bombs.actions';
import { BombService } from './bomb.service';
import { AppState } from '../index';
import { Store } from '@ngrx/store';
import { ObservedValueOf } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BombsEffects {

  plantInitialBombs$ = createEffect(() => this.actions$.pipe(
    ofType(BombsActionsTypes.CreateBombs),
    withLatestFrom(this.store, (action: CreateBombs, state: ObservedValueOf<Store<AppState>>) => ({ action, state })),
    switchMap(({ action, state }) =>
      [
        { type: BombsActionsTypes.CreateBomb, payload: this.bombService.plantNewBomb(state.gameState.game) },
        { type: BombsActionsTypes.CreateBomb, payload: this.bombService.plantNewBomb(state.gameState.game) },
        { type: BombsActionsTypes.CreateBomb, payload: this.bombService.plantNewBomb(state.gameState.game) },
        { type: BombsActionsTypes.CreateBomb, payload: this.bombService.plantNewBomb(state.gameState.game) },
        { type: BombsActionsTypes.CreateBomb, payload: this.bombService.plantNewBomb(state.gameState.game) },
      ]
    )
  ));

  plantBomb$ = createEffect(() => this.actions$.pipe(
    ofType(BombsActionsTypes.PlantRandomBomb),
    withLatestFrom(this.store, (action: PlantRandomBomb, state: ObservedValueOf<Store<AppState>>) => ({ action, state })),
    map(({ action, state }) => ({ type: BombsActionsTypes.CreateBomb, payload: this.bombService.plantNewBomb(state.gameState.game) }))
  ));

  constructor(private store: Store<AppState>,
              private actions$: Actions,
              private bombService: BombService) {}
}
