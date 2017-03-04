'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
// additional requires

ViewModel = new Observable({

    pageTitle: 'Categorias',

    isLoading: false,
    listItems: [],
    // additional properties

});
module.exports = ViewModel;