<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
<link href='./resources/css/bootstrap.css' rel='stylesheet' type='text/css'>
<link href='./resources/css/bootstrap.min.css' rel='stylesheet' type='text/css'>
<style>
.errorClass
    {
        color:red;
    }
</style>
</head>
<body>
<div id="main-content">
    <div class="container-fluid set-nov">
        <div class='content'>
            <div class="pageHead">
                <h4>IMAGE GRID</h4>
            </div>
			<div id="msg">
				
			</div>
			
            <div class="">
                <a class="btn btn-primary pull-right" href="javascript:void(0);" id="add_btn">ADD</a>
				<div class="row">
					<table class="table">
					  <thead>
						<tr>
						  <th scope="col">Id</th>
						  <th scope="col">Title</th>
						  <th scope="col">Alt</th>
						  <th scope="col">Thumb Img</th>
						  <th scope="col">Action</th>
						</tr>
					  </thead>
					  <tbody id="listingTable">
					  </tbody>
					</table>
					<a href="javascript:prevPage()" id="btn_prev">Prev</a>
					<a href="javascript:nextPage()" id="btn_next">Next</a>
					page: <span id="page"></span>
				</div>
                <div class='clearfix'></div>
            </div>
            <div class='clearfix'></div>
        </div>
    </div>
    <div class='clearfix'></div>
</div>
<div class="clearfix"></div>
<!-- Modal -->
<div class="modal fade" id="add_img_frm" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header header-color">
                <button type="button" class="close pull-right" data-dismiss="modal">&times;</button>
                <h4 style="text-align: left;">Image Addition Form</h4>
            </div>
            <div class="modal-body" id="form_body">
                <form id="img_add_frm" method="post" enctype="multipart/form-data">
					<input type="hidden" name="tkn" id="h_tkn" value="<?php echo $_SESSION['token']; ?>" />
					<div class='form-group'>
						<div class="col-xs-12">
							<label>Title</label>
							<input type="text" class="input" name="title" id="title">
						</div>
						<div class='clearfix'></div>
					</div>
					<div class='form-group'>
						<div class="col-xs-12">
							<label>Alt</label>
							<input type="text" class="input" name="alt" id="alt">
						</div>
						<div class='clearfix'></div>
					</div>
					<div class='form-group'>
						<div class="col-xs-12">
							<label>Thumb Image Upload</label>
							<input type="file" name="thumbImage" id="th_upload" value="" /> 
						</div>
						<iframe src="" id="th_viewer" frameborder="0" scrolling="no" width="25%" height="100"></iframe>            
						<div style="margin-top:5px;">
                            <p class="file_upload" style="padding-left: 100px;" id="th_upload_error"></p>
                        </div>
						<div class='clearfix'></div>
					</div>
					<div class='form-group'>
						<div class="col-xs-12">
							<label>Large Image Upload</label>
							<input type="file" name="largeImage" id="l_upload" value="" /> 
						</div>
						<iframe src="" id="l_viewer" frameborder="0" scrolling="no" width="25%" height="100"></iframe>            
						<div style="margin-top:5px;">
                            <p class="file_upload" style="padding-left: 100px;" id="l_upload_error"></p>
                        </div>
						<div class='clearfix'></div>
					</div>
					<input type="hidden" name="h_row_id" id="h_row_id" value=""/>
				</form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary pull-right submit_btn">Submit</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<div class="clearfix"></div>
<!-- Modal -->
<div class="modal fade" id="large_img_viewer" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header header-color">
                <button type="button" class="close pull-right" data-dismiss="modal">&times;</button>
                <h4 style="text-align: left;">Large Image Viewer</h4>
            </div>
            <div class="modal-body" id="form_body">
			<iframe src="" id="large_viewer" frameborder="0" scrolling="no" width="100%" height="300"></iframe>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
</body>
<script src='./resources/js/jquery.min.js'></script>
<script src='./resources/js/bootstrap.min.js'></script>
<script src='./resources/js/imageGrid.js'></script>
</script>
</html>