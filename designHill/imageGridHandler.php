<?php
set_time_limit(0);
ini_set('display_errors',0);
include_once('./DB.php');
class imageGrid {
      /* Member variables */
		
		public function __construct(){
			session_start();
			if (empty($_SESSION['token'])) {
				$_SESSION['token'] = md5(uniqid(rand(), TRUE));
			}
		}
		/* Member functions */
		public function showGrid(){
			include_once('./imageGridView.php');
		}
		
		public function initialLoad($path){
			$grid_data = $this->fetchdata();
			if(empty($grid_data)){
				$str = file_get_contents($path);
				$json = json_decode($str, true); // decode the JSON into an associative array
				$sql = "INSERT INTO image_grid (title, alt, thumb_img, large_img, created_at) VALUES ";
				foreach($json as $key=>$jsonData){
					$sql .= "('".addslashes($jsonData['title'])."','".addslashes($jsonData['alt'])."','".addslashes($jsonData['thumb_img'])."','".addslashes($jsonData['large_img'])."',now())";
					$sql .= ",";
				}		
				$sql = rtrim($sql, ',');
				$db = Db::getInstance();
				$conn = $db->getConnection();
				if(empty($json)){
					return null;
				}
				
				$resultset = $conn->query($sql);		
				echo json_encode($json);
			}else{
				echo json_encode($grid_data);
			}
			exit();
		}
		
		public function fetchdata(){
			$db = Db::getInstance();
			$conn = $db->getConnection();
			$sql = "select * from image_grid";
			$resultset = $conn->query($sql);		
			if ($resultset->num_rows > 0) {
				$return = array();
				// output data of each row
				while($row = $resultset->fetch_assoc()) {
					$return[] = $row;
				}
				return $return;
			}else{
				return null;
			}
		
		}
		public function savedata($post_data,$file_data){
			$return_data = array();
			$target_dir = $_SERVER['DOCUMENT_ROOT'] . '/img/';
			
			$th_fileType = pathinfo($file_data['th_file']['name'], PATHINFO_EXTENSION);
			$l_fileType = pathinfo($file_data['l_file']['name'], PATHINFO_EXTENSION);
			$th_target_file = 'thumb_'.time().'.' . $fileType;
			$l_target_file = 'large_'.time().'.' . $fileType;
			if(strtolower($th_fileType) != 'jpg'){
				$return_data['message'] = 'Please upload Image in JPG Format.';
			}elseif(strtolower($l_fileType) != 'jpg'){
				$return_data['message'] = 'Please upload Image in JPG Format.';
			}else{
				if (file_exists($target_dir . $th_target_file)){
					unlink($target_dir . $th_target_file);
				}
				if (file_exists($target_dir . $l_target_file)){
					unlink($target_dir . $l_target_file);
				}
				if (!is_dir($target_dir)) {
					mkdir($target_dir);
					chmod("$target_dir", 0777);
				}
				
				if (!move_uploaded_file($file_data['th_file']["tmp_name"], $target_dir . $th_target_file)) {
					$return_data['message'] = 'Could not save image';
				}
				
				if (!move_uploaded_file($file_data['l_file']["tmp_name"], $target_dir . $l_target_file)) {
					$return_data['message'] = 'Could not save image';
				}
			}
			if($post_data['title'] == ""){
				$return_data['message'] = 'Title Cannot be blank';
			}else{
				if(strlen($post_data['title']) > 150){
					$return_data['message'] = 'Title cannot be more than 150 characters';
				}else{
					if (!preg_match('/^[a-zA-Z]+[a-zA-Z0-9._]+$/', $post_data['title'])) {
						$return_data['message'] = 'Title can accept only alphanumeric';
					}
				}
			}
			
			if($post_data['alt'] == ""){
				$return_data['message'] = 'Alt Cannot be blank';
			}else{
				if(strlen($post_data['alt']) > 150){
					$return_data['message'] = 'Alt cannot be more than 150 characters';
				}else{
					if (!preg_match('/^[a-zA-Z]+[a-zA-Z0-9._]+$/', $post_data['alt'])) {
						$return_data['message'] = 'Alt can accept only alphanumeric';
					}
				}
			}

			if(isset($return_data['message']) && !empty($return_data['message'])){
				echo json_encode(array('message'=>$return_data['message']));
				exit();
			}else{
				$post = array();
				$post['title'] = addslashes($post_data['title']);
				$post['alt'] = addslashes($post_data['alt']);
				$post['th_image'] = 'img/'.th_target_file;
				$post['l_image'] = 'img/'.l_target_file;
				$db = Db::getInstance();
				$conn = $db->getConnection();
				
				if(empty($post)){
					echo json_encode(array('message'=>'failed to submit data'));
					exit();
				}
				if(isset($post_data['h_row_id']) && !empty($post_data['h_row_id'])){
					$sql = "update image_grid set title='".$post['title']."',alt='".$post['alt']."',thumb_img='".$post['th_image']."',large_img='".$post['l_image']."' where id='".$post_data['h_row_id']."'";
				}else{
					$sql = "INSERT INTO image_grid (title, alt, thumb_img, large_img, created_at) VALUES ('".$post['title']."','".$post['alt']."','".$post['th_image']."','".$post['l_image']."',now())";
				}
				$resultset = $conn->query($sql);
				$grid_data = $this->fetchdata();
				echo json_encode(array('message'=>'success','data'=>json_encode($grid_data)));
				exit();
			}
		}
		public function editdata($id){
			$db = Db::getInstance();
			$conn = $db->getConnection();
			$sql = "select * from image_grid where id='".$id."'";
			$resultset = $conn->query($sql);
			if ($resultset->num_rows > 0) {
				$return = array();
				// output data of each row
				while($row = $resultset->fetch_assoc()) {
					$return[] = $row;
				}
			}
			echo json_encode($return);
			exit();
		}
		public function deletedata($id){
			$db = Db::getInstance();
			$conn = $db->getConnection();
			$sql = "Delete from image_grid where id='".$id."'";
			$resultset = $conn->query($sql);
			$grid_data = $this->fetchdata();
			echo json_encode(array('message'=>'success','data'=>json_encode($grid_data)));
			exit();
		}
}
if(isset($_POST['is_ajax']) && !empty($_POST['is_ajax'])){
	if(isset($_POST['initial_load']) && !empty($_POST['initial_load'])){
		if(isset($_POST['path']) && empty($_POST['path'])){
			return false;
		}
		$ob = new imageGrid();
		$ob->initialLoad($_POST['path']);
		
	}else if(isset($_POST['savedata']) && $_POST['savedata'] == 1){
		$ob = new imageGrid();
		$ob->savedata($_POST,$_FILES);
	}else if(isset($_POST['edit']) && $_POST['edit'] == 1){
		$ob = new imageGrid();
		$ob->editdata($_POST['id']);
	}else if(isset($_POST['delete']) && $_POST['delete'] == 1){
		$ob = new imageGrid();
		$ob->deletedata($_POST['id']);
	}
		
}else{
	$obj = new imageGrid();
	$obj->showGrid();
}
?>
