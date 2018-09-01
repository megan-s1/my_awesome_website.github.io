$(document).ready(function() {

	//hamburger menu
	$('#hamburger').click(function(){
		console.log('Hi');
		$('nav, #hamburger').toggleClass('open');
	});

	$('#dropdown_right').slideUp();

	$('#sub_toptext').click(function(){
		$('#dropdown_right').slideToggle();
		$('#sub_toptext span').toggleClass('turn-down');
		$('.green_box_right').toggleClass('green-background');
	});

	
	//scroll buttons

	$("#goHome").fadeOut(0);

	$("#goHome").click(function(){
  
	  $('html, body').animate({
	    scrollTop:$('.section1').offset().top}, 400);
	});
  
	$(window).on('scroll',function(){
	  
	  if( $(window).scrollTop() > $('.section1').offset().top ){
	     $("#goHome").fadeIn(400);
	  }else{
	     $("#goHome").fadeOut(400);}
	});

});
