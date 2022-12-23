
/*
 * Web Widgets - Indicator
 * Created by Steven M. Lyles
 */
'use strict';

//========================================================================================
// Web Widget Indicator Base Class
//
// See individual child classes for specific configurations
//----------------------------------------------------------------------------------------
class WebWidgetIndicator {
  length = [30, 40, 50];
  
  current_position = 0;
  offset = 0;
  
  hole_class = ".hole";
  
  //======================================================================================
  constructor(container_id, content) {
    this.content = content;
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
    this.set_css_for_container(container_id);
    this.widget_id = this.gen_unique_id_from(container_id);
    this.hole_class = ".hole-" + this.widget_id;
    this.build_widget(container_id);
    this.hole_class = ".hole-" + this.widget_id; 
  }
  
  //======================================================================================
  gen_unique_id_from(str) {
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
  
  //======================================================================================
  // Allow user to dynamically update to new widget attributes
  update_content_to(new_content) { 
    this.content = new_content; 
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
  set_position_to(pos, duration = 0) {
    
    if (pos >= 0 && pos < this.content.num_sections) {
    
      if (this.current_position !== pos) {
        var d = (duration === 0) ? this.transition_time : duration;
        this.current_position = pos;
        if (this.content.orientation === "column") {
          $('#indicator-'+ this.widget_id).animate({ 'margin-top': this.offset*pos + "px"}, d, "swing");
        } else {
          $('#indicator-'+ this.widget_id).animate({ 'margin-left': this.offset*pos + "px"}, d, "swing");
        }
      }
      
    }
  }
  
  //======================================================================================
  increment_position() { this.set_position_to(this.current_position+1); }
  decrement_position() { this.set_position_to(this.current_position-1); }
  
} // Class WebWidgetIndicator

//========================================================================================
// Inherits from WebWidgetIndicator and extends functionality to create a widget that
// animates indicator showing position of selection/page/slide/etc
class IndicatorPosition extends WebWidgetIndicator {
  
  //======================================================================================
  constructor(container_id, content) {
    super(container_id, content); // call the super class constructor and pass in parameters
  }
  
} // class IndicatorPosition

//========================================================================================
// Inherits from WebWidgetIndicator and extends functionality to create a widget that
// animates indicator in a pulse in one direction or bounce back and forth
class IndicatorPulse extends WebWidgetIndicator {
  bounce_duration = 1000;
  intervalId = null;
  intervalId_up = null;
  intervalId_down = null;
  
  //======================================================================================
  constructor(container_id, content) {
    super(container_id, content); // call the super class constructor and pass in parameters
  }
  
  //======================================================================================
  bounce(state, glow, color) {
    if (state) { 
      this.indicator_on(color, glow);
      this.intervalId = setInterval(this.timer_bounce, 1000, this); // class "this" contect must be passed to callback timer
    } else {
      this.indicator_off();
      clearInterval(this.intervalId);
    //  if (this.intervalId) { clearInterval(this.intervalId); }
    }
  }
  
  //======================================================================================
  pulse_down(state, color) {
    if (state) { 
      this.indicator_on(color, false);
      this.intervalId_down = setInterval(this.start_timer_pulse_down, 500, this); // class "this" contect must be passed to callback timer
      this.pulse_back(false, color);
    } else {
      this.indicator_off();
      clearInterval(this.intervalId_down);
      this.set_position_to(0, 1);
    }
  }
  
  //======================================================================================
  pulse_back(state, color) {
    if (state) { 
      this.indicator_on(color, false);
      this.intervalId_up = setInterval(this.start_timer_pulse_back, 500, this); // class "this" contect must be passed to callback timer
      this.pulse_down(false, color);
    } else {
      this.indicator_off();
      clearInterval(this.intervalId_up);
      this.set_position_to(0, 1);
    }
  }
  
  //======================================================================================
  indicator_on(color, glow) {
    $('#indicator-'+ this.widget_id).css("background", color);
    if (glow) { $('#indicator-'+ this.widget_id).css("box-shadow", "0px 0 25px 5px " + color); }
  }
  
  //======================================================================================
  indicator_off() {
    $('#indicator-'+ this.widget_id).css("background", this.content.color.indicator);
    $('#indicator-'+ this.widget_id).css("box-shadow", "none");
  }
  
  //======================================================================================
  timer_bounce(self) {
    if (self.current_position === 0) {
      self.set_position_to(self.content.num_sections-1, 1000);
    } else {
      self.set_position_to(0, 1000);
    }
  }
  
  //======================================================================================
  start_timer_pulse_down(self) {  
    if (self.current_position === 0) {
      $('#indicator-'+ self.widget_id).css("background", self.content.color.indicator);
      self.set_position_to(self.content.num_sections-1, 450);
    } else {
      let ref = (self.content.orientation === "row") ? "margin-left" : "margin-top";
      $('#indicator-'+ self.widget_id).css("background", self.content.color.background);
      $('#indicator-'+ self.widget_id).css(ref, "0px");
      self.current_position = 0;
    }
  }  
  
  //======================================================================================
  start_timer_pulse_back(self) {  
    if (self.current_position === self.content.num_sections-1) {
      $('#indicator-'+ self.widget_id).css("background", self.content.color.indicator);
      self.set_position_to(0, 450);
    } else {
      let ref = (self.content.orientation === "row") ? "margin-left" : "margin-top";
      $('#indicator-'+ self.widget_id).css("background", self.content.color.background);
      $('#indicator-'+ self.widget_id).css(ref, (self.offset * (self.content.num_sections-1)) + "px");
      self.current_position = self.content.num_sections-1;
    }
  }  

} // class IndicatorPulse

//========================================================================================
// Inherits from WebWidgetIndicator and extends functionality to create a widget that
// implements a meter indicator
class IndicatorMeter extends WebWidgetIndicator {
  
  //======================================================================================
  constructor(container_id, content) {
    super(container_id, content); // call the super class constructor and pass in parameters

    if (this.content.type === "step") {
      $("#indicator-" + this.widget_id).css("opacity", "0"); // hide the default indicator
      for (let i = 0; i < this.content.num_sections; i++) { 
        $("#background-" + this.widget_id).append(   "<div id='indicator-" + i + "-" + this.widget_id + "'></div>");
        
        let pos = (this.content.num_sections-1)-i;
        if (this.content.orientation === "column") {
          $('#indicator-' + i + "-" + this.widget_id).animate({ 'margin-top': this.offset*pos + "px"}, 0, "swing");
        } else {
          $('#indicator-' + i + "-" + this.widget_id).animate({ 'margin-left': this.offset*pos + "px"}, 0, "swing");
        }
        this.set_css_for_multiple_indicator(i);
      }
      $("#indicator-" + 0 + "-" + this.widget_id).css("opacity", "1");
      this.current_position = 0;
    }
  }
  
 //======================================================================================
 linear_increment(percent) {
    let new_width =  Math.floor((this.container_width * percent) / 100);
    
    $('#indicator-'+ this.widget_id).animate({ 'width': new_width + "px"}, 2000, "linear");
  }
  
  //======================================================================================
  set_css_for_multiple_indicator(id) {
    $("#indicator-" + id + "-" + this.widget_id).css("width", this.content.width_px + "px");
    $("#indicator-" + id + "-" + this.widget_id).css("height", this.content.height_px + "px");
    $("#indicator-" + id + "-" + this.widget_id).css("border-radius", this.content.width_px/2 + "px");
    $("#indicator-" + id + "-" + this.widget_id).css("position", "absolute");
    $("#indicator-" + id + "-" + this.widget_id).css("top", "0");
    $("#indicator-" + id + "-" + this.widget_id).css("left", "0");
    $("#indicator-" + id + "-" + this.widget_id).css("z-index", "1");
    $("#indicator-" + id + "-" + this.widget_id).css("opacity", "0");
    if (this.content.color_scheme === "multiple") {
      let spread = Math.floor(this.content.num_sections/this.content.color.multiple.length);
      let i = Math.floor(id/spread);
      $("#indicator-" + id + "-" + this.widget_id).css("background", this.content.color.multiple[i]);
    } else {
      $("#indicator-" + id + "-" + this.widget_id).css("background", this.content.color.indicator);
    }
    
  }
  
  set_indicator(id, state, d) {
    $('#indicator-' + id + "-" + this.widget_id).animate({ 'opacity': state}, d, "swing");
  }
  
  indicator_multiple_increment() {
    
    if (this.current_position < this.content.num_sections-1) {
      this.current_position += 1;
      $('#indicator-' + this.current_position + "-" + this.widget_id).animate({ 'opacity': "1"}, 100, "swing");
    }

  }
  
  indicator_multiple_decrement() {
    if (this.current_position > 0) { 
      $('#indicator-' + this.current_position + "-" + this.widget_id).animate({ 'opacity': "0"}, 100, "swing");
      this.current_position -= 1;
    }
  }
  
  //======================================================================================
  set_multiple_position_to(pos, duration = 0) {
//    console.log(this.current_position);
    if (pos >= 0 && pos < this.content.num_sections) {
    
      if (this.current_position !== pos) {
        var d = (duration === 0) ? this.transition_time : duration;
        var self = this;
        let inc = Math.abs(pos - this.current_position);
        
        if (pos > this.current_position) {
          for (let i = 0; i < inc; i++) {
//            setTimeout(function(){ self.indicator_multiple_increment(); }, 500);
            this.indicator_multiple_increment();
          }
        } else {
          for (let i = inc; i > 0; i--) {
            this.indicator_multiple_decrement();
          }
        }
        this.current_position = pos;
      }
      
    }
  }
} // class IndicatorMeter


//========================================================================================
// Inherits from WebWidgetIndicator and extends functionality to create a widget that
// implements a basic slider
class IndicatorSlider extends WebWidgetIndicator {

  //======================================================================================
  constructor(container_id, content) {
    super(container_id, content); // call the super class constructor and pass in parameters

  }

} // class IndicatorSlider

//========================================================================================
$(document).ready(function() {
  $(".hole").css( 'cursor', 'pointer' );
});


