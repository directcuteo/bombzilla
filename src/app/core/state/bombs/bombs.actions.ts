import { Action } from '@ngrx/store';
import { Bomb } from '../../types/bombs/bomb.type';

export enum BombsActionsTypes {
  SelectBombs = '[BOMB] Select',
  DeleteBomb = '[BOMB] Delete',
  PlantRandomBomb = '[BOMB] Plant Random Bomb',
  CreateBomb = '[BOMB] Create',
  CreateBombs = '[BOMB] Create Multiple',
  DeleteAllBombs = '[BOMB] Delete all',
}

export class SelectBombs implements Action {
  readonly type = BombsActionsTypes.SelectBombs;
}

export class CreateBomb implements Action {
  readonly type = BombsActionsTypes.CreateBomb;

  constructor(public payload: Bomb) { }
}

export class PlantRandomBomb implements Action {
  readonly type = BombsActionsTypes.PlantRandomBomb;
}

export class CreateBombs implements Action {
  readonly type = BombsActionsTypes.CreateBombs;
}

export class DeleteBomb implements Action {
  readonly type = BombsActionsTypes.DeleteBomb;

  constructor(public payload: number) { }
}

export class DeleteAllBombs implements Action {
  readonly type = BombsActionsTypes.DeleteAllBombs;
}
