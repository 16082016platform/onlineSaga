var helpers = require('../../utils/widgets/helper');

var frameModule = require("ui/frame");

function pageLoaded(args) {
    var page = args.object;

    // helpers.platformInit(page); //para que no se vea el header
    // Hide the iOS UINavigationBar so it doesn't get in the way of the animation
    if (frameModule.topmost().ios) {
        frameModule.topmost().ios.navBarVisibility = "never";
    } else {
        frameModule.topmost().android.navBarVisibility = "never";
    }
    
}
exports.pageLoaded = pageLoaded;

exports.goToCategorias = function (args) {
    helpers.navigate({
        moduleName: "components/categorias/categorias",
        animated: true,
        transition: {
            name: "slide"
        },
    });
}