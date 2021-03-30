import { Bin } from '../../types/bins/bin.type';

export const initialBins: Bin[] = [
  { color: 'red' },
  { color: 'blue' },
  { color: 'green' },
];

export interface BinsState {
  bins: Bin[];
}

export const initialState: BinsState = {
  bins: initialBins
};

export function binsReducers(state: BinsState = initialState, action: any): BinsState {
  switch (action.type) {
    default:
      return state;
  }
}
