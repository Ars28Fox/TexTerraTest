export default function createTabs(tabToggler, tabContent, tabsContainer, tabNumber = 0) {
	$(tabToggler).click(({ target }) => {
		const thisTarget = $(target);
		const togglesList = thisTarget.siblings(tabToggler).add(thisTarget);
		const targetIndex = togglesList
			.parent()
			.find(thisTarget)
			.index();

		thisTarget
			.closest(tabsContainer)
			.find(tabContent)
			.removeClass('active');

		thisTarget
			.parent()
			.nextAll()
			.removeClass('active');

		thisTarget
			.parent()
			.parent()
			.find(tabToggler)
			.removeClass('active');

		thisTarget.addClass('active');

		if (thisTarget.parents(tabsContainer).length > 1) {
			thisTarget.parents(tabContent).addClass('active');
		}

		thisTarget
			.parent()
			.nextAll(tabToggler)
			.eq(targetIndex)
			.addClass('active');

		thisTarget
			.parent()
			.nextAll(tabContent)
			.eq(targetIndex)
			.addClass('active');
	});

	const tabTogglersContainer = $(tabsContainer).children()[0];
	$(tabTogglersContainer)
		.children()
		.eq(tabNumber)
		.trigger('click');
}
