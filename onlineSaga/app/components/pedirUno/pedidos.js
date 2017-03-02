'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),

    gestures = require('ui/gestures'),
    dataService = require('../../dataProviders/backendServices'),

    // additional requires

    viewModel = require('./pedidos-view-model');


var frameModule = require("ui/frame");


function onRequestSuccess(responce) {
    //alert(JSON.stringify(responce));
    startCount();
}

var c = 0, t, timer_is_on = 0;
function timedCount() {
    c = c + 1;
    t = setTimeout(function () { timedCount() }, 1000);
    if (c == 5) {
        stopCount();
    }
}

function startCount() {
    //if (!timer_is_on) {
    timer_is_on = 1;
    timedCount();
    //}
}

function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
    c = 0;
    frameModule.topmost().navigate({
        moduleName: "components/homeView/homeView",
        animated: false,
        clearHistory: true,
    });
}

function onRequestFail(err) {
    alert(JSON.stringify(err));
    return err;
}

function saveData() {
    var data = dataService.data('pedidos');

    data.save({

        producto: viewModel.get('producto'),

        estado: viewModel.get('estado'),

        color: viewModel.get('color'),

        nombreColor: viewModel.get('nombreColor'),

        talla: viewModel.get('talla'),

        nombre: viewModel.get('nombre'),

        // save properties

    })
        .then(onRequestSuccess.bind(this))
        .catch(onRequestFail.bind(this));
}

function onpedidosModelFormSubmit() {
    saveData();
}

function onpedidosModelFormCancel() {
    helpers.back();
}

// additional functions

function pageLoaded(args) {
    var page = args.object;
    helpers.platformInit(page);
    page.bindingContext = viewModel;
    // additional pageLoaded
    if (isInit) {
        isInit = false;

        viewModel.on(viewModel.events.pedidosModelSubmit, onpedidosModelFormSubmit);

        viewModel.on(viewModel.events.pedidosModelCancel, onpedidosModelFormCancel);

        // additional pageInit

    }
    var datos = page.navigationContext;
    viewModel.set('producto', datos.producto);
    viewModel.set('talla', datos.talla);
    viewModel.set('color', datos.color);
    viewModel.set('nombreColor', datos.nombreColor);
    viewModel.set('estado', 'Pendiente');
    viewModel.set('nombre', datos.nombre);

    onpedidosModelFormSubmit();


}

// START_CUSTOM_CODE_pedidos
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_pedidos
exports.pageLoaded = pageLoaded;
