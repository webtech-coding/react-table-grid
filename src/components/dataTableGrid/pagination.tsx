import { FC, ReactElement, memo } from 'react';
import styled from 'styled-components';

import { PaginationPropsTypes } from './types';

import ArrowIcon from "../../assets/icons/arrowIcon";

const PaginationWrapper=styled.div`
    display: flex;
    border: 1px solid ${({theme})=>theme.border?.default};
    height: 36px;
    align-items: center;
`

const PaginationIndex = styled.div`
    height: 36px;
    display: flex;
    align-items: center;
    width: 36px;
    justify-content: center;
    border: 1px solid ${({theme})=>theme.border?.default};
    width: 120px;

    strong{
        padding: 0 5px;
    }
`

const PaginationNav =styled.div<{reverse?:boolean, disabled?:boolean}>`
    padding: 0 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 36px;

    svg{
        fill: ${({theme})=>theme.text?.default};
        height: 20px;
        width: 20px;
        transform: ${({reverse})=>reverse ? 'rotate(180deg)':''}
    }

    &:hover{
        background-color: ${({theme})=>theme.background?.striped};
        
    }
    
    opacity:${({disabled})=>disabled ? .3:1};
    cursor:${({disabled})=>disabled ? 'default':'pointer'};
`

const Pagination:FC<PaginationPropsTypes> =({currentPage, visibleNumberOfRows, rows, paginationChange}):ReactElement=>{
    
    const getTotalPages =():number=>{
        const rowsPerPage = rows.length / visibleNumberOfRows;
       
        let totalPagesOfRows =rowsPerPage < 1 ? 1 : Math.floor(rowsPerPage)
       
        totalPagesOfRows += rows.length > visibleNumberOfRows &&  rows.length % visibleNumberOfRows ? 1 : 0
        
        return totalPagesOfRows;
    }

    const handlePaginationChange=(dir:string)=>{
        const totalPages = getTotalPages();
        if(dir==='prev'){
            if(currentPage===1)return
            paginationChange(-1)
        }else{
            if(currentPage === totalPages)return
            paginationChange(+1)
        }
    }

    return(
        <PaginationWrapper>
            <PaginationNav 
                onClick={()=>handlePaginationChange('prev')}
                disabled={currentPage===1}
            >
                <ArrowIcon /> <span>Previous</span>
            </PaginationNav>            
            <PaginationIndex>
                <strong>{currentPage}</strong> of <strong>{getTotalPages()}</strong> pages
            </PaginationIndex>
            <PaginationNav
                disabled={currentPage===getTotalPages()}
                onClick={()=>handlePaginationChange('next')}
                reverse
            >
                Next <ArrowIcon /> 
            </PaginationNav>
        </PaginationWrapper>
    )
}

export default memo(Pagination)