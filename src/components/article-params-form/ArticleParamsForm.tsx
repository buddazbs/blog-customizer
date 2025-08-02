import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import { useState } from 'react';
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
import { FontFamilySelect } from './FontFamilySelect';
import { FontSizeRadioGroup } from './FontSizeRadioGroup';
import { FontColorSelect } from './FontColorSelect';
import { BackgroundColorSelect } from './BackgroundColorSelect';
import { ContentWidthSelect } from './ContentWidthSelect';
import { Text } from 'src/ui/text';

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

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} ref={arrowButtonRef} />
			<aside ref={asideRef} className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<div className={styles.fieldBlock}>
						<FontFamilySelect value={formState.fontFamily} onChange={(value) => handleChange('fontFamily', value)} />
					</div>
					<div className={styles.fieldBlock}>
						<FontSizeRadioGroup value={formState.fontSize} onChange={(value) => handleChange('fontSize', value)} />
					</div>
					<div className={styles.fieldBlock}>
						<FontColorSelect value={formState.fontColor} onChange={(value) => handleChange('fontColor', value)} />
					</div>
					<Separator />
					<div className={styles.fieldBlock}>
						<BackgroundColorSelect value={formState.backgroundColor} onChange={(value) => handleChange('backgroundColor', value)} />
					</div>
					<div className={styles.fieldBlock}>
						<ContentWidthSelect value={formState.contentWidth} onChange={(value) => handleChange('contentWidth', value)} />
					</div>
					<div className={styles.bottomContainer}>
						<Button title='СБРОСИТЬ' htmlType='reset' type='clear' />
						<Button title='ПРИМЕНИТЬ' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
