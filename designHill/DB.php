<?php
class Db
{
    private $_connection;
	private static $_instance; 
	private $host = 'localhost:3307';
	private $username = 'root';
	private $password = 'admin';
	private $database = 'admin';

    public static function getInstance()
    {
        if (!self::$_instance) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    private function __construct()
    {
        try {
			$this->_connection = new mysqli($this->host,$this->username,$this->password,$this->database);
			if($this->_connection){
			
			}
			else
			{
				throw new Exception('Unable to connect');
			}
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    private function __clone()
    {
    }

    public function getConnection()
    {
    return $this->_connection;
    }
}
?>