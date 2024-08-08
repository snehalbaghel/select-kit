<!-- 
	Basic example with filtering
 -->
<script lang="ts">
	import Select from '$lib/index.js';
</script>

<Select.Root label="select-only-example">
	<Select.Combobox class="input" let:selected>
		{selected || 'Select a number...'}
	</Select.Combobox>
	<Select.ListBox selectOnly let:open>
		{#if open}
			<Select.NoResults>No results found</Select.NoResults>
			<Select.Item onSelectItem={() => console.log('clicked one')} id="one">One</Select.Item>
			<Select.Item onSelectItem={() => console.log('clicked two')} id="two">Two</Select.Item>
			<Select.Item onSelectItem={() => console.log('clicked three')} id="three">Three</Select.Item>
			<Select.Item onSelectItem={() => console.log('clicked four')} id="four">Four</Select.Item>
		{/if}
	</Select.ListBox>
</Select.Root>
