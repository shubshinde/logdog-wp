<?php

// Exit if accessed directly.
if (!defined('ABSPATH')) exit;


// Include asset files.
add_action('admin_enqueue_scripts', function () {

	wp_enqueue_style('logdog-backend-style',  LOGDOG_PLUGIN_URL . 'inc/css/logdog-backend.css', array(), LOGDOG_PLUGIN_VERSION, 'all');
	wp_enqueue_script('logdog-backend-script', LOGDOG_PLUGIN_URL . 'inc/js/logdog-backend.js',   array(), LOGDOG_PLUGIN_VERSION, true);
});


// Register Admin TopBar link.
if (is_admin()) {
	add_action('admin_bar_menu', function ($admin_bar) {

		$admin_bar->add_menu(array(
			'id'		=> 'logdog-debugger-id',
			'title'		=> __('LogDog', 'logdog-froosty'),
			'parent'	=> false,
			'href'		=> false,
			'group'		=> false,
			'meta'		=> array(
				'title'		=> __('LogDog', 'logdog-froosty'),
				'target'	=> '_blank',
				'class'		=> 'logdog-topbar-link',
				'html'		=> false,
				'rel'		=> false,
				'onclick'	=> false,
				'tabindex'	=> false,
			),
		));
	}, 100, 1);
}
