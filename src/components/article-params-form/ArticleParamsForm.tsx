import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	ArticleStateType,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { useClickOutside } from 'src/hooks';
type ArticleParamsFormProps = {
	fontFamilyOptions: OptionType[];
	fontColors: OptionType[];
	backgroundColors: OptionType[];
	contentWidthArr: OptionType[];
	fontSizeOptions: OptionType[];
	setArticleState: React.Dispatch<
		React.SetStateAction<{
			fontFamilyOption: OptionType;
			fontColor: OptionType;
			backgroundColor: OptionType;
			contentWidth: OptionType;
			fontSizeOption: OptionType;
		}>
	>;
};

export const ArticleParamsForm = ({
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	fontSizeOptions,
	contentWidthArr,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [formIsOpen, setFormIsOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const formRef = useRef<HTMLDivElement | null>(null);

	useClickOutside(
		formRef,
		() => {
			if (formIsOpen) {
				setFormIsOpen(false);
			}
		},
		formIsOpen
	);

	function handleSubmit(e: React.MouseEvent<HTMLButtonElement>): void {
		e.preventDefault();
		setArticleState(formState);
	}

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
		console.log(formIsOpen);
		setFormIsOpen(!formIsOpen);
	};

	return (
		<div ref={formRef}>
			<ArrowButton isOpen={formIsOpen} onClick={handleOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: formIsOpen,
				})}>
				<form className={styles.form}>
					<Text as='h1' size={31} weight={800} uppercase align='left'>
						Задайте параметры
					</Text>

					<Select
						selected={formState.fontFamilyOption}
						onChange={(option) =>
							updateArticleState('fontFamilyOption', option)
						}
						options={fontFamilyOptions}
						title='шрифт'></Select>

					<RadioGroup
						selected={formState.fontSizeOption}
						onChange={(option) => updateArticleState('fontSizeOption', option)}
						name='radio'
						options={fontSizeOptions}
						title='размер шрифта'></RadioGroup>

					<Select
						selected={formState.fontColor}
						onChange={(option) => updateArticleState('fontColor', option)}
						options={fontColors}
						title='цвет шрифта'></Select>
					<Separator />

					<Select
						selected={formState.backgroundColor}
						onChange={(option) => updateArticleState('backgroundColor', option)}
						options={backgroundColors}
						title='цвет фона'></Select>

					<Select
						selected={formState.contentWidth}
						onChange={(option) => updateArticleState('contentWidth', option)}
						options={contentWidthArr}
						title='Ширина контента'></Select>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetValue}
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
		</div>
	);
};
