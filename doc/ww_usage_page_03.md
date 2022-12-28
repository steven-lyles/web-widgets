**Step 3:** Create the **JSON Attributes Object**.
```angular2html
var indicator_attr = { 
  "width_px"    : 10,         // horizontal dimension
  "height_px"   : 60,         // vertical dimension
  "spacer_px"   : 5,          // distance between indicators
  "num_sections": 4,          // number of indicators
  "orientation" : "column",   // column or row
  "type" : "position",        // position or meter
  "color" : {
    "background" : "#444a77", // bottom layer of indicator
    "indicator"  : "#99dd66", // sliding indicator color
    "cover_plate": "black"    // top layer (black or white)
  },
  "transition_time" : 500     // transition time in msecs
}; 
``` 