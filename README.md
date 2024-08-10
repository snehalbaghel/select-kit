# Select Kit

This library is a one-stop solution for building WAI-ARIA compliant navigation/command/select menus. The components provided are headless so they can be styled as per your requirement, they are also [composable](https://github.com/pacocoursey/cmdk/blob/main/ARCHITECTURE.md) in nature so its easy to use. Refer the various examples below to implement the variation you want to build.

<p align="center">
    <img src="./src/static/images/example.png"/>
</p>

## Installation

```bash
npm install select-kit
```

## Basic Structure of a Combobox

- `Select.Root`: The root component which sets up label, context and the store:
  - `Select.Input`: Combobox's input, keeps track of query
  - `Select.Combobox`: Use this if you're building a select only component
  - `Select.ListBox`: Root component of the items
    - `Select.Item`: A single selectable item, you will have multiple of these
    - `Select.Separator`: Just a div with role='separator'
    - `Select.NoResults`: Rendered when there are no results found
- `Select.Button`: A button to toggle the list-box

## Stable Release TODOS:

- [ ] Multiselect Support
- [ ] Type Ahead Support for 'Select Only' combobox
- [ ] Some API improvements

## Examples

For full examples refer the [examples](/src/examples) folder in this repo

> **NOTE:** We use [@smui/common](https://www.npmjs.com/package/@smui/common) to forward events of our components, it works similarly to the the Svelte syntax apart from one important difference: for adding event modifiers the `|` should be replaced by `$` i.e. `on:click|preventDefault` becomes `on:click$preventDefault`. For information on this refer this [issue](https://github.com/sveltejs/svelte/issues/2837).

### Basic Example

```svelte
<script lang="ts">
	import Select from 'select-kit';
</script>

<Select.Root label="Numbers">
	<Select.Input placeholder="Search something..." class="input" />
	<Select.ListBox let:open>
		{#if open}
			<Select.NoResults>No results found</Select.NoResults>
			<Select.Item onSelectItem={() => console.log('clicked one')} id="one">One</Select.Item>
			<Select.Item onSelectItem={() => console.log('clicked two')} id="two">Two</Select.Item>
			<Select.Item onSelectItem={() => console.log('clicked three')} id="three">Three</Select.Item>
			<Select.Item onSelectItem={() => console.log('clicked four')} id="four">Four</Select.Item>
		{/if}
	</Select.ListBox>
</Select.Root>
```

### Disable Filtering

ListBox supports shouldFilter prop which will disable filtering, to access the input value to perform your own filtering you may bind to the input component's value prop.

```svelte
<script lang="ts">
	import Select from 'select-kit';

	let value = '';
	// Add your logic here for filtering..
</script>

<Select.Root label="Numbers">
	<Select.Input bind:value placeholder="Search something..." class="input" />
	<Select.ListBox shouldFilter={false}>...</Select.ListBox>
</Select.Root>
...
```

### With Chevron Button

```svelte
<!-- 
	Basic example with dropdown button
 -->
<script lang="ts">
	import Select from '$lib/index.js';
</script>

<Select.Root label="Numbers">
	<Select.Input placeholder="Search something..." class="input" />
	<Select.Button let:open>{open ? '⌃' : '⌄'}</Select.Button>
	<Select.ListBox let:open>
		{#if open}
			<Select.NoResults>No results found</Select.NoResults>
			<Select.Item onSelectItem={() => console.log('clicked one')} id="one">One</Select.Item>
			<Select.Item onSelectItem={() => console.log('clicked two')} id="two">Two</Select.Item>
			<Select.Item onSelectItem={() => console.log('clicked three')} id="three">Three</Select.Item>
			<Select.Item onSelectItem={() => console.log('clicked four')} id="four">Four</Select.Item>
		{/if}
	</Select.ListBox>
</Select.Root>
```

### Dialog with CMD+K

<!-- TODO -->

### Tabbed Example

<!-- TODO -->

### Clearable Example

<!-- TODO -->

### Floating Example

<!-- TODO: https://svelte-select-examples.vercel.app/examples/props/floating-config -->

### Async Example (With Loader)

<!-- TODO: Implementation required -->
