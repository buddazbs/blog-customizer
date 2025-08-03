import { useEffect } from 'react';

export function useOverlayClose(ref: React.RefObject<HTMLElement>, onClose: () => void, isOpen: boolean) {
	useEffect(() => {
		if (!isOpen) return;
		const handleMouseDown = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onClose();
			}
		};
		document.addEventListener('mousedown', handleMouseDown);
		return () => {
			document.removeEventListener('mousedown', handleMouseDown);
		};
	}, [isOpen, onClose, ref]);
}
