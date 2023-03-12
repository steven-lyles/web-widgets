/*
 * ======================================================================================
 * Web Widgets: widget name
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/web-widgets
 * ======================================================================================
 */
'use strict';

//=======================================================================================
// Creates a widget for displaying time and date based on the local machine
class WidgetName {
  constructor(container_id, config, colors, callback) {
    this.config = config;
    this.id = container_id;
    this.color_map = colors;
    this.callback = callback;

    this.gen_widget();
    this.gen_css();
  }

  //===================================================================================
  gen_css() {
  }

  //===================================================================================
  gen_widget() {
  }

} /* class WidgetName */

$(document).ready(function() {

});