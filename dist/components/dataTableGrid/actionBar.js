import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from "react";
import styled from "styled-components";
import SearchIcon from "../../assets/icons/searchIcons";
import Pagination from './pagination';
const ActionBarWrapper = styled.div `
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color:${({ theme }) => theme.background?.default};


        @media only screen and (max-width: 820px){
            flex-direction:column;
            align-items:flex-start;
        }
    `;
const SearchBar = styled.div `
    display: flex;
    align-items: center;
    input{
        border: 1px solid ${({ theme }) => theme.border?.default};
        padding: 10px;
        width: 415px;
        padding-left: 30px;
        outline-color: none;

        &:focus{
            border: ${({ theme }) => theme.border?.default};
            outline-color: ${({ theme }) => theme.border?.default};
            outline-style:inset;
        }
    }

    svg{
        height: 24px;
        width: 24px;
        fill: ${({ theme }) => theme.text?.dark};
        margin-right: -24px;
        z-index: 10;
    }

      @media only screen and (max-width: 820px){
          
        margin-bottom:20px;
        
    }
`;
const RightSectionBar = styled.div `
    display: flex;
    align-items: center;
    font-size: 14px;    

    & >div{
        display: flex;
        align-items: center;
        color:  ${({ theme }) => theme.text?.default};

         select{
            height: 36px;
            width: 60px;
            border: 1px solid  ${({ theme }) => theme.border?.default};
            outline-color:  ${({ theme }) => theme.border?.default};
            margin: 0 10px;
            color: var(--c-font);
            text-align: center;
        }
    }
`;
const ActionBar = (props) => {
    const { searchText, onTextChange, onVisibleRowChange, currentPage, visibleNumberOfRows, rows, paginationChange, className } = props;
    return (_jsxs(ActionBarWrapper, { className: `${className ? className : ''}`, children: [_jsxs(SearchBar, { children: [_jsx(SearchIcon, {}), _jsx("input", { type: "text", value: searchText || "", placeholder: "Search...", onChange: (e) => onTextChange(e.target.value) })] }), _jsxs(RightSectionBar, { children: [_jsxs("div", { children: [_jsx("span", { children: "Enteries" }), _jsxs("select", { onChange: (e) => onVisibleRowChange(parseInt(e.target.value)), value: visibleNumberOfRows, children: [_jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 20, children: "20" }), _jsx("option", { value: 35, children: "35" }), _jsx("option", { value: 50, children: "50" })] })] }), _jsx(Pagination, { rows: rows, currentPage: currentPage, visibleNumberOfRows: visibleNumberOfRows, paginationChange: paginationChange })] })] }));
};
export default memo(ActionBar);
