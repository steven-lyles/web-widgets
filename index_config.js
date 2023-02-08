
/* ======================================================================================
 * Web Widgets: Full Demo Configurations
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/web-widgets
 * https://www.stevenlyles.net
 * ======================================================================================
 */

// Configuration for the top subject divider
let web_widgets_div_config = {
    "color": "evening",
    "txt_primary" : "WEB WIDGETS",
    "txt_secondary" : "ONLINE",
    "height" : 40, // px
    "font" : "Antonio",
    "font_color" : "moonbeam"
}

//-----------------------------------------
// Configuration for horizontal footer bars
let horz_divider_footer_config = {
    "height"    : 14,        // in pixels; vertical height of divider bars
    "gap_size"  : 5,         // in pixels; size of gap between bars (always on right)
    "gap_color" : "black",   // color of gap between bars; should match page background
    "bars" : [
        {
            "flex": true,      // bar can stretch to width or shrink as window is resized
            "half": false,     // bar is half height as a demarcation
            "width": "320px",  // horizontal width of bar
            "color": "evening" // bar color (reference color_map.json)
        },
        {
            "flex": false,
            "half": false,
            "width": "40px",
            "color": "tangerine"
        },
        {
            "flex": false,
            "half": true,
            "location" : "top",
            "width": "200px",
            "color": "moonbeam"
        },
        {
            "flex": true,
            "half": false,
            "width": "200px",
            "color": "midnight"
        },
        {
            "flex": false,
            "half": false,
            "width": "50px",
            "color": "galaxy"
        }
    ]
}

//----------------------------------------
// Configuration for Category button stack
let button_stack_config = {
    "font_size" : 18, // px
    "font_color": "black",
    "width" : 160, // px
    "height" : 50,
    "spacing" : "5px",
    "border_radius" : "5px",
    "hover_color" : "martian",
    "button" : [
        { "txt" : "BUTTONS",  "color" : "pumpkinshade", "icon" : "./assets/buttons.svg"},
        { "txt" : "DIVIDERS", "color" : "sunflower",    "icon" : "./assets/dividers.svg"},
        { "txt" : "INDICATORS", "color" : "cappuccino",     "icon" : "./assets/indicators.svg"},
        { "txt" : "SELECTION", "color" : "calm",     "icon" : "./assets/selection.svg"},
        { "txt" : "MISC", "color" : "moonbeam",     "icon" : "./assets/misc.svg"}
    ]
}

//------------------------------------------------
// Configuration for the HOME subject button group
let button_group_home_config = {
    "font" : "400 15px/1.5 \"Antonio\", \"Arial Narrow\", \"Avenir Next Condensed\", sans-serif",
    "font-size" : "1.0em",
    "font_color" : "black",
    "background_color" : "evening",
    "width" : "100px",
    "height": "25px",
    "justify_content" : "left",
    "border_radius": "20px",
    "hover_color" : "martian",
    "hover_outline" : "martian",
    "active_color" :  "martian",
    "inactive_color" : "galaxy",
    "selected_index" : 0,
    "buttons" : [
        { "txt": "WELCOME", "active" : true },
        { "txt": "USAGE",   "active" : true }
    ]
}

//------------------------------------------------
// Configuration for the BUTTONS type button group
let button_group_buttons_config = {
    "font" : "400 15px/1.5 \"Antonio\", \"Arial Narrow\", \"Avenir Next Condensed\", sans-serif",
    "font-size" : "1.0em",
    "font_color" : "black",
    "background_color" : "evening",
    "width" : "100px",
    "height": "25px",
    "justify_content" : "left",
    "border_radius": "20px",
    "hover_color" : "martian",
    "hover_outline" : "martian",
    "active_color" :  "martian",
    "inactive_color" : "galaxy",
    "selected_index" : 0,
    "buttons" : [
        { "txt": "Accordion", "active" : true },
        { "txt": "Links",   "active" : true },
        { "txt": "Group",   "active" : true }
    ]
}

//------------------------------------------------
// Configuration for the DIVIDER type button group
let button_group_dividers_config = {
    "font" : "400 15px/1.5 \"Antonio\", \"Arial Narrow\", \"Avenir Next Condensed\", sans-serif",
    "font-size" : "1.0em",
    "font_color" : "black",
    "background_color" : "evening",
    "width" : "100px",
    "height": "25px",
    "justify_content" : "left",
    "border_radius": "20px",
    "hover_color" : "martian",
    "hover_outline" : "martian",
    "active_color" :  "martian",
    "inactive_color" : "galaxy",
    "selected_index" : 0,
    "buttons" : [
        { "txt": "Subject", "active" : true },
        { "txt": "Bars",   "active" : true }
    ]
}

let button_group_indicators_config = {
    "font" : "400 15px/1.5 \"Antonio\", \"Arial Narrow\", \"Avenir Next Condensed\", sans-serif",
    "font-size" : "1.0em",
    "font_color" : "black",
    "background_color" : "evening",
    "width" : "100px",
    "height": "25px",
    "justify_content" : "left",
    "border_radius": "20px",
    "hover_color" : "martian",
    "hover_outline" : "martian",
    "active_color" :  "martian",
    "inactive_color" : "galaxy",
    "selected_index" : 0,
    "buttons" : [
        { "txt": "Vertical", "active" : true },
        { "txt": "Horizontal",   "active" : true },
        { "txt": "Meter",   "active" : true },
        { "txt": "Progress",   "active" : true },
        { "txt": "Novel",   "active" : true }
    ]
}