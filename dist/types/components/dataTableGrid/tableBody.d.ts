import { type FC } from "react";
import { TableColumnDataCell, TableHeaderDataCell } from "./types";
type TableColumnDataCellProps = {
    rows: TableColumnDataCell[];
    headers: TableHeaderDataCell[];
    stripe: boolean;
    onRowClick: (row: TableColumnDataCell) => void;
    currentPage: number;
    numberOfVisibleRows: number;
};
declare const TableBody: FC<TableColumnDataCellProps>;
export default TableBody;
