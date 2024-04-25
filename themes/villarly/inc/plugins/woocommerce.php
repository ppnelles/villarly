<?php

/*
* Add Woo Commerce support
*/

function _turbo_add_woocommerce_support() {
	add_theme_support( 'woocommerce', array(
		'thumbnail_image_width' => 500,
		'single_image_width'    => 1000,
        'gallery_thumbnail_image_width' => 300,

        'product_grid'          => array(
            'default_rows'    => 3,
            'min_rows'        => 2,
            'max_rows'        => 8,
            'default_columns' => 4,
            'min_columns'     => 2,
            'max_columns'     => 5,
        ),
	) );

	//add_theme_support( 'wc-product-gallery-zoom' );
    add_theme_support( 'wc-product-gallery-lightbox' );
    add_theme_support( 'wc-product-gallery-slider' );


    //remove woocommerce css
   // add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );
}

add_action( 'after_setup_theme', '_turbo_add_woocommerce_support' );


// Remove cross-sells at cart
//remove_action( 'woocommerce_cart_collaterals', 'woocommerce_cross_sell_display' );
add_shortcode ('woo_cart_but', 'woo_cart_but' );

/**
 * Create Shortcode for WooCommerce Cart Menu Item
 */
function woo_cart_but() {
    ob_start();
 
        $cart_count = WC()->cart->cart_contents_count; // Set variable for cart item count
        $cart_url = wc_get_cart_url();  // Set Cart URL
  
        ?>
        <li><a class="menu-item cart-contents" href="<?php echo $cart_url; ?>">
            <span class="cart-link">Cart</span>
        <?php
        if ( $cart_count > 0 ) {
       ?>
            <span class="cart-contents-count"><?php echo $cart_count; ?></span>
        <?php
        }
        ?>
        </a></li>
        <?php
            
    return ob_get_clean();
 
}

add_filter( 'woocommerce_add_to_cart_fragments', 'woo_cart_but_count' );
/**
 * Add AJAX Shortcode when cart contents update
 */
function woo_cart_but_count( $fragments ) {
 
    ob_start();
    
    $cart_count = WC()->cart->cart_contents_count;
    $cart_url = wc_get_cart_url();
    
    ?>
    <a class="cart-contents menu-item" href="<?php echo $cart_url; ?>">
        <span class="cart-link">Cart</span>
    <?php
    if ( $cart_count > 0 ) {
        ?>
        <span class="cart-contents-count"><?php echo $cart_count; ?></span>
        <?php            
    }
        ?></a>
    <?php
 
    $fragments['a.cart-contents'] = ob_get_clean();
     
    return $fragments;
}

add_filter( 'woocommerce_product_tabs', 'change_tabs_order', 98 );
 
function change_tabs_order( $tabs ) {
 
   // $tabs['Additional information']['priority'] = 5;
    $tabs['description']['priority'] = 25;
 
    return $tabs;
 
}

add_filter( 'wp_nav_menu_secondary_items', 'woo_cart_but_icon', 10, 2 ); // Change menu to suit - example uses 'secondary'

/**
 * Add WooCommerce Cart Menu Item Shortcode to particular menu
 */
function woo_cart_but_icon ( $items, $args ) {
       $items .=  woo_cart_but(); // Adding the created Icon via the shortcode already created
       
       return $items;
}

add_action( 'woocommerce_single_product_summary', 'open_div_before_title', 4 );
function open_div_before_title() { 
    //global $product; 

   // $product_id = $product->get_id(); // The product ID

    // Your custom field "Book author"
    //$book_author = get_post_meta($product_id, "product_author", true);

    // Displaying your custom field under the title
    echo '<div class="single-title-banner">';
}

add_action( 'woocommerce_single_product_summary', 'close_div_after_desc', 25 );
function close_div_after_desc() { 
    //global $product; 

   // $product_id = $product->get_id(); // The product ID

    // Your custom field "Book author"
    //$book_author = get_post_meta($product_id, "product_author", true);

    // Displaying your custom field under the title
    echo '</div>';
}


add_filter( 'woocommerce_get_availability_text', 'set_custom_availability_text', 10, 2 );
function set_custom_availability_text( $availability, $product ) {
    if ( $product->is_in_stock() ) {
        $availability = __( 'In stock', 'woocommerce' );
    } elseif ( ! $product->is_in_stock() ) {
        $availability = __( 'Out of stock', 'woocommerce' );
    }
    return $availability;
}

// Add text if price not filled

add_filter( 'woocommerce_get_price_html', 'custom_price_message' );
function custom_price_message($price) {
    if(empty($price)){
        return 'Preis auf Nachfrage';
    }
    else {
        return $price;
    }
}

// Add field to checkout form
add_filter( 'woocommerce_checkout_fields' , 'custom_override_checkout_fields' );

// Our hooked in function – $fields is passed via the filter!
function custom_override_checkout_fields( $fields ) {
     $fields['billing']['vat_number'] = array(
        'label'     => __('MwSt-Nummer', '_turbo'),
   // 'placeholder'   => _x('VAT Number', 'placeholder', '_turbo'),
    'required'  => false,
    'class'     => array('form-row-wide'),
    'clear'     => true
     );

     return $fields;
}

/**
 * Display field value on the order edit page
 */
 
add_action( 'woocommerce_admin_order_data_after_shipping_address', 'my_custom_checkout_field_display_admin_order_meta', 10, 1 );

function my_custom_checkout_field_display_admin_order_meta($order){
    echo '<p><strong>'.__('MwSt-Nummer').':</strong> ' . get_post_meta( $order->get_id(), 'vat_number', true ) . '</p>';
}

//Add 'starting price' with an ACF true/false to check

function ppn_change_product_price_display( $price ) {
    if(get_field('show_price_starting_at')) {
        $startPrice = 'Ab '.$price;
        return $startPrice;
    }
    else {
        return $price;
    }
  }
add_filter( 'woocommerce_get_price_html', 'ppn_change_product_price_display' );


// function ppn_change_cart_item_price_display($price) {
//     //global $product;
//     $order = wc_get_order( $order_id );
//    // $pid=$product->get_id();
//     print_r($order);

//     // return $cart_item_key;
// }
// add_filter( 'woocommerce_cart_item_price', 'ppn_change_cart_item_price_display' );

// function ppn_change_cart_item_price_display( $WC_cart_get_product_price ) {
//      return 'Starting at '.$WC_cart_get_product_price;
// }
// add_filter( 'woocommerce_cart_item_price', 'ppn_change_cart_item_price_display' );
// add_filter( 'woocommerce_cart_product_subtotal', 'ppn_change_cart_item_price_display' );