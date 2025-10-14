import { useEffect, RefObject } from 'react';

export const useClickOutside = (
	ref: RefObject<HTMLElement>,
	callback: () => void,
	active = true
) => {
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const isSelectOption = target.closest('[data-testid^="select-option"]');

			if (
				ref.current &&
				!ref.current.contains(e.target as Node) &&
				!isSelectOption
			) {
				callback();
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [active]);
};
