import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '@env/environment';

import * as fromBins from './bins/bins.reducer';


export interface AppState {
  // game: any;
  bins: fromBins.BinsState;
  // bombs: any;
}

export const reducers: ActionReducerMap<AppState> = {
  bins: fromBins.binsReducers,
  // bombs: null,
  // game: null
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
