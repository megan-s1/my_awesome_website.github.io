$(document).ready(function() {

	//hamburger menu
	$('#hamburger').click(function(){
		console.log('Hi');
		$('nav, #hamburger').toggleClass('open');
	});

	//slider
	$('.autoplay').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
  	autoplaySpeed: 2000,
  	infinite: true,
	dots: true,
	dotsClass:'myDots',
	fade: true,
	cssEase: 'linear',
	prevArrow: '<div class="slick-prev">&larr;</div>',
	nextArrow: '<div class="slick-next">&rarr;</div>',
	arrows: true,
	});

	//slide end


	//text drop-downs
	$('#top_dropdown1, #top_dropdown3').slideUp();

	$('#top_text1').click(function(){
		$('#top_dropdown1').slideToggle();
		$('#green_box1').toggleClass('clicked');
		$('#top_text1 span').toggleClass('turn-down');

	});


	$('#top_text3').click(function(){
		$('#top_dropdown3').slideToggle();
		$('#green_box3').toggleClass('clicked_solid');
		$('#top_text3 span').toggleClass('turn-down');

	});
	
	//scroll buttons

	$("#goHome").fadeOut(0);

	$("#goHome").click(function(){
  
	  $('html, body').animate({
	    scrollTop:$('#section1').offset().top}, 2000);
	});
  
	$(window).on('scroll',function(){
	  
	  if( $(window).scrollTop() > $('#section2').offset().top ){
	     $("#goHome").fadeIn(1000);
	  }else{
	     $("#goHome").fadeOut(1000);}
	});

});

