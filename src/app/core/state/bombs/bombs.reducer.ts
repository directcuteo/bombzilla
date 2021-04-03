import { BombsActionsTypes } from './bombs.actions';
import { Bomb } from '../../types/bombs/bomb.type';

export const initialBombs: Bomb[] = [];

export interface BombsState {
  bombs: Bomb[];
}

export const initialState: BombsState = {
  bombs: initialBombs
};

export function bombsReducers(state: BombsState = initialState, action: any): BombsState {
  switch (action.type) {
    case BombsActionsTypes.SelectBombs:
      return {
        bombs: [...state.bombs]
      };
    case BombsActionsTypes.CreateBomb:
      return {
        bombs: createBomb(state.bombs, action.payload)
      };
    case BombsActionsTypes.DeleteBomb:
      return {
        bombs: deleteBomb(state.bombs, action.payload)
      };
    case BombsActionsTypes.DeleteAllBombs:
      return {
        bombs: []
      };
    default:
      return state;
  }
}

const deleteBomb = (bombs: Bomb[], bombId: number) => bombs.filter(bomb => bomb.id !== bombId);
const createBomb = (bombs: Bomb[], newBomb: Bomb) => [...bombs, newBomb];
