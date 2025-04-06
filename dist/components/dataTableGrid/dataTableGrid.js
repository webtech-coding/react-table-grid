import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";
import { sortDirection } from "./types";
import { defaultTableProps } from "./constant";
import { createTableStyle } from "./style";
import ActionBar from "./actionBar";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
const TableWrapper = styled.div({
    width: '100%',
});
const HtmlTable = styled.table `
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    box-shadow: 0 0 10px ${({ theme }) => theme.shade?.default};
    margin-top: 15px;
    background-color: #ffffff;
    overflow-x: auto;
    border:1px soild ${({ theme }) => theme.border?.default};
    `;
const DataTableGrid = (props) => {
    const { showActionBar = defaultTableProps.showActionBar, rows = defaultTableProps.rows, headers = defaultTableProps.headers, stripe = defaultTableProps.stripe, theme, onRowClick, className } = props;
    const [numberOfVisibleRows, setNumberOfVisibleRows] = useState(20);
    const [sortByColumn, setSortbyColumn] = useState(null);
    const [sortDir, setSortDir] = useState(sortDirection.ASC);
    const [searchText, setSearchText] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const tableTheme = useMemo(() => createTableStyle(theme), [theme]);
    /**
     * sort table by the selected header column
    */
    const sortedTableRows = useMemo(() => {
        if (!sortByColumn && !searchText)
            return rows;
        let sortedRows = [...rows];
        //if the columns have to be sorted
        if (sortByColumn) {
            sortedRows = [...rows].sort((a, b) => {
                const sortProperty = sortByColumn;
                const aValue = a[sortProperty];
                const bValue = b[sortProperty];
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortDir === sortDirection.ASC ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                }
                else if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortDir === sortDirection.ASC ? aValue - bValue : bValue - aValue;
                }
                return 0;
            });
        }
        // if the rows need to be filtered with search text
        if (searchText) {
            sortedRows = sortedRows.filter((row) => {
                let includeRow = false;
                Object.entries(row).forEach(([key, value]) => {
                    if (includeRow)
                        return;
                    if (!value)
                        return;
                    const searchTextString = searchText.toString().toLowerCase();
                    const valueString = value.toString().toLowerCase();
                    if (valueString.includes(searchTextString) && headers.find(cell => cell.key === key)) {
                        includeRow = true;
                    }
                });
                return includeRow;
            });
        }
        return sortedRows;
    }, [rows, sortByColumn, sortDir, headers, searchText]);
    /**
     * when user clicks sort icon in the table header
     * @param headerCell
     * @returns
     */
    const handleColumnSorting = (headerCell) => {
        if (!headerCell.sorting)
            return;
        if (headerCell.key !== sortByColumn) {
            setSortDir(sortDirection.ASC);
            setSortbyColumn(headerCell.key);
        }
        else {
            const sorting = (sortDir === sortDirection.ASC) ? sortDirection.DESC : sortDirection.ASC;
            setSortbyColumn(headerCell.key);
            setSortDir(sorting);
        }
    };
    /**
     * A table must have a header. Headerless table is inavalid
     */
    if (headers.length) {
        return (_jsx("div", { className: "data-table__error", children: "Inalid table data !! Please provide heders for your table." }));
    }
    /**
     * if table does not have any rows, show no data message
     * @returns ReactNode
     */
    const getNoTableDataView = () => {
        return (_jsx("tbody", { className: "data-table__body", children: _jsx("tr", { children: _jsx("td", { colSpan: headers.length, children: "No data to show" }) }) }));
    };
    return (_jsx(ThemeProvider, { theme: tableTheme, children: _jsxs(TableWrapper, { children: [showActionBar &&
                    _jsx(ActionBar, { searchText: searchText, onTextChange: (text) => setSearchText(text), onVisibleRowChange: (value) => {
                            setNumberOfVisibleRows(value);
                            setCurrentPage(1);
                        }, currentPage: currentPage, visibleNumberOfRows: numberOfVisibleRows, rows: sortedTableRows, paginationChange: (value) => setCurrentPage(prevState => prevState + value), className: className }), _jsxs(HtmlTable, { children: [_jsx(TableHeader, { headers: headers, onHeaderClick: (headerCell) => { handleColumnSorting(headerCell); } }), !sortedTableRows.length && getNoTableDataView(), sortedTableRows.length > 0 && (_jsx(TableBody, { rows: sortedTableRows, headers: headers, stripe: stripe, onRowClick: (row) => { onRowClick?.(row); }, numberOfVisibleRows: numberOfVisibleRows, currentPage: currentPage }))] })] }) }));
};
DataTableGrid.prototype = {
    showActionBar: PropTypes.bool,
    rows: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    strpe: PropTypes.bool,
    theme: PropTypes.object
};
export default DataTableGrid;
