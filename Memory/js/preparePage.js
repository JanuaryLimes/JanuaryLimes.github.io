$(function () {

    var plansza = $("#plansza").clone();
    var row = $("#row").clone();
    var rowItem = $("#rowItem").clone();

    fillRow();
    fillPlansza();

    function fillRow() {
        row.empty();
        for (var i = 0; i < 6; i++) {
            row.append(rowItem[0].innerHTML);
        }
    }

    function fillPlansza() {
        plansza.empty();
        for (var i = 0; i < 6; i++) {
            plansza.append(row[0]);
        }
    }
    
    $("#nowaPlansza")[0]= plansza;
    
});


