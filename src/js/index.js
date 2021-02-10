// import 'jquery';
import Swiper from 'swiper/dist/js/swiper';
import createTabs from './CustomTabs';
import createAccordion from './CustomAccordion';
import createPopup from './CustomPopup';
import createSideMenu from './CustomSideMenu';
import createProgressBar from './CustomProgressBar';
import MaskedInput from './MaskedInput';
import { Inputs, InputPassword, InputFile, Select } from './Inputs';
import { scrollToElement } from './scroll-to-element';
import { validateForm } from './validate';

scrollToElement();
validateForm();

/* eslint-disable no-unused-expressions */
/** matches polyfill */
// eslint-disable-next-line wrap-iife
(function(e) {
	e.matches ||
		(e.matches =
			e.matchesSelector ||
			function(selector) {
				const matches = document.querySelectorAll(selector);
				const th = this;
				return Array.prototype.some.call(matches, e => e === th);
			});
})(Element.prototype);

(function(e) {
	e.matches =
		e.matches || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector;
	e.closest =
		e.closest ||
		function closest(selector) {
			if (!this) return null;
			if (this.matches(selector)) return this;
			if (!this.parentElement) {
				return null;
			} else return this.parentElement.closest(selector);
		};
})(Element.prototype);

/* eslint-enable no-unused-expressions */

/* eslint-disable no-new */
/**
 * Открытие бокового меню
 * принимает контейнер меню, контейнер сайта и переключатель
 */
createSideMenu('.js-side', '.js-canvas', '.js-side-toggle');

/** Навешивает на все инпуты класс focus, если value не пустое */
new Inputs();

/** Добавляет переключаетль показать/скрыть пароль */
new InputPassword();

/** Кастомный input[type="file"] */
new InputFile();

/** Кастомный select */
new Select();

/**
 * Табы
 * поддерживают вложенность
 * принимает переключатели, контент и контейнер
 */
createTabs('.js-tabs-toggle', '.js-tabs-tab', '.js-tabs');

/**
 * Аккордеон
 * поддерживают вложенность
 * принимает переключатель и контейнер
 */
createAccordion('.js-accordion-toggle', '.js-accordion-item');

/**
 * Popup
 * загружает контент через http request
 * закрывается по нажатию Esc, клику на крестик, клику вне popup
 * принимает бэкграунд, переключатель, загруженный контейнер и кнопку, которая закрывает popup
 */
createPopup('.js-popup-bg', '.js-popup', '.js-popup-loaded', '.js-popup-close', 'test.php');

/**
 * Прогресс-бар
 * отправляет форму с файлом на сервер
 * принимает селектор формы, селектор полоски прогресса и селектор отрисовки процентов текстом
 */
createProgressBar('.js-upload-form', '.js-progress-bar-fill', '.js-progress-bar-text');

/* eslint-enable no-new */

/** input с маской */
MaskedInput(
	'.js-inputmask-phone input',
	['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, '-', /\d/, /\d/],
	'+7 (___) ___ __-__',
	'+7 ('
);

/** input с маской */

MaskedInput('.js-inputmask-date input', [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/], 'dd.mm.YYYY', '');

(() => {
	const tooltipList = $('.js-tooltip');

	function setTooltipBehavior(tooltipEl) {
		if (!tooltipEl) return;
		const tooltip = tooltipEl;
		tooltip.style.transform = '';
		const rect = tooltip.getBoundingClientRect();
		const pageWidth = document.body.clientWidth;
		let offset = 0;

		if (rect.left < 0) {
			offset = -rect.left + 10;
		} else if (rect.right > pageWidth) {
			offset = pageWidth - rect.right - 10;
		} else {
			return;
		}
		tooltip.style.transform = `translateX(${offset}px)`;
	}

	function setTooltip(tooltip) {
		if (!tooltip) return;
		setTimeout(() => {
			// fix a reload page bug
			setTooltipBehavior(tooltip);
		}, 10);
		window.addEventListener('resize', setTooltipBehavior.bind(null, tooltip));
	}

	tooltipList.map(tooltip => setTooltip(tooltipList[tooltip]));
})();

/** Копирует ссылку страницы в списке страниц */
(() => {
	const qualifyURL = url => {
		const elem = document.createElement('div');
		elem.innerHTML = `<a href="${url}">x</a>`;
		return elem.firstChild.href;
	};

	$('.js-copy-link').click(function(e) {
		e.stopPropagation();
		const link = $(this)
			.parents('a')
			.attr('href');

		if (link) {
			let responseText;

			try {
				const textCopyContainer = $('<input>');
				$('body').append(textCopyContainer);

				textCopyContainer.val(qualifyURL(link)).select();
				document.execCommand('copy');
				textCopyContainer.remove();

				if (global.screen.width > 600) responseText = 'Ссылка скопирована';
				else responseText = 'Скопировано';
			} catch (e) {
				responseText = 'Неудача';
			}

			const response = $(`<div class="response">${responseText}</div>`);

			$(this).append(response);
			response.fadeOut(1500, () => {
				response.remove();
			});
		}

		return false;
	});
})();

(() => {
	const slider = new Swiper('.swiper-container', {
		direction: 'horizontal',
		noSwiping: false,
		slidesPerView: 3,
		spaceBetween: 62,
		centeredSlides: false,
		breakpoints: {
			960: {
				noSwiping: false,
				centeredSlides: true,
				slidesPerView: 1,
				spaceBetween: 30,
			},
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});
})();
