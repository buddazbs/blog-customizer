import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';
import React, { useState } from 'react';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const allowedSizes = [18, 25, 38] as const;

const App = () => {
	const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={{
				'--font-family': articleState.fontFamilyOption.value,
				'--font-size': allowedSizes.find(s => s === Number(articleState.fontSizeOption.value)) ?? 18,
				'--font-color': articleState.fontColor.value,
				'--container-width': articleState.contentWidth.value,
				'--bg-color': articleState.backgroundColor.value,
			} as any}
		>
			<ArticleParamsForm setArticleState={setArticleState} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
