import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';

import './styles/index.scss';
import styles from './styles/index.module.scss';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from './constants/articleProps';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [formIsOpen, setFormIsOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const updateArticleState = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setFormState((prev) => ({
			...prev,
			[key]: value,
		}));
	};
	const resetValue = () => {
		setArticleState(defaultArticleState);
		setFormState(defaultArticleState);
	};
	const handleOpen = () => {
		setFormIsOpen(!formIsOpen);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={formIsOpen}
				handleOpen={handleOpen}
				formState={formState}
				updateArticleState={updateArticleState}
				onReset={resetValue}
				fontFamilyOptions={fontFamilyOptions}
				fontColors={fontColors}
				backgroundColors={backgroundColors}
				fontSizeOptions={fontSizeOptions}
				contentWidthArr={contentWidthArr}
				setArticleState={setArticleState}
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
