import { FC, ReactElement, memo } from "react"
import { TableHeaderDataCell } from "./types"
import SortIcon from "../../assets/icons/sortIcons"
import styled from "styled-components"

type TableHeaderPropType ={
    headers:TableHeaderDataCell[],
    onHeaderClick:(e:TableHeaderDataCell)=>void
}

const TableHeaderWrapper = styled.thead`
    width: 100%;

    tr{
        text-align: left;
        border-bottom: 1px solid ${({theme})=>theme.border?.default};
        border-top: 1px solid ${({theme})=>theme.border?.default};
        background-color:${({theme})=>theme.background?.header};
        
        th{
            padding: 15px 10px;
            color: ${({theme})=>theme.text?.dark};
            border-right: 1px solid ${({theme})=>theme.border?.default};
            font-weight: 600;
            text-transform: uppercase;
            font-size: 14px;
        }
    }
`

const CellContainer = styled.div`
    display: flex;
    justify-content: space-between;

    svg{
        width: 14px;
        height: 14px;
        transform: rotate(90deg);
        fill: ${({theme})=>theme.text?.default};
        cursor: pointer;

        &:hover{
            fill: #0076bf;

        }
    }
`

const TableHeader:FC<TableHeaderPropType> =({headers, onHeaderClick}):ReactElement=>{
    return(
        <TableHeaderWrapper>
             <tr>
                {
                    headers.map((cell, index)=>{
                        return(
                            <th key={`cell-${index}`}>
                                <CellContainer> 
                                    <span>{cell.label || cell.key}</span>
                                    {cell.sorting && <span onClick={()=>onHeaderClick(cell)}><SortIcon /></span>}
                                </CellContainer>
                            </th>
                        )
                    })
                }
            </tr>
        </TableHeaderWrapper>
    )
}

export default memo(TableHeader)