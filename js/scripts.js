$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	// Слайдер вверху страницы
	if ($('.head_slider .swiper').length) {
		new Swiper('.head_slider .swiper', {
			loop: true,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			}
		})
	}


	// Схема площадки
	if ($('.schema .swiper').length) {
		new Swiper('.schema .swiper', {
			loop: true,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			autoHeight: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			on: {
				init: swiper => {
					setTimeout(() => {
						let prevText = $(swiper.$el).find('.swiper-slide-prev').data('date'),
							nextText = $(swiper.$el).find('.swiper-slide-next').data('date')

						$(swiper.$el).find('.swiper-button-prev .tooltip').text(prevText)
						$(swiper.$el).find('.swiper-button-next .tooltip').text(nextText)
					})
				},
				slideChange: swiper => {
					setTimeout(() => {
						let prevText = $(swiper.$el).find('.swiper-slide-prev').data('date'),
							nextText = $(swiper.$el).find('.swiper-slide-next').data('date')

						$(swiper.$el).find('.swiper-button-prev .tooltip').text(prevText)
						$(swiper.$el).find('.swiper-button-next .tooltip').text(nextText)
					})
				}
			}
		})
	}


	// Моб. меню
	$('header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('menu_open')
		$('header .menu').toggleClass('show')
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.l10n = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
	}

	// Увеличение картинки
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false,
		},
		Thumbs: {
			autoStart: false,
		}
	})


	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs button', function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			const $parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				$activeTabContent = $(activeTab),
				level = $(this).data('level')

			$parent.find('.tabs:first button').removeClass('active')
			$parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			$activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		const $activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			$activeTabContent = $(locationHash),
			$parent = $activeTab.closest('.tabs_container'),
			level = $activeTab.data('level')

		$parent.find('.tabs:first button').removeClass('active')
		$parent.find('.tab_content.' + level).removeClass('active')

		$activeTab.addClass('active')
		$activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Место проведения
	$('.contacts_info .path .btn').click(function (e) {
		e.preventDefault()

		let content = $(this).data('content')

		$('.contacts_info .path .btn').removeClass('active')
		$('.contacts_info .path .path_info').hide()

		$(this).addClass('active')
		$('.contacts_info .path ' + content).fadeIn(300)
	})

	$('.contacts_info .path_info .close_btn').click(function (e) {
		e.preventDefault()

		$('.contacts_info .path .btn').removeClass('active')
		$('.contacts_info .path .path_info').hide()
	})


	// Плавная прокрутка к якорю
	$('.scroll_btn').click(function (e) {
		e.preventDefault()

		let href = $(this).data('anchor'),
			addOffset = $('header').outerHeight()

		if ($(this).data('offset')) addOffset = $(this).data('offset')

		$('html, body').stop().animate({ scrollTop: $(href).offset().top - addOffset }, 1000)
	})


	// Маска ввода
	$('input[type=tel]').inputmask('+7 (999) 999-99-99')

	// Кастомный select
	$('select').niceSelect()

	// Выбор файла
	$('body').on('change', '.form input[type=file]', function (e) {
		$(this).closest('.file').find('label .btn span').text($(this).val())
	})


	if (is_touch_device()) {
		// Закрытие моб. меню свайпом справо на лево
		let ts

		$('body').on('touchstart', e => { ts = e.originalEvent.touches[0].clientX })

		$('body').on('touchend', e => {
			let te = e.originalEvent.changedTouches[0].clientX

			if ($('body').hasClass('menu_open') && ts > te + 50) {
				// Свайп справо на лево
				$('header .mob_menu_btn').removeClass('active')
				$('body').removeClass('menu_open')
				$('header .menu').removeClass('show')
			}
		})
	}


	// Аккордион
	$('body').on('click', '.accordion .accordion_item .head', function (e) {
		e.preventDefault()

		const $item = $(this).closest('.accordion_item'),
			$accordion = $(this).closest('.accordion')

		if ($item.hasClass('active')) {
			$item.removeClass('active').find('.data').slideUp(300)
		} else {
			$accordion.find('.accordion_item').removeClass('active')
			$accordion.find('.data').slideUp(300)

			$item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Отправка формы
	// $('.action_form form, .feedback form').submit(function (e) {
	// 	e.preventDefault()

	// 	$(this).addClass('submitted')
	// })
})



$(window).on('load', () => {
	// Фикс. шапка
	headerInit = true,
		headerHeight = $('header').outerHeight()

	$('header:not(.absolute)').wrap('<div class="header_wrap"></div>')
	$('.header_wrap').height(headerHeight)

	headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')


	// Статьи
	let images = $('.photos_info .images .row'),
		imagesGutter = parseInt(images.css('--photos_gutter'))

	masonry = images.masonry({
		percentPosition: true,
		gutter: imagesGutter,
		itemSelector: '.masonry_item',
		columnWidth: images.find('.item').width()
	})
})



$(window).scroll(() => {
	// Фикс. шапка
	typeof headerInit !== 'undefined' && headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')
})



$(window).on('resize', () => {
	if (typeof WW !== 'undefined' && WW != $(window).width()) {
		// Моб. версия
		if (!firstResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 375) $('meta[name=viewport]').attr('content', 'width=375, user-scalable=no')

			firstResize = true
		} else {
			firstResize = false
		}


		// Фикс. шапка
		headerInit = false
		$('.header_wrap').height('auto')

		setTimeout(() => {
			headerInit = true
			headerHeight = $('header').outerHeight()

			$('.header_wrap').height(headerHeight)

			headerInit && $(window).scrollTop() > headerHeight
				? $('header').addClass('fixed')
				: $('header').removeClass('fixed')
		}, 100)


		// Перезапись ширины окна
		WW = $(window).width()
	}
})



// function mapInit() {
// 	ymaps.ready(() => {
// 		let mapCenter = window.innerWidth > 767 ? [55.787980, 37.674629] : [55.787447, 37.681146]
// 		myMap = new ymaps.Map('map', {
// 			center: mapCenter,
// 			zoom: 16,
// 			controls: []
// 		})

// 		// Кастомный маркер
// 		let myPlacemark = new ymaps.Placemark([55.787447, 37.681146], {}, {
// 			iconLayout: 'default#image',
// 			iconImageHref: 'images/ic_map_marker.svg',
// 			iconImageSize: [80, 77],
// 			iconImageOffset: [-27, -77]
// 		})

// 		myMap.geoObjects.add(myPlacemark)

// 		myMap.controls.add('zoomControl', {
// 			position: {
// 				right: '20px',
// 				top: '20px'
// 			}
// 		})

// 		myMap.behaviors.disable('scrollZoom')
// 	})
// }