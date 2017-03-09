var helpers = require('./utils/widgets/helper');

var vmPedidos = require('./components/pedidos/pedidos-view-model');


var producto = [];
exports.resetCount = function () {
    c = 0;
}
exports.startCount = function () {
    //if (!timer_is_on) {
    clearCount();
    timer_is_on = 1;
    timedCount();
    //}
}
exports.stopCount = function () {
    clearTimeout(t);
    timer_is_on = 0;
    c = 0;
}

var c = 0, t, timer_is_on = 0;
function timedCount() {
    c++;
    t = setTimeout(function () { timedCount() }, 1000);
    if (c == 60) {
        vmPedidos.set("listItems", []);
        c = 0;
        clearCount();
        goToInicio();
    }

}
function clearCount() {
    clearTimeout(t);
    timer_is_on = 0;
    c = 0;
}
function goToInicio() {
    helpers.navigate({
        moduleName: 'components/homeView/homeView',
        animated: true,
        transition: {
            name: "slide"
        }
    });
}

// var init = true;

// if(init == false){
//     return;
// }

var service = require('./components/categorias/categorias-service'),
    categorias = require('./components/categorias/categorias-view-model');
_fetchData();
function _fetchData() {
    return service.getAllRecords();
};
_fetchData()
    .then(function (result) {
        var itemsList = [];
        var index = 0;
        result.forEach(function (item) {
            itemsList.push({
                image: item.imagen,
                header: item.nombre,
                index: index,
                details: item
            });
            index++;
        });
        categorias.set('listItems', itemsList);
    })
    .catch(function onCatch() {
        categorias.set('isLoading', false);
    });





var service = require('./components/subcategorias/subcategorias-service'),
    subcategorias = require('./components/subcategorias/subcategorias-view-model');
_fetchData();
function _fetchData() {
    return service.getAllRecords();
};
_fetchData()
    .then(function (result) {
        var itemsList = [];
        var index = 0;
        result.forEach(function (item) {
            itemsList.push({
                header: item.nombre,
                index: index,
                details: item
            });
            index++;
        });
        subcategorias.set('listItems', itemsList);
    })
    .catch(function onCatch() {
        subcategorias.set('isLoading', false);
    });





var service = require('./components/productos/productos-service'),
    productos = require('./components/productos/productos-view-model');
_fetchData();
function _fetchData() {
    return service.getAllRecords();
};
_fetchData()
    .then(function (result) {
        var itemsList = [];
        var index = 0;
        result.forEach(function (item) {
            itemsList.push({
                header: item.nombre,
                index: index,
                image: item.imagen ? item.imagen : '~/images/logoActivity.png',
                precioDescuento: item.descuento > 0 ? (item.precio * (1 - (item.descuento / 100))).toFixed(2) : item.precio,
                colores: item.mediaExpand.length > 1 ? item.mediaExpand : [],
                details: item
            });
            index++;
        });
        productos.set('listItems', itemsList);
    })
    .catch(function onCatch() {
        productos.set('isLoading', false);
    });



var service = require('./components/media/media-service'),
    media = require('./components/media/media-view-model');
_fetchData();
function _fetchData() {
    return service.getAllRecords();
};
_fetchData()
    .then(function (result) {
        var itemsList = [];
        result.forEach(function (item) {
            itemsList.push({
                image: item.imagen,
                details: item
            }); 
        });
        // itemsList.details.valor.visible = (itemsList.details.valor ? true : false);
        media.set('listItems', itemsList);
    })
    .catch(function onCatch() {
        media.set('isLoading', false);
    });
