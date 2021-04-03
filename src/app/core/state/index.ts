import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '@env/environment';

import * as fromBins from './bins/bins.reducer';
import * as fromBombs from './bombs/bombs.reducer';
import * as fromGame from './game/game.reducer';


export interface AppState {
  gameState: fromGame.GameState;
  binsState: fromBins.BinsState;
  bombsState: fromBombs.BombsState;
}

export const reducers: ActionReducerMap<AppState> = {
  gameState: fromGame.gameReducers,
  binsState: fromBins.binsReducers,
  bombsState: fromBombs.bombsReducers
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
