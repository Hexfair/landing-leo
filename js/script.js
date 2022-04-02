("use strict");

function testWebP(callback) {
	var webP = new Image();

	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};

	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
	if (support == true) {
		document.querySelector("body").classList.add("webp");
		document.querySelector("header").classList.add("webp");
	} else {
		document.querySelector("header").classList.add("no-webp");
	}
});

/* Инициализация свайпера */
new Swiper(".header-bottom__slider", {
	navigation: {
		nextEl: ".header-bottom__arrow_next",
		prevEl: ".header-bottom__arrow_prev",
	},
	slidesPerView: 1,
	loop: true,
});

new Swiper(".about-item__testimoanials", {
	navigation: {
		nextEl: ".about-arrow_next",
		prevEl: ".about-arrow_prev",
	},
	slidesPerView: 1,
	loop: true,
});

/* Функция для работы бургера */
function burger() {
	var iconMenu = document.querySelector(".header__burger");

	if (iconMenu != null) {
		var delay = 500;
		var body = document.querySelector("body");
		var menuBody = document.querySelector(".header-top__menu");
		iconMenu.addEventListener("click", function (e) {
			if (!body.classList.contains("_wait")) {
				body_lock(delay);
				iconMenu.classList.toggle("_active");
				menuBody.classList.toggle("_active");
			}
		});
	}

	function menu_close() {
		var iconMenu = document.querySelector(".header__burger");
		var menuBody = document.querySelector(".header-top__menu");
		iconMenu.classList.remove("_active");
		menuBody.classList.remove("_active");
	} //=================
	//BodyLock

	function body_lock(delay) {
		var body = document.querySelector("body");

		if (body.classList.contains("_lock")) {
			body_lock_remove(delay);
		} else {
			body_lock_add(delay);
		}
	}

	function body_lock_remove(delay) {
		var body = document.querySelector("body");

		if (!body.classList.contains("_wait")) {
			var lock_padding = document.querySelectorAll("._lp");
			setTimeout(function () {
				for (var index = 0; index < lock_padding.length; index++) {
					var el = lock_padding[index];
					el.style.paddingRight = "0px";
				}

				body.style.paddingRight = "0px";
				body.classList.remove("_lock");
			}, delay);
			body.classList.add("_wait");
			setTimeout(function () {
				body.classList.remove("_wait");
			}, delay);
		}
	}

	function body_lock_add(delay) {
		var body = document.querySelector("body");

		if (!body.classList.contains("_wait")) {
			var lock_padding = document.querySelectorAll("._lp");

			for (var index = 0; index < lock_padding.length; index++) {
				var el = lock_padding[index];
				el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
			}

			body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
			body.classList.add("_lock");
			body.classList.add("_wait");
			setTimeout(function () {
				body.classList.remove("_wait");
			}, delay);
		}
	} //=================

	var link = document.querySelectorAll("._goto-block");

	if (link) {
		var blocks = [];

		var _loop7 = function _loop7(_index28) {
			var el = link[_index28];
			var block_name = el.getAttribute("href").replace("#", "");

			if (block_name != "" && !~blocks.indexOf(block_name)) {
				blocks.push(block_name);
			}

			el.addEventListener("click", function (e) {
				if (document.querySelector(".header-menu._active")) {
					menu_close();
					body_lock_remove(500);
				}

				var target_block_class = el.getAttribute("href").replace("#", "");
				var target_block = document.querySelector("." + target_block_class);

				_goto(target_block, 300);

				e.preventDefault();
			});
		};

		for (var _index28 = 0; _index28 < link.length; _index28++) {
			_loop7(_index28);
		}

		window.addEventListener("scroll", function (el) {
			var old_current_link = document.querySelectorAll("._goto-block._active");

			if (old_current_link) {
				for (var _index29 = 0; _index29 < old_current_link.length; _index29++) {
					var _el13 = old_current_link[_index29];

					_el13.classList.remove("_active");
				}
			}

			for (var _index30 = 0; _index30 < blocks.length; _index30++) {
				var block = blocks[_index30];
				var block_item = document.querySelector("." + block);

				if (block_item) {
					var block_offset = offset(block_item).top;
					var block_height = block_item.offsetHeight;

					if (scrollY > block_offset - window.innerHeight / 3 && scrollY < block_offset + block_height - window.innerHeight / 3) {
						var current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');

						for (var _index31 = 0; _index31 < current_links.length; _index31++) {
							var current_link = current_links[_index31];
							current_link.classList.add("_active");
						}
					}
				}
			}
		});
	} //ScrollOnClick (Simple)

	var goto_links = document.querySelectorAll("._goto");

	if (goto_links) {
		var _loop8 = function _loop8(_index32) {
			var goto_link = goto_links[_index32];
			goto_link.addEventListener("click", function (e) {
				var target_block_class = goto_link.getAttribute("href").replace("#", "");
				var target_block = document.querySelector("." + target_block_class);

				_goto(target_block, 300);

				e.preventDefault();
			});
		};

		for (var _index32 = 0; _index32 < goto_links.length; _index32++) {
			_loop8(_index32);
		}
	}

	function _goto(target_block, speed) {
		var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
		var header = ""; //OffsetHeader

		header = "header";
		var options = {
			speedAsDuration: true,
			speed: speed,
			header: header,
			offset: offset,
		};
		var scr = new SmoothScroll();
		scr.animateScroll(target_block, "", options);
	}
	function offset(el) {
		var rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {
			top: rect.top + scrollTop,
			left: rect.left + scrollLeft,
		};
	}
}
burger();

/* Функция для работы табов */
function tabsToSpollers() {
	function functions_getHash() {
		if (location.hash) return location.hash.replace("#", "");
	}
	function setHash(hash) {
		hash = hash ? `#${hash}` : window.location.href.split("#")[0];
		history.pushState("", "", hash);
	}
	let _slideUp = (target, duration = 500, showmore = 0) => {
		if (!target.classList.contains("_slide")) {
			target.classList.add("_slide");
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + "ms";
			target.style.height = `${target.offsetHeight}px`;
			target.offsetHeight;
			target.style.overflow = "hidden";
			target.style.height = showmore ? `${showmore}px` : `0px`;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout(() => {
				target.hidden = !showmore ? true : false;
				!showmore ? target.style.removeProperty("height") : null;
				target.style.removeProperty("padding-top");
				target.style.removeProperty("padding-bottom");
				target.style.removeProperty("margin-top");
				target.style.removeProperty("margin-bottom");
				!showmore ? target.style.removeProperty("overflow") : null;
				target.style.removeProperty("transition-duration");
				target.style.removeProperty("transition-property");
				target.classList.remove("_slide");
				document.dispatchEvent(
					new CustomEvent("slideUpDone", {
						detail: {
							target,
						},
					})
				);
			}, duration);
		}
	};
	let _slideDown = (target, duration = 500, showmore = 0) => {
		if (!target.classList.contains("_slide")) {
			target.classList.add("_slide");
			target.hidden = target.hidden ? false : null;
			showmore ? target.style.removeProperty("height") : null;
			let height = target.offsetHeight;
			target.style.overflow = "hidden";
			target.style.height = showmore ? `${showmore}px` : `0px`;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + "ms";
			target.style.height = height + "px";
			target.style.removeProperty("padding-top");
			target.style.removeProperty("padding-bottom");
			target.style.removeProperty("margin-top");
			target.style.removeProperty("margin-bottom");
			window.setTimeout(() => {
				target.style.removeProperty("height");
				target.style.removeProperty("overflow");
				target.style.removeProperty("transition-duration");
				target.style.removeProperty("transition-property");
				target.classList.remove("_slide");
				document.dispatchEvent(
					new CustomEvent("slideDownDone", {
						detail: {
							target,
						},
					})
				);
			}, duration);
		}
	};
	function tabs() {
		const tabs = document.querySelectorAll("[data-tabs]");
		let tabsActiveHash = [];
		if (tabs.length > 0) {
			const hash = functions_getHash();
			if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
			tabs.forEach((tabsBlock, index) => {
				tabsBlock.classList.add("_tab-init");
				tabsBlock.setAttribute("data-tabs-index", index);
				tabsBlock.addEventListener("click", setTabsAction);
				initTabs(tabsBlock);
			});
			let mdQueriesArray = dataMediaQueries(tabs, "tabs");
			if (mdQueriesArray && mdQueriesArray.length)
				mdQueriesArray.forEach((mdQueriesItem) => {
					mdQueriesItem.matchMedia.addEventListener("change", function () {
						setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
					});
					setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
				});
		}
		function setTitlePosition(tabsMediaArray, matchMedia) {
			tabsMediaArray.forEach((tabsMediaItem) => {
				tabsMediaItem = tabsMediaItem.item;
				let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
				let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
				let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
				let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
				tabsTitleItems = Array.from(tabsTitleItems).filter((item) => item.closest("[data-tabs]") === tabsMediaItem);
				tabsContentItems = Array.from(tabsContentItems).filter((item) => item.closest("[data-tabs]") === tabsMediaItem);
				tabsContentItems.forEach((tabsContentItem, index) => {
					if (matchMedia.matches) {
						tabsContent.append(tabsTitleItems[index]);
						tabsContent.append(tabsContentItem);
						tabsMediaItem.classList.add("_tab-spoller");
					} else {
						tabsTitles.append(tabsTitleItems[index]);
						tabsMediaItem.classList.remove("_tab-spoller");
					}
				});
			});
		}
		function initTabs(tabsBlock) {
			let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
			let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
			const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
			const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
			if (tabsActiveHashBlock) {
				const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
				tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
			}
			if (tabsContent.length) {
				tabsContent = Array.from(tabsContent).filter((item) => item.closest("[data-tabs]") === tabsBlock);
				tabsTitles = Array.from(tabsTitles).filter((item) => item.closest("[data-tabs]") === tabsBlock);
				tabsContent.forEach((tabsContentItem, index) => {
					tabsTitles[index].setAttribute("data-tabs-title", "");
					tabsContentItem.setAttribute("data-tabs-item", "");
					if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
					tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
				});
			}
		}
		function setTabsStatus(tabsBlock) {
			let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
			let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
			const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
			function isTabsAnamate(tabsBlock) {
				if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
			}
			const tabsBlockAnimate = isTabsAnamate(tabsBlock);
			if (tabsContent.length > 0) {
				const isHash = tabsBlock.hasAttribute("data-tabs-hash");
				tabsContent = Array.from(tabsContent).filter((item) => item.closest("[data-tabs]") === tabsBlock);
				tabsTitles = Array.from(tabsTitles).filter((item) => item.closest("[data-tabs]") === tabsBlock);
				tabsContent.forEach((tabsContentItem, index) => {
					if (tabsTitles[index].classList.contains("_tab-active")) {
						if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate);
						else tabsContentItem.hidden = false;
						if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
					} else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate);
					else tabsContentItem.hidden = true;
				});
			}
		}
		function setTabsAction(e) {
			const el = e.target;
			if (el.closest("[data-tabs-title]")) {
				const tabTitle = el.closest("[data-tabs-title]");
				const tabsBlock = tabTitle.closest("[data-tabs]");
				if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
					let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
					tabActiveTitle.length ? (tabActiveTitle = Array.from(tabActiveTitle).filter((item) => item.closest("[data-tabs]") === tabsBlock)) : null;
					tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
					tabTitle.classList.add("_tab-active");
					setTabsStatus(tabsBlock);
				}
				e.preventDefault();
			}
		}
	}
	function uniqArray(array) {
		return array.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});
	}
	function dataMediaQueries(array, dataSetValue) {
		const media = Array.from(array).filter(function (item, index, self) {
			if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
		});
		if (media.length) {
			const breakpointsArray = [];
			media.forEach((item) => {
				const params = item.dataset[dataSetValue];
				const breakpoint = {};
				const paramsArray = params.split(",");
				breakpoint.value = paramsArray[0];
				breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
				breakpoint.item = item;
				breakpointsArray.push(breakpoint);
			});
			let mdQueries = breakpointsArray.map(function (item) {
				return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
			});
			mdQueries = uniqArray(mdQueries);
			const mdQueriesArray = [];
			if (mdQueries.length) {
				mdQueries.forEach((breakpoint) => {
					const paramsArray = breakpoint.split(",");
					const mediaBreakpoint = paramsArray[1];
					const mediaType = paramsArray[2];
					const matchMedia = window.matchMedia(paramsArray[0]);
					const itemsArray = breakpointsArray.filter(function (item) {
						if (item.value === mediaBreakpoint && item.type === mediaType) return true;
					});
					mdQueriesArray.push({
						itemsArray,
						matchMedia,
					});
				});
				return mdQueriesArray;
			}
		}
	}
	let addWindowScrollEvent = false;
	setTimeout(() => {
		if (addWindowScrollEvent) {
			let windowScroll = new Event("windowScroll");
			window.addEventListener("scroll", function (e) {
				document.dispatchEvent(windowScroll);
			});
		}
	}, 0);
	tabs();
}
tabsToSpollers();

/* Функция добавлени/удаления классов для закругления верхних углов активного таба */
function borderRad() {
	let tabsBorder = document.querySelectorAll(".tabs__title");
	let tabsBordRad = document.querySelector(".tabs__content");
	for (let i = 0; i < tabsBorder.length; i++)
		tabsBorder[i].addEventListener("click", function (event) {
			if (i == 0) {
				tabsBordRad.classList.remove("_b-top-right");
				tabsBordRad.classList.add("_b-top-left");
			}
			if (i > 0 && i < tabsBorder.length - 1) {
				tabsBordRad.classList.remove("_b-top-left");
				tabsBordRad.classList.remove("_b-top-right");
			}
			if (i == tabsBorder.length - 1) {
				tabsBordRad.classList.remove("_b-top-left");
				tabsBordRad.classList.add("_b-top-right");
			}
		});
}
borderRad();

/* Анимация при скроле */
function animWithScroll() {
	const animItems = document.querySelectorAll("._anim-items"); // Получаем все элементы, которые отметили этим классом - мы хотим их анимировать
	if (animItems.length > 0) {
		// Проверяем попал ли в выборку хотя бы один элемент
		window.addEventListener("scroll", animOnScroll); // Вызываем функцию animOnScroll при прокрутке страницы
		function animOnScroll() {
			for (let index = 0; index < animItems.length; index++) {
				// Перебираем элементы нашей выборки
				const animItem = animItems[index]; // Помещаем в animItem конкретный элемент нашей выборки
				const animItemHeight = animItem.offsetHeight; // В animItemHeight помещаем размер элемента - высоту
				const animItemOffset = offset(animItem).top; // Получаем координаты элемента
				const animStart = 4;

				let animItemPoint = window.innerHeight - animItemHeight / animStart;
				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}

				if (scrollY > animItemOffset - animItemPoint && scrollY < animItemOffset + animItemHeight) {
					animItem.classList.add("_active");
				} else {
					if (!animItem.classList.contains("_anim-no-hide")) {
						// Если у элемента нет класса _anim-no-hide, то у него удаляется класс _active,
						animItem.classList.remove("_active"); // а значит при скроле анимация будет постоянно повторяться.
					} // Иначе класс _active после первого вызова останется у элемента и анимация не будет повторяться
				}
			}
		}
		function offset(el) {
			const rect = el.getBoundingClientRect(), // Получаем координаты элемента относительно окна браузера
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, // Кол-во прокрученных пикселей по X
				scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Кол-во прокрученных пикселей по Y
			return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
		}
		setTimeout(() => {
			animOnScroll();
		}, 100);
	}
}

animWithScroll();

/* Работа с формой */
function formFieldsInit(options = { viewPass: false }) {
	// Если включено, добавляем функционал "скрыть плейсходлер при фокусе"
	const formFields = document.querySelectorAll("input[placeholder],textarea[placeholder]");
	if (formFields.length) {
		formFields.forEach((formField) => {
			if (!formField.hasAttribute("data-placeholder-nohide")) {
				formField.dataset.placeholder = formField.placeholder;
			}
		});
	}
	document.body.addEventListener("focusin", function (e) {
		const targetElement = e.target;
		if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = "";
			}
			if (!targetElement.hasAttribute("data-no-focus-classes")) {
				targetElement.classList.add("_form-focus");
				targetElement.parentElement.classList.add("_form-focus");
			}
			formValidate.removeError(targetElement);
		}
	});
	document.body.addEventListener("focusout", function (e) {
		const targetElement = e.target;
		if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = targetElement.dataset.placeholder;
			}
			if (!targetElement.hasAttribute("data-no-focus-classes")) {
				targetElement.classList.remove("_form-focus");
				targetElement.parentElement.classList.remove("_form-focus");
			}
			// Моментальная валидация
			if (targetElement.hasAttribute("data-validate")) {
				formValidate.validateInput(targetElement);
			}
		}
	});

	// Если включено, добавляем функционал "Показать пароль"
	if (options.viewPass) {
		document.addEventListener("click", function (e) {
			let targetElement = e.target;
			if (targetElement.closest('[class*="__viewpass"]')) {
				let inputType = targetElement.classList.contains("_viewpass-active") ? "password" : "text";
				targetElement.parentElement.querySelector("input").setAttribute("type", inputType);
				targetElement.classList.toggle("_viewpass-active");
			}
		});
	}
}
formFieldsInit();

/* Валидация формы */
function validationForm() {
	const form = document.getElementById("form"); // Берем весь объект форма и вешаем на него событие
	form.addEventListener("submit", formSend); // при отправке формы, мы переходим к выполнению функции formSend
	async function formSend(e) {
		e.preventDefault(); // Сначала запрещаем стандартную отправку формы
		formValidate(form);
	}

	function formValidate(form) {
		let formReq = document.querySelectorAll("._req"); // Берем все объекты классом _req - означает каким объектам нужна валидация
		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index]; // Получаем каждый объект из выборки formReq
			formRemoveError(input); // Сначала, когда приступаем к проверке, нужно убрать класс _error

			if (input.classList.contains("_email")) {
				// Проверяем - если объект E-mail, то далее выполняем тест. Нужно предварительно добавить полю с email класс _email
				if (emailTest(input)) {
					formAddError(input); // Если тест не пройдет, то выполняем функцию formAddError - добавляем объекту класс _error
					setTimeout(() => {
						formRemoveError(input);
					}, 5000);
				}
			} else {
				if (input.value === "") {
					// Если значения вообще нет - пустая строка
					formAddError(input); // Вешаем класс _error
					setTimeout(() => {
						formRemoveError(input);
					}, 5000);
				}
			}
		}
	}

	/* Две функции, которые добавляют и убирают у объектов класс _error */
	function formAddError(input) {
		input.parentElement.classList.add("_error"); // Добавляем родителю объекта класс _error - потому что реальные объекты скрыты, а используются бутаффорные
		input.classList.add("_error"); // Добавляем объекту класс _error
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove("_error"); // Убираем у родителя объекта класс _error
		input.classList.remove("_error"); // Убираем у объекта класс _error
	}

	/* Функция теста email */
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
}
validationForm();

/* Функция для работы спойлеров */
function spoll() {
	const spollersArray = document.querySelectorAll("[data-spollers]");
	if (spollersArray.length > 0) {
		// Получение обычных слойлеров
		const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
			return !item.dataset.spollers.split(",")[0];
		});
		// Инициализация обычных слойлеров
		if (spollersRegular.length > 0) {
			initSpollers(spollersRegular);
		}

		// Получение слойлеров с медиа запросами
		const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
			return item.dataset.spollers.split(",")[0];
		});

		// Инициализация слойлеров с медиа запросами
		if (spollersMedia.length > 0) {
			const breakpointsArray = [];
			spollersMedia.forEach((item) => {
				const params = item.dataset.spollers;
				const breakpoint = {};
				const paramsArray = params.split(",");
				breakpoint.value = paramsArray[0];
				breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
				breakpoint.item = item;
				breakpointsArray.push(breakpoint);
			});

			// Получаем уникальные брейкпоинты
			let mediaQueries = breakpointsArray.map(function (item) {
				return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
			});
			mediaQueries = mediaQueries.filter(function (item, index, self) {
				return self.indexOf(item) === index;
			});

			// Работаем с каждым брейкпоинтом
			mediaQueries.forEach((breakpoint) => {
				const paramsArray = breakpoint.split(",");
				const mediaBreakpoint = paramsArray[1];
				const mediaType = paramsArray[2];
				const matchMedia = window.matchMedia(paramsArray[0]);

				// Объекты с нужными условиями
				const spollersArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				// Событие
				matchMedia.addListener(function () {
					initSpollers(spollersArray, matchMedia);
				});
				initSpollers(spollersArray, matchMedia);
			});
		}
		// Инициализация
		function initSpollers(spollersArray, matchMedia = false) {
			spollersArray.forEach((spollersBlock) => {
				spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
				if (matchMedia.matches || !matchMedia) {
					spollersBlock.classList.add("_init");
					initSpollerBody(spollersBlock);
					spollersBlock.addEventListener("click", setSpollerAction);
				} else {
					spollersBlock.classList.remove("_init");
					initSpollerBody(spollersBlock, false);
					spollersBlock.removeEventListener("click", setSpollerAction);
				}
			});
		}
		// Работа с контентом
		function initSpollerBody(spollersBlock, hideSpollerBody = true) {
			const spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
			if (spollerTitles.length > 0) {
				spollerTitles.forEach((spollerTitle) => {
					if (hideSpollerBody) {
						spollerTitle.removeAttribute("tabindex");
						if (!spollerTitle.classList.contains("_active")) {
							spollerTitle.nextElementSibling.hidden = true;
						}
					} else {
						spollerTitle.setAttribute("tabindex", "-1");
						spollerTitle.nextElementSibling.hidden = false;
					}
				});
			}
		}
		function setSpollerAction(e) {
			const el = e.target;
			if (el.hasAttribute("data-spoller") || el.closest("[data-spoller]")) {
				const spollerTitle = el.hasAttribute("data-spoller") ? el : el.closest("[data-spoller]");
				const spollersBlock = spollerTitle.closest("[data-spollers]");
				const oneSpoller = spollersBlock.hasAttribute("data-one-spoller") ? true : false;
				if (!spollersBlock.querySelectorAll("._slide").length) {
					if (oneSpoller && !spollerTitle.classList.contains("_active")) {
						hideSpollersBody(spollersBlock);
					}
					spollerTitle.classList.toggle("_active");
					_slideToggle(spollerTitle.nextElementSibling, 500);
				}
				e.preventDefault();
			}
		}
		function hideSpollersBody(spollersBlock) {
			const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._active");
			if (spollerActiveTitle) {
				spollerActiveTitle.classList.remove("_active");
				_slideUp(spollerActiveTitle.nextElementSibling, 500);
			}
		}
	}
	let _slideUp = (target, duration = 500) => {
		if (!target.classList.contains("_slide")) {
			target.classList.add("_slide");
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + "ms";
			target.style.height = target.offsetHeight + "px";
			target.offsetHeight;
			target.style.overflow = "hidden";
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout(() => {
				target.hidden = true;
				target.style.removeProperty("height");
				target.style.removeProperty("padding-top");
				target.style.removeProperty("padding-bottom");
				target.style.removeProperty("margin-top");
				target.style.removeProperty("margin-bottom");
				target.style.removeProperty("overflow");
				target.style.removeProperty("transition-duration");
				target.style.removeProperty("transition-property");
				target.classList.remove("_slide");
			}, duration);
		}
	};
	let _slideDown = (target, duration = 500) => {
		if (!target.classList.contains("_slide")) {
			target.classList.add("_slide");
			if (target.hidden) {
				target.hidden = false;
			}
			let height = target.offsetHeight;
			target.style.overflow = "hidden";
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + "ms";
			target.style.height = height + "px";
			target.style.removeProperty("padding-top");
			target.style.removeProperty("padding-bottom");
			target.style.removeProperty("margin-top");
			target.style.removeProperty("margin-bottom");
			window.setTimeout(() => {
				target.style.removeProperty("height");
				target.style.removeProperty("overflow");
				target.style.removeProperty("transition-duration");
				target.style.removeProperty("transition-property");
				target.classList.remove("_slide");
			}, duration);
		}
	};
	let _slideToggle = (target, duration = 500) => {
		if (target.hidden) {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	};
}
spoll();
