import { DefaultTheme } from "styled-components/dist/types";
import { colorSchemaType } from "./types";
import "styled-components";
declare module 'styled-components' {
    interface DefaultTheme {
        text?: {
            dark?: string;
            default?: string;
        };
        background?: {
            default?: string;
            striped?: string;
            warn?: string;
            header?: string;
            body?: string;
        };
        shade?: {
            default?: string;
        };
        border?: {
            default: string;
        };
    }
}
export declare const defaultColorSchema: DefaultTheme;
/**
 * When custom themeing is provided, we merge with the defaul one.
 * @param theme
 * @returns
 */
export declare const createTableStyle: (theme: colorSchemaType | undefined) => DefaultTheme;
