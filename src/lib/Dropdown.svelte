<script lang="ts">
    import { onMount, onDestroy, tick, createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
        
    export let id;
    export let position: "top-left" | "top-center" | "top-right" | 
                        "bottom-left" | "bottom-center" | "bottom-right" | 
                        "left-top" | "left-center" | "left-bottom" | 
                        "right-top" | "right-center" | "right-bottom" = "bottom-right";
    export let xOffset = 0;
    export let yOffset = 0;
    export let margin = 8;

    let dropdownPanelEl;
    let opened = false;
    let openedKey: string;
    let dropdownToggle: NodeListOf<Element>;

    // Cuando el componente se monta
    onMount(() => {
        initDropdown();
    });

    onDestroy(() => {
        document.removeEventListener("click", closeDropdown);
    });

    let dropdownListeners = new Map<Element, EventListener>();

    export function initDropdown() {
        cleanupDropdownListeners();
        dropdownToggle = document.querySelectorAll(`[data-dropdown-toggle="${id}"]`);

        dropdownToggle.forEach((el: Element) => {
            // Define la función listener para el elemento
            const listener = (event: Event) => {
                event.stopPropagation();
                const key = el.getAttribute("data-dropdown-key");
                toggleDropdown(el, key);
            };

 
            el.addEventListener("click", listener);
            dropdownListeners.set(el, listener);
        });

        document.addEventListener("click", closeDropdown);
    }

    // Limpia los listeners para evitar duplicados
    function cleanupDropdownListeners() {
        dropdownListeners.forEach((listener, el) => {
            el.removeEventListener("click", listener);
        });
        dropdownListeners.clear();

        // También elimina el listener global si es necesario
        document.removeEventListener("click", closeDropdown);
    }

    export async function refreshDropdown() {
        await tick();
        initDropdown();
    }

    async function toggleDropdown(el, key) {
        console.log("Toggle");
        console.log({openedKey, key});
        if (openedKey === key) {
            opened = false;
            openedKey = null;
            dispatch('close', { id, eventType: 'dropdown-close' });
        } else {
            opened = true;
            openedKey = key;
        }

        await tick();
        if (opened) calculatePosition(el);
    }


    export function close(){
        opened = false;
        openedKey = null;
        dispatch('close', { id, eventType: 'dropdown-close' });
    }

    function closeDropdown(event) {
        if (
            dropdownPanelEl &&
            !dropdownPanelEl.contains(event.target) &&
            !dropdownToggle[0].contains(event.target)
        ) {
            close();
        }
    }

    let currentElement;
    export async function calculatePosition(el = null) {
        if (!dropdownPanelEl) return;

        if(el === null && currentElement) {
            el = currentElement;
        } else {
            currentElement = el;
        }
        
        await tick();  
        const rect = el.getBoundingClientRect();
        const xPos = rect.left + window.scrollX;
        const yPos = rect.top + window.scrollY;
        const buttonWidth = rect.width;
        const buttonHeight = rect.height;
        const dropdownWidth = dropdownPanelEl.offsetWidth;
        const dropdownHeight = dropdownPanelEl.offsetHeight;

        dropdownPanelEl.style.top = null;
        dropdownPanelEl.style.left = null;

        switch (position) {
            case "top-left":
                dropdownPanelEl.style.top = `${yPos - dropdownHeight - margin - yOffset}px`;
                dropdownPanelEl.style.left = `${xPos + xOffset}px`;
                break;
            case "top-center":
                dropdownPanelEl.style.top = `${yPos - dropdownHeight - margin - yOffset}px`;
                dropdownPanelEl.style.left = `${xPos + buttonWidth / 2 - dropdownWidth / 2}px`;
                break;
            case "top-right":
                dropdownPanelEl.style.top = `${yPos - dropdownHeight - margin  - yOffset}px`;
                dropdownPanelEl.style.left = `${xPos + buttonWidth - dropdownWidth - xOffset}px`;
                break;
            case "bottom-left":
                dropdownPanelEl.style.top = `${yPos + buttonHeight + margin + yOffset}px`;
                dropdownPanelEl.style.left = `${xPos + xOffset}px`;
                break;
            case "bottom-center":
                dropdownPanelEl.style.top = `${yPos + buttonHeight + margin + yOffset}px`;
                dropdownPanelEl.style.left = `${xPos + buttonWidth / 2 - dropdownWidth / 2}px`;
                break;
            case "bottom-right":
                dropdownPanelEl.style.top = `${yPos + buttonHeight + margin + yOffset}px`;
                dropdownPanelEl.style.left = `${xPos + buttonWidth - dropdownWidth - xOffset}px`;
                break;
            case "left-top":
                dropdownPanelEl.style.top = `${yPos + yOffset}px`;
                dropdownPanelEl.style.left = `${xPos - dropdownWidth - margin - xOffset}px`;
                break;
            case "left-center":
                dropdownPanelEl.style.top = `${yPos + buttonHeight / 2 - dropdownHeight / 2}px`;
                dropdownPanelEl.style.left = `${xPos - dropdownWidth - margin - xOffset}px`;
                break;
            case "left-bottom":
                dropdownPanelEl.style.top = `${yPos + buttonHeight - dropdownHeight - yOffset}px`;
                dropdownPanelEl.style.left = `${xPos - dropdownWidth - margin - xOffset}px`;
                break;
            case "right-top":
                dropdownPanelEl.style.top = `${yPos + yOffset}px`;
                dropdownPanelEl.style.left = `${xPos + buttonWidth + margin + xOffset}px`;
                break;
            case "right-center":
                dropdownPanelEl.style.top = `${yPos + buttonHeight / 2 - dropdownHeight / 2}px`;
                dropdownPanelEl.style.left = `${xPos + buttonWidth + margin + xOffset}px`;
                break;
            case "right-bottom":
                dropdownPanelEl.style.top = `${yPos + buttonHeight - dropdownHeight - yOffset}px`;
                dropdownPanelEl.style.left = `${xPos + buttonWidth + margin + xOffset}px`;
                break;
        }
    }
</script>

{#if opened}
    <div bind:this={dropdownPanelEl} class="dropdown-panel" {id} class:opened={opened}>
        <slot></slot>
    </div>
{/if}

<style>
    .dropdown-panel {
        position: absolute;
        min-width: 150px;
        top: 53px;
        left: 0;
        z-index: 30;
        background: #0d0d0da8;
        border: none;
        border: 1px solid #ffffff12;
        backdrop-filter: blur(42px);
        border-radius: 12px;
        padding: 10px;
        visibility: hidden;
        opacity: 0;
        display: none;

        overflow: auto;
        scrollbar-width: thin;
        max-height: 600px;
        box-sizing: border-box;
    }

    .dropdown-panel.opened {
        visibility: visible;
        opacity: 1;
        display: inline-block;
    }
</style>