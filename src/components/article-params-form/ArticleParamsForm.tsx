import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { useState, FormEvent } from 'react';
import clsx from 'clsx';

export type ArticleParamsFormProps = {
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setArticleState }: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
	const [isOpen, setIsOpen] = useState(false);

	const handleChange = (field: keyof ArticleStateType) => (value: any) => {
		setFormState((prev) => ({ ...prev, [field]: value }));
	};

	const handleReset = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(formState);
		setIsOpen(false);
	};

	const fontSizeValue = Number(formState.fontSizeOption.value);
	const fontSize = fontSizeValue || Number(defaultArticleState.fontSizeOption.value);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((open) => !open)} />
			<div
				className={clsx(styles.overlay, { [styles.overlay_open]: isOpen })}
				onClick={isOpen ? () => setIsOpen(false) : undefined}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				style={{
					'--font-family': formState.fontFamilyOption.value,
					'--font-size': fontSize,
					'--font-color': formState.fontColor.value,
					'--container-width': formState.contentWidth.value,
					'--bg-color': formState.backgroundColor.value,
				} as any}
			>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title="Шрифт"
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						title="Размер шрифта"
						name="fontSizeOption"
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title="Цвет шрифта"
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title="Цвет фона"
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title="Ширина контента"
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='СБРОСИТЬ' htmlType='reset' type='clear' />
						<Button title='ПРИМЕНИТЬ' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
