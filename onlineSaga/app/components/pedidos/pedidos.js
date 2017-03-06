'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),

    service = require('./pedidos-service'),
    // additional requires

    viewModel = require('./pedidos-view-model');

/*Mis vars*/
var common = require('~/common.js'),
    dataService = require('../../dataProviders/backendServices');
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

var enums = require("ui/enums");
exports.eliminarProducto = function (args) {
    var item = args.view.bindingContext;
    var index = viewModel.listItems.indexOf(item);
    viewModel.listItems.splice(index, 1);
    page.getViewById("lista").refresh();
    // args.object.parent.parent.parent.animate({
    //     translate: { x: 0, y: 500 },
    //     // scale: { x: 0, y: 0 },
    //     duration: 1000,
    //     // opacity: 0,
    //     curve: enums.AnimationCurve.easeIn
    // }).then(function () {

    // }).then(function () {
    //     page.getViewById("lista").refresh();
    // });

    if (viewModel.listItems.length == 0) {
        common.stopCount();
        helpers.back();
    }
}

exports.enviarPedido = function () {
    for (var i = 0; i < viewModel.listItems.length; i++) {
        var data = dataService.data('pedidos');
        data.save({
            producto: viewModel.listItems[i].producto,
            estado: "Pendiente",
            color: viewModel.listItems[i].color,
            nombreColor: viewModel.listItems[i].nombreColor,
            talla: viewModel.listItems[i].talla,
            nombre: viewModel.listItems[i].producto.nombre,
        })
            .then(onRequestSuccess.bind(this))
            .catch(onRequestFail.bind(this));
    }
    

    page.animate({
        scale: { x: 0, y: 0 },
        backgroundColor: "#ff0000",
        duration: 1000,
    }).then(function () {
        viewModel.set("listItems",[]);
    }).then(function () {
        helpers.navigate({
            moduleName: "components/splashScreen/splashScreen",
            animated: false,
            clearHistory: true,
        });
    });
}

function onRequestSuccess(responce) {
    // helpers.navigate({
    //     moduleName: "components/homeView/homeView",
    //     animated: false,
    //     clearHistory: true,
    // });
}

function onRequestFail(err) {
    alert(JSON.stringify(err));
    return err;
}