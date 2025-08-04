import { ElementType, ReactNode } from 'react';
import { clsx } from 'clsx';
import { FontFamiliesClasses } from 'src/constants/articleProps';

import styles from './index.module.scss';

type TextProps = {
	children: ReactNode;
	as?: ElementType;
	dynamic?: boolean;
	size?: 12 | 18 | 22 | 25 | 31 | 38 | 45;
	weight?: 400 | 800;
	fontStyle?: 'italic' | 'normal';
	uppercase?: boolean;
	align?: 'center' | 'left';
	family?: FontFamiliesClasses;
	dynamicLite?: boolean;
};

export const Text = ({
	children,
	as: Tag = 'div',
	dynamic = false,
	dynamicLite = false,
	size = 18,
	weight = 400,
	fontStyle = 'normal',
	uppercase = false,
	align = 'left',
	family = 'open-sans',
}: TextProps) => {
	const className = clsx(
		styles.text,
		dynamic || dynamicLite ? null : styles[`size${size}`],
		{ [styles.dynamic]: dynamic },
		styles[`weight${weight}`],
		styles[`${fontStyle}`],
		{ [styles.uppercase]: uppercase },
		styles[`${align}`],
		styles[`${family}`],
		{ [styles.dynamicLite]: dynamicLite }
	);
	return <Tag className={className}>{children}</Tag>;
};
