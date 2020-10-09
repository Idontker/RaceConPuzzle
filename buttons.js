
const initListeners = () => {
    const kl = document.getElementById("kl");
    const kr = document.getElementById("kr");

    kl.addEventListener('click', () => { getKontostand(true, kl, 50, -100) });
    kr.addEventListener('click', () => { getKontostand(false, kr, -50, -100) });

    const el = document.getElementById("el");
    const er = document.getElementById("er");
    const al = document.getElementById("al");
    const ar = document.getElementById("ar");

    el.addEventListener('click', () => { changeMoney(true, el, 100); });
    er.addEventListener('click', () => { changeMoney(false, er, 100); });
    al.addEventListener('click', () => { changeMoney(true, al, -100); });
    ar.addEventListener('click', () => { changeMoney(false, ar, -100); });

    const fl = document.getElementById("fl");
    const fr = document.getElementById("fr");

    fl.addEventListener('click', () => { commitChanges(true, fl, 50, -100) });
    fr.addEventListener('click', () => { commitChanges(false, fr, -50, -100) });
}


const changeMoney = (left, self, money) => {
    if (!self.classList.contains("active")) {
        return;
    }

    var tresen;
    if (left) {
        tresen = document.getElementById("sl");
    } else {
        tresen = document.getElementById("sr");
    }
    const bar = document.getElementById("bar");

    const kontostand = tresen.innerHTML.split(' ');
    if (kontostand[0] == "Kontostand:" && money <= bar.innerHTML) {
        tresen.innerHTML = "Kontostand: " + (parseInt(kontostand[1]) + money);
        bar.innerHTML = parseInt(bar.innerHTML) - money;
    }
}

const getKontostand = (left, self, dx, dy) => {
    if (!self.classList.contains("active")) {
        return;
    }

    var side;
    if (left) {
        side = document.querySelector(".left");
    } else {
        side = document.querySelector(".right");
    }

    const mitarbeiter = side.querySelector(".mitarbeiter");
    const tresen = side.querySelector(".schalter");
    const buttons = side.querySelectorAll(".button");
    const konto = document.getElementById("konto");

    const bankacc = konto.innerHTML;

    mitarbeiter.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';

    setTimeout(() => {
        mitarbeiter.style.transform = '';
        setTimeout(() => {
            tresen.innerHTML = 'Kontostand: ' + bankacc;
            buttons.forEach((but, index) => {
                but.classList.toggle('active');
            });
        }, 1000);
    }, 1000);
}

const commitChanges = (left, self, dx, dy) => {
    if (!self.classList.contains("active")) {
        return;
    }
    var side;
    if (left) {
        side = document.querySelector(".left");
    } else {
        side = document.querySelector(".right");
    }

    const mitarbeiter = side.querySelector(".mitarbeiter");
    const tresen = side.querySelector(".schalter");
    const buttons = side.querySelectorAll(".button");
    const konto = document.getElementById("konto");

    const neuerStand = parseInt(tresen.innerHTML.split(' ')[1]);

    buttons.forEach((but, index) => {
        but.classList.toggle('active');
    });

    mitarbeiter.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';

    setTimeout(() => {
        konto.innerHTML = neuerStand;
        mitarbeiter.style.transform = '';
        setTimeout(() => {
            tresen.innerHTML = left ? "Schalter 1" : "Schalter 2";
        }, 1000);
    }, 1000);
}


initListeners();