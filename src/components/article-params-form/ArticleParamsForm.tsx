import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import { useState } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import React from 'react';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
	initialState: any; // Changed from ArticleStateType to any
	onApply: (state: any) => void; // Changed from ArticleStateType to any
	onReset: () => void;
	asideRef: React.RefObject<HTMLElement>;
	arrowButtonRef: React.RefObject<HTMLDivElement>;
};

type ArticleStateValues = {
	fontFamily: string;
	fontColor: string;
	backgroundColor: string;
	contentWidth: string;
	fontSize: string;
};

const defaultArticleStateValues: ArticleStateValues = {
	fontFamily: fontFamilyOptions[0].value,
	fontColor: fontColors[0].value,
	backgroundColor: backgroundColors[0].value,
	contentWidth: contentWidthArr[0].value,
	fontSize: fontSizeOptions[0].value,
};

export const ArticleParamsForm = ({ isOpen, onToggle, initialState, onApply, onReset, asideRef, arrowButtonRef }: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState<ArticleStateValues>(initialState);

	React.useEffect(() => {
		if (isOpen) {
			setFormState(initialState);
		}
	}, [isOpen, initialState]);

	const handleChange = <K extends keyof ArticleStateValues>(key: K, value: string) => {
		setFormState((prev) => ({ ...prev, [key]: value }));
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleStateValues);
		onReset();
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
	};

	const getOption = (options: any[], value: string) => options.find((o) => o.value === value) || options[0];

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} ref={arrowButtonRef} />
			<aside ref={asideRef} className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
					<Select
						title="Шрифт"
						options={fontFamilyOptions}
						selected={getOption(fontFamilyOptions, formState.fontFamily)}
						onChange={(option) => handleChange('fontFamily', option.value)}
					/>
					<RadioGroup
						title="Размер шрифта"
						name="font-size"
						options={fontSizeOptions}
						selected={getOption(fontSizeOptions, formState.fontSize)}
						onChange={(option) => handleChange('fontSize', option.value)}
					/>
					<Select
						title="Цвет шрифта"
						options={fontColors}
						selected={getOption(fontColors, formState.fontColor)}
						onChange={(option) => handleChange('fontColor', option.value)}
					/>
					<Separator />
					<Select
						title="Цвет фона"
						options={backgroundColors}
						selected={getOption(backgroundColors, formState.backgroundColor)}
						onChange={(option) => handleChange('backgroundColor', option.value)}
					/>
					<Select
						title="Ширина контейнера"
						options={contentWidthArr}
						selected={getOption(contentWidthArr, formState.contentWidth)}
						onChange={(option) => handleChange('contentWidth', option.value)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
