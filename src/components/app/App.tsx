import { useState, useRef } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from 'src/constants/articleProps';
import styles from './App.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const asideRef = useRef<HTMLElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	const handleClose = () => setSidebarOpen(false);

	return (
		<main className={styles.main}>
			<Article articleState={articleState} />
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onToggle={() => setSidebarOpen((open) => !open)}
				onClose={handleClose}
				initialState={articleState}
				onApply={setArticleState}
				onReset={() => setArticleState(defaultArticleState)}
				asideRef={asideRef}
				arrowButtonRef={arrowButtonRef}
			/>
		</main>
	);
}
