<script>
    import { createEventDispatcher } from "svelte";
  
      export let href = null;
      export let icon = null;
      export let target = "_self";
      export let rel = "noopener noreferrer";
      export let value = null;
      export let customClass = null;
  
      const dispatch = createEventDispatcher()
          
  
      function handleClick(e) {
          e.preventDefault();
          e.stopPropagation();
  
          dispatch('clicked', {value})
      }
  
      // evenet dispatcher
      
  </script>
  
  {#if href}
      <a
          href="/admin"
  
          role="menuitem"
          class="dropdown-item rounded-md hover:bg-[#111] relative flex select-none items-center px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 pl-4"
          tabindex="-1"
          data-orientation="vertical"
          target={target}
          rel={rel}
      >
          {value}
  
          {#if icon}
              <span class="ml-auto text-xs tracking-widest text-muted-foreground">
                  {@html icon}
              </span>
          {/if}
      </a>
  {:else}
      <button
      on:click={(e) => handleClick(e)}
          role="menuitem"
          class="dropdown-item {customClass ? customClass : ''} rounded-md hover:bg-[#111] relative flex select-none items-center px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 pl-4"
      >
          {#if value}
            {value}
          {:else}
            <slot></slot>
          {/if}
          
  
          {#if icon}
              <span class="ml-auto text-xs tracking-widest text-muted-foreground">
                  {@html icon}
              </span>
          {/if}
      </button>
  {/if}
  
  <style>
      .dropdown-item {
        display: flex;
        width: 100%;
        color: #989898;
        padding: 8px 12px;
        gap: 10px;
        white-space: nowrap;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: 400;
        border-radius: 8px;
        background: transparent;
        align-items: center;
        border: none;
        font-weight: 500;
        font-family: inherit;
      }
  
      .dropdown-item:hover {
          background: #b5b5b50d;
          color: #fff;
      }
  
      .dropdown-item-delete:hover {
          color: #ff6f6f;
          background: #ffa1a114;
      }
  </style>