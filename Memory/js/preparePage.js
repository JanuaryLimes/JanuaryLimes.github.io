$(function () {

    var plansza = $("#plansza").clone();
    var row = $("#row").clone();
    var rowItem = $("#rowItem").clone();

    fillRow();
    fillPlansza();
    $("#plansza")[0].innerHTML = plansza[0].innerHTML;   

    function fillRow() {
        var html = "";
        for (var i = 0; i < 6; i++) {
            html += rowItem[0].outerHTML;
        }
        row[0].innerHTML = html;
    }

    function fillPlansza() {
        var html = "";
        for (var i = 0; i < 6; i++) {
            html += row[0].outerHTML;
        }
        plansza[0].innerHTML = html;
    }
});