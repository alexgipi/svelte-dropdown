# `@flexiui/svelte-dropdown`

Un componente para Svelte que facilita la creación y personalización de menús desplegables con opciones dinámicas. Soporta posiciones personalizables, eventos de apertura/cierre y un diseño flexible para integrarse en cualquier aplicación.

## Instalación

Para instalar el componente `Dropdown` en tu proyecto de Svelte, puedes usar npm o yarn.

Con npm:

```bash
npm install @flexiui/svelte-dropdown
```

Con yarn:

```bash
yarn add @flexiui/svelte-dropdown
```

## Uso

Una vez instalado, puedes usar los componentes `Dropdown` y `DropdownItem` en tu aplicación de Svelte.

### Ejemplo completo

```svelte
<script lang="ts">
  import { Dropdown, DropdownItem } from '@flexiui/svelte-dropdown';

  let recalculateDropdownPosition = null;

  function handleOpenDropdown(e) {
    console.log(e);
  }

  function handleCloseDropdown(e) {
    console.log(e);
  }


  function dropdownItemClickHandler(e) {
    console.log(e.detail);
  }

  let activePosition: "top-left" | "top-center" | "top-right" | 
                        "bottom-left" | "bottom-center" | "bottom-right" | 
                        "left-top" | "left-center" | "left-bottom" | 
                        "right-top" | "right-center" | "right-bottom" = "bottom-right";

  const positions = [
    ["top-left", "top-center", "top-right"], 
    ["bottom-left", "bottom-center", "bottom-right"], 
    ["left-top", "left-center", "left-bottom"], 
    ["right-top", "right-center", "right-bottom"]
  ];

  function changeDropdownPosition(position) {
    activePosition = position;
  }

</script>

<main>
  <div class="card">
    <div class="btn-groups">
      {#each positions as positionRow}
        <div class="btn-group">
          {#each positionRow as position }
            <button 
            class="btn capitalize" 
            on:click={() => changeDropdownPosition(position)}
            data-dropdown-toggle="dropdown"
            data-dropdown-trigger="click"
            data-dropdown-key={position}>
            {position.replaceAll('-', ' ')}
            </button>
          {/each}        
        </div>
      {/each}
    </div>

    <Dropdown 
    bind:calculatePosition={recalculateDropdownPosition} 
    position={activePosition}
    yOffset={0} 
    xOffset={0}
    margin={8}
    id="dropdown" 
    on:close={handleCloseDropdown} 
    on:open={handleOpenDropdown}>
      <header class="dropdown-header">
        <strong>{activePosition}</strong>
      </header>

      <DropdownItem>
        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" fill="currentColor"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm112-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z"/></svg>
        Settings
      </DropdownItem>
      <DropdownItem on:clicked={dropdownItemClickHandler}>
        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" fill="currentColor"><path d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125-202 201Zm468-72h144l-72-204-72 204Z"/></svg>
        Language
      </DropdownItem>

      // Other custom dropdown content...

    </Dropdown>
  </div>
</main>

<style>
  .dropdown-header {
    text-align: left;
    padding: 2px 14px 0;
    margin-bottom: 8px;
  }

  .capitalize {
    text-transform: capitalize;
  }

  .btn-groups {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .btn-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;

    .btn {
      outline: none;
      border: none;
      flex: 1;
      padding: .75rem 2rem;
    }
  }
</style>
```

### Recalcular posición del dropdown

Puedes utilizar la función `calculatePosition` para recalcular la posición del dropdown si es necesario. Por ejemplo: si añades contenido dinamico dentro del dropdown y su tamaño puede ir cambiando.

<!-- Tambien puedes especificar el width, min-width y max-width de la caja del dropdown. -->

## Propiedades

### Dropdown

| Propiedad | Tipo | Descripción |
| --- | --- | --- |
| `id` | string | Identificador único del dropdown. |
| `position` | string | Posición del dropdown. Valores posibles: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`, `left-top`, `left-center`, `left-bottom`, `right-top`, `right-center`, `right-bottom`.
| `xOffset` | number | Desplazamiento horizontal del dropdown en píxeles.
| `yOffset` | number | Desplazamiento vertical del dropdown en píxeles.
| `margin` | number | Margen del dropdown en píxeles.
| `width` | number | | Ancho del dropdown en píxeles.
| `minWidth` | number | Ancho mínimo del dropdown en píxeles.
| `maxWidth` | number | Ancho máximo del dropdown en píxeles.
| `minHeight` | number | Altura mínima del dropdown en pixeles.
| `maxHeight` | number | Altura máxima del dropdown en pixeles.
| `calculatePosition` | function | Función para recalcular la posición del dropdown. Ejemplo: `recalculateDropdownPosition(dropdownEl)`.


### Contribuciones

Si deseas contribuir a este proyecto, puedes hacerlo mediante un **Pull Request** en el repositorio de GitHub. Por favor, sigue las mejores prácticas y asegúrate de que tu código pase las pruebas antes de hacer un PR.

### Licencia

Este proyecto está bajo la licencia **MIT**.