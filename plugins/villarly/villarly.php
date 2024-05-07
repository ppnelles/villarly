<?php
/*
Plugin Name: villarly
Plugin URI: https://getin.agency
Description: villarly
Version: 1.0
Author: GET IN
Author URI: https://getin.agency
*/

function create_results_tables() {

  global $wpdb;
  $charset_collate = $wpdb->get_charset_collate();

  $tablename = $wpdb->prefix."results";

  $sql = "CREATE TABLE $tablename (
  id mediumint(11) NOT NULL AUTO_INCREMENT,
  name tinytext,
  email tinytext,
  phone tinytext,
  message_type tinytext,
  startdate tinytext,
  staylength tinytext,
  adults int,
  children int,
  message longtext,
  PRIMARY KEY  (id)
  ) $charset_collate;";

  require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
  dbDelta( $sql );
}

register_activation_hook( __FILE__, 'create_results_tables' );      

function add_ajax_entry_form() {
    global $wpdb;

    $insertEntry = $wpdb->insert('vi_results', array(
        'name' => $_REQUEST['name'],
        'email' => $_REQUEST['email'],
        'phone' => $_REQUEST['phone'],
        'message_type' => $_REQUEST['message_type'],
        'startdate' => $_REQUEST['startdate'],
        'staylength' => $_REQUEST['staylength'],
        'adults' => $_REQUEST['adults'],
        'children' => $_REQUEST['children'],
        'message' => $_REQUEST['message'],
      ));

    if($insertEntry == 1){
      $succes['validate'] = true;

      $headers = array('Content-Type: text/html; charset=UTF-8');

      if($_REQUEST['message_type'] == 'reservation') {
        $title = 'Nouvelle demande de réservation de '.$_REQUEST['name'];
      }
      else {
        $title = 'Nouvelle question de '.$_REQUEST['name'];
      }

      ob_start(); ?>

      <p>Hello,</p>

      <p>
        <b>Nom :</b> <?php echo $_REQUEST['name']; ?><br>
        <b>Email :</b> <?php echo $_REQUEST['email']; ?><br>
        <b>Téléphone :</b> <?php echo $_REQUEST['phone']; ?><br>
      </p>

      <?php if($_REQUEST['message_type'] == 'reservation') { ?>
        <p>
          <b>Date d'arrivée :</b> <?php echo $_REQUEST['startdate']; ?><br>
          <b>Durée du séjour :</b> <?php echo $_REQUEST['staylength']; ?><br>
          <b>Adulte(s) :</b> <?php echo $_REQUEST['adults']; ?><br>
          <b>Enfant(s) :</b> <?php echo $_REQUEST['children']; ?><br>
        </p>
      <?php } ?>

      <b>Message :</b></br>
      <div><?php echo stripslashes(nl2br($_REQUEST['message'])); ?></div>

      <?php $content = ob_get_contents();
      ob_end_clean();

      $email_sent = wp_mail('benjamin@getin.agency, annedestefano0509@gmail.com', $title, $content, $headers);

      wp_send_json_success( $succes );

    }
    else {
      wp_send_json_success( $error );
    }

}

add_action( 'wp_ajax_add_ajax_entry_form', 'add_ajax_entry_form' );
add_action( 'wp_ajax_nopriv_add_ajax_entry_form', 'add_ajax_entry_form' );