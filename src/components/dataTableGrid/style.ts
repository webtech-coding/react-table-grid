import { DefaultTheme } from "styled-components/dist/types";
import { colorSchemaType} from "./types";
import "styled-components";

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        text?:{
            dark?:string,
            default?:string
        },
        background?:{
            default?:string,
            striped?:string,
            warn?:string,
            header?:string,
            body?:string
        },
        shade?:{
            default?:string
        },
        border?:{
            default:string
        }
    }
}

export const defaultColorSchema: DefaultTheme={
    text:{
        dark:'#202020',
        default:'#515151'
    },
    background:{
        default:"#ffffff",
        striped:'#e9ecef',
        warn:'#d62828',
        header:'#ffffff',
        body:'#ffffff'
    },
    shade:{
        default:'#dee2e6'
    },
    border:{
        default:'#adb5bd'
    }
}

/**
 * When custom themeing is provided, we merge with the defaul one.
 * @param theme 
 * @returns 
 */
export const createTableStyle=(theme:colorSchemaType | undefined):DefaultTheme=>{
    if(!theme)return defaultColorSchema

    const customColorSchema = {}; 

    const colorKeys = Object.keys(theme);
    if(!colorKeys.length)return defaultColorSchema;
    
        Object.entries(defaultColorSchema).forEach(([schemaKey, schemaObject])=>{
        
           if(!colorKeys.includes(schemaKey)){
                Object.assign(customColorSchema, {[schemaKey]:schemaObject})
            }else{

                const customTheme = theme[schemaKey as keyof typeof theme];
               
                const newProperty={}
                Object.entries(schemaObject).forEach(([key])=>{
                    if(customTheme && customTheme[key as keyof typeof customTheme]){
                        Object.assign(newProperty, {[key]:customTheme[key as keyof typeof customTheme]})
                     
                        Object.assign(customColorSchema, {[schemaKey]:{} })
                    }
                })
                Object.assign(customColorSchema, {[schemaKey]: newProperty})
               
            }
        })
        return customColorSchema
}