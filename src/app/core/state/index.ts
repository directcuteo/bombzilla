import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '@env/environment';

import * as fromBins from './bins/bins.reducer';
import * as fromBombs from './bombs/bombs.reducer';
import * as fromGame from './game/game.reducer';


export interface AppState {
  game: fromGame.GameState;
  bins: fromBins.BinsState;
  bombs: fromBombs.BombsState;
}

export const reducers: ActionReducerMap<AppState> = {
  game: fromGame.gameReducers,
  bins: fromBins.binsReducers,
  bombs: fromBombs.bombsReducers
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
