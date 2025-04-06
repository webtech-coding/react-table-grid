import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from "react";
import SortIcon from "../../assets/icons/sortIcons";
import styled from "styled-components";
const TableHeaderWrapper = styled.thead `
    width: 100%;

    tr{
        text-align: left;
        border-bottom: 1px solid ${({ theme }) => theme.border?.default};
        border-top: 1px solid ${({ theme }) => theme.border?.default};
        background-color:${({ theme }) => theme.background?.header};
        
        th{
            padding: 15px 10px;
            color: ${({ theme }) => theme.text?.dark};
            border-right: 1px solid ${({ theme }) => theme.border?.default};
            font-weight: 600;
            text-transform: uppercase;
            font-size: 14px;
        }
    }
`;
const CellContainer = styled.div `
    display: flex;
    justify-content: space-between;

    svg{
        width: 14px;
        height: 14px;
        transform: rotate(90deg);
        fill: ${({ theme }) => theme.text?.default};
        cursor: pointer;

        &:hover{
            fill: #0076bf;

        }
    }
`;
const TableHeader = ({ headers, onHeaderClick }) => {
    return (_jsx(TableHeaderWrapper, { children: _jsx("tr", { children: headers.map((cell, index) => {
                return (_jsx("th", { children: _jsxs(CellContainer, { children: [_jsx("span", { children: cell.label || cell.key }), cell.sorting && _jsx("span", { onClick: () => onHeaderClick(cell), children: _jsx(SortIcon, {}) })] }) }, `cell-${index}`));
            }) }) }));
};
export default memo(TableHeader);
