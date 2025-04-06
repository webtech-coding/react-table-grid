import { ReactElement, ReactNode, useCallback, type FC } from "react";
import { TableColumnDataCell, TableHeaderDataCell } from "./types";
import styled from "styled-components";

type TableColumnDataCellProps = {
    rows:TableColumnDataCell[],
    headers:TableHeaderDataCell[];
    stripe:boolean,
    onRowClick:(row:TableColumnDataCell)=>void,
    currentPage:number,
    numberOfVisibleRows:number
}


const TableBodyWrapper=styled.tbody<{stripe?:boolean}>`
     width: 100%;
     
    tr{
        text-align: left;
        border-bottom: 1px solid ${({theme})=>theme.border?.default};
        cursor: pointer;

        &:nth-of-type(2n){
            background-color:${({stripe, theme})=>stripe ? theme.background?.striped:theme.background?.default};
        }
    }
    
    td{
        padding: 18px 10px;
        color: ${({theme})=>theme.text?.default};
    }

`

const TableBody:FC<TableColumnDataCellProps> =(props):ReactElement=>{
    const {rows, headers, stripe, onRowClick, currentPage, numberOfVisibleRows} = props;

    const getAllRows = useCallback(()=>{
        let allRows:TableColumnDataCell[] = []

        rows.forEach(row=>{
            const rowData= {}

            headers.forEach(header=>{
                //if the object has the property of header name
                if(header.key in row ){
                    Object.assign(rowData, {[header.key]: row[header.key]})
                }else{
                    Object.assign(rowData, {[header.key]: ''})
                }
            })
            allRows.push(rowData)
        })
        
        allRows = [...allRows].slice((currentPage-1)* numberOfVisibleRows, numberOfVisibleRows*currentPage)

        return allRows;
    }, [rows, headers, currentPage, numberOfVisibleRows])

    return(
        <TableBodyWrapper stripe={stripe}>
            {
               getAllRows().map((row, index):ReactNode=>{
                    return(
                        <tr key={`row-${index}`}>
                            {
                                Object.values(row).map(value=><td onClick={()=>onRowClick(row)}>{value as string}</td>)
                            }
                        </tr>
                    )
               })
               
            }
        </TableBodyWrapper>
    )
}

export default TableBody