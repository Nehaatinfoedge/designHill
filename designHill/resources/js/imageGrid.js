var current_page = 1;
var records_per_page = 10;

var objJson = [];

$(document).ready(function () {
	var requests = [];
    var ajax1 = $.ajax({
			url: "/imageGridHandler.php",
			type: "POST",
			data:  {path:'./assets/json_data.json',is_ajax:1,initial_load:1},
			success:function(){
			}
		});

	requests.push(ajax1);

	$.when.apply(this, requests).done(function() {
		var results = requests.length > 1 ? arguments : [arguments];
		for( var i = 0; i < results.length; i++ ){
			var res = JSON.parse(results[i][0]);
			objJson = res;
			var html = '';
			$.each(res,function(key,value){
				html += "<tr><th scope='row'>"+value['id']+"</th><td>"+value['title']+"</td><td>"+value['alt']+"</td><td>"+value['thumb_img']+"</td><td><button type='button' row-id='"+value['id']+"' class='btn btn-primary editButton'>Edit</button><button type='button' row-id='"+value['id']+"' class='btn btn-primary deleteButton'>Delete</button></td></tr>";
			});
			//$('.table').children('#listingTable').html(html);
			changePage(1);
		}
	});
	$('#add_btn').on('click',function(e){
		e.preventDefault();
		$('#add_img_frm').modal({show:true,backdrop: 'static'});
	});
	$('.submit_btn').on('click',function(e){
		e.preventDefault(); 
		var errorField = "";
        var isError = "0";
		if ($("#title").val() == "") {
			$("#title").next(".errorClass").html("");
			$("#title").after('<p class="errorClass">Please enter title.</p>');
			isError = 1;
			errorField = (errorField == '') ? 'title' : errorField;
		}else{
			var title = $("#title").val();
			if(title.length > 150){
				$("#title").next(".errorClass").html("");
				$("#title").after('<p class="errorClass">Title Length cannot exceed 150 characters.</p>');
				isError = 1;
				errorField = (errorField == '') ? 'title' : errorField;
			}else{
				var re = /^[a-zA-Z0-9, ]*$/;
				if (!re.test(title)) {
					$("#title").next(".errorClass").html("");
					$("#title").after('<p class="errorClass">Please enter valid title.</p>');
					isError = 1;
					errorField = (errorField == '') ? 'title' : errorField;
				}
			}
		}
		if ($("#alt").val() == "") {
			$("#alt").next(".errorClass").html("");
			$("#alt").after('<p class="errorClass">Please enter alt.</p>');
			isError = 1;
			errorField = (errorField == '') ? 'alt' : errorField;
		}else{
			var alt = $("#alt").val();
			if(title.length > 150){
				$("#alt").next(".errorClass").html("");
				$("#alt").after('<p class="errorClass">Alt Length cannot exceed 150 characters.</p>');
				isError = 1;
				errorField = (errorField == '') ? 'alt' : errorField;
			}else{
				var re = /^[a-zA-Z0-9, ]*$/;
				if (!re.test(alt)) {
					$("#alt").next(".errorClass").html("");
					$("#alt").after('<p class="errorClass">Please enter valid alt.</p>');
					isError = 1;
					errorField = (errorField == '') ? 'alt' : errorField;
				}
			}
		}
        var th_upload = $('#th_upload').prop('files')[0];   
		var l_upload = $('#l_upload').prop('files')[0];   
        if(typeof th_upload === 'undefined' ){
            $("#th_upload_error").text("Please upload thumb image").css({'color':'red','text-transform':'none !important'});
            return false;
        }
        if(typeof l_upload === 'undefined' ){
            $("#l_upload_error").text("Please upload large image").css({'color':'red','text-transform':'none !important'});
            return false;
        }
		
		if (isError == 1)
        {
            $("#" + errorField).focus();
            return false;
        } else {
			var form_data = new FormData();             
        form_data.append('th_file', th_upload);
		form_data.append('l_file', l_upload);
        form_data.append('title', $('#title').val());
        form_data.append('alt', $('#alt').val());
		form_data.append('h_tkn', $('#h_tkn').val());
		form_data.append('is_ajax', 1);
		form_data.append('savedata', 1);
		if($('#h_row_id').val() != '')
			form_data.append('h_row_id',$('#h_row_id').val())
		
        var requests = [];

        var ajax1 = $.ajax({
			  url: "./imageGridHandler.php",
			  type: "POST",
			  data:  form_data,
				processData: false,
				contentType: false,
			  success:function(){
				}
			});  

		  requests.push(ajax1);

		  $.when.apply(this, requests).done(function() {
			  var results = requests.length > 1 ? arguments : [arguments];
			  for( var i = 0; i < results.length; i++ ){
					var res = JSON.parse(results[i][0]);
					if(res.message == 'success'){
						$('#add_img_frm').modal('toggle');
						$('#msg').html('Data is saved successfully').css({'color':'green','text-transform':'none !important'});
						var r = JSON.parse(res.data);
						objJson = r;
						var html = '';
						$.each(r,function(key,value){
							html += "<tr><th scope='row'>"+value['id']+"</th><td>"+value['title']+"</td><td>"+value['alt']+"</td><td class='img-viewer' l_path='"+value['large_img']+"'>"+value['thumb_img']+"</td><td><button type='button' row-id='"+value['id']+"' class='btn btn-primary editButton'>Edit</button><button type='button' row-id='"+value['id']+"' class='btn btn-primary deleteButton'>Delete</button></td></tr>";
						});
						changePage(1);
						//$('.table').children('#listingTable').html(html);					
					}else{
						$('#msg').html(res.message).css({'color':'red','text-transform':'none !important'});
						return false;
					}
			  }
		  });
		}        
	});
	$('#th_upload').on('change',function(e){
        e.preventDefault(); 
        var file_data = $('#th_upload').prop('files')[0];   
        if(typeof file_data === 'undefined' ){
            $("#th_upload_error").text("Please upload thumb image file").css({'color':'red','text-transform':'none !important'});
            return false;
        }else{
			$("#th_upload_error").text('');
			return false;
		}
    });
	$('#l_upload').on('change',function(e){
        e.preventDefault(); 
        var file_data = $('#l_upload').prop('files')[0];   
        if(typeof file_data === 'undefined' ){
            $("#l_upload_error").text("Please upload large image file").css({'color':'red','text-transform':'none !important'});
            return false;
        }else{
			$("#l_upload_error").text('');
			return false;
		}
    });
	$(document).on('click', '.editButton', function (e) {
		e.preventDefault();
		var id = parseInt($(this).attr('row-id'));
		var requests = [];

        var ajax1 = $.ajax({
			  url: "./imageGridHandler.php",
			  type: "POST",
			  data:  {is_ajax:1,'id':id,'edit':1},
			  success:function(){
				}
			});  

		  requests.push(ajax1);

		  $.when.apply(this, requests).done(function() {
			  var results = requests.length > 1 ? arguments : [arguments];
			  for( var i = 0; i < results.length; i++ ){
					var res = JSON.parse(results[i][0]);
					$('#title').val(res[0]['title']);
					$('#alt').val(res[0]['alt']);
					if(res[0]['thumb_img'].indexOf('.') != -1){
						$('#th_viewer').attr('src','http://localhost'+res[0]['thumb_img']);
						$('#l_viewer').attr('src','http://localhost'+res[0]['large_img']);
					}else{
						$('#th_viewer').attr('src','http://localhost'+res[0]['thumb_img']+'.jpg');
						$('#l_viewer').attr('src','http://localhost'+res[0]['large_img']+'.jpg');
					}
					$('#h_row_id').val(res[0]['id']);
					$('#add_img_frm').modal({show:true,backdrop: 'static'});
					
			  }
		  });
	});
	$(document).on('click', '.deleteButton', function (e) {
		e.preventDefault();
		var id = parseInt($(this).attr('row-id'));
		var requests = [];

        var ajax1 = $.ajax({
			  url: "./imageGridHandler.php",
			  type: "POST",
			  data:  {is_ajax:1,'id':id,'delete':1},
			  success:function(){
				}
			});  

		  requests.push(ajax1);

		  $.when.apply(this, requests).done(function() {
			  var results = requests.length > 1 ? arguments : [arguments];
			  for( var i = 0; i < results.length; i++ ){
					var res = JSON.parse(results[i][0]);
					if(res.message == 'success'){
						$('#msg').html('Data is deleted successfully').css({'color':'green','text-transform':'none !important'});
						var r = JSON.parse(res.data);
						var html = '';
						objJson = r;
						$.each(r,function(key,value){
							html += "<tr><th scope='row'>"+value['id']+"</th><td>"+value['title']+"</td><td>"+value['alt']+"</td><td class='img-viewer' l_path='"+value['large_img']+"'>"+value['thumb_img']+"</td><td><button type='button' row-id='"+value['id']+"' class='btn btn-primary editButton'>Edit</button><button type='button' row-id='"+value['id']+"' class='btn btn-primary deleteButton'>Delete</button></td></tr>";
						});
						changePage(1);
						//$('.table').children('#listingTable').html(html);					
					}else{
						$('#msg').html(res.message).css({'color':'red','text-transform':'none !important'});
						return false;
					}
			  }
		  });
	});
	$(document).on('click', '.img-viewer', function (e) {
		e.preventDefault();
		var url = $(this).attr("l_path");
		$('#large_img_viewer').modal({show:true,backdrop: 'static'});
		if(url.indexOf('.') != -1){
			$('#large_viewer').attr('src','http://localhost'+url);
		}else{
			$('#large_viewer').attr('src','http://localhost'+url+'.jpg');
		}
	});
	
});
$(document).on('keyup', 'input,textarea,datepicker,file, select', function () {
	removeErrorMessage($(this));
});
$(document).on('blur', 'input,textarea,datepicker,file, select', function () {
	removeErrorMessage($(this));
});
function removeErrorMessage(that) {
	var val = $.trim(that.val());
	if (val != '') {
		that.parent().children('.errorClass').remove();
	}
}
// Can be obtained from another source, such as your objJson variable

function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}
    
function changePage(page)
{
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("listingTable");
    var page_span = document.getElementById("page");
 
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";
	var html = '';
    for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
		if(typeof objJson[i] != 'undefined'){
			html += "<tr><th scope='row'>"+objJson[i]['id']+"</th><td>"+objJson[i]['title']+"</td><td>"+objJson[i]['alt']+"</td><td class='img-viewer' l_path='"+objJson[i]['large_img']+"'>"+objJson[i]['thumb_img']+"</td><td><button type='button' row-id='"+objJson[i]['id']+"' class='btn btn-primary editButton'>Edit</button><button type='button' row-id='"+objJson[i]['id']+"' class='btn btn-primary deleteButton'>Delete</button></td></tr>";
		}
    }
			$('.table').children('#listingTable').html(html);
    page_span.innerHTML = page;

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages()
{
    return Math.ceil(objJson.length / records_per_page);
}
