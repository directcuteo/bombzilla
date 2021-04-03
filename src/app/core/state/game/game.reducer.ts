import { Game } from '../../types/game/game.type';
import { GameActionsTypes } from './game.actions';

export const initialGame: Game = {
  score: 0,
  bombZoneWidth: 1000,
  bombZoneHeight: 660
};

export interface GameState {
  game: Game;
}

export const initialState: GameState = {
  game: initialGame
};

export function gameReducers(state: GameState = initialState, action: any): GameState {
  switch (action.type) {
    case GameActionsTypes.IncreaseScore:
      return {
        game: {
          ...state.game,
          score: state.game.score + 1
        }
      };
    case GameActionsTypes.DecreaseScore:
      return {
        game: {
          ...state.game,
          score: state.game.score - 1
        }
      };
    case GameActionsTypes.ResetScore:
      return {
        game: {
          ...state.game,
          score: 0
        }
      };
    case GameActionsTypes.UpdateBombZoneBoundaries:
      return {
        game: {
          ...state.game,
          bombZoneWidth: action.payload.width,
          bombZoneHeight: action.payload.height,
        }
      };
    default:
      return state;
  }
}
