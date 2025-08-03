import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';
import { useRef, useEffect, useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);

	const sidebarRef = useRef<HTMLElement | null>(null);
	const arrowButtonRef = useRef<HTMLDivElement | null>(null);

	const handleSidebarOpen = () => setSidebarOpen(true);
	const handleSidebarClose = () => setSidebarOpen(false);
	const handleSidebarToggle = () => setSidebarOpen((open) => !open);

	const handleApply = (newState: ArticleStateType) => {
		setArticleState(newState);
		setSidebarOpen(false);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
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

	return (
		<main
			className={styles.main}
			style={{
				'--font-family': articleState.fontFamilyOption.value,
				'--font-size': articleState.fontSizeOption.value,
				'--font-color': articleState.fontColor.value,
				'--container-width': articleState.contentWidth.value,
				'--bg-color': articleState.backgroundColor.value,
			} as CSSProperties}
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
			<Article articleState={articleState} />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
