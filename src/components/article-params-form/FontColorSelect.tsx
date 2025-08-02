import { Select } from 'src/ui/select';
import { fontColors } from 'src/constants/articleProps';

export const FontColorSelect = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
	const selected = fontColors.find((o) => o.value === value) || fontColors[0];
	return (
		<Select
			title="Цвет шрифта"
			options={fontColors}
			selected={selected}
			onChange={(option) => onChange(option.value)}
		/>
	);
};
