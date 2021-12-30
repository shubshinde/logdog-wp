<?php

/**
 * LogDog - Debugger
 *
 * @package       LOGDOG
 * @author        Shubham Shinde
 * @license       gplv2
 * @version       1.0.0
 *
 * Plugin Name:   LogDog - Debug Logger
 * Plugin URI:    https://github.com/shubshinde/logdog-wp
 * Description:   Displays Debug Logs in Preety Footer Drawer.
 * Version:       1.0.0
 * Author:        Shubham Shinde
 * Author URI:    https://github.com/shubshinde
 * Text Domain:   logdog-debug-logger
 * Domain Path:   /languages
 * License:       GPLv2
 * License URI:   https://www.gnu.org/licenses/gpl-2.0.html
 * Stable tag:    5.0
 *
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) exit;


// Plugin name.
define('LOGDOG_PLUGIN_NAME',    'LogDog - Debug Logger');
// Plugin version.
define('LOGDOG_PLUGIN_VERSION', '1.0.0');
// Plugin Root File.
define('LOGDOG_PLUGIN_FILE',    __FILE__);
// Plugin base.
define('LOGDOG_PLUGIN_BASE',    plugin_basename(LOGDOG_PLUGIN_FILE));
// Plugin Folder Path.
define('LOGDOG_PLUGIN_DIR',     plugin_dir_path(LOGDOG_PLUGIN_FILE));
// Plugin Folder URL.
define('LOGDOG_PLUGIN_URL',     plugin_dir_url(LOGDOG_PLUGIN_FILE));
// WP DEBUG URL.
define('WP_DEBUGLOG_URL',       WP_CONTENT_URL . '/debug.log');


// REGISTER REST ROUTES.
add_action('rest_api_init', function () {
    register_rest_route('logdog', 'debug-log', array(
        'methods'  => 'GET',
        'callback' => 'logdog_get_debug_log',
    ));
});

// Callback function for 'debug-log' REST Route.
function logdog_get_debug_log($request)
{
    $logdog_debug_logs = file(WP_DEBUGLOG_URL);
    if (empty($logdog_debug_logs)) {
        return new WP_Error('empty_logdog_debug_logs', 'There are no error logs to display', array('status' => 404));
    }
    $logdog_response = new WP_REST_Response($logdog_debug_logs);
    $logdog_response->set_status(200);

    return $logdog_response;
}

//Load the functions only in Admin Area.
if (is_admin()) {
    require_once LOGDOG_PLUGIN_DIR . 'inc/logdog-functions.php';
}
