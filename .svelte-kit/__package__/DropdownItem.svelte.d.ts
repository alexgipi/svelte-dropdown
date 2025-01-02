/** @typedef {typeof __propDef.props}  DropdownItemProps */
/** @typedef {typeof __propDef.events}  DropdownItemEvents */
/** @typedef {typeof __propDef.slots}  DropdownItemSlots */
export default class DropdownItem extends SvelteComponentTyped<{
    href?: any;
    icon?: any;
    target?: string;
    rel?: string;
    value?: any;
    customClass?: any;
}, {
    clicked: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type DropdownItemProps = typeof __propDef.props;
export type DropdownItemEvents = typeof __propDef.events;
export type DropdownItemSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        href?: any;
        icon?: any;
        target?: string;
        rel?: string;
        value?: any;
        customClass?: any;
    };
    events: {
        clicked: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
