'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),

    service = require('./categorias-service'),
    // additional requires

    viewModel = require('./categorias-view-model');

function onListViewItemTap(args) {
    var itemData = viewModel.get('listItems')[args.index];

    helpers.navigate({
        moduleName: 'components/subcategorias/subcategorias',
        context: {
            filter: {
                categoria: itemData.details.Id
            }
        },
        animated: true,
        transition: {
            name: "slide"
        },
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
        if (context && context.filter) {
            return service.getAllRecords(context.filter);
        }
        return service.getAllRecords();
    };
    _fetchData()
        .then(function (result) {
            var itemsList = [];
            result.forEach(function (item) {
                flattenLocationProperties(item);
                itemsList.push({
                    header: item.nombre,
                    // singleItem properties
                    details: item
                });
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
}
exports.pageLoaded = pageLoaded;