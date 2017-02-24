'use strict';
var menuItems,
    observable = require('data/observable'),
    navigationViewModel = new observable.Observable();

menuItems = [{
    "title": "HomeView",
    "moduleName": "components/homeView/homeView",
    "icon": "\ue0dd"
}, {
    "title": "Media",
    "moduleName": "components/media/media",
    "icon": "\ue205"
}, {
    "title": "Productos",
    "moduleName": "components/productos/productos",
    "icon": "\ue0eb"
}, {
    "title": "Subcategorias",
    "moduleName": "components/subcategorias/subcategorias",
    "icon": "\ue200"
}, {
    "title": "Categorias",
    "moduleName": "components/categorias/categorias",
    "icon": "\ue0dd"
}];

navigationViewModel.set('menuItems', menuItems);
navigationViewModel.set('backButtonHidden', true);

module.exports = navigationViewModel;