import { Game } from '../../types/game/game.type';
import { GameActionsTypes } from './game.actions';

export const initialGame: Game = {
  score: 0
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
        game: { score: state.game.score + 1 }
      };
    case GameActionsTypes.DecreaseScore:
      return {
        game: { score: state.game.score - 1 }
      };
    case GameActionsTypes.ResetScore:
      return {
        game: { score: 0 }
      };
    default:
      return state;
  }
}
