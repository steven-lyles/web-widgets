/*
 * ======================================================================================
 * Web Widgets
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/web-widgets
 * https://www.stevenlyles.net
 * ======================================================================================
 */

//=======================================================================
// Color Map
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
    "yellow"       : { "hex" : "#ffff00", "rgb" : "255,255,0" },
    "autumn"       : { "hex" : "#E78D34", "rgb" : "231,141,52"},
    "glacier"      : { "hex" : "#D5DEE3", "rgb" : "213, 222, 227"},
    "lilac"        : { "hex" : "#cc33ff", "rgb" : "204,51,255"},
    "magenta"      : { "hex" : "#cc4499", "rgb" : "204,68,153" },
    "cyan"         : { "hex" : "#91F0EA", "rgb" : "145,240,234" },
    "wysteria"     : { "hex" : "#CDA4DE", "rgb" : "205,164,222"},
    "blush"        : { "hex" : "#ff5555", "rgb" : "255,85,85" },
    "almond"       : { "hex" : "#ffbbaa", "rgb" : "255,187,170" },
    "terracotta"   : { "hex" : "#9F4639", "rgb" : "159,70,57" },
    "green-slate"  : { "hex" : "#A0C092", "rgb" : "160,192,146" },
    "moss"         : { "hex" : "#8A9A5B", "rgb" : "138,154,91" },
    "willow"       : { "hex" : "#95C860", "rgb" : "149,200,96" },
}


//=======================================================================================
// Detects the browser and OS
// Based on the detect-os package: https://www.npmjs.com/package/detect-os
class DetectOS {
    constructor() {
        this.browser = this.searchString(this.dataBrowser())
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion)
        this.OS = this.searchString(this.dataOS())
        if (this.OS == "macOS") {
            if (navigator.maxTouchPoints > 1) {
                this.OS = "iPad OS";
            }
        }
        this.mobile = this.mobile_os();
    }

    //===================================================================================
    searchString(data) {
        for (let i = 0; i < data.length; i++) {
            let
                dataString = data[i].string,
                dataProp = data[i].prop
            this.versionSearchString = data[i].versionSearch || data[i].identity
            if (dataString) {
                if (dataString.indexOf(data[i].subString) !== -1) {
                    return data[i].identity
                }
            } else if (dataProp) {
                return data[i].identity
            }
        }
    }

    //===================================================================================
    searchVersion(dataString) {
        let index = dataString.indexOf(this.versionSearchString)
        if (index === -1) return
        return parseFloat(dataString.substring(index+this.versionSearchString.length + 1))
    }

    //===================================================================================
    mobile_os() {
        let mobile = false;
        if (this.OS == "iPad OS" ||
            this.OS == "iOS" ||
            this.OS == "Android") {
            mobile = true;
        }
        return mobile;
    }

    //===================================================================================
    dataBrowser() {
        return [
            { /** Chrome */
                string: navigator.userAgent,
                subString: "Chrome",
                identity: "Chrome"
            },
            { /** Safari */
                string: navigator.vendor,
                subString: "Apple",
                identity: "Safari",
                versionSearch: "Version"
            },
            { /** For Older Opera (12.18-) */
                prop: window.opera,
                identity: "Opera",
                versionSearch: "Version"
            },
            { /** Internet Explorer 10 */
                string: navigator.userAgent,
                subString: "MSIE",
                identity: "IE10",
                versionSearch: "MSIE"
            },
            { /** Internet Explorer 11 */
                string: navigator.userAgent,
                subString: "Trident",
                identity: "IE11",
                versionSearch: "rv"
            },
            { /** Edge */
                string: navigator.userAgent,
                subString: "Edge",
                identity: "Edge",
                versionSearch: "Edge"
            },
            { /** Firefox */
                string: navigator.userAgent,
                subString: "Firefox",
                identity: "Firefox"
            },
            {
                string: navigator.userAgent,
                subString: "Gecko",
                identity: "Mozilla",
                versionSearch: "rv"
            },
            { /** For Older Netscapes (4-) */
                string: navigator.userAgent,
                subString: "Mozilla",
                identity: "Netscape",
                versionSearch: "Mozilla"
            },
            { /** or Newer Netscapes (6+) */
                string: navigator.userAgent,
                subString: "Netscape",
                identity: "Netscape"
            },
            { /** Other Browsers */
                string: navigator.userAgent,
                subString: "OmniWeb",
                versionSearch: "OmniWeb/",
                identity: "OmniWeb"
            },
            {
                string: navigator.vendor,
                subString: "iCab",
                identity: "iCab"
            },
            {
                string: navigator.vendor,
                subString: "KDE",
                identity: "Konqueror"
            },
            {
                string: navigator.vendor,
                subString: "Camino",
                identity: "Camino"
            }
        ]
    }

    //===================================================================================
    dataOS() {
        return [
            {
                string: navigator.platform,
                subString: 'Win',
                identity: 'Windows'
            },
            {
                string: navigator.platform,
                subString: 'Mac',
                identity: 'macOS'
            },
            {
                string: navigator.userAgent,
                subString: 'iPhone',
                identity: 'iOS'
            },
            {
                string: navigator.userAgent,
                subString: 'iPad',
                identity: 'iOS'
            },
            {
                string: navigator.userAgent,
                subString: 'iPod',
                identity: 'iOS'
            },
            {
                string: navigator.userAgent,
                subString: 'Android',
                identity: 'Android'
            },
            {
                string: navigator.platform,
                subString: 'Linux',
                identity: 'Linux'
            }
        ]
    }
} /* class DetectOS */

//=======================================================================================
// Collection of utility functions used by widget
class Utils {

    //===================================================================================
    // Generates a random hash based on a given string. This is used to create unique ids
    // to identify instances of the classes
    static gen_unique_id(str) {
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

    //===================================================================================
    static get_os() {
        let detect = new DetectOS();
        return detect.OS;
    }

    //===================================================================================
    static get_browser() {
        let detect = new DetectOS();
        return detect.browser;
    }

} // class Utils