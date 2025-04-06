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
    box-shadow: '0 0 10px ${({ theme }) => theme.shade?.default}';
    margin-top: 15px;
    background-color: #ffffff;
    overflow-x: auto;
    `;
const DataTableGrid = (props) => {
    const { showActionBar = defaultTableProps.showActionBar, rows = defaultTableProps.rows, headers = defaultTableProps.headers, stripe = defaultTableProps.stripe, theme, onRowClick, className } = props;
    const [numberOfVisibleRows, setNumberOfVisibleRows] = useState(20);
    const [sortByColumn, setSortbyColumn] = useState(null);
    const [sortDir, setSortDir] = useState(sortDirection.ASC);
    const [searchText, setSearchText] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const tableHeaderDataCells = [
        {
            label: "Title",
            key: "title",
            sorting: true
        },
        {
            label: "Source",
            key: "source",
        },
        {
            label: "Price",
            key: "price",
        },
        {
            label: "Delivery",
            key: "delivery",
        },
        {
            key: "rating",
            sorting: true
        },
        {
            label: "Rating Count",
            key: "ratingCount",
            sorting: true
        }
    ];
    const tableRows = [
        {
            "title": "Apple iPhone X - 256 GB - Space Gray - Unlocked - GSM",
            "source": "Walmart - Seller",
            "link": "https://www.walmart.com/ip/Restored-Apple-iPhone-X-256GB-Space-Gray-LTE-Cellular-MQA82LL-A-Refurbished/971012574?wmlspartner=wlpa&selectedSellerId=101016927&selectedOfferId=80D862173BBB3CD1B152A90460BBB725&conditionGroupCode=2",
            "price": "$155.00 refurbished",
            "delivery": "Free shipping",
            "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSQS5-TvbjexUbDFCOp0c_fa0TjDCc7wDyiFmOtD1b422DuR6mWWagtXsPdv7zjlzaifOHuSw&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 25,
            "offers": "3",
            "productId": "5881035144553890520",
            "position": 1
        },
        {
            "title": "Apple iPhone X (64GB, Space Gray) [Locked] + Carrier Subscription",
            "source": "Amazon.com",
            "link": "https://www.amazon.com/Apple-iPhone-64GB-Space-Gray/dp/B07VMNX6XH?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=ATVPDKIKX0DER",
            "price": "$40.84",
            "delivery": "Free shipping",
            "imageUrl": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSoJ4mL_mIMye-GxPRD3EbwGP0eahpj4mwQzZ26QzXEw-ZlCYC7tta4sZh5XoF42UAQ_aOjyg&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 25,
            "position": 2
        },
        {
            "title": "Apple iPhone X, 64GB / Silver / Excellent+",
            "source": "FoneZone.me",
            "link": "https://fonezone.me/products/apple-iphone-x-64gb?currency=SAR&variant=44004655431905&utm_source=google&utm_medium=cpc&utm_campaign=Google%20Shopping&stkn=7906b3eae7cf&srsltid=AfmBOop63ZPDr-A5lHQZME0VL91yALLOueUOj00I6eRdjd1XnRh4P1nxp8I",
            "price": "$153.29 refurbished",
            "delivery": "$39.99 shipping",
            "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRFNzvZsZbmrSBml5_MqZWsc3N4XNQ6muNTrqI16oVif0hh3SX6mUnbSxuflYQ8wkxRFnyi&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 25,
            "position": 3
        },
        {
            "title": "iPhone X 256GB - Space Gray - Locked Verizon",
            "source": "Back Market",
            "link": "https://www.backmarket.com/en-us/p/iphone-x-256-gb-space-gray-verizon/b504e2b0-3429-436f-85b4-7016269fc3eb?shopping=gmc&srsltid=AfmBOoryh5ZaRz9peXA8CMkamq87og3MLT-9EH7ukcSCKM0HPbrg62GppBQ",
            "price": "$161.93 refurbished",
            "delivery": "$2.99 shipping",
            "imageUrl": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQkLINfcg9x1_4eITGuTexFrPXAiXk2EilPNW_E8FNvOdknjaiJL1n-NG0&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 25,
            "position": 4
        },
        {
            "title": "Refurbished iPhone X Unlocked (Excellent) | Space Gray 64GB | 12 Mo. Warranty & 30 Day Returns",
            "source": "Plug",
            "link": "https://plug.tech/products/no-face-id-iphone-x-space-gray-64gb-unlocked?variant=40371582861465&fdzly=plug-organicfd&glCurrency=USD&srsltid=AfmBOoo739-y12aIvrLM5cPO_0nA6u9zCqGaG3m8003ZxKcN2rXTpEr3ppc",
            "price": "$189.99 refurbished",
            "delivery": "Free shipping",
            "imageUrl": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS4gY8ZjxRo3UQJ4Z4_c19draoVZw22orDQ5Il2VGhWIV6XcU0338wFR7spSKc07DRZ3ZIP&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 25,
            "position": 5
        },
        {
            "title": "iPhone x 64gb Gray (T-Mobile) Refurbished A+",
            "source": "Walmart - Seller",
            "link": "https://www.walmart.com/ip/Restored-iPhone-X-64GB-Gray-T-Mobile-Refurbished/689023832?wmlspartner=wlpa&selectedSellerId=101016927&selectedOfferId=C2A4B8D721E63B739D8B1DC8572868A0&conditionGroupCode=2",
            "price": "$145.00 refurbished",
            "delivery": "Free shipping",
            "imageUrl": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSOMxNRSya6i67h0T3GiT0TrPzfQ5BeQO-f_8mHRAPxNWeUGVCFB_PKHLH8E-LPGMjQGRXI&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 25,
            "offers": "3",
            "productId": "14670077738810849314",
            "position": 6
        },
        {
            "title": "iPhone X 64GB Space Grey VERIZON - 12 Months Warranty",
            "source": "Reebelo USA",
            "link": "https://reebelo.com/products/apple-i-phone-x-64-gb-space-grey-fully-unlocked-good-fz8e9?srsltid=AfmBOop2kCXqirK7lpazt0Jybjv2eWgvDNGAxA3ZaxA77ZIdioe-r7FTVyE",
            "price": "$140.70 used",
            "delivery": "Free shipping",
            "imageUrl": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRDteeeGuQrjj1Hn74d68NYbnuInuT_Ox-BSSfCpKuqC_FoY33h0hCeAAI&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 25,
            "position": 7
        },
        {
            "title": "Apple iPhone X - Gray - 256 GB - Unlocked",
            "source": "Swappa",
            "link": "https://swappa.com/listing/view/LWFX83863?srsltid=AfmBOoqUum0jjfkso9mut0iuWHZVOdADib0VJil4NpCKo080UhlHKNy6e3A",
            "price": "$208.00 used",
            "delivery": "Free shipping",
            "imageUrl": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQXvraumGxUyhCJPN3BRFzt6zNeWrqlYkE8mvUQQioG-jhPRziXRGOwGpOP&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 25,
            "position": 8
        },
        {
            "title": "Apple iPhone X Unlocked - Certified Used Refurbished at UpTrade at UpTrade",
            "source": "UpTrade",
            "link": "https://uptradeit.com/buy-used-refurbished-iphone-x-unlocked?srsltid=AfmBOorASC_JmcQbH0ppLoBn0Rl_DX6eqX0XQTF7_dbX0tOVAjgVTHTgVY4",
            "price": "$159.00 refurbished",
            "delivery": "Free shipping",
            "imageUrl": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTK9-lEKSdcRTme8vmf-ArXiyHbrKLajWvF1vsvKQQyLXtnjISpuaTiSxKpG9K3RqN7Mu9i&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 25,
            "position": 9
        },
        {
            "title": "iPhone X 64GB - Silver - Locked T-Mobile",
            "source": "Back Market",
            "link": "https://www.backmarket.com/en-us/p/iphone-x-64-gb-silver-sprint/b94d24b8-64be-4f22-94b5-041e14f48531?shopping=gmc&srsltid=AfmBOopitiSgRnhofG344fvHqELwHskt9YJp8CtHVKOntpyCd7eWbJus5tQ",
            "price": "$150.00 refurbished",
            "delivery": "$1.99 shipping",
            "imageUrl": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT-RAUncrrPlBuoCvf836wQLL0VUokl2BEdEUCyQ2wQQiKpZ7Vo8oCgqLTe&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 25,
            "position": 10
        },
        {
            "title": "Apple iPhone X 256gb, Space Gray - Unlocked LTE",
            "source": "Walmart - Seller",
            "link": "https://www.walmart.com/ip/Restored-Apple-iPhone-X-256GB-Space-Gray-Unlocked-LTE-Refurbished/840060333?wmlspartner=wlpa&selectedSellerId=101410689&selectedOfferId=5A72105B45AC33048AAD7CE1C020C064&conditionGroupCode=2",
            "price": "$147.00 refurbished",
            "delivery": "Free shipping",
            "imageUrl": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSVBr7e_nGmzCFe9gpdqARQDJc3e2HB1W-iVtVJwaZzPM0X9sz0wpzlUEc&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 25,
            "offers": "5+",
            "productId": "12665994131343751615",
            "position": 11
        },
        {
            "title": "Refurbished Apple iPhone X | Fully Unlocked | Bundle w/ Pre-Installed Tempered Glass Space Gray / 64GB / Grade A+",
            "source": "Wireless Source",
            "link": "https://wireless-source.com/products/refurbished-apple-iphone-x-fully-unlocked-bundle-w-pre-installed-tempered-glass?variant=49491658178864&country=US&currency=USD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOoqSVJNapF3JyEmbR1Otvh_C6ELzik9s-eviYEi2O00WO3RbPLVHToY",
            "price": "$152.99 refurbished",
            "delivery": "Free shipping",
            "imageUrl": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRz3ex4pyBx1Nwr35_pq9PiWWE-HhNVH5S6nIUjK8xGyAHRHLhLJF5NKK5SO19UN4IjQMbD&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 25,
            "position": 12
        },
        {
            "title": "Apple Iphone X - 256gb - Space Gray (cricket) A1901 (gsm)",
            "source": "eBay",
            "link": "https://www.ebay.com/itm/156185918060?chn=ps&mkevt=1&mkcid=28&google_free_listing_action=view_item",
            "price": "$135.00 used",
            "delivery": "$8.00 shipping",
            "imageUrl": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSd-XQOJYxYY2XyTQ4sT4Wd6cAiDmeZHDbwQEe3GBdKF_dzyTzhgo7y_mJs&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 25,
            "position": 13
        },
        {
            "title": "Apple Refurbished Iphone X 64gb Gray (Unlocked) Grey 64gb",
            "source": "The Accessories Place",
            "link": "https://theaccessoriesplaceonline.com/products/unlocked-apple-iphone-x-64gb-gray?variant=40884746748083&country=US&currency=USD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOorGmx9Kjk_Pgbs6THo70aEFotcB7F1oIEYhMBGMmIqR-zWkeCjoCLI",
            "price": "$485.99 used",
            "delivery": "Free shipping",
            "imageUrl": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQoqmUlsd-ExZpI_g8j-3HcfT6jOeO8FzvqRk2gfHIdauYpMZQZQMmzHvl_PH4okF3EW7Y1&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 25,
            "position": 14
        },
        {
            "title": "iPhone X (Model A1865) Factory Unlocked 64GB / Space Gray / Used",
            "source": "Reliant Cellular",
            "link": "https://www.reliantcellular.com/products/apple-iphone-x-model-a1865-cdma-gsm-unlocked?variant=41871291056311&country=US&currency=USD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOopjbbUStEL21m2p_rvWPYqDQhF6F81T91-jnD8o8jJkU-zlW6cmHJs",
            "price": "$419.99 used",
            "delivery": "Free shipping",
            "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRnKuk57_hqPjO89oppOpyA4TOEsBDVSw3wegRJLSlrNBwTNYGUgPKAMf8&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 25,
            "position": 15
        },
        {
            "title": "Apple iPhone x 256 GB Refurbished - Space Gray",
            "source": "Wcell",
            "link": "https://wcell.com/iphone-x-256gb-gray-unlocked-b-grade/?srsltid=AfmBOoprpn0gyXwJKcnLPvFXnPPe62T6Tu1QlyAc0MlJL_HC9JIjKVAwtI0",
            "price": "$140.00 used",
            "delivery": "Free shipping",
            "imageUrl": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQr69E2Q7ItPCMrE8VhcTKAcyMcbRjry7lAM_AyLPHWIGtNKt1Na8Wm3S_-fC8unpbHpjjA&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 25,
            "offers": "3",
            "productId": "11632535196096607476",
            "position": 16
        },
        {
            "title": "Apple iPhone x 256GB AT&T Locked Phone - Space Gray (Refurbished)",
            "source": "Walmart - Seller",
            "link": "https://www.walmart.com/ip/Restored-Apple-iPhone-X-256GB-AT-T-Locked-Phone-Space-Gray-Refurbished/336910442?wmlspartner=wlpa&selectedSellerId=101016675&selectedOfferId=EC55B43D25C338F3850788321894BB33&conditionGroupCode=2",
            "price": "$149.90 refurbished",
            "delivery": "$19.99 shipping",
            "imageUrl": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQNYJyKmtUTmLQrkoaEEaeDrdsfG3k19dfEozKsfE_n9aruAwxa8D_k3k5sLW-zOFxjS9VN&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 25,
            "offers": "3",
            "productId": "4058872367585447876",
            "position": 17
        },
        {
            "title": "iPhone X 256GB| Republic Phones",
            "source": "Amerishop Sales | Republic ...",
            "link": "https://www.dependablebrokers.com/product-page/iphone-x-256gb-gsm-space-grey-a-stock?srsltid=AfmBOor1LiZENNEYnzFMdmKvbGNwB-CAde9VB57NekFuBI0ROz10swbvxwY",
            "price": "$439.00 used",
            "delivery": "Free shipping",
            "imageUrl": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS2ezH1aFagU9P4wTQew3HarTgzVRWy-KAllSP_txYNLw3moSdEzrbd4XSvlThzYEmgodJMRQ&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 25,
            "position": 18
        },
        {
            "title": "Apple Iphone X - 256gb - Silver (unlocked) A1865 (cdma + Gsm)",
            "source": "eBay - houstoncellphones",
            "link": "https://www.ebay.com/itm/386973977449?chn=ps&mkevt=1&mkcid=28&var=654607265617&google_free_listing_action=view_item&srsltid=AfmBOoq1-UFSOw1P7yMVDafIGZ1ny97ZGq0AZUmKo8fdZZ58LHrtdzQpOpI",
            "price": "$115.00 used",
            "delivery": "Free shipping",
            "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQI1OtObjmpFAUs7JmqCtCzoaxAcFcj6vD1pK3WhbP_K_EeNlGADrtYzGZCcxx7oPnTZETp&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 25,
            "position": 19
        },
        {
            "title": "Apple iPhone Xs - Gold - 64 GB - Unlocked",
            "source": "Swappa",
            "link": "https://swappa.com/listing/view/LZCI14254?srsltid=AfmBOoo3XJhcMmdca7-OGoE4KWvA5MZ1ONUeOrTSx8ikBGrO9oTHA8CkpR4",
            "price": "$171.00 used",
            "delivery": "Free shipping",
            "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSG52cPacuA8CVzZfRQvJB1uj21M9Ex94-3Idefb37TUjmoxpYuc_VzoqWJI6jdV9KgtTQ&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 19,
            "offers": "10+",
            "productId": "13693493769143138347",
            "position": 20
        },
        {
            "title": "Iphone X - 256gb - Unlocked (read Description)",
            "source": "eBay - sarahcell",
            "link": "https://www.ebay.com/itm/386933389994?chn=ps&mkevt=1&mkcid=28&var=654197091830&google_free_listing_action=view_item&srsltid=AfmBOopgcWwrlWblfnzrC6PGnCNUlrpu_M_0D4zn9c0Gbj7eWvuI2Grw9iI",
            "price": "$194.00 used",
            "delivery": "Free shipping",
            "imageUrl": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQtJJyVmAZCz5E8qT0rwEPaL4I9QnHZTtcGv5ZWW9YK1D7ufV4PCQvjxvE_e8vFu5T-nDdB&usqp=CAE",
            "rating": 4.5,
            "ratingCount": 25,
            "position": 21
        }
    ];
    const tableTheme = useMemo(() => createTableStyle(theme), [theme]);
    /**
     * sort table by the selected header column
    */
    const sortedTableRows = useMemo(() => {
        if (!sortByColumn && !searchText)
            return tableRows;
        let sortedRows = [...tableRows];
        //if the columns have to be sorted
        if (sortByColumn) {
            sortedRows = [...tableRows].sort((a, b) => {
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
                    if (valueString.includes(searchTextString) && tableHeaderDataCells.find(cell => cell.key === key)) {
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
                        }, currentPage: currentPage, visibleNumberOfRows: numberOfVisibleRows, rows: sortedTableRows, paginationChange: (value) => setCurrentPage(prevState => prevState + value), className: className }), _jsxs(HtmlTable, { children: [_jsx(TableHeader, { headers: tableHeaderDataCells, onHeaderClick: (headerCell) => { handleColumnSorting(headerCell); } }), !sortedTableRows.length && getNoTableDataView(), sortedTableRows.length > 0 && (_jsx(TableBody, { rows: sortedTableRows, headers: tableHeaderDataCells, stripe: stripe, onRowClick: (row) => { onRowClick?.(row); }, numberOfVisibleRows: numberOfVisibleRows, currentPage: currentPage }))] })] }) }));
};
DataTableGrid.prototype = {
    showActionBar: PropTypes.bool,
    rows: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    strpe: PropTypes.bool,
    theme: PropTypes.object
};
export default DataTableGrid;
