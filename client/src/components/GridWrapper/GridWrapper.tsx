import { GridOptions } from '@ag-grid-community/core';
import { AgGrid } from '../../AgGridServices';
import { TData } from './types';
import { columnsConfig, defaultColDef } from './columnsConfig';
import { GridWToolbar } from '../GridWToolbar';
import { AgGridToolbarParams } from '../AgGridToolbar';
import { Api } from '../../Api/Entities';
import { preparePayload } from './utils';

function GridWrapper() {
  const { payload } = Api.test_table.useQueryAll();
  const rowData = preparePayload(payload, 'coverage');
  const columnDefs = columnsConfig;

  const gridOptions: GridOptions<TData> = {
    defaultColDef,
    columnTypes: AgGrid.columnTypes<TData>('primaryKey', 'text', 'number'),
  };

  const { gridOptions: newGridOptions } = new AgGrid.Builder<TData>({
    gridOptions,
  })
    .withSideBar()
    .resizable()
    .sortable()
    .filtering()
    .buildGrid();

  // const onClick = () => {
  //   setRowData(prev => {
  //     return prev.map((el: any) => ({
  //       ...el,
  //       coverage: el.coverage + 1,
  //     }));
  //   });
  // };

  const toolbar: AgGridToolbarParams = {
    right: ['search'],
  };

  return (
    <>
      {/* <button onClick={onClick}>Get Data</button> */}
      <GridWToolbar
        rowData={rowData}
        columnDefs={columnDefs}
        gridOptions={newGridOptions}
        toolbar={toolbar}
      />
    </>
  );
}

export default GridWrapper;
