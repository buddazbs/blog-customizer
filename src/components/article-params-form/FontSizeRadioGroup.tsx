import { RadioGroup } from 'src/ui/radio-group';
import { fontSizeOptions } from 'src/constants/articleProps';

export const FontSizeRadioGroup = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
	const selected = fontSizeOptions.find((o) => o.value === value) || fontSizeOptions[0];
	return (
		<RadioGroup
			title="Размер шрифта"
			name="font-size"
			options={fontSizeOptions}
			selected={selected}
			onChange={(option) => onChange(option.value)}
		/>
	);
};
