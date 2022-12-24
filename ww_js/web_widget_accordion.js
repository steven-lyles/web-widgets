/*
 * Web Widgets - Button Menu List
 * Created by Steven M. Lyles
 */
'use strict';

//=======================================================================================
// Web Widget Button Menu List Class
//---------------------------------------------------------------------------------------
class WebWidgetMenuList {
    //===================================================================================
    constructor(container_id, config) {
        this.setup_list(container_id, config);
        this.set_css(config);
    }

    //===================================================================================
    // Iterate over item content list and populate container
    setup_list(container_id, config) {
        $.each(config["items"], function( index, value ) {
            // $("#" + container_id).append("<a id='link_" + index + "' href='" + value["link"] + "'></a>");
            $("#" + container_id).append("<div id='selection_" + index + "' class='choice'></div>");
            $("#selection_" + index).append("<div id='selection_" + index + "_button' class='button'>" + value["name"] + "</div>");
            $("#selection_" + index).append("<div id='selection_" + index + "_desc' class='desc'>" + value["desc"] + "</div>");

            // $("#" + container_id).append("<div id='selection-content-container_'" + index + " className='selection-content-container'></div>");
            // %("#selection-content-container_" + index).append("<embed id='demo_page_0' type='text/html' src='indicator_vertical_demo.html' width='80' height='450' style='background: black;'>");


            let txt = "";
            // txt += "<a id='link_" + index + "' href='" + value["link"] + "'>\n";
            txt += "  <div id='selection_" + index + "' class='choice'>\n";
            txt += "    <div id='selection_" + index + "_button' class='button'>" + value["name"] + "</div>\n";
            txt += "    <div id='selection_" + index + "_desc' class='desc'>" + value["desc"] + "</div>\n";
            txt += "  </div>\n";
            // txt += "</a>\n";
            console.log(txt);
            console.log("");
        });
    }

    //===================================================================================
    // Build css styling
    set_css(config) {
        $("p").css("font-size", config["font_size"]);
        $("a").css("text-decoration", "none");
        $("a").css("outline", "0");

        $(".menu-box").css("background-color", config["background_color"]);
        $(".menu-box").css("display", "flex");
        $(".menu-box").css("flex-direction", "column");
        $(".menu-box").css("justify-content", "space-between");
        $(".menu-box").css("height", "auto");
        $(".menu-box").css("width", "100%");
        $(".menu-box").css("padding-top", "10px");

        $(".choice").css("background", config["background_color"]);
        $(".choice").css("width", config["width"]);
        $(".choice").css("float", "left");
        $(".choice").css("margin-bottom", "10px");

        $(".button").css("display", "inline");
        $(".button").css("float", "left");
        $(".button").css("border-radius", "25px 0px 0px 25px");
        $(".button").css("background", config["button"]["background_color"]);
        $(".button").css("color", config["button"]["font_color"]);
        $(".button").css("width", config["button"]["width"]);
        $(".button").css("height", config["button"]["height"]);
        $(".button").css("padding-top", "10px");
        $(".button").css("text-align", "center");
        $(".button").css("font-size", config["font_size"]);
        $(".button:hover").css("cursor", "pointer");

        $(".desc").css("font-size", config["description"]["font_size"]);
        $(".desc").css("color", config["description"]["font_color"]);
        $(".desc").css("background-color", config["description"]["background_color"]);
        $(".desc").css("width", config["description"]["width"]);
        $(".desc").css("height", config["description"]["height"]);
        $(".desc").css("float", "left");
        $(".desc").css("padding-left", "20px");
        $(".desc").css("display", "flex");
        $(".desc").css("align-items", "center");
        $(".desc").css("border-top", "2px solid " + config["description"]["outline_color"]);
        $(".desc").css("border-bottom", "2px solid " + config["description"]["outline_color"]);
        $(".desc").css("border-right", "2px solid " + config["description"]["outline_color"]);
        $(".desc").css("padding-top", "3px");
        $(".desc").css("padding-bottom", "3px");
        $(".desc").css("border-radius", "0px 25px 25px 0px");
    }

    //===================================================================================
    // What to do when the cursor hovers over a button item
    hover_in(id) {
        $("#" + id + "_button").css( "color", config["button"]["hover_text_color"] );
        $("#" + id + "_desc").css( "color", config["description"]["hover_text_color"] );
    }

    //===================================================================================
    // Change items back after cursor hovers out
    hover_out(id) {
        $("#" + id + "_button").css( "color", config["button"]["font_color"] );
        $("#" + id + "_desc").css( "color", config["description"]["font_color"] );
    }

} // class WebWidgetMenuList