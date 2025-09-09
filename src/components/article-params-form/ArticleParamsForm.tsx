import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { ArticleStateType, OptionType } from 'src/constants/articleProps';
import { useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from '../../constants/articleProps';

type ArticleParamsFormProps = {
	isOpen: boolean;
	handleOpen: () => void;
	articleState: ArticleStateType;
	updateArticleState: (key: keyof ArticleStateType, value: OptionType) => void;
	onReset: () => void;
	fontFamilyOptions: OptionType[];
	fontColors:OptionType[];
	backgroundColors:OptionType[];
	contentWidthArr:OptionType[];
	fontSizeOptions:OptionType[];
}

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);

	function handleArrowClick() {
		setIsOpen(!isOpen);
	}

	function handleSubmit(e: React.MouseEvent<HTMLButtonElement>): void {
		e.preventDefault();
		console.log(
			fontSelected,
			sizeSelected,
			colorTextSelected,
			colorBackgroundSelected,
			widthSelected
		);
	}

	function handleReset() {
		setFontSelected(defaultArticleState.fontFamilyOption);
		setSizeSelected(defaultArticleState.fontSizeOption);
		setColorTextSelected(defaultArticleState.fontColor);
		setcolorBackgroundSelected(defaultArticleState.backgroundColor);
		setwidthSelected(defaultArticleState.contentWidth);
	}

	const [fontSelected, setFontSelected] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [sizeSelected, setSizeSelected] = useState(
		defaultArticleState.fontSizeOption
	);

	const [colorTextSelected, setColorTextSelected] = useState(
		defaultArticleState.fontColor
	);

	const [colorBackgroundSelected, setcolorBackgroundSelected] = useState(
		defaultArticleState.backgroundColor
	);

	const [widthSelected, setwidthSelected] = useState(
		defaultArticleState.contentWidth
	);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleArrowClick} />
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
						selected={fontSelected}
						onChange={setFontSelected}
						options={fontFamilyOptions}
						title='шрифт'></Select>

					<RadioGroup
						selected={sizeSelected}
						onChange={setSizeSelected}
						name='radio'
						options={fontSizeOptions}
						title='размер шрифта'></RadioGroup>

					<Select
						selected={colorTextSelected}
						onChange={setColorTextSelected}
						options={fontColors}
						title='цвет шрифта'></Select>
					<Separator />

					<Select
						selected={colorBackgroundSelected}
						onChange={setcolorBackgroundSelected}
						options={backgroundColors}
						title='цвет фона'></Select>

					<Select
						selected={widthSelected}
						onChange={setwidthSelected}
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
