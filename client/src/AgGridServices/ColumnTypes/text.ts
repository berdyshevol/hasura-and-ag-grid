import { ColDef } from '@ag-grid-community/core';

export const text: ColDef = {
  cellClass: 'TextAligned_Left',
  filter: 'agTextColumnFilter',
  filterParams: {
    buttons: ['clear'],
    applyMiniFilterWhileTyping: true,
  },
};
