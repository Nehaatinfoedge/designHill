<?php
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

error_reporting(E_ALL);
set_time_limit(0);
ini_set('memory_limit','256M');
ini_set('pcre.backtrack_limit', 10000000);

include_once('parser.php');
$file_path = 'doc/Neha-CV.doc';
$obj = new Parser($file_path);
$content = $obj->convertToText();
?>

<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/base.css">
        <script src="js/jquery-2.1.4.min.js"></script>
        <script src="js/base.js"></script>
    	<script src="js/bootstrap.min.js"></script>
    	<script src="js/bootstrap.js"></script>
    	<link rel="stylesheet" type="text/css" href="css/bootstrap.css"></link>
    	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"></link>
    	<link rel="stylesheet" type="text/css" href="css/bootstrap-theme.css"></link>
    </head>
    <body>
        <form name="inputform" id="inputform" onsubmit="return false;">
            <div class="">';
            <?php 
                foreach($content as $key=>$value){
                    if (strpos($value, '-') === false){
                        break;
                    }
                    $formContent = explode('-',$value);?>
                <div class="form-group">
                    <div class="col-md-12">
                        <label><?php echo trim($formContent[0]);?></label>
                        <input type="text" class="form-control" name="<?php $string = preg_replace('/\s+/', '', $formContent[0]); echo trim(strtolower($string));?>" value="<?php echo trim(addslashes($formContent[1]));?>" atocomplete="off" readonly/>
                    </div>
                </div>
                <?php 
                }?>
                <div class='text-center'>
                    <input type='submit' class='btn btn-primary' id='confirm_form_input' style='width: 40%;' value='Submit' />
                </div>
            </div>
        </form>
    </body>
    <script type="text/javascript">   
        $('#confirm_form_input').on('click',function(e){
            e.preventDefault();
            var form_data = $('#inputform').serialize();                  
            var requests = [];
            var r = confirm("Are you sure you want to save this request?");
            if (r === true || r === 'true') {
                var ajax1 = $.ajax({
                  url: 'submitAssignment.php', // point to server-side PHP script 
                  data: form_data,                         
                  type: 'POST'
                });  
                requests.push(ajax1);

                $.when.apply(this, requests).done(function() {
                    var results = requests.length > 1 ? arguments : [arguments];
                    for( var i = 0; i < results.length; i++ ){
                        var res = results[i][0];
                        alert(res);
                    }
                });
            }else{
                return false;
            }
        })
    </script>
</html>
