/*
 * ======================================================================================
 * Web Widgets - Button List
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/web-widgets
 * https://www.stevenlyles.net
 * ======================================================================================
 */
'use strict';

let bl_config = {};

//=======================================================================================
// Web Widget Button Menu List Class
//---------------------------------------------------------------------------------------
class WebWidgetMenuList {
    //===================================================================================
    constructor(container_id, config, color) {
        config["color_map"] = color;
        this.widget_id = Utils.gen_unique_id(container_id);
        this.config = config;

        bl_config[this.widget_id] = this.config;
        this.id = container_id;

        this.gen_widget(container_id, config, this.widget_id);
        this.set_css(config);
    }

    //===================================================================================
    // Iterate over item content list and populate container
    gen_widget(container_id, config, widget_id) {
        $.each(config["items"], function( index, value ) {
            if (config["accordion"]) {
                $(`#${container_id}`).append(`<div id='selection-${index}-${widget_id}' class='choice'></div>`);
                $(`#selection-${index}-${widget_id}`).append(`<div id='selection-${index}-button-${widget_id}' class='button'>${value["name"]}</div>`);
                $(`#selection-${index}-${widget_id}`).append(`<div id='selection-${index}-desc-${widget_id}', class='desc'>${value["desc"]}</div>`);
                $(`#${container_id}`).append(`<div id='selection-content-container-${index}-${widget_id}' class='selection-content-container'></div>`);
                let embedded_page = "";
                embedded_page += `<embed id='selection-page-${index}-${widget_id}`;
                embedded_page += "' type='text/html' ";
                embedded_page += "src='" + value["link"] + "' ";
                embedded_page += "width='" + value["width"] + "' height='" + value["height"] + "'>";
                // console.log(embedded_page);
                $(`#selection-content-container-${index}-${widget_id}`).append(embedded_page);

            } else {
                $(`#${container_id}`).append(`<a id='link-${index}-${widget_id}' href='${value["link"]}' target='_blank'></a>`);
                $(`#link-${index}-${widget_id}`).append(`<div id='selection-${index}-${widget_id}' class='choice'></div>`);
                $(`#selection-${index}-${widget_id}`).append(`<div id='selection-${index}-button-${widget_id} class='button'>${value["name"]}</div>`);
                $(`#selection-${index}-${widget_id}`).append(`<div id='selection-${index}-desc-${widget_id} class='desc'>${value["desc"]}</div>`);
            }
        });
    }

    //===================================================================================
    // Build css styling
    set_css(config) {
        $("a").css("text-decoration", "none");
        $("a").css("outline", "0");

        $(`#${this.id}`).css("background-color", config.color_map[ config["background_color"] ].hex);
        $(`#${this.id}`).css("display", "flex");
        $(`#${this.id}`).css("flex-direction", "column");
        $(`#${this.id}`).css("gap", "10px");
        $(`#${this.id}`).css("height", "auto");
        $(`#${this.id}`).css("width", "100%");
        $(`#${this.id}`).css("padding-top", "10px");

        $(".choice").css("display", "flex");
        $(".choice").css("flex-direction", "row");
        $(".choice").css("background", config.color_map[ config["background_color"] ].hex);
        $(".choice").css("width", config["width"]);
        let h = parseInt(config["height"].replace('px', '')) + 4; // adjust height for borders
        $(".choice").css("height", h.toString() + "px");
        $(".choice").css("float", "left");
        $(".choice:hover").css("cursor", "pointer");

        $(".button").css("background", config.color_map[ config["button"]["background_color"] ].hex);
        $(".button").css("color", config.color_map[ config["button"]["font_color"] ].hex);
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

        $(".desc").css("background-color", config.color_map[ config["description"]["background_color"] ].hex);
        $(".desc").css("color", config.color_map[ config["description"]["font_color"] ].hex);
        $(".desc").css("width", config["description"]["width"]);
        $(".desc").css("height", (h-8).toString() + "px");
        $(".desc").css("font-size", config["description"]["font_size"]);
        $(".desc").css("display", "flex");
        $(".desc").css("align-items", "center");
        $(".desc").css("justify-content", "flex-start");
        $(".desc").css("border-top", "2px solid " + config.color_map[ config["description"]["outline_color"] ].hex);
        $(".desc").css("border-bottom", "2px solid " + config.color_map[ config["description"]["outline_color"] ].hex);
        $(".desc").css("border-right", "2px solid " + config.color_map[ config["description"]["outline_color"] ].hex);
        $(".desc").css("border-radius", "0px " + config["description"]["border_radius"] + " " + config["description"]["border_radius"] + " 0px");
        $(".desc").css("padding-left", "20px");

        if (config["accordion"]) {
            $(".selection-content-container").css("background-color", config.color_map[ config["accordion-content"]["background_color"] ].hex);
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
    $(document).on('mouseenter', '.choice', function() {
        let index = parseInt(`${this.id}`.split("-")[1]);
        let id = `${this.id}`.split("-")[2]
        $(`#selection-${index}-button-${id}`).css( "color", bl_config[id]["color_map"][bl_config[id]["button"]["hover_text_color"]].hex );
        $(`#selection-${index}-desc-${id}`).css( "color",   bl_config[id]["color_map"][bl_config[id]["description"]["hover_text_color"]].hex );
        $(".choice").css("cursor", "pointer");
    });
    $(document).on('mouseleave', '.choice', function(){
        let index = parseInt(`${this.id}`.split("-")[1]);
        let id = `${this.id}`.split("-")[2]
        $(`#selection-${index}-button-${id}`).css( "color", bl_config[id]["color_map"][bl_config[id]["button"]["font_color"]].hex );
        $(`#selection-${index}-desc-${id}`).css( "color",   bl_config[id]["color_map"][bl_config[id]["description"]["font_color"]].hex );
        $(".choice").css("cursor", "default");
    });

    //--------------------------------------------------------------------------------
    $(document).on('click', '.choice', function(){
        let index = (this.id).split("-")[1];
        let id = this.id.split("-")[2]
        let count = $('.selection-content-container').length;

        for (let i = 0; i < count; i++) {
            if (i == index) {
                $(`#selection-content-container-${i}-${id}`).slideToggle("slow");
            }
            else {
                $(`#selection-content-container-${i}-${id}`).slideUp("medium");
            }
        }
    });
});