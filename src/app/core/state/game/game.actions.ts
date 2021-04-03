import { Action } from '@ngrx/store';

export enum GameActionsTypes {
  IncreaseScore = '[GAME] Increase score',
  DecreaseScore = '[GAME] Decrease score',
  ResetScore = '[GAME] Reset score',
  UpdateBombZoneBoundaries = '[GAME] Update bomb zone boundaries'
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

export class UpdateBombZoneBoundaries implements Action {
  readonly type = GameActionsTypes.UpdateBombZoneBoundaries;

  constructor(public payload: { width: number, height: number }) {}
}
