/*
 * Web Widgets - Indicator
 * Created by Steven M. Lyles
 */
'use strict';

let callbackVert = null;
let size_vert = 10;
let color_vert = "blue";
let hover_vert = "green";

let callbackHorz = null;
let size_horz = 10;
let color_horz = "blue";
let hover_horz = "green";

//======================================================================================
function gen_unique_id_from(str) {
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

//=======================================================================================
class NavArrow {
    constructor(container_id, config) {
        this.config = config;
        this.id = container_id;
        this.widget_id = gen_unique_id_from(container_id);
    }
}

//=======================================================================================
class NavArrowsVertical extends NavArrow {
    constructor(container_id, config, callback) {
        super(container_id, config);
        this.build_widget();
        callbackVert = callback;
        size_vert = config.size;
        color_vert = config.color;
        hover_vert = config.hover;
    }

    set_css_vert() {
        $(".nav-arrow-up").css("border-left", `${this.config.size}px solid transparent`);
        $(".nav-arrow-up").css("border-right", `${this.config.size}px solid transparent`);
        $(".nav-arrow-up").css("border-bottom", `${this.config.size*3}px solid ${this.config.color}`);
        if (this.config.rounded) { $(".nav-arrow-up").css("border-radius", "50%"); }

        $(".nav-arrow-down").css("border-left", `${this.config.size}px solid transparent`);
        $(".nav-arrow-down").css("border-right",`${this.config.size}px solid transparent`);
        $(".nav-arrow-down").css("border-top", `${this.config.size*3}px solid ${this.config.color}`); // cadet blue: #32557f
        if (this.config.rounded) { $(".nav-arrow-down").css("border-radius", "50%"); }
    }

    build_widget() {
        $("#" + this.id).prepend("<div id='up-" + this.widget_id + "'class='nav-arrow-up'></div>");
        $("#" + this.id).append("<div id='down-" + this.widget_id + "'class='nav-arrow-down'></div>");
        this.set_css_vert();
    }
}

//=======================================================================================
class NavArrowsHorizontal extends NavArrow {
    constructor(container_id, config, callback) {
        super(container_id, config);
        this.build_widget();
        callbackHorz = callback;
        size_horz = config.size;
        color_horz = config.color;
        hover_horz = config.hover;
    }

    set_css_horz() {
        $(".nav-arrow-left").css("border-top", `${this.config.size}px solid transparent`);
        $(".nav-arrow-left").css("border-bottom", `${this.config.size}px solid transparent`);
        $(".nav-arrow-left").css("border-right", `${this.config.size*3}px solid ${this.config.color}`);
        if (this.config.rounded) { $(".nav-arrow-left").css("border-radius", "50%"); }

        $(".nav-arrow-right").css("border-top", `${this.config.size}px solid transparent`);
        $(".nav-arrow-right").css("border-bottom",`${this.config.size}px solid transparent`);
        $(".nav-arrow-right").css("border-left", `${this.config.size*3}px solid ${this.config.color}`); // cadet blue: #32557f
        if (this.config.rounded) { $(".nav-arrow-right").css("border-radius", "50%"); }
    }

    build_widget() {
        $("#" + this.id).prepend("<div id='left-" + this.widget_id + "'class='nav-arrow-left'></div>");
        $("#" + this.id).append("<div id='right-" + this.widget_id + "'class='nav-arrow-right'></div>");
        this.set_css_horz();
    }
}

//=======================================================================================
$(document).ready(function() {

    $(".nav-arrow-up").click( function() { callbackVert("up") });
    $(".nav-arrow-down").click( function() { callbackVert("down") });
    $(".nav-arrow-left").click( function() { callbackHorz("left") });
    $(".nav-arrow-right").click( function() { callbackHorz("right") });

    $(".nav-arrow-up").hover(function(){
        $(this).css("border-bottom", `${size_vert*3}px solid ${hover_vert}`);
        $(this).css("cursor", "pointer");
    }, function(){
        $(this).css("border-bottom", `${size_vert*3}px solid ${color_vert}`);
        $(this).css("cursor", "default");
    });

    $(".nav-arrow-down").hover(function(){
        $(this).css("border-top", `${size_vert*3}px solid ${hover_vert}`);
        $(this).css("cursor", "pointer");
    }, function(){
        $(this).css("border-top", `${size_vert*3}px solid ${color_vert}`);
        $(this).css("cursor", "default");
    });

    $(".nav-arrow-left").hover(function(){
        $(this).css("border-right", `${size_horz*3}px solid ${hover_horz}`);
        $(this).css("cursor", "pointer");
    }, function(){
        $(this).css("border-right", `${size_horz*3}px solid ${color_horz}`);
        $(this).css("cursor", "default");
    });

    $(".nav-arrow-right").hover(function(){
        $(this).css("border-left", `${size_horz*3}px solid ${hover_horz}`);
        $(this).css("cursor", "pointer");
    }, function(){
        $(this).css("border-left", `${size_horz*3}px solid ${color_horz}`);
        $(this).css("cursor", "default");
    });
});