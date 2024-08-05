<!-- 
	Basic example without filtering
 -->
<script lang="ts">
	import Select from '$lib/index.js';

	let value = '';
	// Add your logic here for filtering..
</script>

<Select.Root label="Numbers">
	<Select.Input bind:value placeholder="Search something..." class="input" />
	<Select.ListBox shouldFilter={false}>
		<Select.NoResults>No results found</Select.NoResults>
		<Select.Item onSelectItem={() => alert('clicked one')} id="one">One</Select.Item>
		<Select.Item onSelectItem={() => alert('clicked two')} id="two">Two</Select.Item>
		<Select.Item onSelectItem={() => alert('clicked three')} id="three">Three</Select.Item>
		<Select.Item onSelectItem={() => alert('clicked four')} id="four">Four</Select.Item>
	</Select.ListBox>
</Select.Root>
