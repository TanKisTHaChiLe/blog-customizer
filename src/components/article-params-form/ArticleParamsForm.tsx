import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import { useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	isOpen: boolean;
	handleOpen: () => void;
	articleState: ArticleStateType;
	updateArticleState: (key: keyof ArticleStateType, value: OptionType) => void;
	onReset: () => void;
	fontFamilyOptions: OptionType[];
	fontColors: OptionType[];
	backgroundColors: OptionType[];
	contentWidthArr: OptionType[];
	fontSizeOptions: OptionType[];
	setFormState: React.Dispatch<React.SetStateAction<{
        fontFamilyOption: OptionType;
        fontColor: OptionType;
        backgroundColor: OptionType;
        contentWidth: OptionType;
        fontSizeOption: OptionType;
    }>>
};

export const ArticleParamsForm =  ({
  isOpen,
  handleOpen,
  articleState,
  updateArticleState,
  onReset,
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  fontSizeOptions,
  contentWidthArr,
  setFormState
}: ArticleParamsFormProps) => {

	function handleSubmit(e: React.MouseEvent<HTMLButtonElement>): void {
		e.preventDefault();
		setFormState(articleState)
	}

	function handleReset() {
		onReset();
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<Text
						as='h1'
						size={31}
						weight={800}
						uppercase
						dynamicLite
						align='left'>
						Задайте параметры
					</Text>

					<Select
						selected={articleState.fontFamilyOption}
						onChange={(option) => updateArticleState('fontFamilyOption', option)}
						options={fontFamilyOptions}
						title='шрифт'></Select>

					<RadioGroup
						selected={articleState.fontSizeOption}
						onChange={(option) => updateArticleState('fontSizeOption', option)}
						name='radio'
						options={fontSizeOptions}
						title='размер шрифта'></RadioGroup>

					<Select
						selected={articleState.fontColor}
						onChange={(option) => updateArticleState('fontColor', option)}
						options={fontColors}
						title='цвет шрифта'></Select>
					<Separator />

					<Select
						selected={articleState.backgroundColor}
						onChange={(option) => updateArticleState('backgroundColor', option)}
						options={backgroundColors}
						title='цвет фона'></Select>

					<Select
						selected={articleState.contentWidth}
						onChange={(option) => updateArticleState('contentWidth', option)}
						options={contentWidthArr}
						title='Ширина контента'></Select>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleSubmit}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
