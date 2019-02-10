window.onload = function() {
      updateTheme();
}

function getStylesheets() {
      return document.styleSheets;
}

function getStylesheet(name) {
      for (var i = 0; i<document.styleSheets.length; i++) {
            var stylesheet = document.styleSheets[i];
            if (stylesheet.title === name) {
                  return stylesheet;
            }
      }
}

function setStylesheetStyle(stylesheet,selector,property,newvalue) {
      if (stylesheet != null && stylesheet != "") {
            var cssObject;
            if (stylesheet.cssRules != null) {
                  for (var i = 0; i < stylesheet.cssRules.length; i++) {
                        var rule = stylesheet.cssRules[i];
                        if (rule.type == CSSRule.STYLE_RULE && rule.selectorText == selector) {
                              cssObject = rule;
                        }
                  }
            } else if (stylesheet.rules != null) {
                  for (var i = 0; i < stylesheet.rules.length; i++) {
                        var rule = stylesheet.rules[i];
                        if (rule.type == CSSRule.STYLE_RULE && rule.selectorText == selector) {
                              cssObject = rule;
                        }
                  }
            }
            if (cssObject != null) {
                  if (property == "backgroundColor") {
                        cssObject.style.backgroundColor=newvalue;
                  } else if (property == "color") {
                        cssObject.style.color=newvalue;
                  } else if (property == "borderColor") {
                        cssObject.style.borderColor=newvalue;
                  } else if (property == "boxShadow") {
                        cssObject.style.boxShadow=newvalue;
                  }
            }
      }
}

function setStyle(selector,property,newvalue) {
      for (var ii = 0; ii<document.styleSheets.length; ii++) {
            var stylesheet = document.styleSheets[ii];
            if (stylesheet != null && stylesheet != "") {
                  var cssObject;
                  if (stylesheet.cssRules != null) {
                        for (var i = 0; i < stylesheet.cssRules.length; i++) {
                              var rule = stylesheet.cssRules[i];
                              if (rule.type == CSSRule.STYLE_RULE && rule.selectorText == selector) {
                                    cssObject = rule;
                              }
                        }
                  } else if (stylesheet.rules != null) {
                        for (var i = 0; i < stylesheet.rules.length; i++) {
                              var rule = stylesheet.rules[i];
                              if (rule.type == CSSRule.STYLE_RULE && rule.selectorText == selector) {
                                    cssObject = rule;
                              }
                        }
                  }
                  if (cssObject != null) {
                        if (property == "backgroundColor") {
                              cssObject.style.backgroundColor=newvalue;
                        } else if (property == "color") {
                              cssObject.style.color=newvalue;
                        } else if (property == "borderColor") {
                              cssObject.style.borderColor=newvalue;
                        }
                  }
            }
      }
}

function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                  c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                  return c.substring(name.length, c.length);
            }
      }
      return "";
}

function isLightTheme() {
      var _light = getCookie("lightTheme");
      if (_light != "") {
            if (_light == true || _light == "true") {
                  return true;
            }
            return false;
      }
      return false;
}

function setLightTheme(light) {
      setCookie("lightTheme",light,365);
}

function updateTheme() {
      let root = document.documentElement;
      if (isLightTheme()) {
            root.style.setProperty('--background', "rgb(233,233,233)");
            root.style.setProperty('--background-img', "linear-gradient(to top right, rgb(242, 242, 242), rgb(247, 247, 247))");
            root.style.setProperty('--txt-color', "rgb(0,0,0)");
            setStyle("#navbar-div","backgroundColor","rgb(255,255,255)");
            setStyle("#navbar-links a","color","rgb(0,0,0)");
            setStyle(".navbar-sep","borderColor","rgb(0,0,0)");
            setStyle(".slider","backgroundColor","rgb(200,200,200)");/*
            setStyle(".slider::before","backgroundColor","#006eff");
            setStyle("input:checked + .slider","backgroundColor","#ff9900");
            setStyle("input:focus + .slider","boxShadow","#ff9900");*/
            setStyle(".slider::before","backgroundColor","#ff9900");
            setStyle("input:checked + .slider","backgroundColor","#006eff");
            setStyle("input:focus + .slider","boxShadow","#006eff");
      } else {
            root.style.setProperty('--background', "rgb(22,22,22)");
            root.style.setProperty('--background-img', "linear-gradient(to top right, rgb(8, 8, 8), rgb(13, 13, 13))");
            root.style.setProperty('--txt-color', "rgb(255,255,255)");
            setStyle("#navbar-div","backgroundColor","rgb(0,0,0)");
            setStyle("#navbar-links a","color","rgb(255,255,255)");
            setStyle(".navbar-sep","borderColor","rgb(255,255,255)");
            setStyle(".slider","backgroundColor","rgb(55,55,55)");/*
            setStyle(".slider::before","backgroundColor","#006eff");
            setStyle("input:checked + .slider","backgroundColor","#ff9900");
            setStyle("input:focus + .slider","boxShadow","#ff9900");*/
            setStyle(".slider::before","backgroundColor","#ff9900");
            setStyle("input:checked + .slider","backgroundColor","#006eff");
            setStyle("input:focus + .slider","boxShadow","#006eff");
      }
}