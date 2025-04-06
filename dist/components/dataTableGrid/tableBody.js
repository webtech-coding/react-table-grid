import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from "react";
import styled from "styled-components";
const TableBodyWrapper = styled.tbody `
     width: 100%;
     
    tr{
        text-align: left;
        border-bottom: 1px solid ${({ theme }) => theme.border?.default};
        cursor: pointer;

        &:nth-of-type(2n){
            background-color:${({ stripe, theme }) => stripe ? theme.background?.striped : theme.background?.default};
        }
    }
    
    td{
        padding: 18px 10px;
        color: ${({ theme }) => theme.text?.default};
    }

`;
const TableBody = (props) => {
    const { rows, headers, stripe, onRowClick, currentPage, numberOfVisibleRows } = props;
    const getAllRows = useCallback(() => {
        let allRows = [];
        rows.forEach(row => {
            const rowData = {};
            headers.forEach(header => {
                //if the object has the property of header name
                if (header.key in row) {
                    Object.assign(rowData, { [header.key]: row[header.key] });
                }
                else {
                    Object.assign(rowData, { [header.key]: '' });
                }
            });
            allRows.push(rowData);
        });
        allRows = [...allRows].slice((currentPage - 1) * numberOfVisibleRows, numberOfVisibleRows * currentPage);
        return allRows;
    }, [rows, headers, currentPage, numberOfVisibleRows]);
    return (_jsx(TableBodyWrapper, { stripe: stripe, children: getAllRows().map((row, index) => {
            return (_jsx("tr", { children: Object.values(row).map(value => _jsx("td", { onClick: () => onRowClick(row), children: value })) }, `row-${index}`));
        }) }));
};
export default TableBody;
