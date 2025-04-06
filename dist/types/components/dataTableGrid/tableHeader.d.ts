import { TableHeaderDataCell } from "./types";
type TableHeaderPropType = {
    headers: TableHeaderDataCell[];
    onHeaderClick: (e: TableHeaderDataCell) => void;
};
declare const _default: import("react").NamedExoticComponent<TableHeaderPropType>;
export default _default;
