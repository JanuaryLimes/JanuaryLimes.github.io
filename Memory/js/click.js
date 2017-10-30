$(function () {
    var time = 1000 * .5;
    $(document).on("click", "#button-wpisanie-imienia-ok", wpisanie_imienia);
    $(document).on("click", "#button-zmiana-imienia-ok", zmiana_imienia);
    $(document).on("click", "#button-edytuj-imie", edycja_imienia);
    $(document).on("click", "#button-top-10", haj_skory);
    
    
    $("#input_wpisz_imie").on("keypress", klawisz);
    $("#input_imie").on("keypress", klawisz2);
    
    
    function haj_skory() {
        if ($("#najlepsze_wyniki").is(":visible")) {
            $("#najlepsze_wyniki").slideUp(time);
        } else {
            if (localStorage.length === 0) {
                var tekst = "<p>Brak wyników</p>";
            } else {
                var t = zwrocLocalStorage();
                sortuj_rosnaco(t);
                var tekst = "<p>Imię<span>wynik</span></p>";
                for (var i in t) {
                    tekst += "<p>" + t[i].imie + "<span>" + t[i].wynik + "</span></p>";
                }
            }
            $("#najlepsze_wyniki")[0].innerHTML = tekst;
            $("#najlepsze_wyniki").slideDown(time);
        }
    }
    function klawisz(e) {
        if (e.keyCode === 13) {
            if ($("#input_wpisz_imie")[0].value === "") {
            }
            else {
                $("#button-wpisanie-imienia-ok").click();
            }
        }
    }
    function klawisz2(e) {
        if (e.keyCode === 13) {
            if ($("#input_imie")[0].value === "") {
            }
            else {
                $("#button-zmiana-imienia-ok").click();
            }
        }
    }
    function wpisanie_imienia() {
        if ($("#input_wpisz_imie")[0].value === "") {
        } else {
            gracz = $("#input_wpisz_imie")[0].value;
            $("#span-wpisz-imie").fadeOut(time);
            setTimeout(function () {
                $("#span-edytuj-imie").fadeIn(time);
            }, time);
        }
    }
    function zmiana_imienia() {
        if ($("#input_imie")[0].value === "") {
        } else {
            gracz = $("#input_imie")[0].value;
            $("#span-edytuj-imie").fadeIn(time);
            $("#div-1-zmiana-imienia").slideUp(time);
            $("#input_imie")[0].value = "";
        }
    }
    function edycja_imienia() {
        $("#span-edytuj-imie").fadeOut(time);
        $("#div-1-zmiana-imienia").slideDown(time);
    }
    function zwrocLocalStorage() {
        var t = [];
        for (var klucz in localStorage) {
            if (localStorage.getItem(klucz))
                t[klucz] = localStorage.getObject(klucz);
        }
        return t;
    }
    function sortuj_rosnaco(tablica) {
        tablica.sort(function (a, b) {
            return a.wynik - b.wynik;
        });
    }
});
