<!-- 
	Basic example with filtering
 -->
<script lang="ts">
	import Select from '$lib/index.js';
</script>

<Select.Root label="numbers">
	<Select.Input placeholder="Search something..." class="input" />
	<Select.ListBox open={true}>
		<Select.NoResults>No results found</Select.NoResults>
		<Select.Item onSelectItem={() => console.log('clicked one')} id="one">One</Select.Item>
		<Select.Item onSelectItem={() => console.log('clicked two')} id="two">Two</Select.Item>
		<Select.Item onSelectItem={() => console.log('clicked three')} id="three">Three</Select.Item>
		<Select.Item onSelectItem={() => console.log('clicked four')} id="four">Four</Select.Item>
	</Select.ListBox>
</Select.Root>
