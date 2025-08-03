import { Select } from 'src/ui/select';
import { contentWidthArr } from 'src/constants/articleProps';

export const ContentWidthSelect = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
	const selected = contentWidthArr.find((o) => o.value === value) || contentWidthArr[0];
	return (
		<Select
			title="Ширина контейнера"
			options={contentWidthArr}
			selected={selected}
			onChange={(option) => onChange(option.value)}
		/>
	);
};
