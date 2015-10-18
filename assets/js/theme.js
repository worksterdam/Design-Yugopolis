/* Fixed topbar */

function fixTopbar() {

	var topbar = $('#page-topbar'),
			topbar_fix = $('#page-topbar-fix'),
			fix_ed = false,
      white_topbar = $('#page-topbar').hasClass('white'),
			top, topbar_h;

	function setFixHeight() {
		topbar_fix.height(topbar.outerHeight(true));
	}

	function setFixed(){
		if( $(window).scrollTop() > 0 ) {
			if( !fix_ed ) {
				topbar.addClass('fixed');
        if(white_topbar) topbar.removeClass('white');
				fix_ed = true;
			}
		} else {
			topbar.removeClass('fixed');
      if(white_topbar) topbar.addClass('white');
			fix_ed = false;
		}
	}

	function init(){
		setFixed();
		$(window).on('scroll',setFixed);
		setFixHeight();
		$(window).on('resize',setFixHeight);
	}

	return { init: init };
}


// Open topbar search form

function searchPopup() {

	var button = $('#toggle-search-btn-link');
	var form = $('#topbar-search-field');
	var bg = $('#popup-bg');
	var cls = $('#search-close-btn');
	var fOpen = false;

	function openSearch(){
		button.addClass('active');
		form.addClass('open');
		bg.addClass('show');
//		$('body').on('click',closeSearch);
		fOpen = true;
	}

	function closeSearch(){
		button.removeClass('active');
		form.removeClass('open');
		bg.removeClass('show');
//		$('body').off('click',closeSearch);
		fOpen = false;
	}

	function addButtonEvent(){
		button.on('click',function(e){
			e.preventDefault();
			e.stopPropagation();
			switch(fOpen) {
				case false: openSearch(); $(window).scrollTo(0,0); break;
				case true: closeSearch(); break;
			}

			cls.on('click', function(e){
				e.preventDefault();
				closeSearch();
			});

		});

// Prevent closing on click
//		form.find('.page-width-wrapper').on('click',function(e){
//			e.stopPropagation();
//		});

	}

	return { init: addButtonEvent };

}; // searchPopup


// Gallery list image size fix

function galleryImageFix(){

	var gallery = $('.gallery-list');
	var thumb = $('.gallery-list .thumbnail').first();
	var image = thumb.find('img').first();
	var hasClass = false;

	function fixImage() {
		var tRate = thumb.width()/thumb.height();
		var iRate = image.width()/image.height();

		if( iRate < tRate ) {
			gallery.addClass('width-fix');
			hasClass = true;
			return;
		}
		if( hasClass ) {
			gallery.removeClass('width-fix');
			hasClass = false;
		}
	} // fixImage()

	function setEvents() {
		$(document).ready(function(){ fixImage(); });
		$(window).on('load resize',fixImage);
	}

	return { init: setEvents };
}


// Set cover photo height data-height = ' 0 < viewport proportion <= 1 ' : data-height='.7'
//
function coverImageHeightSet() {

	var header = 	$('.cover-header[data-height]');
	var topB = $('.cover-header .page-topbar');
	var postHeader = $('.cover-header .post-header');
	var setH = false;
	var postHeaderH, topBH, wH, newH;

	var here = ( header.length > 0 );
	var topBHere = ( topB.length > 0 );
	var hProp = here ? parseFloat( header.attr('data-height')) : 0;
	hProp = hProp > 1 ? 1 : hProp;

	function setBottom(h) {
		header.height(h);
		if (setH) return;
		postHeader.addClass('bottom');
		setH = true;
	}

	function unsetBottom() {
		if (!setH) return;
		header.css('height','');
		postHeader.removeClass('bottom');
		setH = false;
	}

	function setHeight() {
		wH = $(window).height();
		newH = wH * hProp;
		postHeaderH = postHeader.outerHeight(true);
		topBH = topBHere ? topB.outerHeight(true) : 0;
		if(newH > (postHeaderH + topBH) ) 
			setBottom(newH);
		else
			unsetBottom();
	}

	function init(img){

		if( here && (hProp > 0) ) { 
			$(window).on('load resize', setHeight);
//			header.backstretch(img);
			$(window).on('load', function(){
				header.backstretch(img);
			});
		}
	}

	return { init: init };
}


// 100% viewport width box
//
function fullViewportWidth() {

	var boxes = $('.full-vp-width');
	var pW, wW, pads, attr;

	function setWidth() {
		pW = $('.primary').width();
		wW = $(window).width();

		pads = ( wW - pW );
		attr = {
			'left': -pads/2,
			'width': pW + pads
		};
		boxes.css(attr);
	}

	function init(){
		if( boxes.length > 0 )
			setWidth();
			$(window).on('resize',setWidth);
	}

	return { init: init };
}


$(document).ready(function(){

	var fixTB = fixTopbar();
	fixTB.init();

	var addSearch = searchPopup();
	addSearch.init();

	var gImageFix = galleryImageFix();
	gImageFix.init();

//	var coverHeight = coverImageHeightSet();
//	coverHeight.init();

	var fullWidth = fullViewportWidth();
	fullWidth.init();

	$('.left-off-canvas-toggle').on('click', function(){
			$(window).scrollTo(0,0);
	});


// Red cards: flexible header

  $(window).load(function(){
    if ($('.num-card').length > 0) {
      $(".num-card .data").slabText();
    }
  });


/* Mozaic gallery: fluidbox init */

  if($('.mozaic-gallery').length > 0) {
    $('.mozaic-gallery a').fluidbox();
  }

});
