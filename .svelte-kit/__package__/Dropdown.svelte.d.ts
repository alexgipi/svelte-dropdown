import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        id: any;
        position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right" | "left-top" | "left-center" | "left-bottom" | "right-top" | "right-center" | "right-bottom";
        xOffset?: number;
        yOffset?: number;
        margin?: number;
        calculatePosition?: (el?: any) => Promise<void>;
    };
    events: {
        close: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type DropdownProps = typeof __propDef.props;
export type DropdownEvents = typeof __propDef.events;
export type DropdownSlots = typeof __propDef.slots;
export default class Dropdown extends SvelteComponentTyped<DropdownProps, DropdownEvents, DropdownSlots> {
    get calculatePosition(): (el?: any) => Promise<void>;
}
export {};
