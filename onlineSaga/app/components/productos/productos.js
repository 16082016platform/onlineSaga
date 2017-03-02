'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),

    service = require('./productos-service'),
    // additional requires

    viewModel = require('./productos-view-model');

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

function onListViewItemTap(args) {
    var item = args.object;

    var itemData = viewModel.get('listItems')[item.index];

    helpers.navigate({
        moduleName: 'components/media/media',
        context: {
            filter: {
                producto: itemData.details.Id
            },
            producto: itemData.details
        }
    });
}
exports.onListViewItemTap = onListViewItemTap;

function flattenLocationProperties(dataItem) {
    var propName, propValue,
        isLocation = function (value) {
            return propValue && typeof propValue === 'object' &&
                propValue.longitude && propValue.latitude;
        };

    for (propName in dataItem) {
        if (dataItem.hasOwnProperty(propName)) {
            propValue = dataItem[propName];
            if (isLocation(propValue)) {
                dataItem[propName] =
                    'Latitude: ' + propValue.latitude +
                    'Longitude: ' + propValue.longitude;
            }
        }
    }
}
// additional functions

function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;

    viewModel.set('isLoading', true);
    viewModel.set('listItems', []);

    function _fetchData() {
        var context = page.navigationContext;
        viewModel.set('subcategoria', context.subcategoria.subcategoria);

        if (context && context.filter) {
            return service.getAllRecords(context.filter);
        }

        return service.getAllRecords();
    };

    _fetchData()
        .then(function (result) {
            var itemsList = [];
            var index = 0;
            result.forEach(function (item) {

                flattenLocationProperties(item);
                itemsList.push({
                    header: item.nombre,
                    index: index,
                    image: item.imagen ? item.imagen : '~/images/logoActivity.png',
                    precioDescuento: item.descuento > 0 ? (item.precio * (1 - (item.descuento / 100))).toFixed(2) : item.precio,
                    colores: item.mediaExpand.length > 1 ? item.mediaExpand : [],
                    // singleItem properties
                    details: item
                });
                index++;
            });
            viewModel.set('listItems', itemsList);
            viewModel.set('isLoading', false);
        })
        .catch(function onCatch() {
            viewModel.set('isLoading', false);
        });
    // additional pageLoaded

    if (isInit) {
        isInit = false;
        // additional pageInit
    }
    common.startCount();
}

// START_CUSTOM_CODE_productos
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_productos
exports.pageLoaded = pageLoaded;