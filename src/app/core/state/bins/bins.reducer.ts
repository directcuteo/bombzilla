import { Bin } from '../../types/bins/bin.type';
import { BinsActionsTypes } from './bins.actions';

export const initialBins: Bin[] = [
  { color: 'red' },
  { color: 'blue' },
  { color: 'green' }
];

export interface BinsState {
  bins: Bin[];
}

export const initialState: BinsState = {
  bins: initialBins
};

export function binsReducers(state: BinsState = initialState, action: any): BinsState {
  switch (action.type) {
    case BinsActionsTypes.SelectBins:
      return {
        bins: [...state.bins]
      };
    case BinsActionsTypes.MixBins:
      return {
        bins: mixBins(state.bins)
      };
    default:
      return state;
  }
}

const mixBins = (bins: Bin[]): Bin[] => {
  const shuffledBins = [...[...bins].sort(() => Math.random() - 0.5)];
  const isSameColorOrder = shuffledBins.every((bin: Bin, index: number) => shuffledBins[index].color === bins[index].color);

  if (isSameColorOrder) {
    return mixBins(bins);
  }

  return shuffledBins;
};
