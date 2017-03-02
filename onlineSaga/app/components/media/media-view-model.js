'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
// additional requires

ViewModel = new Observable({

    pageTitle: 'Media',

    isLoading: false,
    listItems: [],
    // additional properties
    imagenSelected: "~/images/logoActivity.png",
    tallaSelected: "",
    colorSelected: "Unico",
    producto:[],
});

// START_CUSTOM_CODE_media
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_media
module.exports = ViewModel;