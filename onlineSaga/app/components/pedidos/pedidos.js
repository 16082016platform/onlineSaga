'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),

    service = require('./pedidos-service'),
    // additional requires

    viewModel = require('./pedidos-view-model');

/*Mis vars*/
var common = require('~/common.js');
/* */

exports.buttonBackTap = function () {
    common.stopCount();
    helpers.back();
}
exports.resetCount = function () {
    common.resetCount();
}

var page;
function pageLoaded(args) {
    page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;

    common.startCount();
}
exports.pageLoaded = pageLoaded;

exports.eliminarProducto = function (args) {
    var item = args.object;
    var listItems = viewModel.get("listItems");
    viewModel.set("listItems", []);
    listItems.splice(item.index, 1);
    viewModel.set("listItems", listItems);
    if (listItems.length == 0) {
        common.stopCount();
        helpers.back();
    }
}