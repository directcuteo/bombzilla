import { Action } from '@ngrx/store';
import { Bomb } from '../../types/bombs/bomb.type';

export enum BombsActionsTypes {
  SelectBombs = '[BOMB] Select',
  DeleteBomb = '[BOMB] Delete',
  CreateBomb = '[BOMB] Create',
}

export class SelectBombs implements Action {
  readonly type = BombsActionsTypes.SelectBombs;
}

export class CreateBomb implements Action {
  readonly type = BombsActionsTypes.CreateBomb;

  constructor(public payload: Bomb) { }
}

export class DeleteBomb implements Action {
  readonly type = BombsActionsTypes.DeleteBomb;

  constructor(public payload: number) { }
}
