import { BombsActionsTypes } from './bombs.actions';
import { Bomb } from '../../types/bombs/bomb.type';

export const initialBombs: Bomb[] = [
  {
    id: 1,
    color: 'red',
    lifetime: 9,
    xPosition: 10,
    yPosition: 20
  },
  {
    id: 2,
    color: 'blue',
    lifetime: 5,
    xPosition: 70,
    yPosition: 89
  },
  {
    id: 3,
    color: 'green',
    lifetime: 7,
    xPosition: 450,
    yPosition: 120
  },
  {
    id: 4,
    color: 'red',
    lifetime: 8,
    xPosition: 700,
    yPosition: 220
  },
  {
    id: 5,
    color: 'red',
    lifetime: 10,
    xPosition: 350,
    yPosition: 500
  },
  {
    id: 6,
    color: 'green',
    lifetime: 9,
    xPosition: 750,
    yPosition: 420
  },
  {
    id: 7,
    color: 'blue',
    lifetime: 10,
    xPosition: 500,
    yPosition: 220
  },
  {
    id: 8,
    color: 'green',
    lifetime: 5,
    xPosition: 150,
    yPosition: 440
  },
  {
    id: 9,
    color: 'blue',
    lifetime: 6,
    xPosition: 750,
    yPosition: 120
  },
  {
    id: 10,
    color: 'red',
    lifetime: 8,
    xPosition: 250,
    yPosition: 280
  }
];

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
    case BombsActionsTypes.DeleteBomb:
      return {
        bombs: deleteBomb(state.bombs, action.payload)
      };
    case BombsActionsTypes.CreateBomb:
      return {
        bombs: createBomb(state.bombs, action.payload)
      };
    default:
      return state;
  }
}

const deleteBomb = (bombs: Bomb[], bombId: number) => bombs.filter(bomb => bomb.id !== bombId);
const createBomb = (bombs: Bomb[], newBomb: Bomb) => [...bombs, newBomb];
