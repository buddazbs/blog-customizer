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
import React, { useState } from 'react';

interface ArticleParamsFormProps {
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
	initialState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
	asideRef: React.RefObject<HTMLElement>;
	arrowButtonRef: React.RefObject<HTMLDivElement>;
}

export const ArticleParamsForm = ({ isOpen, onToggle, initialState, onApply, onReset, asideRef, arrowButtonRef, onClose }: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState<ArticleStateType>(initialState);

	React.useEffect(() => {
		if (isOpen) {
			setFormState(initialState);
		}
	}, [isOpen, initialState]);

	const handleChange = (field: keyof ArticleStateType) => (value: any) => {
		setFormState((prev) => ({ ...prev, [field]: value }));
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		onReset();
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} ref={arrowButtonRef} />
			<div
				className={styles.overlay + (isOpen ? ' ' + styles.overlay_open : '')}
				onClick={isOpen ? onClose : undefined}
			/>
			<aside
				ref={asideRef}
				className={styles.container + (isOpen ? ' ' + styles.container_open : '')}
				style={{
					'--font-family': formState.fontFamilyOption.value,
					'--font-size': formState.fontSizeOption.value,
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
