export default function createAccordion(accordionToggler, accordionContainer) {
	$(accordionToggler).click(({ target }) => {
		const thisTarget = $(target);
		thisTarget
			.parent()
			.siblings()
			.removeClass('active');
		if (thisTarget.parent().hasClass('active')) {
			thisTarget.parent().removeClass('active');
		}
		else {
			thisTarget.parent().addClass('active');
		}
		thisTarget
			.parent()
			.siblings()
			.children()
			.find(accordionContainer)
			.removeClass('active');
		const thisTargetPosition = thisTarget.parent().position().top;
		$('html')
			.stop()
			.animate({ scrollTop: thisTargetPosition }, 200);
	});
}
