import { Zadatak } from "/Aplikacija/klase/zadatak.js"
import { Korisnik } from "/Aplikacija/klase/korisnik.js"
import { Greska } from "/Aplikacija/klase/greska.js";
export let cor = null;
const TEKST = "Dobrodošli na sajt gde ćete uz zanimljive zadatke naučiti nešto više o Vašem programskom jeziku.<br>Mi smo tim mladih inženjera, iz Niša, koji su osmislili ovaj sajt sa ciljem da kroz interaktivne zadatke pomognemo ljudima da uđu u svet programiranja i nauče nove stvari.<br>Takođe, podstičemo takmičarski duh kroz ocenjivanje vašeg znanja.<br>Nadamo se da ćete uz nas steći puno novih znanja i pritom se zabaviti!!!<br>Video upustvo za korišćenje sajta:";
let homeMain = document.createElement("div");
let promHelp = 0;
homeMain.className = "kontejner-main-body";
document.body.appendChild(homeMain);

document.body.onload = function() {
    if(getCookie("username") && getCookie("password"))
        fetch("https://localhost:5001/CShark/PreuzmiKorisnikaLog?u=" + getCookie("username") + "&p=" + h(getCookie("password"))).then(p => {
            p.json().then(data => {
                data.forEach(k => {
                    cor = new Korisnik(k.id, k.email, k.korisnickoIme, k.sifra, k.brojBodova, k.tipKorisnika);
                    logInBtn.style.display = "none";
                    registerBtn.style.display = "none";
                    //nakon logovanja prikazuje se home screen
                    homeImageBtnFun(null, cor);
                });
            });
        });
}
export function h(string)
{
    //hashiranje korisnickih lozinki
    var hash = 0;
                  
    if (string.length == 0) return hash;
                  
    for (let i = 0; i < string.length; i++) {
        let char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
         hash = hash & hash;
    }
                  
    return hash.toString();
}

function start(homeMain, jezik) {
    //glavni prikaz aplikacije
    //prikazuju se svi dostupni zadaci
    fetch("https://localhost:5001/CShark/PreuzmiOdobreneZadatke").then(p => {
        p.json().then(data => {
            data.forEach(zadatak => {
                let zad = new Zadatak(zadatak.id, zadatak.tekstZadatka.replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/(?:\t)/g, "&nbsp"), zadatak.programskiJezik, zadatak.opcijaA,
                    zadatak.opcijaB, zadatak.opcijaC, zadatak.tacanOdgovor, zadatak.brojBodova, zadatak.brojLikes, zadatak.zadatakJeOk, zadatak.zadatakPrelak, zadatak.zadatakPretezak, zadatak.brojDislikes, zadatak.autorZadatka, cor, zadatak.objasnjenje);
                if (cor != null) {
                    //ako je logovan korisnik proveraju se zadaci koje je resavao i oni se ne prikazuju
                    fetch("https://localhost:5001/CShark/PreuzmiResavanja?zad=" + zad.id + "&kor=" + cor.id).then(p => {
                        p.json().then(data => {
                            let r = false;
                            if (data.length == 1)
                                r = true;
                            if (r == false) {
                                //provera se da li je izabran neki konkretan jezik za prikaz
                                if (jezik != null && jezik == zad.programskiJezik) {
                                    zad.crtajZadatak(kontejnerZadaci, document);
                                }
                                else if (jezik == null) {
                                    zad.crtajZadatak(kontejnerZadaci, document);
                                }
                            }
                        });


                    });



                }
                else {
                    //provera se da li je izabran neki konkretan jezik za prikaz
                    if (jezik != null && jezik == zad.programskiJezik) {
                        zad.crtajZadatak(kontejnerZadaci, document);
                    }
                    else if (jezik == null) {
                        zad.crtajZadatak(kontejnerZadaci, document);
                    }
                }
            });
        });
    });
    let kontejnerKom=document.createElement("div");
    homeMain.appendChild(kontejnerKom);
    kontejnerKom.className="kontejner-koml";
    kontejnerKom.innerHTML="Zadatak rešavate tako sto izaberete jedno od ponuđenih rešenja i pritisnete submit. 😊 \n\n Naravno morate biti logovani 🥰 ";
    kontejnerKom=document.createElement("div");
    kontejnerKom.innerHTML="\nUkoliko uočite grešku u nekom od zadataka slobodno je možete prijaviti pritiskom na Report! dugme 😊👌";
    homeMain.appendChild(kontejnerKom);
    kontejnerKom.className="kontejner-komd";
    let kontejnerZadaci = document.createElement("div");
    kontejnerZadaci.className = "kontejner";
    homeMain.appendChild(kontejnerZadaci);



}

export function homeImageBtnFun(jezik, corl) {
    //kad se klikne na logo sajta/home button odlazi se na osnovni prikaz u zavisnosti od tipa korisnika ako je logovan
    cor = corl;
    if (cor != null) {
        //proverava tip korisnika
        if (cor.tipKorisnika == "admin") {
            addBtn.style.display = "inline-block";
            approveBtn.style.display = "inline-block";
            profileBtn.style.display = "inline-block";
            reportsBtn.style.display = "inline-block";
            usersBtn.style.display="inline-block";
        }
        if (cor.tipKorisnika == "privilegovaniKorisnik") {

            addBtn.style.display = "inline-block";
            profileBtn.style.display = "inline-block";
        }
        if (cor.tipKorisnika == "obican") {
            profileBtn.style.display = "inline-block";
        }
    }
    let tempDiv = document.body.getElementsByClassName("kontejner-main-body");
    document.body.removeChild(tempDiv.item(0));

    let homeMain = document.createElement("div");
    homeMain.className = "kontejner-main-body";
    document.body.appendChild(homeMain);
    //poziva se start  metoda za prikaz svih zadataka
    start(homeMain, jezik);
}

function categoryBtnFun() {
    //otvara se prikaz sa ponudjenim izborom kategorija/programskih jezika po kojima se mogu filtrirati zadaci

    let tempDiv = document.body.getElementsByClassName("kontejner-main-body");
    document.body.removeChild(tempDiv.item(0));

    let categoryMain = document.createElement("div");
    categoryMain.className = "kontejner-main-body";
    categoryMain.id="drugiCategoryMain"
    document.body.appendChild(categoryMain);
    //za sad ponudjene kategorije (sa mogucnoscu dodavanja jos)
    let kategorije = ["C", "C++", "C#", "Java", "JavaScript", "Python"];
    
    kategorije.forEach(el => {

        let btnKategorija = document.createElement("button");
        btnKategorija.className="btnKategorija";
        categoryMain.appendChild(btnKategorija);
        
        btnKategorija.innerHTML = el;
        
        btnKategorija.onclick = ev => {

            homeImageBtnFun(btnKategorija.innerHTML, cor);
            
        }
    })
    
    

}


function topListBtnFun() {
    //prikazuju se top lista svih korisnika po poenima ne racunajuci administratore

    let tempDiv = document.body.getElementsByClassName("kontejner-main-body");
    document.body.removeChild(tempDiv.item(0));

    let topListMain = document.createElement("div");
    topListMain.className = "kontejner-main-body";
    let cList=document.createElement("div");
    cList.className="kontejner-koml";
    cList.innerHTML="Na listi je prikazano 10 trenutno najbolje plasiranih korisnika 👏";
    topListMain.appendChild(cList);
    cList=document.createElement("div");
    cList.className="kontejner-komd";
    cList.innerHTML="Poeni se osvajaju tačnim rešavanjem zadataka 💪 Rešavaj zadatke i plasiraj se među najboljima 🎉";
    topListMain.appendChild(cList);
    let topList=document.createElement("div");
    topList.className="topList2";
    topListMain.appendChild(topList);
    let naslov = document.createElement("h1");
    naslov.innerHTML = "TOP LISTA KORISNIKA";
    topList.appendChild(naslov);
    let niz = [];
    //poziv funkcije servera koja vraca korisnike sortirane po broju bodova
    fetch("https://localhost:5001/CShark/PreuzmiKorisnike").then(p => {
        p.json().then(data => {
            data.forEach(korisnik => {
                let k = new Korisnik(korisnik.id, korisnik.email, korisnik.korisnickoIme, korisnik.sifra, korisnik.brojBodova, korisnik.tipKorisnika);
                if (k.tipKorisnika != "admin")
                    niz.push(k);
                    
            });
            for (let i = 0; i < 10; i++) {
                if (niz[i]) {
                    naslov = document.createElement("h2");
                    naslov.innerHTML = i + 1 + "." + niz[i].korisnickoIme + " BODOVI:" + niz[i].brojBodova ;
                    topList.appendChild(naslov);
                }
            }
        })
    })
    document.body.appendChild(topListMain);
}

function aboutUsBtnFun() {
    //prikaz indormacija o sistemu
    let tempDiv = document.body.getElementsByClassName("kontejner-main-body");
    document.body.removeChild(tempDiv.item(0));

    let aboutUsMain = document.createElement("div");
    aboutUsMain.classList.add("kontejner-main-body");
    aboutUsMain.classList.add("about-us-cont");

    let labelTekst = document.createElement("h2");
    labelTekst.className = "tekst-about-us";
    labelTekst.innerHTML = TEKST;
    aboutUsMain.appendChild(labelTekst);

    let video = document.createElement("iframe");
    video.width = "620";
    video.height = "400";
    video.className = "video-klasa";
    video.src = "https://www.youtube.com/embed/DIBoaJoEXUc?autoplay=0&mute=1";
    aboutUsMain.appendChild(video);
    //https://www.youtube.com/watch?v=DIBoaJoEXUc&ab_channel=MarkoBudisa

    let videoLink = document.createElement("a");
    videoLink.href = "https://youtu.be/DIBoaJoEXUc";
    videoLink.innerHTML = "Video!";
    videoLink.target = "_blank";
    videoLink.className = "video-link";
    aboutUsMain.appendChild(videoLink);

    let labelLinkovi = document.createElement("h2");
    labelLinkovi.className = "tekst-about-us";
    labelLinkovi.innerHTML = "Linkovi:";
    aboutUsMain.appendChild(labelLinkovi);

    let contLinkovi = document.createElement("div");
    contLinkovi.className = "cont-linkovi";
    aboutUsMain.appendChild(contLinkovi);

    let gitMarko = document.createElement("a");
    gitMarko.href = "https://github.com/MarkoBudisa";
    gitMarko.innerHTML = "MarkoBudiša - GitHub";
    gitMarko.target = "_blank";
    gitMarko.className = "git-link"
    contLinkovi.appendChild(gitMarko);

    let gitNevena = document.createElement("a");
    gitNevena.href = "https://github.com/nevenab548";
    gitNevena.innerHTML = "NevenaBrkić - GitHub";
    gitNevena.target = "_blank";
    gitNevena.className = "git-link"
    contLinkovi.appendChild(gitNevena);

    let gitAnita = document.createElement("a");
    gitAnita.href = "https://github.com/AnitaB24";
    gitAnita.innerHTML = "AnitaBrandić - GitHub";
    gitAnita.target = "_blank";
    gitAnita.className = "git-link"
    contLinkovi.appendChild(gitAnita);
    document.body.appendChild(aboutUsMain);
}

function logInBtnFun() {

    //prikaz forma za log in korisnika
    let tempDiv = document.body.getElementsByClassName("kontejner-main-body");
    document.body.removeChild(tempDiv.item(0));

    let logInMain = document.createElement("div");
    logInMain.className = "kontejner-main-body";
    logInMain.id="drugiLogIn";
    document.body.appendChild(logInMain);

    let labkIme = document.createElement("label");
    labkIme.innerHTML=" Unesite korisničko ime: ";
    logInMain.appendChild(labkIme);

    let inputUserName = document.createElement("input");
    logInMain.appendChild(inputUserName);

    let labkSifra = document.createElement("label");
    labkSifra.innerHTML="Šifra: ";
    logInMain.appendChild(labkSifra);

    let inputPasswod = document.createElement("input");
    inputPasswod.type = "password";
    logInMain.appendChild(inputPasswod);

    let brLabel=document.createElement("label");
    brLabel.innerHTML="<br>"
    logInMain.appendChild(brLabel);

    let btnLogIn = document.createElement("button");
    btnLogIn.className="btnLogin";
    btnLogIn.innerHTML = "Prijavi se!";
    logInMain.appendChild(btnLogIn);

    btnLogIn.onclick = ev => {
        let userName = inputUserName.value;
        let password = inputPasswod.value;
        let pas=h(password);
        //pribavlja se korisnik na osnovu korisnickog imena i sifre
        fetch("https://localhost:5001/CShark/PreuzmiKorisnikaLog?u=" + userName + "&p=" + pas).then(p => {
            p.json().then(data => {
                if (data.length==0) //ako su podaci pogresni/korisnik ne postoji javlja se greska
                alert("Pogresni podaci!");
                data.forEach(k => {
                    cor = new Korisnik(k.id, k.email, k.korisnickoIme, k.sifra, k.brojBodova, k.tipKorisnika);
                    logInBtn.style.display = "none";
                    registerBtn.style.display = "none";
                    //nakon logovanja prikazuje se home screen
                    setCookie("username",userName);
                    setCookie("password",password);
                    homeImageBtnFun(null, cor);
                });
            });
        });

    }
}
function setCookie(name,value)
{
    var expires = "";
    var now  = new Date();
    now.setDate(now.getDate()+1)
    now.setHours(8);
    now.setMinutes(0);
    now.setMilliseconds(0);
        now.setTime(now.getTime());
        expires = "; expires=" + now.toUTCString();
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function registerBtnFun() {

    //prikaz forme za registrovanje na sistem
    let tempDiv = document.body.getElementsByClassName("kontejner-main-body");
    document.body.removeChild(tempDiv.item(0));

    let registerMain = document.createElement("div");
    registerMain.className = "kontejner-main-body";
    registerMain.id="drugiRegister";
    document.body.appendChild(registerMain);

    let eMailLabel = document.createElement("label");
    eMailLabel.innerHTML = "E-mail adresa: ";
    registerMain.appendChild(eMailLabel);

    let eMailInput = document.createElement("input");
    registerMain.appendChild(eMailInput);

    let korisnickoImeLabel = document.createElement("label");
    korisnickoImeLabel.innerHTML = "Korisničko ime: ";
    registerMain.appendChild(korisnickoImeLabel);

    let korisnickoImeInput = document.createElement("input");
    registerMain.appendChild(korisnickoImeInput);

    let passwordLabel = document.createElement("label");
    passwordLabel.innerHTML = "Šifra: ";
    registerMain.appendChild(passwordLabel);

    let passwordInput = document.createElement("input");
    passwordInput.type = "password";
    registerMain.appendChild(passwordInput);

    let password2Label = document.createElement("label");
    password2Label.innerHTML = "Ponovite šifru: ";
    registerMain.appendChild(password2Label);

    let password2Input = document.createElement("input");
    password2Input.type = "password";
    registerMain.appendChild(password2Input);

    let brLabel=document.createElement('label');
    brLabel.innerHTML="<br>"
    registerMain.appendChild(brLabel);

    let btnRegistrujSe = document.createElement("button");
    btnRegistrujSe.className="btnRegister";
    btnRegistrujSe.innerHTML = "Registruj se";
    btnRegistrujSe.onclick = ev => {
        let emailCheck = eMailInput.value;
        let user = korisnickoImeInput.value;
        let pass = passwordInput.value;
        let dodaj = 1;
        let pas=h(passwordInput.value);
        if (emailCheck == "" || user == "" || pass == "") //moraju sva polja biti popunjena
            alert("Unesite sve podatke!");
        else if(passwordInput.value!=password2Input.value)
            alert("Šifre se ne poklapaju!");
        else {
            //api koji proverava postojanje email adrese
            fetch("https://apilayer.net/api/check?access_key=82ed384a5a4c4a57150ca38925b69d7b&email=" + emailCheck).then(p => {
                p.json().then(data => {
                    if (data.smtp_check == false)
                        alert("Unesite postojecu email adresu!"); //ako je email nevalidan javlja gresku
                    else {
                        fetch("https://localhost:5001/CShark/PreuzmiKorisnika?a=" + emailCheck + "&b=" + user).then(p => {
                            p.json().then(data => {
                                data.forEach(korisnik => {
                                    alert("Već postoji nalog pod ovim imenom/sa ovom mejl adresom!"); //mail i username se ne mogu ponavljati
                                    dodaj = 0;
                                });
                                if (dodaj)
                                    dodajKorisnika(emailCheck, user, pas); //dodaje se korisnik na sistem
                                //location.reload();
                                start (homeMain,null);
                            });

                        });

                    }
                })
            });

        }
    }
    registerMain.appendChild(btnRegistrujSe);

}
function dodajKorisnika(emailCheck, user, pass) {
    //dodavanje korisnika u bazu
    fetch("https://localhost:5001/CShark/DodajKorisnika", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": emailCheck,
            "korisnickoIme": user,
            "sifra": pass,
            "brojBodova": 0,
            "tipKorisnika": "obican"
        })
    }).then(p => {
        if (p.status == 406) {
            alert("Unesite sve podatke!");
        }
        alert("Uspešna registracija!");
        
        
    });

}
function addBtnFun() {
    //kad se pritisne dugme za dodavanje novog zadatka//add
    let tempDiv = document.body.getElementsByClassName("kontejner-main-body");
    document.body.removeChild(tempDiv.item(0));

    let addMain = document.createElement("div");
    addMain.className = "kontejner-main-body";
    addMain.classList.add("add2");
    document.body.appendChild(addMain);

    let prJezikLabel = document.createElement("label");
    prJezikLabel.innerHTML = "Programski jezik: ";
    addMain.appendChild(prJezikLabel);
    let prJezikInput = document.createElement("select");
    let kategorije = ["C", "C++", "C#", "Java", "JavaScript", "Python"];
    kategorije.forEach(k=>{
        let input=document.createElement("option");
        input.innerHTML=k;
        prJezikInput.appendChild(input);
    })
    //bira jedan od ponudjenih jezika
    prJezikInput.className="prJezikInput";
    addMain.appendChild(prJezikInput);

    let cList=document.createElement("div");
    cList.className="kontejner-koml";
    cList.innerHTML="Dodaj novi zadatak po izboru 😇 Potrudi se! 😉 Zadatak može biti težak koliko ti želis da bude (što teži to bolje😜)";
    addMain.appendChild(cList);
    cList=document.createElement("div");
    cList.className="kontejner-komd";
    cList.innerHTML="Neko od naših administratora će proveriti tvoj zadatak i, ukoliko ga prihvati, dodeliti mu poene 🤩";
    addMain.appendChild(cList);

    let tekstZadatkaLabel = document.createElement("label");
    tekstZadatkaLabel.innerHTML = "Tekst zadatka: ";
    addMain.appendChild(tekstZadatkaLabel);
    let tekstZadatkaInput = document.createElement("textarea");
    tekstZadatkaInput.className="tekstZadatkaInput";
    addMain.appendChild(tekstZadatkaInput);

    let objasnjenjeLabel = document.createElement("label");
    objasnjenjeLabel.innerHTML = "Objašnjenje zadatka: ";
    addMain.appendChild(objasnjenjeLabel);
    let objasnjenjeInput = document.createElement("textarea");
    objasnjenjeInput.className="objasnjenjeInput";
    addMain.appendChild(objasnjenjeInput);

    let opcijaALabel = document.createElement("label");
    opcijaALabel.innerHTML = "Opcija A: ";
    addMain.appendChild(opcijaALabel);
    let opcijaAInput = document.createElement("input");
    addMain.appendChild(opcijaAInput);
    let ifATacanRadio = document.createElement("input");
    ifATacanRadio.type = "radio";
    ifATacanRadio.value = "A";
    ifATacanRadio.name = "Name";
    addMain.appendChild(ifATacanRadio);

    let opcijaBLabel = document.createElement("label");
    opcijaBLabel.innerHTML = "Opcija B: ";
    addMain.appendChild(opcijaBLabel);
    let opcijaBInput = document.createElement("input");
    addMain.appendChild(opcijaBInput);
    let ifBTacanRadio = document.createElement("input");
    ifBTacanRadio.type = "radio";
    ifBTacanRadio.value = "B";
    ifBTacanRadio.name = "Name";
    addMain.appendChild(ifBTacanRadio);

    let opcijaCLabel = document.createElement("label");
    opcijaCLabel.innerHTML = "Opcija C: ";
    addMain.appendChild(opcijaCLabel);
    let opcijaCInput = document.createElement("input");
    addMain.appendChild(opcijaCInput);
    let ifCTacanRadio = document.createElement("input");
    ifCTacanRadio.type = "radio";
    ifCTacanRadio.value = "C";
    ifCTacanRadio.name = "Name";
    addMain.appendChild(ifCTacanRadio);

    let postaviBtn = document.createElement("button");
    postaviBtn.innerHTML = "Postavi zadatak";
    postaviBtn.className="postaviBtn";
    addMain.appendChild(postaviBtn);
    //dodaje zadatak u bazu zadataka na cekanju dok ga neki admin ne odobri
    postaviBtn.onclick = ev => {
        if(prJezikInput.value=="" || tekstZadatkaInput.value=="" || objasnjenjeInput.value=="" || opcijaAInput.value=="" || opcijaBInput.value=="" || opcijaCInput.value=="")
        alert("Morate popuniti sva polja!");
        else {
            let tacan;
            if (ifATacanRadio.checked)
                tacan = ifATacanRadio.value;
            else if (ifBTacanRadio.checked)
                tacan = ifBTacanRadio.value;
            else
                tacan = ifCTacanRadio.value;
            fetch("https://localhost:5001/CShark/DodajZadatakNaOdobrenje", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "tekstZadatka": tekstZadatkaInput.value,
                    "programskiJezik": prJezikInput.value,
                    "opcijaA": opcijaAInput.value,
                    "opcijaB": opcijaBInput.value,
                    "opcijaC": opcijaCInput.value,
                    "tacanOdgovor": tacan,
                    "brojBodova": 0,
                    "brojLikes": 0,
                    "zadatakJeOk": 0,
                    "zadatakPrelak": 0,
                    "zadatakPretezak": 0,
                    "brojDislikes": 0,
                    "objasnjenje": objasnjenjeInput.value,
                    "autorZadatka": cor.korisnickoIme
                })
            }).then(p => {
                homeImageBtnFun(null, cor);
            });
        }

    }


}

export function approveBtnFun() {
    //pribavljaju se svi zadaci koji cekaju na odobrenje/kada se pritisne approve
    let tempDiv = document.body.getElementsByClassName("kontejner-main-body");
    document.body.removeChild(tempDiv.item(0));

    let approveMain = document.createElement("div");
    approveMain.classList.add("kontejner-main-body");
    approveMain.classList.add("approve2");
    document.body.appendChild(approveMain);

    fetch("https://localhost:5001/CShark/PreuzmiZadatkeNaCekanju").then(p => {
        p.json().then(data => {
            data.forEach(z => {
                let zad = new Zadatak(z.id, z.tekstZadatka.replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/(?:\t)/g, "&nbsp"),  z.programskiJezik , z.opcijaA , z.opcijaB ,z.opcijaC , z.tacanOdgovor , z.brojBodova, z.brojLikes , z.zadatakJeOk , z.zadatakPrelak , z.zadatakPretezak , z.brojDislikes, z.autorZadatka +"<br>", cor, z.objasnjenje);
                zad.crtajZadatakApprove(approveMain);
            })
        })
    })
}
export function usersBtnFun(){
    //lista svih korisnika dostupna administratorima
    let tempDiv = document.body.getElementsByClassName("kontejner-main-body");
    document.body.removeChild(tempDiv.item(0));

    let usersMain = document.createElement("div");
    usersMain.classList.add("kontejner-main-body");
    usersMain.classList.add("users2");
    document.body.appendChild(usersMain);

    fetch("https://localhost:5001/CShark/PreuzmiKorisnike").then(p => {
        p.json().then(data => {
            data.forEach(k => {
                if(k.tipKorisnika!="admin")
                {
                let kor=new Korisnik(k.id, k.email, k.korisnickoIme, k.sifra, k.brojBodova, k.tipKorisnika);
                kor.crtajKorisnika(usersMain);
                }
            })
        })
    });
}

function profileBtnFun() { 
    //profil korisnika
    //njegovi podaci 
    let tempDiv = document.body.getElementsByClassName("kontejner-main-body");
    document.body.removeChild(tempDiv.item(0));

    let profileMain = document.createElement("div");
    profileMain.className = "kontejner-main-body";
    profileMain.id="drugiProfil";

    let label=document.createElement("h1");
    label.innerHTML="PROFIL";
    profileMain.appendChild(label);
    label=document.createElement("img")
    label.className="userimg";
    label.src="\/Aplikacija\/images\/user.png";
    profileMain.appendChild(label);
    label=document.createElement("label")
    label.innerHTML="<br>";
    profileMain.appendChild(label);
    label=document.createElement("label")
    label.innerHTML="E-mail adresa: "+cor.email;
    profileMain.appendChild(label);
    label=document.createElement("label")
    label.innerHTML="<br>";
    profileMain.appendChild(label);
    label=document.createElement("label")
    label.innerHTML="Korisničko ime: "+cor.korisnickoIme;
    profileMain.appendChild(label);
    label=document.createElement("label")
    label.innerHTML="<br>";
    profileMain.appendChild(label);
    label=document.createElement("label")
    label.innerHTML="Broj osvojenih poena: " + cor.brojBodova;
    profileMain.appendChild(label);
    label=document.createElement("label")
    label.innerHTML="<br>";
    profileMain.appendChild(label);
    //profileMain.innerHTML = "E-mail adresa:"+cor.email + "<br> Korisnicko ime: " + cor.korisnickoIme + "<br> Broj osvojenih poena: " + cor.brojBodova;
    document.body.appendChild(profileMain);

    
    let dugmad=document.createElement("div");
    dugmad.className="dugmad";
    profileMain.appendChild(dugmad);

    let btnLogOff = document.createElement("button");
    btnLogOff.classList.add("btnOdjava");
    btnLogOff.innerHTML = "LOG OFF";
    profileMain.appendChild(btnLogOff);

    btnLogOff.onclick = ev => {
        cor = null;
        eraseCookie("username");
        eraseCookie("password");
        addBtn.style.display = "none";
        approveBtn.style.display = "none";
        profileBtn.style.display = "none";
        reportsBtn.style.display = "none";
        usersBtn.style.display="none";

        logInBtn.style.display = "inline-block";
        registerBtn.style.display = "inline-block";

        homeImageBtnFun(null, cor);
    }
    //ima mogucnosti izmene podataka
    //otvara se posebna forma za izmenu
    let btnIzmeniPodatke = document.createElement("button");
    btnIzmeniPodatke.innerHTML = "Izmeni podatke";
    btnIzmeniPodatke.classList.add("btnIzmena");
    profileMain.appendChild(btnIzmeniPodatke);
    let contIzmenaPodatka = document.createElement("div");
    contIzmenaPodatka.className="izmena";
    btnIzmeniPodatke.onclick = ev => {
        while(contIzmenaPodatka.firstChild){
            contIzmenaPodatka.removeChild(contIzmenaPodatka.firstChild);
        }
        dugmad.appendChild(contIzmenaPodatka);

        let unesiNovoKorisnickoIme = document.createElement("input");
        unesiNovoKorisnickoIme.value = cor.korisnickoIme;
        contIzmenaPodatka.appendChild(unesiNovoKorisnickoIme);

        let unesiNovuSifru = document.createElement("input");
        unesiNovuSifru.type = "password";
        contIzmenaPodatka.appendChild(unesiNovuSifru);

        let btnIzmeniPodatkeKorisnik = document.createElement("button");
        btnIzmeniPodatkeKorisnik.innerHTML = "Izmeni podatke";
        contIzmenaPodatka.appendChild(btnIzmeniPodatkeKorisnik);
        //izmena korisnika u bazi
        btnIzmeniPodatkeKorisnik.onclick = ev => {
            if(unesiNovoKorisnickoIme.value=="" || unesiNovuSifru.value=="")
            alert("Unesite sve podatke!");
            else
            {
            fetch("https://localhost:5001/CShark/IzmeniKorisnika", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "id": cor.id,
                    "email": cor.email,
                    "korisnickoIme": unesiNovoKorisnickoIme.value,
                    "sifra": h(unesiNovuSifru.value),
                    "brojBodova": cor.brojBodova,
                    "tipKorisnika": cor.tipKorisnika
                })
            }).then(p => {
                alert("Uspešna promena podataka!");
                profileBtnFun();
            });
            dugmad.removeChild(contIzmenaPodatka);
        }
        }

    }
    //ima izbor prikaza svih zadataka koje je resavao(tekst,objasnjenje resenja)
    let btnPrikaziReseneZadatke = document.createElement("button");
    btnPrikaziReseneZadatke.innerHTML = "Prikaži rešene zadatke";
    btnPrikaziReseneZadatke.classList.add("btnReseni");
    profileMain.appendChild(btnPrikaziReseneZadatke);

    let reseniZadaciBox = document.createElement("div");
    reseniZadaciBox.className="reseniZadaciBox";
    profileMain.appendChild(reseniZadaciBox);

    let zad;
    btnPrikaziReseneZadatke.onclick = ev => {
        while(reseniZadaciBox.firstChild){
            reseniZadaciBox.removeChild(reseniZadaciBox.firstChild);
        } 
        fetch("https://localhost:5001/CShark/PreuzmiResavanjaKorisnika/" + cor.id).then(p => {
            p.json().then(data => {
                data.forEach(r => {
                    fetch("https://localhost:5001/CShark/PreuzmiZadatak/" + r.zadatak).then(p => {
                        p.json().then(data => {
                            
                            data.forEach(zadatak => {
                                zad = new Zadatak(zadatak.id, zadatak.tekstZadatka.replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/(?:\t)/g, "&nbsp"), zadatak.programskiJezik, zadatak.opcijaA,
                                    zadatak.opcijaB, zadatak.opcijaC, zadatak.tacanOdgovor, zadatak.brojBodova, zadatak.brojLikes, zadatak.zadatakJeOk, zadatak.zadatakPrelak, zadatak.zadatakPretezak, zadatak.brojDislikes, zadatak.autorZadatka, cor, zadatak.objasnjenje);
                                    zad.crtajZadatakReseni(reseniZadaciBox,document);
                            });
                        });
                    });
                });
            });
        });

    }
}

export function reportsBtnFun() {
    //prikaz svih podnetih prijava o greskama koje administrator obradjuje
    let tempDiv = document.body.getElementsByClassName("kontejner-main-body");
    document.body.removeChild(tempDiv.item(0));

    let reportsMain = document.createElement("div");
    reportsMain.classList.add("kontejner-main-body");
    reportsMain.classList.add("reports2");
    document.body.appendChild(reportsMain);
    fetch("https://localhost:5001/CShark/PreuzmiGreske").then(p => {
        p.json().then(data => {
            data.forEach(greska => {
                let g = new Greska(greska.id, greska.idZadatka, greska.tekstGreske, document);
                g.crtajGresku(reportsMain);
            });
        });
    });

}

function openNav() {
    //side navigacija u slucaju prikaza na mobilnom telefonu
    document.getElementById("mySidenav").style.width = "250px";
    if(promHelp == 0){
        while(sideMenu.firstChild.nextSibling){
            sideMenu.removeChild(sideMenu.firstChild.nextSibling);
        }
        dugmad.forEach(dugme =>{
            if(window.getComputedStyle(dugme).getPropertyValue("display")!= "none"){

                let aa = document.createElement("a");
                aa.onclick = ev =>{
                    dugme.onclick();
                }
                aa.innerHTML = dugme.innerHTML;
                sideMenu.appendChild(aa)
            }
        })
        promHelp = 1;
    }
}
  
  function closeNav() {
      //zatvaranja side navigacije
    document.getElementById("mySidenav").style.width = "0";
    promHelp = 0;
}
let sideMenu = document.getElementById("mySidenav");
sideMenu.className = "sidenav";
let aCLose = document.createElement("a");
aCLose.href="javascript:void(0)";
aCLose.className = "closebtn";
aCLose.innerHTML = "&times;";
aCLose.onclick = ev =>{
    closeNav();
}
let spana = document.getElementById("spana");
spana.onclick = ev =>{
    openNav();
}
sideMenu.appendChild(aCLose);

let addBtn = document.getElementById("addBtn");
let approveBtn = document.getElementById("approveBtn");
let reportsBtn = document.getElementById("reportsBtn");
let profileBtn = document.getElementById("profileBtn");
let homeImageBtn = document.getElementsByClassName("logo").item(0);
let categoryBtn = document.getElementById("category-btn");
let topListBtn = document.getElementById("top-list-btn");
let aboutUsBtn = document.getElementById("about-us-btn");
let logInBtn = document.getElementById("log-in-btn");
let registerBtn = document.getElementById("register-btn");
let usersBtn=document.getElementById("usersBtn");

let dugmad = [];
dugmad.push(addBtn);
dugmad.push(approveBtn);
dugmad.push(reportsBtn);
dugmad.push(profileBtn);
dugmad.push(categoryBtn);
dugmad.push(topListBtn);
dugmad.push(aboutUsBtn);
dugmad.push(logInBtn);
dugmad.push(registerBtn);
dugmad.push(usersBtn);

addBtn.style.display = "none";
approveBtn.style.display = "none";
reportsBtn.style.display = "none";
profileBtn.style.display = "none";
usersBtn.style.display="none";

addBtn.onclick = e => { addBtnFun() };
approveBtn.onclick = e => { approveBtnFun() };
profileBtn.onclick = e => { profileBtnFun() };
reportsBtn.onclick = e => { reportsBtnFun() };
homeImageBtn.onclick = e => { homeImageBtnFun(null, cor) };
categoryBtn.onclick = e => { categoryBtnFun() };
topListBtn.onclick = e => { topListBtnFun() };
aboutUsBtn.onclick = e => { aboutUsBtnFun() };
logInBtn.onclick = e => { logInBtnFun() };
registerBtn.onclick = e => { registerBtnFun() };
usersBtn.onclick=e=>{usersBtnFun()};


start(homeMain, null);

