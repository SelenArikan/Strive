/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/analytics/route";
exports.ids = ["app/api/analytics/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fanalytics%2Froute&page=%2Fapi%2Fanalytics%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fanalytics%2Froute.ts&appDir=C%3A%5CUsers%5CMonster%5COneDrive%5CMasa%C3%BCst%C3%BC%5CBasketball%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CMonster%5COneDrive%5CMasa%C3%BCst%C3%BC%5CBasketball&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fanalytics%2Froute&page=%2Fapi%2Fanalytics%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fanalytics%2Froute.ts&appDir=C%3A%5CUsers%5CMonster%5COneDrive%5CMasa%C3%BCst%C3%BC%5CBasketball%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CMonster%5COneDrive%5CMasa%C3%BCst%C3%BC%5CBasketball&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Monster_OneDrive_Masa_st_Basketball_src_app_api_analytics_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/analytics/route.ts */ \"(rsc)/./src/app/api/analytics/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/analytics/route\",\n        pathname: \"/api/analytics\",\n        filename: \"route\",\n        bundlePath: \"app/api/analytics/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Monster\\\\OneDrive\\\\Masaüstü\\\\Basketball\\\\src\\\\app\\\\api\\\\analytics\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Monster_OneDrive_Masa_st_Basketball_src_app_api_analytics_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhbmFseXRpY3MlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFuYWx5dGljcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFuYWx5dGljcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNNb25zdGVyJTVDT25lRHJpdmUlNUNNYXNhJUMzJUJDc3QlQzMlQkMlNUNCYXNrZXRiYWxsJTVDc3JjJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNNb25zdGVyJTVDT25lRHJpdmUlNUNNYXNhJUMzJUJDc3QlQzMlQkMlNUNCYXNrZXRiYWxsJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNzQztBQUNuSDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcTW9uc3RlclxcXFxPbmVEcml2ZVxcXFxNYXNhw7xzdMO8XFxcXEJhc2tldGJhbGxcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYW5hbHl0aWNzXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hbmFseXRpY3Mvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hbmFseXRpY3NcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2FuYWx5dGljcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXE1vbnN0ZXJcXFxcT25lRHJpdmVcXFxcTWFzYcO8c3TDvFxcXFxCYXNrZXRiYWxsXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGFuYWx5dGljc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fanalytics%2Froute&page=%2Fapi%2Fanalytics%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fanalytics%2Froute.ts&appDir=C%3A%5CUsers%5CMonster%5COneDrive%5CMasa%C3%BCst%C3%BC%5CBasketball%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CMonster%5COneDrive%5CMasa%C3%BCst%C3%BC%5CBasketball&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/api/analytics/route.ts":
/*!****************************************!*\
  !*** ./src/app/api/analytics/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst analyticsFilePath = path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), \"src\", \"data\", \"analytics.json\");\nasync function getAnalytics() {\n    try {\n        const fileContents = await fs__WEBPACK_IMPORTED_MODULE_1__.promises.readFile(analyticsFilePath, \"utf8\");\n        return JSON.parse(fileContents);\n    } catch  {\n        return {\n            purchaseClicks: 0,\n            productViews: {},\n            dailyStats: []\n        };\n    }\n}\nasync function saveAnalytics(data) {\n    await fs__WEBPACK_IMPORTED_MODULE_1__.promises.writeFile(analyticsFilePath, JSON.stringify(data, null, 2), \"utf8\");\n}\n// GET - Fetch analytics data\nasync function GET() {\n    try {\n        const analytics = await getAnalytics();\n        // Calculate top viewed products\n        const topProducts = Object.entries(analytics.productViews).sort(([, a], [, b])=>b - a).slice(0, 10);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            purchaseClicks: analytics.purchaseClicks,\n            productViews: analytics.productViews,\n            topProducts,\n            dailyStats: analytics.dailyStats.slice(-30)\n        });\n    } catch (error) {\n        console.error(\"Error reading analytics:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: \"Failed to read analytics\"\n        }, {\n            status: 500\n        });\n    }\n}\n// POST - Track an event\nasync function POST(request) {\n    try {\n        const { type, productId, productName } = await request.json();\n        const analytics = await getAnalytics();\n        const today = new Date().toISOString().split(\"T\")[0];\n        // Find or create today's stats\n        let todayStats = analytics.dailyStats.find((s)=>s.date === today);\n        if (!todayStats) {\n            todayStats = {\n                date: today,\n                purchases: 0,\n                views: 0\n            };\n            analytics.dailyStats.push(todayStats);\n        }\n        if (type === \"purchase\") {\n            // Track purchase click\n            analytics.purchaseClicks++;\n            todayStats.purchases++;\n        } else if (type === \"view\" && productId) {\n            // Track product view\n            const key = `${productId}_${productName || \"Unknown\"}`;\n            analytics.productViews[key] = (analytics.productViews[key] || 0) + 1;\n            todayStats.views++;\n        }\n        await saveAnalytics(analytics);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true\n        });\n    } catch (error) {\n        console.error(\"Error tracking event:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: \"Failed to track event\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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U0FBUztZQUFPQyxPQUFPO1FBQXdCLEdBQUc7WUFBRUUsUUFBUTtRQUFJO0lBQy9GO0FBQ0oiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcTW9uc3RlclxcT25lRHJpdmVcXE1hc2HDvHN0w7xcXEJhc2tldGJhbGxcXHNyY1xcYXBwXFxhcGlcXGFuYWx5dGljc1xccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCB7IHByb21pc2VzIGFzIGZzIH0gZnJvbSBcImZzXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG5jb25zdCBhbmFseXRpY3NGaWxlUGF0aCA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBcInNyY1wiLCBcImRhdGFcIiwgXCJhbmFseXRpY3MuanNvblwiKTtcclxuXHJcbmludGVyZmFjZSBBbmFseXRpY3Mge1xyXG4gICAgcHVyY2hhc2VDbGlja3M6IG51bWJlcjtcclxuICAgIHByb2R1Y3RWaWV3czogeyBbcHJvZHVjdElkOiBzdHJpbmddOiBudW1iZXIgfTtcclxuICAgIGRhaWx5U3RhdHM6IHsgZGF0ZTogc3RyaW5nOyBwdXJjaGFzZXM6IG51bWJlcjsgdmlld3M6IG51bWJlciB9W107XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldEFuYWx5dGljcygpOiBQcm9taXNlPEFuYWx5dGljcz4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBmaWxlQ29udGVudHMgPSBhd2FpdCBmcy5yZWFkRmlsZShhbmFseXRpY3NGaWxlUGF0aCwgXCJ1dGY4XCIpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGZpbGVDb250ZW50cyk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgICByZXR1cm4geyBwdXJjaGFzZUNsaWNrczogMCwgcHJvZHVjdFZpZXdzOiB7fSwgZGFpbHlTdGF0czogW10gfTtcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2F2ZUFuYWx5dGljcyhkYXRhOiBBbmFseXRpY3MpIHtcclxuICAgIGF3YWl0IGZzLndyaXRlRmlsZShhbmFseXRpY3NGaWxlUGF0aCwgSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMiksIFwidXRmOFwiKTtcclxufVxyXG5cclxuLy8gR0VUIC0gRmV0Y2ggYW5hbHl0aWNzIGRhdGFcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgYW5hbHl0aWNzID0gYXdhaXQgZ2V0QW5hbHl0aWNzKCk7XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0b3Agdmlld2VkIHByb2R1Y3RzXHJcbiAgICAgICAgY29uc3QgdG9wUHJvZHVjdHMgPSBPYmplY3QuZW50cmllcyhhbmFseXRpY3MucHJvZHVjdFZpZXdzKVxyXG4gICAgICAgICAgICAuc29ydCgoWywgYV0sIFssIGJdKSA9PiBiIC0gYSlcclxuICAgICAgICAgICAgLnNsaWNlKDAsIDEwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgICAgcHVyY2hhc2VDbGlja3M6IGFuYWx5dGljcy5wdXJjaGFzZUNsaWNrcyxcclxuICAgICAgICAgICAgcHJvZHVjdFZpZXdzOiBhbmFseXRpY3MucHJvZHVjdFZpZXdzLFxyXG4gICAgICAgICAgICB0b3BQcm9kdWN0cyxcclxuICAgICAgICAgICAgZGFpbHlTdGF0czogYW5hbHl0aWNzLmRhaWx5U3RhdHMuc2xpY2UoLTMwKSwgLy8gTGFzdCAzMCBkYXlzXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciByZWFkaW5nIGFuYWx5dGljczpcIiwgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gcmVhZCBhbmFseXRpY3NcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBQT1NUIC0gVHJhY2sgYW4gZXZlbnRcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB7IHR5cGUsIHByb2R1Y3RJZCwgcHJvZHVjdE5hbWUgfSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xyXG4gICAgICAgIGNvbnN0IGFuYWx5dGljcyA9IGF3YWl0IGdldEFuYWx5dGljcygpO1xyXG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXTtcclxuXHJcbiAgICAgICAgLy8gRmluZCBvciBjcmVhdGUgdG9kYXkncyBzdGF0c1xyXG4gICAgICAgIGxldCB0b2RheVN0YXRzID0gYW5hbHl0aWNzLmRhaWx5U3RhdHMuZmluZCgocykgPT4gcy5kYXRlID09PSB0b2RheSk7XHJcbiAgICAgICAgaWYgKCF0b2RheVN0YXRzKSB7XHJcbiAgICAgICAgICAgIHRvZGF5U3RhdHMgPSB7IGRhdGU6IHRvZGF5LCBwdXJjaGFzZXM6IDAsIHZpZXdzOiAwIH07XHJcbiAgICAgICAgICAgIGFuYWx5dGljcy5kYWlseVN0YXRzLnB1c2godG9kYXlTdGF0cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZSA9PT0gXCJwdXJjaGFzZVwiKSB7XHJcbiAgICAgICAgICAgIC8vIFRyYWNrIHB1cmNoYXNlIGNsaWNrXHJcbiAgICAgICAgICAgIGFuYWx5dGljcy5wdXJjaGFzZUNsaWNrcysrO1xyXG4gICAgICAgICAgICB0b2RheVN0YXRzLnB1cmNoYXNlcysrO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJ2aWV3XCIgJiYgcHJvZHVjdElkKSB7XHJcbiAgICAgICAgICAgIC8vIFRyYWNrIHByb2R1Y3Qgdmlld1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtwcm9kdWN0SWR9XyR7cHJvZHVjdE5hbWUgfHwgXCJVbmtub3duXCJ9YDtcclxuICAgICAgICAgICAgYW5hbHl0aWNzLnByb2R1Y3RWaWV3c1trZXldID0gKGFuYWx5dGljcy5wcm9kdWN0Vmlld3Nba2V5XSB8fCAwKSArIDE7XHJcbiAgICAgICAgICAgIHRvZGF5U3RhdHMudmlld3MrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IHNhdmVBbmFseXRpY3MoYW5hbHl0aWNzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHRyYWNraW5nIGV2ZW50OlwiLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byB0cmFjayBldmVudFwiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInByb21pc2VzIiwiZnMiLCJwYXRoIiwiYW5hbHl0aWNzRmlsZVBhdGgiLCJqb2luIiwicHJvY2VzcyIsImN3ZCIsImdldEFuYWx5dGljcyIsImZpbGVDb250ZW50cyIsInJlYWRGaWxlIiwiSlNPTiIsInBhcnNlIiwicHVyY2hhc2VDbGlja3MiLCJwcm9kdWN0Vmlld3MiLCJkYWlseVN0YXRzIiwic2F2ZUFuYWx5dGljcyIsImRhdGEiLCJ3cml0ZUZpbGUiLCJzdHJpbmdpZnkiLCJHRVQiLCJhbmFseXRpY3MiLCJ0b3BQcm9kdWN0cyIsIk9iamVjdCIsImVudHJpZXMiLCJzb3J0IiwiYSIsImIiLCJzbGljZSIsImpzb24iLCJzdWNjZXNzIiwiZXJyb3IiLCJjb25zb2xlIiwic3RhdHVzIiwiUE9TVCIsInJlcXVlc3QiLCJ0eXBlIiwicHJvZHVjdElkIiwicHJvZHVjdE5hbWUiLCJ0b2RheSIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsInNwbGl0IiwidG9kYXlTdGF0cyIsImZpbmQiLCJzIiwiZGF0ZSIsInB1cmNoYXNlcyIsInZpZXdzIiwicHVzaCIsImtleSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/analytics/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fanalytics%2Froute&page=%2Fapi%2Fanalytics%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fanalytics%2Froute.ts&appDir=C%3A%5CUsers%5CMonster%5COneDrive%5CMasa%C3%BCst%C3%BC%5CBasketball%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CMonster%5COneDrive%5CMasa%C3%BCst%C3%BC%5CBasketball&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();