'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
// additional requires

ViewModel = new Observable({
    isLoading: false,
    listItems: [],
    // additional properties
});
module.exports = ViewModel;


// exports.ListItem = function(producto, talla, nombreColor, color) {
//     this.producto = producto;
//     this.talla = talla;
//     this.nombreColor = nombreColor;
//     this.color = color;
//     ViewModel.push(this);
// }


// var observable_1 = require('data/observable');
// var ListItem = (function (_super) {
//     __extends(ListItem, _super);
//     function ListItem(producto, talla, nombreColor, color) {
//         _super.call(this);
//         this.set("_producto", producto);
//         this.set("_talla", talla);
//         this.set("_nombreColor", nombreColor);
//         this.set("_color", color);
//     }
//     Object.defineProperty(ListItem.prototype, "producto", {
//         get: function () {
//             return this.get("_producto");
//         },
//         set: function (value) {
//             this.set("_producto", value);
//         },
//         enumerable: true,
//         configurable: true
//     });
//     Object.defineProperty(ListItem.prototype, "talla", {
//         get: function () {
//             return this.get("_talla");
//         },
//         set: function (value) {
//             this.set("_talla", value);
//         },
//         enumerable: true,
//         configurable: true
//     });
//     Object.defineProperty(ListItem.prototype, "nombreColor", {
//         get: function () {
//             return this.get("_nombreColor");
//         },
//         set: function (value) {
//             this.set("_nombreColor", value);
//         },
//         enumerable: true,
//         configurable: true
//     });
//     Object.defineProperty(ListItem.prototype, "color", {
//         get: function () {
//             return this.get("_color");
//         },
//         set: function (value) {
//             this.set("_color", value);
//         },
//         enumerable: true,
//         configurable: true
//     });
//     return ListItem;
// }(observable_1.Observable));