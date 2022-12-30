/*
 * ======================================================================================
 * Web Widgets: Navigation Arrows
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/web-widgets
 * https://www.stevenlyles.net
 * ======================================================================================
 */

//====================================================================
// This dictionary will be populated by the constructors and will keep
// track of each instance's configuration for use by the callbacks
let manifest = {};

//=======================================================================================
// Collection of utility functions used by widget
class Utils {

    //===================================================================================
    // Generates a random hash based on a given string. This is used to create unique ids
    // to identify instances of the classes
    static gen_unique_id_from(str) {
        var hash = Math.random() * (10 - 0) + 0;
        var i = 0;
        var char = "";

        if (str.length !== 0) {
            for (i = 0; i < str.length; i++) {
                char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
        }
        return Math.abs(hash);
    }
} // class Utils

//=======================================================================================
// Base class for nav arrow classes
class NavArrows {
    constructor(container_id, config, callback) {
        this.config = config;
        this.id = container_id;
        this.widget_id = Utils.gen_unique_id_from(container_id);
        manifest[this.widget_id] = config;
        manifest[this.widget_id]["callback"] = callback;
    }

    //===================================================================================
    get_id() { return this.widget_id; }
} /* class NavArrow */

//=======================================================================================
// Represents a vertical nav arrow group
// @param [String] container_id - id attribute of html parent container
// @param [JSON] config - configuration of this arrow group as follows:
//   let config_vert = {
//         "aspect"  : 3,         // how much the arrow length is greater than width
//         "rounded" : false,     // true - base of arrow will be rounded; false - straight
//         "size"    : 20,        // the smallest dimension (px); the longest will be "aspect" x "size"
//         "gap"     : 10,        // gap between arrows and target (px)
//         "color"   : "#32557f", // cadet blue; color of arrow (background is same as container)
//         "hover"   : "#99dd66"  // color on hover
//     }
// @param [Object] callback - function called upon nav arrow click
class NavArrowsVertical extends NavArrows {
    //===================================================================================
    constructor(container_id, config, callback) {
        super(container_id, config, callback);
        this.build_widget();
        this.set_container_css();
        this.set_css_vert();
    }

    //===================================================================================
    // Set the css styling for the parent container (id from construction)
    set_container_css() {
        $(`#${this.id}`).css("display", "flex");
        $(`#${this.id}`).css("flex-direction", "column");
        $(`#${this.id}`).css("align-items", "center");
        $(`#${this.id}`).css("justify-content", "center");
        $(`#${this.id}`).css("gap", `${this.config.gap}px`);
    }

    //===================================================================================
    // Set the css styling as specified by the passed config
    set_css_vert() {
        $(".nav-arrow-up").css("border-left", `${this.config.size}px solid transparent`);
        $(".nav-arrow-up").css("border-right", `${this.config.size}px solid transparent`);
        $(".nav-arrow-up").css("border-bottom", `${this.config.size*this.config.aspect}px solid ${this.config.color}`);
        if (this.config.rounded) { $(".nav-arrow-up").css("border-radius", "50%"); }

        $(".nav-arrow-down").css("border-left", `${this.config.size}px solid transparent`);
        $(".nav-arrow-down").css("border-right",`${this.config.size}px solid transparent`);
        $(".nav-arrow-down").css("border-top", `${this.config.size*this.config.aspect}px solid ${this.config.color}`); // cadet blue: #32557f
        if (this.config.rounded) { $(".nav-arrow-down").css("border-radius", "50%"); }
    }

    //===================================================================================
    // Insert the up and down arrow tags in the parent html container as 1st and last
    // elements. Be sure to add the target tags before constructing the arrow group.
    build_widget() {
        $("#" + this.id).prepend("<div id='up-" + this.widget_id + "'class='nav-arrow nav-arrow-up'></div>");
        $("#" + this.id).append("<div id='down-" + this.widget_id + "'class='nav-arrow nav-arrow-down'></div>");
    }
} /* class NavArrowsVertical */

//=======================================================================================
// Represents a horizontal nav arrow group
// @param [String] container_id - id attribute of html parent container
// @param [JSON] config - configuration of this arrow group as follows:
//   let config_horz = {
//         "aspect"  : 3,         // how much the arrow length is greater than width
//         "rounded" : false,     // true - base of arrow will be rounded; false - straight
//         "size"    : 20,        // the smallest dimension (px); the longest will be "aspect" x "size"
//         "gap"     : 10,        // gap between arrows and target (px)
//         "color"   : "#32557f", // cadet blue; color of arrow (background is same as container)
//         "hover"   : "#99dd66"  // color on hover
//     }
// @param [Object] callback - function called upon nav arrow click
class NavArrowsHorizontal extends NavArrows {
    constructor(container_id, config, callback) {
        super(container_id, config, callback);
        this.build_widget();
        // manifest[this.widget_id] = config;
        this.set_container_css();
        this.set_css_horz();
    }

    //===================================================================================
    // Set the css styling for the parent container (id from construction)
    set_container_css() {
        $(`#${this.id}`).css("display", "flex");
        $(`#${this.id}`).css("flex-direction", "row");
        $(`#${this.id}`).css("align-items", "center");
        $(`#${this.id}`).css("justify-content", "center");
        $(`#${this.id}`).css("gap", `${this.config.gap}px`);
    }

    //===================================================================================
    // Set the css styling as specified by the passed config
    set_css_horz() {
        $(".nav-arrow-left").css("border-top", `${this.config.size}px solid transparent`);
        $(".nav-arrow-left").css("border-bottom", `${this.config.size}px solid transparent`);
        $(".nav-arrow-left").css("border-right", `${this.config.size*this.config.aspect}px solid ${this.config.color}`);
        $(".nav-arrow-left").css("margin-right", `${this.config.gap}px`);
        if (this.config.rounded) { $(".nav-arrow-left").css("border-radius", "50%"); }

        $(".nav-arrow-right").css("border-top", `${this.config.size}px solid transparent`);
        $(".nav-arrow-right").css("border-bottom",`${this.config.size}px solid transparent`);
        $(".nav-arrow-right").css("border-left", `${this.config.size*this.config.aspect}px solid ${this.config.color}`); // cadet blue: #32557f
        $(".nav-arrow-right").css("margin-left", `${this.config.gap}px`);
        if (this.config.rounded) { $(".nav-arrow-right").css("border-radius", "50%"); }
    }

    //===================================================================================
    // Insert the left and right arrow tags in the parent html container as 1st and last
    // elements. Be sure to add the target tags before constructing the arrow group.
    build_widget() {
        $("#" + this.id).prepend("<div id='left-" + this.widget_id + "'class='nav-arrow nav-arrow-left'></div>");
        $("#" + this.id).append("<div id='right-" + this.widget_id + "'class='nav-arrow nav-arrow-right'></div>");
    }
} /* class NavArrowsHorizontal */

//=======================================================================================
$(document).ready(function() {

    //-------------------------------------------------------------------------------------
    // Handle arrow click; passes which arrow ("up", "down", "left", "right") & instance id
    $(".nav-arrow").click( function() {
        let id = `${this.id}`.split("-")[1];
        let direction = `${this.id}`.split("-")[0];
        manifest[id].callback.apply(this, [direction, id]);
    });

    //----------------------
    // Handle hover up arrow
    $(".nav-arrow-up").hover(function(){
        let id = `${this.id}`.split("-")[1];
        $(`#up-${id}`).css("border-bottom", `${manifest[id].size*manifest[id].aspect}px solid ${manifest[id].hover}`);
        $(`#up-${id}`).css("cursor", "pointer");
    }, function(){
        let id = `${this.id}`.split("-")[1];
        $(`#up-${id}`).css("border-bottom", `${manifest[id].size*manifest[id].aspect}px solid ${manifest[id].color}`);
        $(`#up-${id}`).css("cursor", "default");
    });

    //------------------------
    // Handle hover down arrow
    $(".nav-arrow-down").hover(function(){
        let id = `${this.id}`.split("-")[1];
        $(`#down-${id}`).css("border-top", `${manifest[id].size*manifest[id].aspect}px solid ${manifest[id].hover}`);
        $(`#down-${id}`).css("cursor", "pointer");
    }, function(){
        let id = `${this.id}`.split("-")[1];
        $(`#down-${id}`).css("border-top", `${manifest[id].size*manifest[id].aspect}px solid ${manifest[id].color}`);
        $(`#down-${id}`).css("cursor", "default");
    });

    //------------------------
    // Handle hover left arrow
    $(".nav-arrow-left").hover(function(){
        let id = `${this.id}`.split("-")[1];
        $(`#left-${id}`).css("border-right", `${manifest[id].size*manifest[id].aspect}px solid ${manifest[id].hover}`);
        $(`#left-${id}`).css("cursor", "pointer");
    }, function(){
        let id = `${this.id}`.split("-")[1];
        $(`#left-${id}`).css("border-right", `${manifest[id].size*manifest[id].aspect}px solid ${manifest[id].color}`);
        $(`#left-${id}`).css("cursor", "default");
    });

    //-------------------------
    // Handle hover right arrow
    $(".nav-arrow-right").hover(function(){
        let id = `${this.id}`.split("-")[1];
        $(`#right-${id}`).css("border-left", `${manifest[id].size*manifest[id].aspect}px solid ${manifest[id].hover}`);
        $(`#right-${id}`).css("cursor", "pointer");
    }, function(){
        let id = `${this.id}`.split("-")[1];
        $(`#right-${id}`).css("border-left", `${manifest[id].size*manifest[id].aspect}px solid ${manifest[id].color}`);
        $(`#right-${id}`).css("cursor", "default");
    });
});
