
$( document ).ready( function( ) {
			
	var fileArray = {
		'0':{'name':'1.jpg','ext':'image','date':'2017-09-24 9:06 PM','size':'24MB','child':''},
		'1':{'name':'2.jpg','ext':'image','date':'2017-09-24 9:10 PM','size':'20MB','child':''},
	 	'2':{'name':'3.jpg','ext':'image','date':'2017-09-24 11:06 PM','size':'19MB','child':{'0':{'name':'3.1.jpg','ext':'image','date':'2017-09-24  9:06 PM','size':'24MB','child':''},'1':{'name':'3.2.jpg','ext':'image','date':'2017-09-24  9:06 PM','size':'24MB','child':''}}},
	 	'3':{'name':'4.jpg','ext':'image','date':'2017-09-24 08:06 PM','size':'2MB'},
	 	'4':{'name':'1.mp4','ext':'music','date':'2017-09-24 03:06 PM','size':'24MB'},
		'5':{'name':'2.mp4','ext':'music','date':'2017-09-24 04:06 PM','size':'20MB'},
	 	'6':{'name':'3.mp4','ext':'music','date':'2017-09-24 05:06 PM','size':'19MB'},
	 	'7':{'name':'4.mp4','ext':'music','date':'2017-09-24 07:85 PM','size':'2MB'},
	 	'8':{'name':'1','ext':'folder','date':'2017-09-24 02:06 PM','size':'24MB','child':{'0':{'name':'8.1.jpg','ext':'image','date':'2017-09-24 9:06 PM','size':'24MB','child':''},'1':{'name':'8.2.jpg','ext':'image','date':'2017-09-24 9:06 PM','size':'24MB','child':''},'2':{'name':'8.3.jpg','ext':'image','date':'2017-09-24 9:06 PM','size':'24MB','child':''}}},
		'9':{'name':'2','ext':'folder','date':'2017-09-24 9:06 PM','size':'20MB','child':{'0':{'name':'8.1.jpg','ext':'image','date':'2017-09-24 9:06 PM','size':'24MB','child':''},'1':{'name':'8.2.jpg','ext':'image','date':'2017-09-24 9:06 PM','size':'24MB','child':''},'2':{'name':'8.3.jpg','ext':'image','date':'2017-09-24 9:06 PM','size':'24MB','child':''}}},
	 	'10':{'name':'3','ext':'folder','date':'2017-09-24 9:06 PM','size':'19MB','child':{'0':{'name':'8.1.jpg','ext':'image','date':'2017-09-24 9:06 PM','size':'24MB','child':''},'1':{'name':'8.2.jpg','ext':'image','date':'2017-09-24 9:06 PM','size':'24MB','child':''},'2':{'name':'8.3.jpg','ext':'image','date':'2017-09-24 9:06 PM','size':'24MB','child':''}}},
	 	'11':{'name':'4','ext':'folder-icon-leftPanel','date':'2017-09-24 9:06 PM','size':'2MB','child':{'0':{'name':'8.1.jpg','ext':'image','date':'2017-09-24 9:06 PM','size':'24MB','child':''},'1':{'name':'8.2.jpg','ext':'image','date':'2017-09-24 9:06 PM','size':'24MB','child':''},'2':{'name':'8.3.jpg','ext':'image','date':'2017-09-24 9:06 PM','size':'24MB','child':''}}},
	 	'12':{'name':'1.mkv','ext':'video','date':'2017-09-24 9:06 PM','size':'19MB'},
	 	'13':{'name':'2.mkv','ext':'video','date':'2017-09-24 9:06 PM','size':'2MB'}
	};
	

	$('#viewTab').on('click',function(){
		if($('.stickyMenu').hasClass("show")){
			$('.stickyMenu').removeClass('show').addClass('hide');
			$(this).css({'background-color': '#fff'});
		}
		else{
			$('.stickyMenu').removeClass('hide').addClass('show');
			$(this).css({'background-color': '#DCDCDC'});
		}

	});

	$('#mediumIcons').on('mouseover',function(){
		$('#gridView').removeClass('hide').addClass('show');
		$('#listView').removeClass('show').addClass('hide');
	})
	$('#details').on('click',function(){
		$('#listView').removeClass('hide').addClass('show');
		$('#gridView').removeClass('show').addClass('hide');
		$('.stickyMenu').removeClass('show').addClass('hide');
	});
	$('#mediumIcons').on('click',function(){
		$('#gridView').removeClass('hide').addClass('show');
		$('#listView').removeClass('show').addClass('hide');
		$('.stickyMenu').removeClass('show').addClass('hide');
	});
	$('#details').on('mouseover',function(){
		
		$('#listView').removeClass('hide').addClass('show');
		$('#gridView').removeClass('show').addClass('hide');
	})
				
	$(document).click(function(e) {
  		if( e.target.class != 'stickyMenu' && e.target.id!=='viewTab') {
    		$('.stickyMenu').removeClass('show').addClass('hide');
  		}
	});

	
	$('#gridView').removeClass('hide').addClass('show');
	$('#listView').removeClass('show').addClass('hide');
				
});