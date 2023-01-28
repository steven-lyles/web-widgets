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
                $(`#${container_id}`).append(`<div id='selection-${index}-${widget_id}' class='choice-${widget_id} choice'></div>`);
                $(`#selection-${index}-${widget_id}`).append(`<div id='selection-${index}-button-${widget_id}' class='button-${widget_id}'>${value["name"]}</div>`);
                $(`#selection-${index}-${widget_id}`).append(`<div id='selection-${index}-desc-${widget_id}', class='desc-${widget_id}'>${value["desc"]}</div>`);
                $(`#${container_id}`).append(`<div id='content-${index}-container-${widget_id}' class='hidden-${widget_id}'></div>`);
                $(`#content-${index}-container-${widget_id}`).append(`<div id='content-${index}-${widget_id}' class='content-${widget_id}'></div>`);

                let target_page = `<iframe id='content'-${index}-src-${widget_id} src='${value.link}' class='page-content-${widget_id}'></iframe>`;
                $(`#content-${index}-${widget_id}`).append(target_page);

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
        $(`#${this.id}`).css("gap", config.gap);
        $(`#${this.id}`).css("height", "auto");
        $(`#${this.id}`).css("width", "99%");
        $(`#${this.id}`).css("padding", "10px");

        $(`.choice-${this.widget_id}`).css("display", "flex");
        $(`.choice-${this.widget_id}`).css("flex-direction", "row");
        $(`.choice-${this.widget_id}`).css("background", config.color_map[ config["background_color"] ].hex);
        $(`.choice-${this.widget_id}`).css("width", config["width"]);
        let h = parseInt(config["height"].replace('px', '')) + 4; // adjust height for borders
        $(`.choice-${this.widget_id}`).css("height", h.toString() + "px");
        $(`.choice-${this.widget_id}`).css("float", "left");
        $(`.choice-${this.widget_id}`).css("cursor", "pointer");
        $(`.choice-${this.widget_id}`).css("margin-right", "20px");

        $(`.button-${this.widget_id}`).css("background", config.color_map[ config["button"]["background_color"] ].hex);
        $(`.button-${this.widget_id}`).css("color", config.color_map[ config["button"]["font_color"] ].hex);
        $(`.button-${this.widget_id}`).css("width", config["button"]["width"]);
        $(`.button-${this.widget_id}`).css("height", config["height"]);
        $(`.button-${this.widget_id}`).css("font-size", config["button"]["font_size"]);
        $(`.button-${this.widget_id}`).css("display", "flex");
        $(`.button-${this.widget_id}`).css("align-items", "center");
        $(`.button-${this.widget_id}`).css("justify-content", "center");
        $(`.button-${this.widget_id}`).css("border-top", "2px solid " + config["button"]["background_color"]);
        $(`.button-${this.widget_id}`).css("border-bottom", "2px solid " + config["button"]["background_color"]);
        $(`.button-${this.widget_id}`).css("border-left", "2px solid " + config["button"]["background_color"]);
        $(`.button-${this.widget_id}`).css("border-radius", config["button"]["border_radius"] + " 0px 0px " + config["button"]["border_radius"]);

        $(`.desc-${this.widget_id}`).css("background-color", config.color_map[ config["description"]["background_color"] ].hex);
        $(`.desc-${this.widget_id}`).css("color", config.color_map[ config["description"]["font_color"] ].hex);
        $(`.desc-${this.widget_id}`).css("width", config["description"]["width"]);
        $(`.desc-${this.widget_id}`).css("height", (h-8).toString() + "px");
        $(`.desc-${this.widget_id}`).css("font-size", config["description"]["font_size"]);
        $(`.desc-${this.widget_id}`).css("display", "flex");
        $(`.desc-${this.widget_id}`).css("align-items", "center");
        $(`.desc-${this.widget_id}`).css("justify-content", "flex-start");
        $(`.desc-${this.widget_id}`).css("border-top", "2px solid " + config.color_map[ config["description"]["outline_color"] ].hex);
        $(`.desc-${this.widget_id}`).css("border-bottom", "2px solid " + config.color_map[ config["description"]["outline_color"] ].hex);
        $(`.desc-${this.widget_id}`).css("border-right", "2px solid " + config.color_map[ config["description"]["outline_color"] ].hex);
        $(`.desc-${this.widget_id}`).css("border-radius", "0px " + config["description"]["border_radius"] + " " + config["description"]["border_radius"] + " 0px");
        $(`.desc-${this.widget_id}`).css("padding-left", "20px");
        $(`.desc-${this.widget_id}`).css("text-decoration", "none");

        if (config["accordion"]) {
            $(`.content-${this.widget_id}`).css("display", "flex");
            $(`.content-${this.widget_id}`).css("flex-direction", "column");
            $(`.content-${this.widget_id}`).css("justify-content", "center");
            $(`.content-${this.widget_id}`).css("background-color", "white");
            $(`.content-${this.widget_id}`).css("width", "100%");
            $(`.content-${this.widget_id}`).css("height", "100%");
            $(`.content-${this.widget_id}`).css("float", "left");
            $(`.content-${this.widget_id}`).css("cursor", "pointer");

            $(`.page-content-${this.widget_id}`).css("overflow-y", "scroll");
            $(`.page-content-${this.widget_id}`).css("border", "none");
            $(`.page-content-${this.widget_id}`).css("height", "100%");
            $(`.page-content-${this.widget_id}`).css("margin-bottom", "15px");

            $(`.hidden-${this.widget_id}`).css("display", "none");
            $(`.hidden-${this.widget_id}`).css("margin-left", "10px");
            $(`.hidden-${this.widget_id}`).css("margin-right", "10px");
            $(`.hidden-${this.widget_id}`).css("background-color", "pink");

            let id = this.widget_id;
            $.each(config["items"], function( index, value ) {
                console.log(`#content-${index}-container-${id}`);
                $(`#content-${index}-container-${id}`).css("height", `${value.size + 30}px`);
            });
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
        let count = $(`.choice-${id}`).length;

        for (let i = 0; i < count; i++) {
            if (i == index) {
                $(`#content-${i}-container-${id}`).slideToggle("slow");
            }
            else {
                $(`#content-${i}-container-${id}`).slideUp("medium");
            }
        }
    });
});