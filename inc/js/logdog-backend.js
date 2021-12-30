
document.addEventListener("DOMContentLoaded", () => {

    // Add CSS to logdog topbar link.
    jQuery('.logdog-topbar-link *').css({ "background-color": "#666", "color": "#fff" });

    // Add Logo to logdog topbar link.
    jQuery('.logdog-topbar-link div[title="LogDog"]').html('<img style="width: 15px; margin-bottom: -3px; margin-right: 3px;" src="https://i.imgur.com/2miS9fh.png"> LogDog');

    // OnClick LogDog Top Menu Link.
    jQuery("#wp-admin-bar-logdog-debugger-id").on('click', () => {

        // Add Loading Spinner Back.
        var logdog_loading_spinner = `
            <img style="width: 100px; margin-top: -30px;" src="https://i.imgur.com/jWCZQcq.gif">
            <p style="margin-left: 30px;"><big>Sniffing Logs...</big></p>
        `;
        jQuery("#logdogDrawerLogDisplayArea").html(logdog_loading_spinner);

        // Show/Hide LogDog Drawer.
        jQuery("#logdogFooterDrawer").toggle();

        // Fetch Debug Logs.
        jQuery.ajax({
            url: '/wp-json/logdog/debug-log/',
            type: 'GET',
            success: function (logdogResponse) {

                var logdog_debug_log_markup = `
                    <span style="padding: 10px;">
                        <p><big style="color: green !important;"> <b>Congrats! No Debug Log's.</b> </big> </p>
                        <p><small>Make sure WP_DEBUG_LOG mode is on.</small> </p>
                    </span>`;

                if (logdogResponse && logdogResponse.length && logdogResponse != '' && logdogResponse != ' ') {
                    // Empty Markup.
                    logdog_debug_log_markup = '';
                    // Loop Logs to create markup.
                    logdogResponse.forEach((logdog_single_log, index, arr) => {
                        logdog_debug_log_markup += '<p style="">' + logdog_single_log + '</p>';
                    });
                }
                //Push logdog Generated markup to drawer content div.
                setTimeout(function () {
                    jQuery("#logdogDrawerLogDisplayArea").html(logdog_debug_log_markup);
                }, 1200);
            },
            error: function (logdogResponse) {

                var logdog_debug_log_markup = `
                    <span style="padding: 10px;">
                        <p><big style="col<p><big style="color: green !important;"> <b>Congrats! No Debug Log's.</b> </big> </p>
                        <p><small style="color: #555;">Make sure WP_DEBUG_LOG mode is on.</small> </p>
                    </span>`;
                // Push Generated markup to logdog drawer content div. 
                setTimeout(function () {
                    jQuery("#logdogDrawerLogDisplayArea").html(logdog_debug_log_markup);
                }, 1200);
            }
        });
    });

    // Day-Night Mode.
    var logdog_theme = window.localStorage.getItem('logdog-theme');


    if (logdog_theme) {
        var logdog_theme_class = logdog_theme;
        var logdog_checked = 'checked';

        (logdog_theme && logdog_theme == 'logdog-night-mode') ? logdog_checked = 'checked' : logdog_checked = '';

    } else {
        var logdog_theme_class = 'logdog-day-mode';
        var logdog_checked = '';
    }
    console.log(logdog_theme_class)

    var logdogDrawerMarkup = `
        <div id="logdogFooterDrawer" class="logdogDrawer" style="display: none;">
            <!-- logdogDrawer content -->
            <div class="logdogDrawer-content">
                <!-- logdogDrawer Header -->
                <div class="logdogDrawer-header">
                    
                    <div class="logdogDrawer-header-row">
                        <div class="logdogDrawer-header-item logdogDrawer-header-item-start">
                            <h2 style="color: #fff;"><img style="width: 25px; margin-left: 10px; margin-bottom: -5px;" src="https://i.imgur.com/2miS9fh.png"> LogDog - <small>Debug Logger</small></h2>
                        </div>
                        <div class="logdogDrawer-header-item logdogDrawer-header-item-mid"></div>
                        <div class="logdogDrawer-header-item logdogDrawer-header-item-end">
                            <div style="float: right; margin-bottom: -15px;">
                                <label class="logdog-switch">
                                    <input class="logdog-input" `+ logdog_checked + ` type="checkbox">
                                    <div class="logdog-slider"></div>
                                </label>

                                <span id="logdogDrawerClose">&times;</span>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- logdogDrawer Body -->
                <div class="logdogDrawer-body">
                    <!-- Debug Logs Render Area -->
                    <div id="logdogDrawerLogDisplayArea" class="`+ logdog_theme_class + `">
                        <img style="width: 100px; margin-top: -30px;" src="https://i.imgur.com/jWCZQcq.gif">
                        <p style="margin-left: 30px;"><big>Sniffing Logs...</big></p>
                    </div>
                </div>
                <!-- logdogDrawer Footer -->
                <!-- <div class="logdogDrawer-footer">
                    <h3>logdogDrawer Footer</h3>
                </div> -->
            </div>
        </div>
    `;

    jQuery('#wpfooter').append(logdogDrawerMarkup);

    // logdog Drawer close.
    jQuery('#logdogDrawerClose').on('click', () => {
        jQuery("#logdogFooterDrawer").toggle();
    });

    // Set Night-Day Mode Value
    var logdog_checkbox = document.querySelector('.logdog-input');

    logdog_checkbox.addEventListener('change', function () {
        if (logdog_checkbox.checked) {
            // Set Night Mode.
            window.localStorage.setItem('logdog-theme', 'logdog-night-mode');
            jQuery('#logdogDrawerLogDisplayArea').removeClass("logdog-day-mode");
            jQuery('#logdogDrawerLogDisplayArea').addClass("logdog-night-mode");
        } else {
            // Set Day Mode.
            window.localStorage.setItem('logdog-theme', 'logdog-day-mode');
            jQuery('#logdogDrawerLogDisplayArea').removeClass("logdog-night-mode");
            jQuery('#logdogDrawerLogDisplayArea').addClass("logdog-day-mode");
        }
        console.log(window.localStorage)

    });

});