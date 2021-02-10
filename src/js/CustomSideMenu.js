export default function createSideMenu(sideMenuContainer, siteContainer, openSideMenuButton) {
	const closeSideMenu = () => {
		$(sideMenuContainer).removeClass('open');
		$(siteContainer).removeClass('slide');
		$(siteContainer).off();

		setTimeout(() => {
			$(document.documentElement).removeClass('overflow');
			$(document.body).removeClass('overflow');
		}, 300);
	};

	const openSideMenu = () => {
		$(sideMenuContainer).addClass('open');
		$(siteContainer).addClass('slide');

		$(document.documentElement).addClass('overflow');
		$(document.body).addClass('overflow');

		if ($(sideMenuContainer).hasClass('open')) {
			setTimeout(() => {
				$(siteContainer).click(() => closeSideMenu());
			}, 10);
		}
		$(document).keydown(({ keyCode }) => {
			if (keyCode !== 27) return;
			closeSideMenu();
		});
	};

	$(openSideMenuButton).click(() => {
		openSideMenu();
	});
}
