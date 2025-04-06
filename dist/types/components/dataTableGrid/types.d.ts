import { CSSProperties } from "react";
export type TableHeaderDataCell = {
    label?: string;
    key: string;
    sorting?: boolean;
    hideInSm?: boolean;
    hideinMd?: boolean;
};
export type TableColumnDataCell = Record<string, unknown>;
export type TableProps = {
    showActionBar?: boolean;
    stripe?: boolean;
    headers: TableHeaderDataCell[];
    rows: TableColumnDataCell[];
    onRowClick?: (row: TableColumnDataCell) => void;
    theme?: colorSchemaType;
    className?: string;
};
export declare enum sortDirection {
    ASC = "asc",
    DESC = "desc"
}
export type VisibleRows = 10 | 20 | 35 | 50;
export type ActionBarPropsType = {
    onTextChange: (text: string) => void;
    searchText: string | null;
    onVisibleRowChange: (numOfRows: VisibleRows) => void;
    rows: TableColumnDataCell[];
    currentPage: number;
    visibleNumberOfRows: VisibleRows;
    paginationChange: (value: number) => void;
    className?: string;
};
export type PaginationPropsTypes = {
    currentPage: number;
    visibleNumberOfRows: number;
    rows: TableColumnDataCell[];
    paginationChange: (value: number) => void;
};
export interface colorSchemaType {
    text?: {
        dark?: string;
        default?: string;
    };
    background?: {
        default?: string;
        striped?: string;
        warn?: string;
        header?: string;
        body?: string;
    };
    shade?: {
        default?: string;
    };
    border?: {
        default: string;
    };
}
export interface TableStylesType {
    tableWrapper?: CSSProperties;
    table?: CSSProperties;
    tableHeader?: CSSProperties;
    tableBody?: CSSProperties;
    actionBar?: CSSProperties;
    searcbar?: CSSProperties;
    entriesBox?: CSSProperties;
    pagination?: CSSProperties;
    warn?: CSSProperties;
}
