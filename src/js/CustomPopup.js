import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

// eslint-disable-next-line max-len
export default function createPopup(popupBackground, popupToggler, popupLoaded, popupCloseButton, popupCloseSpeed = 30) {
	const popup = $($(popupToggler).attr('data-container'));
	const popupContainer = popup.find(popupLoaded);
	const popupContentURL = $(popupToggler).attr('data-content');

	const closePopup = () => {
		$(popupBackground).removeClass('open');
		popup.removeClass('open');
		enableBodyScroll(popup);
		if (popupContentURL) {
			setTimeout(() => {
				popupContainer[0].innerHTML = '';
			}, popupCloseSpeed);
		}
		$(document).off();
	};

	const openPopup = () => {
		if (popupContentURL) {
			$.ajax({
				method: 'GET',
				url: popupContentURL,
				dataType: 'html',
			})
				.fail(() => console.log('request failed'))
				.done(response => {
					popupContainer[0].innerHTML = response;
				});
			popup.addClass(popupLoaded);
		}
		$(popupBackground).addClass('open');
		popup.addClass('open');

		disableBodyScroll(popup);

		$(document).keydown(({ keyCode }) => {
			if (keyCode !== 27) return;
			closePopup();
		});
	};

	$(popupToggler).click(() => {
		openPopup();
	});

	$(popupBackground).click(({ target, currentTarget }) => {
		if (target === currentTarget) closePopup(target);
	});

	$(popupCloseButton).click(({ target, currentTarget }) => {
		if (target === currentTarget) closePopup(target);
	});
}
