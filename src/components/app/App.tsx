import { useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from 'src/constants/articleProps';
import styles from './App.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={{
				'--font-family': articleState.fontFamilyOption.value,
				'--font-size': articleState.fontSizeOption.value,
				'--font-color': articleState.fontColor.value,
				'--container-width': articleState.contentWidth.value,
				'--bg-color': articleState.backgroundColor.value,
			} as React.CSSProperties}
		>
			<ArticleParamsForm setArticleState={setArticleState} />
			<Article />
		</main>
	);
}
