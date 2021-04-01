import { Action } from '@ngrx/store';

export enum GameActionsTypes {
  IncreaseScore = '[GAME] Increase score',
  DecreaseScore = '[GAME] Decrease score',
  ResetScore = '[GAME] Reset score',
}

export class IncreaseScore implements Action {
  readonly type = GameActionsTypes.IncreaseScore;
}

export class DecreaseScore implements Action {
  readonly type = GameActionsTypes.DecreaseScore;
}

export class ResetScore implements Action {
  readonly type = GameActionsTypes.ResetScore;
}
