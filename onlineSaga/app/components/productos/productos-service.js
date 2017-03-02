'use strict';
var _,

    _consts,
    dataService = require('../../dataProviders/backendServices'),
    // additional requires

    consts;

function Service() { }

function onRequestSuccess(data) {
    return data.result;
}

function onRequestFail(err) {
    alert(JSON.stringify(err));
    return err;
}

Service.prototype.getAllRecords = function (filter) {
    var expandExp,
        data = dataService.data('productos');

    expandExp = {
        marca: {
            "TargetTypeName": "marcas",
            "ReturnAs": "marcaExpand",
            "SingleField": "nombre",
        },
        imagen: {
            'SingleField': 'Uri'
        },
        media: {
            "TargetTypeName": "media",
            "ReturnAs": "mediaExpand",
            "SingleField": "valor",
        },
    };

    return data.expand(expandExp).get(filter)
        .then(onRequestSuccess.bind(this))
        .catch(onRequestFail.bind(this));
};

Service.prototype.configuration = dataService.setup;

// additional properties

// START_CUSTOM_CODE_productos
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_productos
module.exports = new Service();