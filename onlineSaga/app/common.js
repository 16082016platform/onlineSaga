var helpers = require('./utils/widgets/helper');

var producto=[];

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
