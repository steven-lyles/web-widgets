
/* ======================================================================================
 * Web Widgets: Full Demo Configurations
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/web-widgets
 * https://www.stevenlyles.net
 * ======================================================================================
 */

//--------------------------
// Define the page color map
let colors = {
    "black"        : { "hex" : "#000000", "rgb" : "0,0,0"},
    "white"        : { "hex" : "#ffffff", "rgb" : "255,255,255"},
    "ghost"        : { "hex" : "#88bbff", "rgb" : "136,187,255"},
    "evening"      : { "hex" : "#2255ff", "rgb" : "34,85,255"},
    "midnight"     : { "hex" : "#1111ee", "rgb" : "17,17,238"},
    "martian"      : { "hex" : "#99dd66", "rgb" : "153,221,102"},
    "cloudwhite"   : { "hex" : "#E4E5DD", "rgb" : "228,229,221"},
    "parchment"    : { "hex" : "#ffcc99", "rgb" : "255,204,153"},
    "galaxy"       : { "hex" : "#444a77", "rgb" : "68,74,119"},
    "periwinkle"   : { "hex" : "#aaaaff", "rgb" : "170,170,255"},
    "pumpkin"      : { "hex" : "#f0781e", "rgb" : "240,120,30"},
    "sunflower"    : { "hex" : "#ffcc66", "rgb" : "255,204,102"},
    "moonbeam"     : { "hex" : "#ccdeff", "rgb" : "204,222,255"},
    "tangerine"    : { "hex" : "#ff8833", "rgb" : "255,136,51"},
    "pumpkinshade" : { "hex" : "#ff7744", "rgb" : "255,119,68"},
    "mars"         : { "hex" : "#dd4444", "rgb" : "221,68,68"},
    "stop"         : { "hex" : "#ff2200", "rgb" : "255,34,0"},
    "battleship"   : { "hex" : "#666688", "rgb" : "102,102,136"},
    "dusk"         : { "hex" : "#5E7279", "rgb" : "145,163,170"},
    "shore"        : { "hex" : "#91A3AA", "rgb" : "94,114,121"},
    "linen"        : { "hex" : "#dddad1", "rgb" : "221,218,209"},
    "cappuccino"   : { "hex" : "#b3a68b", "rgb" : "179,166,139"},
    "huntergreen"  : { "hex" : "#355e3b", "rgb" : "53,94,59"},
    "charcoal"     : { "hex" : "#747371", "rgb" : "116,115,113"},
    "obsidian"     : { "hex" : "#251e1a", "rgb" : "37,30,26"},
    "pumice"       : { "hex" : "#dfdfdf", "rgb" : "223,223,223"},
    "mmred"        : { "hex" : "#7c1212", "rgb" : "124,18,18"},
    "turquoise"    : { "hex" : "#40e0d0", "rgb" : "64,224,208"},
    "ice"          : { "hex" : "#88ccff", "rgb" : "136,204,255"},
    "calm"         : { "hex" : "#87bbda", "rgb" : "135,187,218"},
    "go"           : { "hex" : "#00bb00", "rgb" : "0,187,0"},
    "deepwoods"    : { "hex" : "#27322c", "rgb" : "39,50,44"},
    "parrishblue"  : { "hex" : "#0047AB", "rgb" : "0,71,171" },
    "cool"         : { "hex" : "#5588ff", "rgb" : "85,136,255" },
    "yellow"       : { "hex" : "#ffff00", "rgb" : "255,255,0" }
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
    "border_radius" : "5px",
    "hover_color" : "martian",
    "button" : [
        { "txt" : "BUTTONS",  "color" : "pumpkinshade", "icon" : "./assets/stations.svg"},
        { "txt" : "DIVIDERS", "color" : "sunflower",    "icon" : "./assets/gear.svg"},
        { "txt" : "INDICATORS", "color" : "cappuccino",     "icon" : "./assets/results2.svg"},
        { "txt" : "SELECTION", "color" : "calm",     "icon" : "./assets/results2.svg"},
        { "txt" : "MISC", "color" : "moonbeam",     "icon" : "./assets/results2.svg"}
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
        { "txt": "Group", "active" : true },
        { "txt": "Stack",   "active" : true },
        { "txt": "List",   "active" : true }
    ]
}