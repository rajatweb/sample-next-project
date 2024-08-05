import React from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_RowData, //default shape of TData (Record<string, any>)
    type MRT_TableOptions,
} from 'material-react-table';


interface Props<TData extends MRT_RowData> extends MRT_TableOptions<TData> {
    columns: MRT_ColumnDef<TData>[];
    data: TData[];
}

export const CustomMRTTable = <TData extends MRT_RowData>({
    columns,
    data,
    ...rest
}: Props<TData>) => {
    const table = useMaterialReactTable({
        columns,
        data,
        muiTableContainerProps: () => ({
            sx: {
                '&.MuiTableContainer-root::-webkit-scrollbar': {
                    height: '14px',
                },
                '&.MuiTableContainer-root::-webkit-scrollbar-thumb': {
                    borderRadius: '8px',
                    backgroundColor: '#002136',
                },
                '&.MuiTableContainer-root::-webkit-scrollbar-track': {
                    WebkitBorderRadius: '0px 0px 2px 2px',
                    background: '#F8F8F8',
                },
                '&.MuiTableContainer-root::-webkit-scrollbar-button': {
                    width: '7px',
                    backgroundColor: '#F8F8F8',
                },
            },
        }),
        enableColumnActions: false,
        displayColumnDefOptions: {
            'mrt-row-actions': {
                header: 'Actions',
                size: 10,
                muiTableBodyCellProps: {
                    align: 'center',
                },
                muiTableHeadCellProps:{
                    align: 'center',
                }
            },
        },
        positionActionsColumn: 'last',
        initialState: { showColumnFilters: true },
        muiTablePaperProps: {
            elevation: 0,
            sx: {
                border: '1px solid rgba(100, 106, 124, 0.2)',
                borderRadius: '2px',
            },
        },
        muiTableHeadRowProps: {
            sx: {
                backgroundColor: '#F8F8F8',
                '& .MuiTableCell-root': {
                    paddingRight: 0, 
                    borderBottom: '1px solid #002136',
                },
                '& .Mui-TableHeadCell-Content-Wrapper': {
                    fontSize: '16px',
                    whiteSpace: 'nowrap',
                    fontWeight: 900,
                    color: '#646A7C',
                    paddingRight: 0,
                },
                '& label': {
                    fontSize: '25px',
                    fontWeight: '300',

                },
            },
        },
        muiTableBodyProps: {
            sx: {
                '& .MuiTableCell-body': {
                    fontWeight: '300',
                },
                '& .Mui-selected': {
                    backgroundColor: '#F3F8F9 !important',
                },
                '& .MuiTableRow-root:hover': {
                    backgroundColor: '#F1F1F1 !important',
                },
            },
        },
        //your custom table options...
        ...rest, //accept props to override default table options
    });

    return <MaterialReactTable table={table} />;
};

