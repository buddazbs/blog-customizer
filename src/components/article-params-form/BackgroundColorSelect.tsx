import { Select } from 'src/ui/select';
import { backgroundColors } from 'src/constants/articleProps';

export const BackgroundColorSelect = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
	const selected = backgroundColors.find((o) => o.value === value) || backgroundColors[0];
	return (
		<Select
			title="Цвет фона"
			options={backgroundColors}
			selected={selected}
			onChange={(option) => onChange(option.value)}
		/>
	);
};
