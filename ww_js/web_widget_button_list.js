/*
 * Web Widgets - Button List
 * Created by Steven M. Lyles
 */
'use strict';

//=======================================================================================
// Web Widget Button Menu List Class
//---------------------------------------------------------------------------------------
class WebWidgetMenuList {
    //===================================================================================
    constructor(container_id, config) {
        this.set_css(config);
        this.setup_list(container_id, config);
        this.set_css(config);
    }

    //===================================================================================
    // Iterate over item content list and populate container
    setup_list(container_id, config) {
        $.each(config["items"], function( index, value ) {
            if (config["accordion"]) {
                $("#" + container_id).append("<div id='selection_" + index + "' class='choice'></div>");
                $("#selection_" + index).append("<div id='selection_" + index + "_button' class='button'>" + value["name"] + "</div>");
                $("#selection_" + index).append("<div id='selection_" + index + "_desc' class='desc'>" + value["desc"] + "</div>");

                $("#" + container_id).append("<div id='selection-content-container_" + index + "' class='selection-content-container'></div>");
                let embedded_page = "";
                embedded_page += "<embed id='selection_page_" + index;
                embedded_page += "' type='text/html' ";
                embedded_page += "src='" + value["link"] + "' ";
                embedded_page += "width='" + value["width"] + "' height='" + value["height"] + "'>";
                console.log(embedded_page);
                $("#selection-content-container_" + index).append(embedded_page);

            } else {
                $("#" + container_id).append("<a id='link_" + index + "' href='" + value["link"] + "' target='_blank'></a>");
                $("#link_" + index).append("<div id='selection_" + index + "' class='choice'></div>");
                $("#selection_" + index).append("<div id='selection_" + index + "_button' class='button'>" + value["name"] + "</div>");
                $("#selection_" + index).append("<div id='selection_" + index + "_desc' class='desc'>" + value["desc"] + "</div>");

            }
        });
    }

    //===================================================================================
    // Build css styling
    set_css(config) {
        $("a").css("text-decoration", "none");
        $("a").css("outline", "0");

        $(".menu-box").css("background-color", config["background_color"]);
        $(".menu-box").css("display", "flex");
        $(".menu-box").css("flex-direction", "column");
        $(".menu-box").css("gap", "10px");
        $(".menu-box").css("height", "auto");
        $(".menu-box").css("width", "100%");
        $(".menu-box").css("padding-top", "10px");

        $(".choice").css("display", "flex");
        $(".choice").css("flex-direction", "row");
        $(".choice").css("background", config["background_color"]);
        $(".choice").css("width", config["width"]);
        let h = parseInt(config["height"].replace('px', '')) + 4; // adjust height for borders
        $(".choice").css("height", h.toString() + "px");
        $(".choice").css("float", "left");
        $(".choice:hover").css("cursor", "pointer");

        $(".button").css("background", config["button"]["background_color"]);
        $(".button").css("color", config["button"]["font_color"]);
        $(".button").css("width", config["button"]["width"]);
        $(".button").css("height", config["height"]);
        $(".button").css("font-size", config["button"]["font_size"]);
        $(".button").css("display", "flex");
        $(".button").css("align-items", "center");
        $(".button").css("justify-content", "center");
        $(".button").css("border-top", "2px solid " + config["button"]["background_color"]);
        $(".button").css("border-bottom", "2px solid " + config["button"]["background_color"]);
        $(".button").css("border-left", "2px solid " + config["button"]["background_color"]);
        $(".button").css("border-radius", config["button"]["border_radius"] + " 0px 0px " + config["button"]["border_radius"]);

        $(".desc").css("background-color", config["description"]["background_color"]);
        $(".desc").css("color", config["description"]["font_color"]);
        $(".desc").css("width", config["description"]["width"]);
        $(".desc").css("height", config["height"]);
        $(".desc").css("font-size", config["description"]["font_size"]);
        $(".desc").css("display", "flex");
        $(".desc").css("align-items", "center");
        $(".desc").css("justify-content", "flex-start");
        $(".desc").css("border-top", "2px solid " + config["description"]["outline_color"]);
        $(".desc").css("border-bottom", "2px solid " + config["description"]["outline_color"]);
        $(".desc").css("border-right", "2px solid " + config["description"]["outline_color"]);
        $(".desc").css("border-radius", "0px " + config["description"]["border_radius"] + " " + config["description"]["border_radius"] + " 0px");
        $(".desc").css("padding-left", "20px");

        if (config["accordion"]) {
            console.log("ACCORDION");
            $(".selection-content-container").css("background-color", config["accordion-content"]["background_color"]);
            $(".selection-content-container").css("margin-left", config["accordion-content"]["margin_left"]);
            $(".selection-content-container").css("display", "none");
            let adjust = parseInt(config["accordion-content"]["margin_left"].replace('px', '')) * 2;
            let width = parseInt(config["width"].replace('px', "")) - adjust; // adjust for margins
            $(".selection-content-container").css("width", width + "px");
            $(".selection-content-container").css("height", "auto");
        }
    }

} // class WebWidgetMenuList

//========================================================================================
$(document).ready(function() {

    //----------------------------
    // Handle button hover changes
    $( ".choice" ).hover( function() {
        // menu_widget.hover_in(this.id);
        $("#" + this.id + "_button").css( "color", config["button"]["hover_text_color"] );
        $("#" + this.id + "_desc").css( "color", config["description"]["hover_text_color"] );
        $(".choice").css("cursor", "pointer");
    }, function() {
        // menu_widget.hover_out(this.id);
        $("#" + this.id + "_button").css( "color", config["button"]["font_color"] );
        $("#" + this.id + "_desc").css( "color", config["description"]["font_color"] );
        $(".choice").css("cursor", "default");
    });

    //--------------------------------------------------------------------------------
    $( ".choice" ).click( function() {
        let index = parseInt(this.id.split("_")[1]);
        let count = $('.selection-content-container').length;

        for (let i = 0; i < count; i++) {
            if (i == index) {
                $("#selection-content-container_" + i).slideToggle("slow");
            }
            else {
                $("#selection-content-container_" + i).slideUp("medium");
            }
        }
    });
});