/*
 * ======================================================================================
 * Web Widgets: Navigation Arrows
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/web-widgets
 * https://www.stevenlyles.net
 * ======================================================================================
 */
'use strict';

//=======================================================================
// These dictionaries will be populated by the constructors and will keep
// track of each instance's configuration for use by the callbacks
let config_nav_arrows = {};
let config_indicator = {};
let config_indicator_nav = {};

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
        config_nav_arrows[this.widget_id] = config;
        config_nav_arrows[this.widget_id]["callback"] = callback;
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
        $(`#${this.id}`).css("height", "auto");
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

        $(".nav-arrow").css( 'cursor', 'pointer' );
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
        $(`#${this.id}`).css("width", "auto");
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

        $(".nav-arrow").css( 'cursor', 'pointer' );
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
class Indicator {
    //======================================================================================
    constructor(container_id, content) {
        this.widget_id = Utils.gen_unique_id_from(container_id);
        config_indicator[this.widget_id] = content;
        config_indicator[this.widget_id]["current_index"] = 0;
        config_indicator[this.widget_id]["set_position_to"] = this.set_position_to;
        config_indicator[this.widget_id]["increment_position"] = this.increment_position;
        config_indicator[this.widget_id]["decrement_position"] = this.decrement_position;

        this.content = content;
        this.container_id = container_id;
        this.transition_time = content.transition_time;

        if (this.content.orientation === "column") {
            this.container_height = (content.height_px * content.num_sections) +
                ((content.num_sections-1) * content.spacer_px);
            this.container_width = content.width_px;
            this.offset = this.content.height_px + this.content.spacer_px;
        } else {
            this.container_height = content.height_px;
            this.container_width = (content.width_px * content.num_sections) +
                ((content.num_sections-1) * content.spacer_px);
            this.offset = this.content.width_px + this.content.spacer_px;
        }
        config_indicator[this.widget_id]["offset"] = this.offset;
        this.set_css_for_container(container_id);

        this.hole_class = ".hole-" + this.widget_id;
        this.build_widget(container_id);
        this.hole_class = ".hole-" + this.widget_id;
    }

    //===================================================================================
    get_id() { return this.widget_id; }

    //======================================================================================
    // Allow user to dynamically update to new widget attributes
    update_content_to(new_content) {
        this.content = new_content;
        config_indicator[this.widget_id] = content;
        this.build_widget(this.container_id);
    }

    //======================================================================================
    set_css_for_container(id) {
        $("#" + id).css("width", this.container_width + "px");
        $("#" + id).css("height", this.container_height + "px");
        $("#" + id).css("display", "flex");
        $("#" + id).css("flex-direction", this.content.orientation);
        $("#" + id).css("align-items", "center");
        $("#" + id).css("justify-content", "center");
    }

    //======================================================================================
    set_css_for_background() {
        $("#background-" + this.widget_id).css("background", this.content.color.background);
        $("#background-" + this.widget_id).css("width", this.container_width + "px");
        $("#background-" + this.widget_id).css("height", this.container_height + "px");

        if (this.content.orientation === "column") {
            $("#background-" + this.widget_id).css("border-radius", this.content.height_px/2 + "px");
        } else {
            $("#background-" + this.widget_id).css("border-radius", this.content.width_px/2 + "px");
        }

        $("#background-" + this.widget_id).css("position", "relative");
    }

    //======================================================================================
    set_css_for_indicator() {
        $("#indicator-" + this.widget_id).css("width", this.content.width_px + "px");
        $("#indicator-" + this.widget_id).css("height", this.content.height_px + "px");
        $("#indicator-" + this.widget_id).css("background", this.content.color.indicator);
        $("#indicator-" + this.widget_id).css("border-radius", this.content.width_px/2 + "px");
        $("#indicator-" + this.widget_id).css("position", "absolute");
        $("#indicator-" + this.widget_id).css("top", "0");
        $("#indicator-" + this.widget_id).css("left", "0");
        $("#indicator-" + this.widget_id).css("z-index", "1");
    }

    //======================================================================================
    set_css_for_cover_plate() {
        $("#cover-plate-" + this.widget_id).css("background", this.content.color.cover_plate);
        $("#cover-plate-" + this.widget_id).css("width", this.containter_width + "px");
        $("#cover-plate-" + this.widget_id).css("height", this.container_height + "px");
        if (this.content.orientation === "row") {
            $("#cover-plate-" + this.widget_id).css("display", "flex");
            $("#cover-plate-" + this.widget_id).css("flex-direction", "row");
            $("#cover-plate-" + this.widget_id).css("align-items", "center");
            $("#cover-plate-" + this.widget_id).css("justify-content", "center");
        }

        $("#cover-plate-" + this.widget_id).css("z-index", "9");
        $("#cover-plate-" + this.widget_id).css("mix-blend-mode", "hard-light");

        $(".blend-" + this.widget_id).css("position", "absolute");
        $(".blend-" + this.widget_id).css("top", "0");
        $(".blend-" + this.widget_id).css("left", "0");
    }

    //======================================================================================
    set_css_for_holes() {
        $(".hole-" + this.widget_id).css("width", this.content.width_px + "px");
        $(".hole-" + this.widget_id).css("height",this.content.height_px + "px");
        if (this.content.orientation === "column") {
            if (this.content.spacer_px !== 0) {
                $(".hole-" + this.widget_id).css("border-radius", this.content.width_px/2 + "px");
            }
            $(".spacer-" + this.widget_id).css("height", this.content.spacer_px + "px");
            $(".spacer-" + this.widget_id).css("width", this.content.width_px + "px");
        } else {
            if (this.content.spacer_px !== 0) {
                $ (".hole-" + this.widget_id).css("border-radius", this.content.height_px/2 + "px");
            }
            $(".spacer-" + this.widget_id).css("height", this.content.height_px + "px");
            $(".spacer-" + this.widget_id).css("width", this.content.spacer_px + "px");
        }
        $(".hole-" + this.widget_id).css("background-color", "gray");
        $(".hole-" + this.widget_id).css("position", "relative");
        $(".hole").css( 'cursor', 'pointer' );
    }


    //======================================================================================
    build_widget(container_id) {

        // Build & style the background
        $("#" + container_id).append( "<div id='background-" + this.widget_id + "'></div>" );
        this.set_css_for_background();

        // Build & Style the indicator
        $("#background-" + this.widget_id).append(   "<div id='indicator-" + this.widget_id + "'></div>");
        this.set_css_for_indicator();

        // Build & style the cover plate
        $("#background-" + this.widget_id).append(   "<div id='cover-plate-" + this.widget_id + "' class='blend-" + this.widget_id + "'></div>");
        this.set_css_for_cover_plate();

        // Add see-through holes to cover plate
        for (var i = 0; i < this.content.num_sections; i++) {
            $("#cover-plate-" + this.widget_id).append(" <div id='hole-" + this.widget_id + "-" + i + "' class=' hole hole-" + this.widget_id + "'></div>");
            if (i < this.content.num_sections-1) {
                $("#cover-plate-" + this.widget_id).append(" <div class='spacer-" + this.widget_id + "'></div>");
            }
        }
        this.set_css_for_holes();

    }

    //======================================================================================
    set_position_to(pos, duration, id=this.widget_id) {
        if (pos >= 0 && pos < config_indicator[id]["num_sections"]) {

            if (config_indicator[id].current_position !== pos) {
                var d = (duration === 0) ? config_indicator[id].transition_time : duration;
                config_indicator[id].current_position = pos;
                if (config_indicator[id].orientation === "column") {
                    $('#indicator-'+ id).animate({ 'margin-top': config_indicator[id].offset*pos + "px"}, d, "swing");
                } else {
                    $('#indicator-'+ id).animate({ 'margin-left': config_indicator[id].offset*pos + "px"}, d, "swing");
                }
                if ("callback" in config_indicator[id] ) {
                    config_indicator[id].callback.apply(this, [config_indicator[id].current_position]);
                }
            }

        }
    }

    //======================================================================================
    increment_position() { this.set_position_to(this.current_position+1, 0); }
    decrement_position() { this.set_position_to(this.current_position-1, 0); }

} /* class Indicator */


//=======================================================================================
class IndicatorNavigation {
    constructor(container_id, config, callback) {
        this.widget_id = Utils.gen_unique_id_from(container_id);
        config_indicator_nav[this.widget_id] = config;

        config_indicator_nav[this.widget_id]["current_index"] = 0;

        this.indicator = new Indicator(container_id, config, callback);
        if (config.orientation == "column") {
            this.arrows = new NavArrowsVertical(container_id, config["arrow"], this.arrow_callback);
        } else {
            this.arrows = new NavArrowsHorizontal(container_id, config["arrow"], this.arrow_callback);
        }
        config_nav_arrows[this.arrows.get_id()]["indicator_id"] = this.indicator.get_id();
        config_indicator[this.indicator.get_id()]["callback"] = callback;
    }

    // Callback for the nav arrows to use in this widget
    arrow_callback(arrow, id) {
        let indicator_id = config_nav_arrows[id]["indicator_id"];
        if (arrow == "up" || arrow == "left") {
            increment_indicator(indicator_id);
        } else if (arrow == "down" || arrow == "right") {
            decrement_indicator(indicator_id);
        }
    }

} /* class IndicatorNavigation */

//=======================================================================================
class IndicatorPulse {} /* class IndicatorPulse */
//=======================================================================================
class IndicatorMeter {} /* class IndicatorMeter */

//----------------
// Helper Methods
//----------------

//=======================================================================================
// Changes the arrows to hover state with mouse in/out
// @param [String] node_id - id of html node cursor is hovering over
// @param [String] direction = in or out state of hover ("in" or "out")
function hover_arrow(node_id, direction) {
    let border = "";
    let arrow_type = `${node_id}`.split("-")[0];
    switch(arrow_type) {
        case "up":
            border = "border-bottom";
            break;
        case "down":
            border = "border-top";
            break;
        case "left":
            border = "border-right";
            break;
        case "right":
            border = "border-left";
    }
    let id = `${node_id}`.split("-")[1];
    let border_size = config_nav_arrows[id].size*config_nav_arrows[id].aspect;
    if (direction == "in") {
        $(`#${arrow_type}-${id}`).css(border, `${border_size}px solid ${config_nav_arrows[id].hover}`);
    } else {
        $(`#${arrow_type}-${id}`).css(border, `${border_size}px solid ${config_nav_arrows[id].color}`);
    }
}

//=======================================================================================
// Increments the indicator on instance with given id
// @param [String] widget id of instance
function increment_indicator(id) {
    if (config_indicator[id].current_index > 0) {
        config_indicator[id].current_index -= 1;
        config_indicator[id].set_position_to.apply(this, [config_indicator[id].current_index, 0, id]);
    }
}

//=======================================================================================
// Decrements the indicator on instance with given id
// @param [String] widget id of instance
function decrement_indicator(id) {
    if (config_indicator[id].current_index < config_indicator[id].num_sections - 1) {
        config_indicator[id].current_index += 1;
        config_indicator[id].set_position_to.apply(this, [config_indicator[id].current_index, 0, id]);
    }
}

//=======================================================================================
// Callbacks for user events
$(document).ready(function() {

    //-------------------------------------------------------------------------------------
    // Handle arrow click; passes which arrow ("up", "down", "left", "right") & instance id
    $(".nav-arrow").click( function() {
        let id = `${this.id}`.split("-")[1];
        let direction = `${this.id}`.split("-")[0];
        config_nav_arrows[id].callback.apply(this, [direction, id]);
    });

    //-----------------------------
    // Handle hover over nav arrows
    $(".nav-arrow").hover( function() {
        hover_arrow(this.id, "in");
    }, function() {
        hover_arrow(this.id, "out");
    });

    //---------------------------------------------------------
    // Handle moving indicator by clicking on position
    $(".hole").click( function() {
        let index = parseInt(this.id.split("-")[2]);
        let id = `${this.id}`.split("-")[1];
        config_indicator[id].set_position_to.apply(this, [index, 0, id]);
        $("#page-0").animate( {'margin-top' : -(index*310)}, 500);
        config_indicator[id].current_index = index;
    });

    //----------------------------------------
    // Handle moving indicator with arrow keys
    // NOTE: only works if single instance of
    //       indicator on parent page
    $(document).keydown(function(e) {
        if (Object.keys(config_indicator).length == 1) { // arrow keys can only work when page has 1 indicator
            let id = Object.keys(config_indicator)[0];

            if (config_indicator[id].orientation == "column") {   // Vertical
                if (e.keyCode == 38) { increment_indicator(id); } // move up
                if (e.keyCode == 40) { decrement_indicator(id); } // move down
            }

            if (config_indicator[id].orientation == "row") {      // Horizontal
                if (e.keyCode == 37) { increment_indicator(id); } // move left
                if (e.keyCode == 39) { decrement_indicator(id); } // move right or wrap
            }
        }
    });
});
