import { FC, ReactElement, ReactNode, useMemo, useState } from "react";
import PropTypes from "prop-types";
import styled, {ThemeProvider} from "styled-components";

import { TableColumnDataCell, TableHeaderDataCell, TableProps, sortDirection, VisibleRows } from "./types";
import { defaultTableProps } from "./constant";
import { createTableStyle } from "./style";

import ActionBar from "./actionBar";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const TableWrapper=styled.div({
    width:'100%',
})

const HtmlTable=styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    box-shadow: 0 0 10px ${({theme})=>theme.shade?.default};
    margin-top: 15px;
    background-color: #ffffff;
    overflow-x: auto;
    border:1px soild ${({theme})=>theme.border?.default};
    `

const DataTableGrid:FC<TableProps> = (props):ReactElement=>{
    const { 
        showActionBar=defaultTableProps.showActionBar,
        rows=defaultTableProps.rows,
        headers=defaultTableProps.headers,
        stripe=defaultTableProps.stripe,
        theme,
        onRowClick,
        className
    } = props;

    const [numberOfVisibleRows, setNumberOfVisibleRows] = useState<VisibleRows>(20);
    const [sortByColumn, setSortbyColumn] = useState<keyof TableColumnDataCell | null>(null);
    const [sortDir, setSortDir] = useState<sortDirection>(sortDirection.ASC);
    const [searchText, setSearchText] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const tableTheme = useMemo(()=>createTableStyle(theme),[theme])
    
    /** 
     * sort table by the selected header column
    */
    const sortedTableRows = useMemo(()=>{
        
        if(!sortByColumn && !searchText)return rows
        let sortedRows:TableColumnDataCell[] = [...rows];

        //if the columns have to be sorted
        if(sortByColumn){
            sortedRows = [...rows].sort((a, b)=>{
                const sortProperty: keyof typeof a = sortByColumn as keyof typeof a;

                const aValue = a[sortProperty];
                const bValue = b[sortProperty];
    
                if(typeof aValue ==='string' && typeof bValue==='string'){
                    return sortDir === sortDirection.ASC ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    
                }else if(typeof aValue ==='number' && typeof bValue ==='number'){
                    return sortDir === sortDirection.ASC ? aValue - bValue : bValue - aValue;
                }
    
                return 0
            })
        }

        // if the rows need to be filtered with search text
        if(searchText){
            sortedRows = sortedRows.filter((row):boolean=>{
                let includeRow:boolean = false;

                Object.entries(row).forEach(([key, value])=>{
                    if(includeRow)return 
                    if(!value)return

                    const searchTextString = searchText.toString().toLowerCase();
                    const valueString = value.toString().toLowerCase();

                    if(valueString.includes(searchTextString) && headers.find(cell=>cell.key === key)){
                        includeRow = true
                    }
                })

                return includeRow
            })
        }

        return sortedRows
    },[rows, sortByColumn, sortDir, headers, searchText])


    /**
     * when user clicks sort icon in the table header
     * @param headerCell 
     * @returns 
     */
    const handleColumnSorting=(headerCell:TableHeaderDataCell)=>{
        if(!headerCell.sorting)return
        if(headerCell.key !== sortByColumn){
            setSortDir(sortDirection.ASC)
            setSortbyColumn(headerCell.key)
        }else{
            const sorting = (sortDir === sortDirection.ASC) ? sortDirection.DESC : sortDirection.ASC
            setSortbyColumn(headerCell.key)
            setSortDir(sorting);
        }
    }
    

    /**
     * A table must have a header. Headerless table is inavalid
     */
    if(headers.length){
        return(
            <div className="data-table__error">
               Inalid table data !! Please provide heders for your table.
            </div>
        )
    }

    /**
     * if table does not have any rows, show no data message
     * @returns ReactNode
     */
    const getNoTableDataView =():ReactNode=>{
        return(
            <tbody className="data-table__body">
                <tr>
                    <td colSpan={headers.length}>
                        No data to show
                    </td>
                </tr>
            </tbody>
        )
    }

    return(
        <ThemeProvider theme={tableTheme}>
            <TableWrapper>    
                {showActionBar && 
                    <ActionBar
                        searchText={searchText}
                        onTextChange={(text:string)=>setSearchText(text)}
                        onVisibleRowChange={(value:VisibleRows)=>{
                            setNumberOfVisibleRows(value)
                            setCurrentPage(1)
                        }}
                        currentPage={currentPage}
                        visibleNumberOfRows={numberOfVisibleRows}
                        rows={sortedTableRows}
                        paginationChange={(value:number)=>setCurrentPage(prevState=>prevState + value)}
                        className={className}
                    />
                }            
                <HtmlTable>
                    <TableHeader 
                        headers={headers}
                        onHeaderClick={(headerCell:TableHeaderDataCell)=>{handleColumnSorting(headerCell)}}
                    /> 
                    { !sortedTableRows.length && getNoTableDataView() }
                    {
                        sortedTableRows.length > 0 && (
                            <TableBody 
                                rows={sortedTableRows}
                                headers={headers}
                                stripe={stripe}
                                onRowClick={(row:TableColumnDataCell)=>{onRowClick?.(row)}}
                                numberOfVisibleRows={numberOfVisibleRows}
                                currentPage = {currentPage}
                            />
                        )
                    }
                </HtmlTable>
            </TableWrapper>
        </ThemeProvider>
    )
}

DataTableGrid.prototype = {
    showActionBar:PropTypes.bool,
    rows:PropTypes.array.isRequired,
    headers:PropTypes.array.isRequired,
    strpe:PropTypes.bool,
    theme:PropTypes.object
}

export default DataTableGrid;