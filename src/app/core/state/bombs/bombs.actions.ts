import { Action } from '@ngrx/store';
import { Bin } from '../../types/bins/bin.type';

export enum BombsActionsTypes {
  SelectBombs = '[BOMB] Select',
  DeleteBomb = '[BOMB] Delete'
}

export class SelectBombs implements Action {
  readonly type = BombsActionsTypes.SelectBombs;
}

export class DeleteBomb implements Action {
  readonly type = BombsActionsTypes.DeleteBomb;

  constructor(public payload: number) { }
}
