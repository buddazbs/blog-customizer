import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';
import { useRef, useEffect, useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

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

const App = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [articleState, setArticleState] = useState<ArticleStateValues>(defaultArticleStateValues);

	const sidebarRef = useRef<HTMLElement | null>(null);
	const arrowButtonRef = useRef<HTMLDivElement | null>(null);

	const handleSidebarOpen = () => setSidebarOpen(true);
	const handleSidebarClose = () => setSidebarOpen(false);
	const handleSidebarToggle = () => setSidebarOpen((open) => !open);

	const handleApply = (newState: ArticleStateValues) => {
		setArticleState(newState);
		setSidebarOpen(false);
	};

	const handleReset = () => {
		setArticleState(defaultArticleStateValues);
	};

	useEffect(() => {
		if (!isSidebarOpen) return;
		const handleClick = (e: MouseEvent) => {
			const sidebar = sidebarRef.current;
			const arrow = arrowButtonRef.current;
			if (!sidebar || !arrow) return;
			const target = e.target as Node;
			if (!sidebar.contains(target) && !arrow.contains(target)) {
				handleSidebarClose();
			}
		};
		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, [isSidebarOpen]);

	const getOption = (options: any[], value: string) => options.find((o) => o.value === value) || options[0];

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamily,
					'--font-size': articleState.fontSize,
					'--font-color': articleState.fontColor,
					'--container-width': articleState.contentWidth,
					'--bg-color': articleState.backgroundColor,
				} as CSSProperties
			}
		>
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onToggle={handleSidebarToggle}
				onClose={handleSidebarClose}
				initialState={articleState}
				onApply={handleApply}
				onReset={handleReset}
				asideRef={sidebarRef}
				arrowButtonRef={arrowButtonRef}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
