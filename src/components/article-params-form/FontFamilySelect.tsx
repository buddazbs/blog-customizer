import { Select } from 'src/ui/select';
import { fontFamilyOptions } from 'src/constants/articleProps';

export const FontFamilySelect = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
	const selected = fontFamilyOptions.find((o) => o.value === value) || fontFamilyOptions[0];
	return (
		<Select
			title="Шрифт"
			options={fontFamilyOptions}
			selected={selected}
			onChange={(option) => onChange(option.value)}
		/>
	);
};
