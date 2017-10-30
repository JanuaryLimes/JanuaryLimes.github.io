/* global verge */

$(function () {
    start();
});
$(window).resize(function () {
    start();
});
var plansza = $("#plansza"),
        w = verge.viewportW(),
        h = verge.viewportH();

function start() {
    var  a;
    w = verge.viewportW();
    h = verge.viewportH();
    a = (w > h) ? h : w;
    a = a / 6 - (6);
    a = (a < 45) ? 45 : a;
    a = (a > 150) ? 150 : a;
    $(".wysokosc-szerokosc").css("height", a).css("width", a);
}

