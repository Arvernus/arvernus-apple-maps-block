/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./blocks/frontend.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./blocks/frontend.js":
/*!****************************!*\
  !*** ./blocks/frontend.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _maps_frontend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./maps/frontend */ \"./blocks/maps/frontend.js\");\n/* harmony import */ var _maps_frontend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_maps_frontend__WEBPACK_IMPORTED_MODULE_0__);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ibG9ja3MvZnJvbnRlbmQuanM/MTQ5YiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiLi9ibG9ja3MvZnJvbnRlbmQuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vbWFwcy9mcm9udGVuZCc7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./blocks/frontend.js\n");

/***/ }),

/***/ "./blocks/maps/frontend.js":
/*!*********************************!*\
  !*** ./blocks/maps/frontend.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("window.mapkit.draw = function (map, element) {\n  map.innerHTML = '';\n  var mapType = element.dataset.mapType;\n  var showsMapTypeControl = element.dataset.showsMapTypeControl;\n  var showsZoomControl = element.dataset.showsZoomControl;\n  var pointLongitude = parseFloat(element.dataset.pointLongitude);\n  var pointLatitude = parseFloat(element.dataset.pointLatitude);\n  var pointTitle = element.dataset.pointTitle;\n  var pointSubtitle = element.dataset.pointSubtitle;\n  var pointGlyphText = element.dataset.pointGlyphText;\n  var pointColor = element.dataset.pointColor;\n  map.mapType = mapType;\n  map.showsMapTypeControl = showsMapTypeControl;\n  map.showsCompass = window.mapkit.FeatureVisibility.Adaptive;\n  map.showsZoomControl = showsZoomControl;\n\n  if (pointLongitude && pointLatitude) {\n    var work = new window.mapkit.Coordinate(pointLatitude, pointLongitude);\n    var workAnnotation = new window.mapkit.MarkerAnnotation(work);\n    workAnnotation.color = pointColor;\n    workAnnotation.title = pointTitle;\n    workAnnotation.subtitle = pointSubtitle;\n    workAnnotation.selected = 'true';\n    workAnnotation.glyphText = pointGlyphText;\n    map.showItems([workAnnotation], {\n      animate: true,\n      padding: new window.mapkit.Padding(800, 200, 800, 200)\n    });\n  }\n};\n\nwp.domReady(function () {\n  window.mapkit.init({\n    authorizationCallback: function authorizationCallback(done) {\n      var url = \"\".concat(window.location.origin, \"/wp-json/AppleMapKit/v1/GetJWT/\");\n      fetch(url, {\n        method: 'GET',\n        headers: {\n          Accept: 'Application/JSON'\n        }\n      }).then(function (response) {\n        if (response.status >= 200 && response.status < 400) {\n          return response.json();\n        } else {\n          throw \"Response resulted in error \".concat(response.status);\n        }\n      }).then(function (result) {\n        done(result);\n      });\n    }\n  });\n  var mapElements = document.querySelectorAll('.wp-block-mapkitjs-map');\n  mapElements.forEach(function (element) {\n    var map = new window.mapkit.Map(element);\n    window.mapkit.draw(map, element);\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ibG9ja3MvbWFwcy9mcm9udGVuZC5qcz84Yzc0Il0sIm5hbWVzIjpbIndpbmRvdyIsIm1hcGtpdCIsImRyYXciLCJtYXAiLCJlbGVtZW50IiwiaW5uZXJIVE1MIiwibWFwVHlwZSIsImRhdGFzZXQiLCJzaG93c01hcFR5cGVDb250cm9sIiwic2hvd3Nab29tQ29udHJvbCIsInBvaW50TG9uZ2l0dWRlIiwicGFyc2VGbG9hdCIsInBvaW50TGF0aXR1ZGUiLCJwb2ludFRpdGxlIiwicG9pbnRTdWJ0aXRsZSIsInBvaW50R2x5cGhUZXh0IiwicG9pbnRDb2xvciIsInNob3dzQ29tcGFzcyIsIkZlYXR1cmVWaXNpYmlsaXR5IiwiQWRhcHRpdmUiLCJ3b3JrIiwiQ29vcmRpbmF0ZSIsIndvcmtBbm5vdGF0aW9uIiwiTWFya2VyQW5ub3RhdGlvbiIsImNvbG9yIiwidGl0bGUiLCJzdWJ0aXRsZSIsInNlbGVjdGVkIiwiZ2x5cGhUZXh0Iiwic2hvd0l0ZW1zIiwiYW5pbWF0ZSIsInBhZGRpbmciLCJQYWRkaW5nIiwid3AiLCJkb21SZWFkeSIsImluaXQiLCJhdXRob3JpemF0aW9uQ2FsbGJhY2siLCJkb25lIiwidXJsIiwibG9jYXRpb24iLCJvcmlnaW4iLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJBY2NlcHQiLCJ0aGVuIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJqc29uIiwicmVzdWx0IiwibWFwRWxlbWVudHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiTWFwIl0sIm1hcHBpbmdzIjoiQUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWNDLElBQWQsR0FBcUIsVUFBU0MsR0FBVCxFQUFjQyxPQUFkLEVBQXVCO0FBQzNDRCxLQUFHLENBQUNFLFNBQUosR0FBZ0IsRUFBaEI7QUFDQSxNQUFNQyxPQUFPLEdBQUdGLE9BQU8sQ0FBQ0csT0FBUixDQUFnQkQsT0FBaEM7QUFDQSxNQUFNRSxtQkFBbUIsR0FBR0os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MEIsd0JBQTFCLENBQXBCO0FBRUFGLGFBQVcsQ0FBQ0csT0FBWixDQUFvQixVQUFBakQsT0FBTyxFQUFJO0FBQzlCLFFBQU1ELEdBQUcsR0FBRyxJQUFJSCxNQUFNLENBQUNDLE1BQVAsQ0FBY3FELEdBQWxCLENBQXNCbEQsT0FBdEIsQ0FBWjtBQUNBSixVQUFNLENBQUNDLE1BQVAsQ0FBY0MsSUFBZCxDQUFtQkMsR0FBbkIsRUFBd0JDLE9BQXhCO0FBQ0EsR0FIRDtBQUlBLENBNUJEIiwiZmlsZSI6Ii4vYmxvY2tzL21hcHMvZnJvbnRlbmQuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cubWFwa2l0LmRyYXcgPSBmdW5jdGlvbihtYXAsIGVsZW1lbnQpIHtcblx0bWFwLmlubmVySFRNTCA9ICcnO1xuXHRjb25zdCBtYXBUeXBlID0gZWxlbWVudC5kYXRhc2V0Lm1hcFR5cGU7XG5cdGNvbnN0IHNob3dzTWFwVHlwZUNvbnRyb2wgPSBlbGVtZW50LmRhdGFzZXQuc2hvd3NNYXBUeXBlQ29udHJvbDtcblx0Y29uc3Qgc2hvd3Nab29tQ29udHJvbCA9IGVsZW1lbnQuZGF0YXNldC5zaG93c1pvb21Db250cm9sO1xuXHRjb25zdCBwb2ludExvbmdpdHVkZSA9IHBhcnNlRmxvYXQoZWxlbWVudC5kYXRhc2V0LnBvaW50TG9uZ2l0dWRlKTtcblx0Y29uc3QgcG9pbnRMYXRpdHVkZSA9IHBhcnNlRmxvYXQoZWxlbWVudC5kYXRhc2V0LnBvaW50TGF0aXR1ZGUpO1xuXHRjb25zdCBwb2ludFRpdGxlID0gZWxlbWVudC5kYXRhc2V0LnBvaW50VGl0bGU7XG5cdGNvbnN0IHBvaW50U3VidGl0bGUgPSBlbGVtZW50LmRhdGFzZXQucG9pbnRTdWJ0aXRsZTtcblx0Y29uc3QgcG9pbnRHbHlwaFRleHQgPSBlbGVtZW50LmRhdGFzZXQucG9pbnRHbHlwaFRleHQ7XG5cdGNvbnN0IHBvaW50Q29sb3IgPSBlbGVtZW50LmRhdGFzZXQucG9pbnRDb2xvcjtcblxuXHRtYXAubWFwVHlwZSA9IG1hcFR5cGU7XG5cdG1hcC5zaG93c01hcFR5cGVDb250cm9sID0gc2hvd3NNYXBUeXBlQ29udHJvbDtcblx0bWFwLnNob3dzQ29tcGFzcyA9IHdpbmRvdy5tYXBraXQuRmVhdHVyZVZpc2liaWxpdHkuQWRhcHRpdmU7XG5cdG1hcC5zaG93c1pvb21Db250cm9sID0gc2hvd3Nab29tQ29udHJvbDtcblxuXHRpZiAocG9pbnRMb25naXR1ZGUgJiYgcG9pbnRMYXRpdHVkZSkge1xuXHRcdGNvbnN0IHdvcmsgPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKHBvaW50TGF0aXR1ZGUsIHBvaW50TG9uZ2l0dWRlKTtcblx0XHRjb25zdCB3b3JrQW5ub3RhdGlvbiA9IG5ldyB3aW5kb3cubWFwa2l0Lk1hcmtlckFubm90YXRpb24od29yayk7XG5cblx0XHR3b3JrQW5ub3RhdGlvbi5jb2xvciA9IHBvaW50Q29sb3I7XG5cdFx0d29ya0Fubm90YXRpb24udGl0bGUgPSBwb2ludFRpdGxlO1xuXHRcdHdvcmtBbm5vdGF0aW9uLnN1YnRpdGxlID0gcG9pbnRTdWJ0aXRsZTtcblx0XHR3b3JrQW5ub3RhdGlvbi5zZWxlY3RlZCA9ICd0cnVlJztcblx0XHR3b3JrQW5ub3RhdGlvbi5nbHlwaFRleHQgPSBwb2ludEdseXBoVGV4dDtcblx0XHRtYXAuc2hvd0l0ZW1zKFt3b3JrQW5ub3RhdGlvbl0sIHtcblx0XHRcdGFuaW1hdGU6IHRydWUsXG5cdFx0XHRwYWRkaW5nOiBuZXcgd2luZG93Lm1hcGtpdC5QYWRkaW5nKDgwMCwgMjAwLCA4MDAsIDIwMCksXG5cdFx0fSk7XG5cdH1cbn07XG5cbndwLmRvbVJlYWR5KGZ1bmN0aW9uKCkge1xuXHR3aW5kb3cubWFwa2l0LmluaXQoe1xuXHRcdGF1dGhvcml6YXRpb25DYWxsYmFjazogZnVuY3Rpb24oZG9uZSkge1xuXHRcdFx0Y29uc3QgdXJsID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vd3AtanNvbi9BcHBsZU1hcEtpdC92MS9HZXRKV1QvYDtcblx0XHRcdGZldGNoKHVybCwge1xuXHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0QWNjZXB0OiAnQXBwbGljYXRpb24vSlNPTicsXG5cdFx0XHRcdH0sXG5cdFx0XHR9KVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0XHRcdGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8IDQwMCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhyb3cgYFJlc3BvbnNlIHJlc3VsdGVkIGluIGVycm9yICR7cmVzcG9uc2Uuc3RhdHVzfWA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcblx0XHRcdFx0XHRkb25lKHJlc3VsdCk7XG5cdFx0XHRcdH0pO1xuXHRcdH0sXG5cdH0pO1xuXHRjb25zdCBtYXBFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53cC1ibG9jay1tYXBraXRqcy1tYXAnKTtcblxuXHRtYXBFbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXHRcdGNvbnN0IG1hcCA9IG5ldyB3aW5kb3cubWFwa2l0Lk1hcChlbGVtZW50KTtcblx0XHR3aW5kb3cubWFwa2l0LmRyYXcobWFwLCBlbGVtZW50KTtcblx0fSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./blocks/maps/frontend.js\n");

/***/ })

/******/ });