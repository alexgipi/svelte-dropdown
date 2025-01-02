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
        dropdownToggle = document.querySelectorAll(`[data-dropdown-toggle="${id}"]`);
        
        dropdownToggle.forEach((el: any) => {
            el.addEventListener("click", (event) => {
                event.stopPropagation();
                const key = el.getAttribute('data-dropdown-key');
                toggleDropdown(el, key);
            });
        });

        document.addEventListener("click", closeDropdown);
    });

    onDestroy(() => {
        document.removeEventListener("click", closeDropdown);
    });

    async function toggleDropdown(el, key) {
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

    function closeDropdown(event) {
        if (
            dropdownPanelEl &&
            !dropdownPanelEl.contains(event.target) &&
            !dropdownToggle[0].contains(event.target)
        ) {
            opened = false;
            openedKey = null;
            dispatch('close', { id, eventType: 'dropdown-close' });
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