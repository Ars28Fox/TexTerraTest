/* eslint-disable import/prefer-default-export */
export function scrollToElement() {
	const btnScroll = Array.from(document.querySelectorAll('.js-scroll-to'));

	btnScroll.forEach(function(item) {
		item.addEventListener('click', function(e) {
			const elemScroll = document.querySelector(e.target.getAttribute('data-scroll'));
			const elemPosY = elemScroll.offsetTop;
			const body = $('html, body');
			body.animate({ scrollTop: elemPosY }, 1000, 'swing');
		});
	});
}
