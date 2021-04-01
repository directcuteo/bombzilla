import { Action } from '@ngrx/store';
import { Bin } from '../../types/bins/bin.type';

export enum BinsActionsTypes {
  SelectBins = '[BIN] Select',
  MixBins = '[BIN] Mix'
}

export class SelectBins implements Action {
  readonly type = BinsActionsTypes.SelectBins;
}

export class MixBins implements Action {
  readonly type = BinsActionsTypes.MixBins;

  constructor(public payload: Array<Bin>) { }
}
