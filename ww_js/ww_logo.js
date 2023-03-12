/*
 * ======================================================================================
 * Web Widgets: Logo
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/web-widgets
 * ======================================================================================
 */
'use strict';

//=======================================================================================
// Creates a widget for displaying a logo or pic with a given link
class Logo {
    constructor(container_id, config, colors) {
        this.config = config;
        this.id = container_id;
        this.colors = colors;
        this.logo_id = Utils.gen_unique_id(container_id);

        this.gen_widget();
        this.gen_css();
    }

    //===================================================================================
    set_logo_to(logo_url) { $(`.panel-logo-${this.logo_id}`).css("background-image", `url(${logo_url})`); }

    //===================================================================================
    gen_css() {
        console.log(this.config.logo_image);
        $(`#panel-logo-${this.logo_id}`).css("height", this.config.height);
        $(`#panel-logo-${this.logo_id}`).css("width", this.config.width);
        $(`#panel-logo-${this.logo_id}`).css("background", this.colors[this.config.background_color].hex);
        $(`#panel-logo-${this.logo_id}`).css("background-image", `url(${this.config.logo_image})`);
        $(`#panel-logo-${this.logo_id}`).css("background-size", `${this.config.logo_size}`);
        $(`#panel-logo-${this.logo_id}`).css("background-repeat", "no-repeat");
        $(`#panel-logo-${this.logo_id}`).css("background-position", "center center");

        $(`#menu-spacer-${this.logo_id}`).css("height", this.config.spacer_size);
        $(`#menu-spacer-${this.logo_id}`).css("width", this.config.width);
        $(`#menu-spacer-${this.logo_id}`).css("background", this.colors[this.config.spacer_color].hex);
    }

    //===================================================================================
    gen_widget() {
        $(`#${this.id}`).append(`<a id='logo-link-${this.logo_id}' href='${this.config.url}' target='_blank'></a>`);
        $(`#logo-link-${this.logo_id}`).append(`<div id='panel-logo-${this.logo_id}' class='panel-logo'></div>`)
        $(`#${this.id}`).append(`<div id='menu-spacer-${this.logo_id}' class='menu-spacer'></div>`);
    }

} /* class Logo */