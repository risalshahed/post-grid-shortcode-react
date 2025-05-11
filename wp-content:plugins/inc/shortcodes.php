<?php
// Add this shortcode
function lcw_react_post_grid_shortcode($atts) {
    // Set default shortcode attributes
    $atts = shortcode_atts([
        'post_type'      => 'posts',
        'columns'        => 3,
        'posts_per_page' => 6,
        'taxonomy'       => '',
        'terms'          => '',
        'read_more_text' => 'Read More',
    ], $atts, 'lcw_react_post_grid');

    // Resolve build directory and get the JS file
    $build_dir = realpath(plugin_dir_path(__FILE__) . '../build/assets');
    $js_files = glob($build_dir . '/index-*.js');

    if (!empty($js_files)) {
        $js_filename = basename($js_files[0]);

        // Enqueue React app from Vite build
        wp_enqueue_script(
            'lcw-react-post-grid-script',
            GHL_WIZARD_PLUGIN_URL . "build/assets/$js_filename",
            [],
            null,
            true // Load in footer
        );

        // Also enqueue wp-api and nonce for REST requests
        wp_enqueue_script('wp-api');
        wp_localize_script('lcw-react-post-grid-script', 'wpApiSettings', [
            'root'  => esc_url_raw(rest_url()),
            'nonce' => wp_create_nonce('wp_rest'),
        ]);
    }

    // Output div with data-* props to pass into React
    ob_start();
    ?>
    <div id="lcw-react-root"
        data-post_type="<?php echo esc_attr($atts['post_type']); ?>"
        data-columns="<?php echo esc_attr($atts['columns']); ?>"
        data-posts_per_page="<?php echo esc_attr($atts['posts_per_page']); ?>"
        data-taxonomy="<?php echo esc_attr($atts['taxonomy']); ?>"
        data-terms="<?php echo esc_attr($atts['terms']); ?>"
        data-read_more_text="<?php echo esc_attr($atts['read_more_text']); ?>">
    </div>
    <?php
    return ob_get_clean();
}

add_shortcode('lcw_react_post_grid', 'lcw_react_post_grid_shortcode');