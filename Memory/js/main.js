/* global Storage */
var gracz = "brak imienia";
$(function () {
////////////////////////////////////////////////////////////////////////////////
//zmienne
////////////////////////////////////////////////////////////////////////////////
    var elementy = [];
    elementy = document.getElementsByClassName("flip-container");
    var images = [
        "img/numerki/1.png",
        "img/numerki/2.png",
        "img/numerki/3.png",
        "img/numerki/4.png",
        "img/numerki/5.png",
        "img/numerki/6.png",
        "img/numerki/7.png",
        "img/numerki/8.png",
        "img/numerki/9.png",
        "img/numerki/10.png",
        "img/numerki/11.png",
        "img/numerki/12.png",
        "img/numerki/13.png",
        "img/numerki/14.png",
        "img/numerki/15.png",
        "img/numerki/16.png",
        "img/numerki/17.png",
        "img/numerki/18.png"];
    var divClone = $("#plansza").clone();
    var iloscKlikniec = 0;
    var score = 0;//17;
    var prob = 0;//Math.floor(1000 * Math.random());// 0;
    var temp = [];//przechowuje 2 odrócone elementy
////////////////////////////////////////////////////////////////////////////////
//eventy
////////////////////////////////////////////////////////////////////////////////
    $(document).on("click", ".flip-container", flipKlik);
    $(document).on("click ", "#button-nowa-gra", nowa_gra);
////////////////////////////////////////////////////////////////////////////////
//bonusy :D
////////////////////////////////////////////////////////////////////////////////
    losujobrazki();
    if (typeof (Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        $(document).on("click", "#dodaj", dodaj);
        $(document).on("click", "#wczytaj", wczytaj);
        $(document).on("click", "#czysc", czysc);
        $(document).on("click", "#usun10", usun10);
    } else {
        // Sorry! No Web Storage support..
        //dodanie w wynikach komuniatu ze storage nie działa
        $("#najlepsze_wyniki")[0].innerHTML = "<p>Niestety twoja przeglądarka nie obsługuje przechowywania wyników :(</p>";
    }
////////////////////////////////////////////////////////////////////////////////    
////////////////////////////////////////////////////////////////////////////////
//funkcje
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
    function nowa_gra() {
        refreshbutton();
    }
    function randImg() {
        var size = images.length;
        var x = Math.floor(size * Math.random());
        return x;
    }
    function sprawdz(tab) {
        try {
            var j = 0;
            for (var i = 0; i < elementy.length; i++) {
                if ($(elementy[i]).hasClass("flip")) {
                    tab[j] = elementy[i];
                    j++;
                }
            }
            if (tab[0].children[0].children[1].children[0].src ===
                    tab[1].children[0].children[1].children[0].src) {
                score++;
            } else {
            }
        } catch (ex) {
        } finally {
            prob++;
        }
        if (score >= 18) {
            setTimeout(function () {
                konczGre();
            }, 5 * 1000);
            $("#info > p > span")[0].innerHTML = "Twój wynik to: " + prob;
            $("#przed-info").fadeIn(500);
            setTimeout(function () {
                $("#przed-info").fadeOut(500);
            }, 4000);
        }
    }
    function konczGre() {
        var i = localStorage.length;
        var o = {
            imie: gracz,
            wynik: prob
        };
        if (i < 10) {
            localStorage.setObject(i, o);
        } else {
            if (czyWTopTen(prob)) {
                localStorage.setObject(i, o);
                trim_localStorage();
            }
        }
        refreshbutton();
    }
    function trim_localStorage() {
        var t = zwrocLocalStorage(), nowa = [];
        sortuj_rosnaco(t);
        for (var i = 0; i < 10; i++) {
            nowa[i] = t[i];
        }
        wprowadz(nowa);
    }
    function czyWTopTen(liczba) {
        var t = zwrocLocalStorage();
        for (var i in t) {
            if (liczba < t[i].wynik)
                return true;
        }
        return false;
    }
    function odwracanieTablicy(tablica) {
        for (var i in tablica) {
            $(tablica[i]).flipper();
        }
    }
    function flipKlik() {
        if (!$(this).hasClass("flip")) {//jak jest odwrócony to nie można kliknąć drugi raz
            if (iloscKlikniec < 2) {//czy można kliknąć 
                temp[iloscKlikniec] = $(this);
                iloscKlikniec++;
                $(this).flipper();
            }
        }
        return flipKlik2();
    }
    function flipKlik2() {
        if (iloscKlikniec === 2) {
            iloscKlikniec = 3;
            var starescore = score, temptab = [];
            sprawdz(temptab);
            setTimeout(function () {
                if ((starescore + 1) === score) {
                    for (var i in temptab) {
                        $(temptab[i]).removeClass("wysokosc-szerokosc");
                        $(temptab[i].children[0].children[1].children[0]).removeClass("wysokosc-szerokosc");
                        $(temptab[i].children[0].children[0].children[0]).removeClass("wysokosc-szerokosc");
                        $(temptab[i]).addClass("ws0");
                        $(temptab[i].children[0].children[1].children[0]).addClass("ws0");
                        $(temptab[i].children[0].children[0].children[0]).addClass("ws0");
                    }
                }
                odwracanieTablicy(temp);
                temp = [];
                iloscKlikniec = 0;
            }, 1000 * 1);
        }
    }
    function losujobrazki() {
        var bylo = 0;
        var n = 0;
        for (var i = 0, max = 36; i < max; i++) {
            try {
                elementy[i].children[0].children[1].children[0].src = images[randImg()];
                for (var j = 0, max2 = i; j < max2; j++) {
                    n++;
                    if (elementy[i].children[0].children[1].children[0].src
                            === elementy[j].children[0].children[1].children[0].src) {
                        bylo++;
                    }
                    if (bylo >= 2) {
                        i--;
                        bylo = 0;
                        break;
                    }
                }
                bylo = 0;
            } catch (e) {
            }
        }
    }
    function refreshbutton() {
        $("#plansza").replaceWith(divClone.clone());
        losujobrazki();
        iloscKlikniec = 0;
        score = 0;
        prob = 0;
        start();
    }
////////////////////////////////////////////////////////////////////////////////
//funkcje localStorage
////////////////////////////////////////////////////////////////////////////////
    function dodaj() {
        var i = localStorage.length;
        var o = {
            imie: $("#imie")[0].value,
            wynik: $("#input_wynik")[0].value
        };
        localStorage.setObject(i, o);
        $("#storage")[0].innerHTML = $("#imie")[0].value + " " + $("#input_wynik")[0].value;
    }
    function wczytaj() {
        $("#storage")[0].innerHTML = "";
        var html = "";
        var t = zwrocLocalStorage();
        sortuj_malejaco(t);
        for (var i in t ) {
            html += "<p>" + t[i].imie + " " + t[i].wynik + "</p>";
        }
        $("#storage")[0].innerHTML = html;
    }
    function sortuj_rosnaco(tablica) {
        tablica.sort(function (a, b) {
            return a.wynik - b.wynik;
        });
    }
    function sortuj_malejaco(tablica) {
        tablica.sort(function (a, b) {
            return b.wynik - a.wynik;
        });
    }
    function usun10() {
        var t = zwrocLocalStorage();
        var nowa = [];
        var j = 0;
        for (var i in t) {
            if (t[i].wynik <= 10) {
                localStorage.removeItem(znajdzklucz(t[i].wynik));
            }
            else {
                nowa[j] = t[i];
                j++;
            }
        }
        wprowadz(nowa);
    }
    function zwrocLocalStorage() {
        var t = [];
        for (var klucz in localStorage) {
            if (localStorage.getItem(klucz))
                t[klucz] = localStorage.getObject(klucz);
        }
        return t;
    }
    function wprowadz(tablica) {
        czysc();
        for (var i in tablica) {
            localStorage.setObject(i, tablica[i]);
        }
    }
    function znajdzklucz(numer) {
        for (var klucz in localStorage) {
            if (localStorage.getItem(klucz)) {
                if (localStorage.getObject(klucz).wynik === numer)
                    return klucz;
            }
        }
    }
    function czysc() {
        localStorage.clear();
    }
});
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
};
Storage.prototype.getObject = function (key) {
    return JSON.parse(this.getItem(key));
};