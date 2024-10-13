export type FilterFn = (query: string, value: string, id: string) => number;

export const defaultFilter: FilterFn = (query, value) => {
	if (value?.toLowerCase().includes(query.toLowerCase())) {
		return 1;
	} else {
		return 0;
	}
};
