import { Greska } from "./greska.js";
import { approveBtnFun } from "../javascript/home.js";
import {cor} from "../javascript/home.js";
import { reportsBtnFun } from "../javascript/home.js";
import { homeImageBtnFun } from "../javascript/home.js";
export class Zadatak {

    constructor(id, tekstZadatka, programskiJezik, opcijaA, opcijaB, opcijaC,
        tacanOdgovor, brojBodova, brojLikes, zadatakJeOk, zadatakPrelak, zadatakPretezak,
        brojDislikes, autorZadatka, trKorisnik, obj) {

        this.id = id;
        this.tekstZadatka = tekstZadatka;
        this.programskiJezik = programskiJezik;
        this.opcijaA = opcijaA;
        this.opcijaB = opcijaB;
        this.opcijaC = opcijaC;
        this.radioBtns = [];
        this.tacanOdgovor = tacanOdgovor;
        this.brojBodova = brojBodova;
        this.brojLikes = brojLikes;
        this.zadatakJeOk = zadatakJeOk;
        this.zadatakPrelak = zadatakPrelak;
        this.zadatakPretezak = zadatakPretezak;
        this.brojDislikes = brojDislikes;
        this.autorZadatka = autorZadatka;
        this.trenutnoLogovaniKorisnik = trKorisnik;
        this.objasnjenje = obj;
    }
    promenaPoenaZadatka(){

        //algoritam za promenu poena zadatka na osnovu ocena korisnika o odnosu tezina:poeni
        let staImaVise = this.zadatakPrelak > this.zadatakPretezak ? this.zadatakPrelak : this.zadatakPretezak;

        if(this.zadatakJeOk < staImaVise * 4){

            if(this.zadatakPrelak > this.zadatakPretezak){
                this.brojBodova = this.brojBodova + (this.zadatakPrelak%this.zadatakPretezak);
            }
            else if(this.zadatakPretezak > this.zadatakPrelak){
                this.brojBodova = this.brojBodova - (this.zadatakPretezak%this.zadatakPrelak);
            }
        }
    }

    crtajZadatakReseni(kontejnerSvihZadataka,mainMenu)
    {
        //na profilu korisnika kad se pritisne dugme za prikaz svih zadataka koje je resio
        let kontejnerZadatka = document.createElement("div");
        kontejnerZadatka.className = "kontejner-zadatka"
        kontejnerSvihZadataka.appendChild(kontejnerZadatka);
        // prikazuje se tekst zadatka i objasnjenje za resenje
        let tekstZadatkaLabela = document.createElement("label");
        tekstZadatkaLabela.innerHTML ="Tekst zadatka: "+ this.tekstZadatka;
        kontejnerZadatka.appendChild(tekstZadatkaLabela);

        let objasnjenjeZadatkaLabela = document.createElement("label");
        objasnjenjeZadatkaLabela.innerHTML ="Objašnjenje rešenja: "+ this.objasnjenje;
        kontejnerZadatka.appendChild(objasnjenjeZadatkaLabela);
    }


    crtajZadatakApprove(kontejnerSvihZadataka) {
        //crtanje forme za zadatke koji tek treba da se odobre
        kontejnerSvihZadataka.classList.add("kontejnerSvihZadataka");

        let kontZad = document.createElement("div");
        kontZad.className = "zadatak-za-approve";
        kontejnerSvihZadataka.appendChild(kontZad);

        let tekstZadatkaLabel = document.createElement("label");
        tekstZadatkaLabel.innerHTML ="<br> Tekst zadatka:"+ this.tekstZadatka;
        kontZad.appendChild(tekstZadatkaLabel);

        let progJezikLabel = document.createElement("label");
        progJezikLabel.innerHTML ="<br> Programski jezik: "+ this.programskiJezik + "<br>";
        kontZad.appendChild(progJezikLabel);

        let opcALabel = document.createElement("label");
        opcALabel.innerHTML = "A) " + this.opcijaA;
        kontZad.appendChild(opcALabel);

        let opcBLabel = document.createElement("label");
        opcBLabel.innerHTML ="<br> B) " + this.opcijaB;
        kontZad.appendChild(opcBLabel);

        let opcCLabel = document.createElement("label");
        opcCLabel.innerHTML ="<br> C) " + this.opcijaC;
        kontZad.appendChild(opcCLabel);

        let tacanOdgLabel = document.createElement("label");
        tacanOdgLabel.innerHTML = "<br> Tačan odgovor: " +this.tacanOdgovor;
        kontZad.appendChild(tacanOdgLabel);

        let objasnjenjeLabel = document.createElement("label");
        objasnjenjeLabel.innerHTML ="<br> Objašnjenje: " + this.objasnjenje;
        kontZad.appendChild(objasnjenjeLabel);

       

        let autorZadLabel = document.createElement("label");
        autorZadLabel.innerHTML = "<br> Autor zadatka:"+ this.autorZadatka;
        kontZad.appendChild(autorZadLabel);
        
        let brojPoenaZadLabel = document.createElement("label");
        brojPoenaZadLabel.innerHTML = "Dodeliti broj poena zadatku:";
        kontZad.appendChild(brojPoenaZadLabel);

        let inputBrojPoena = document.createElement("input");
        kontZad.appendChild(inputBrojPoena);

       
        //admin moze da odobri predlog ili da ga odbije
        let btnApprove = document.createElement("button");
        btnApprove.innerHTML = "Odobri";
        kontZad.appendChild(btnApprove);

        let btnDecline = document.createElement("button");
        btnDecline.innerHTML = "Odbaci";
        kontZad.appendChild(btnDecline);
        //ako ga odobri premesta se iz zadataka na cekanju u odobrene zadatke
        btnApprove.onclick = ev => {
            if(inputBrojPoena.value=="")
            alert("Ne zaboravite broj poena!");
            else
            {
                fetch("https://localhost:5001/CShark/DodajZadatak", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "tekstZadatka": this.tekstZadatka,
                        "programskiJezik": this.programskiJezik,
                        "opcijaA": this.opcijaA,
                        "opcijaB": this.opcijaB,
                        "opcijaC": this.opcijaC,
                        "tacanOdgovor": this.tacanOdgovor,
                        "brojBodova": inputBrojPoena.value,
                        "brojLikes": 0,
                        "zadatakJeOk": 0,
                        "zadatakPrelak": 0,
                        "zadatakPretezak": 0,
                        "brojDislikes": 0,
                        "objasnjenje": this.objasnjenje,
                        "autorZadatka": this.autorZadatka
                    })
                }).then(p => {
                    fetch("https://localhost:5001/CShark/IzbrisiZadatakNaCekanju/" + this.id, { method: "DELETE" }).then(p=>{
                        alert("Uspešno dodat zadatak!");
                        approveBtnFun();
                    });
                })
            }
            
        }
        //ako admin odbije predlog samo se brise iz zadataka na cekanju
        btnDecline.onclick = ev => {
            fetch("https://localhost:5001/CShark/IzbrisiZadatakNaCekanju/" + this.id, { method: "DELETE" }).then(p=>{
                alert("Odbijen zadatak!");
                approveBtnFun();
            });
        }

    }

    crtajZadatak(kontejnerSvihZadataka, mainMenu) {

        //crtanje zadataka na home prikazu
        let kontejnerZadatka = document.createElement("div");
        kontejnerZadatka.className = "kontejner-zadatka"
        kontejnerSvihZadataka.appendChild(kontejnerZadatka);
        if(this.programskiJezik=="C")
        kontejnerZadatka.style.backgroundImage="linear-gradient(to top, white , lightblue)";
        else if(this.programskiJezik=="C++")
        kontejnerZadatka.style.backgroundImage="linear-gradient(to top, white , darkblue)";
        else if(this.programskiJezik=="C#")
        kontejnerZadatka.style.backgroundImage="linear-gradient(to top, white , purple)";
        else if(this.programskiJezik=="Java")
        kontejnerZadatka.style.backgroundImage="linear-gradient(to top, white , red)";
        else if(this.programskiJezik=="JavaScript")
        kontejnerZadatka.style.backgroundImage="linear-gradient(to top, white , yellow)";
        else
        kontejnerZadatka.style.backgroundImage="linear-gradient(to top, white , orange)";

        let autorZadatkaLabela = document.createElement("h2");
        autorZadatkaLabela.className = "centrirani-podaci-zadatka";
        autorZadatkaLabela.innerHTML =   "<br> Autor zadatka:" +" "+ this.autorZadatka + "<br> Broj bodova:"+" " + this.brojBodova;
        autorZadatkaLabela.style.textAlign="center";
        kontejnerZadatka.appendChild(autorZadatkaLabela);
        

        let programskiJezikLabela = document.createElement("h3");
        programskiJezikLabela.className = "centrirani-podaci-zadatka";
        programskiJezikLabela.innerHTML =  "Programski jezik: " +this.programskiJezik;
        kontejnerZadatka.appendChild(programskiJezikLabela);

        let tekstZadatkaLabela = document.createElement("h3");
        tekstZadatkaLabela.innerHTML = "Tekst zadatka:<br>"+this.tekstZadatka;
        kontejnerZadatka.appendChild(tekstZadatkaLabela);

        let resenjeZadatkaLabela = document.createElement("h3");
        resenjeZadatkaLabela.innerHTML = "Izaberite tačno rešenje:<br>";
        kontejnerZadatka.appendChild(resenjeZadatkaLabela);

        let kontejnerOdgovorA = document.createElement("div");
        kontejnerOdgovorA.className = "kontejner-odgovor";
        kontejnerZadatka.appendChild(kontejnerOdgovorA);

        let kontejnerOdgovorB = document.createElement("div");
        kontejnerOdgovorB.className = "kontejner-odgovor";
        kontejnerZadatka.appendChild(kontejnerOdgovorB);

        let kontejnerOdgovorC = document.createElement("div");
        kontejnerOdgovorC.className = "kontejner-odgovor";
        kontejnerZadatka.appendChild(kontejnerOdgovorC);

        let opcijaARadio = document.createElement("input");
        opcijaARadio.type = "radio";
        opcijaARadio.value = "A";
        opcijaARadio.name = "izborOdgovora";
        kontejnerOdgovorA.appendChild(opcijaARadio);

        let opcijaALabel = document.createElement("label");
        opcijaALabel.innerHTML = this.opcijaA;
        kontejnerOdgovorA.appendChild(opcijaALabel);

        let opcijaBRadio = document.createElement("input");
        opcijaBRadio.type = "radio";
        opcijaBRadio.value = "B";
        opcijaBRadio.name = "izborOdgovora";
        kontejnerOdgovorB.appendChild(opcijaBRadio);

        let opcijaBLabel = document.createElement("label");
        opcijaBLabel.innerHTML = this.opcijaB;
        kontejnerOdgovorB.appendChild(opcijaBLabel);

        let opcijaCRadio = document.createElement("input");
        opcijaCRadio.type = "radio";
        opcijaCRadio.value = "C";
        opcijaCRadio.name = "izborOdgovora";
        kontejnerOdgovorC.appendChild(opcijaCRadio);

        let opcijaCLabel = document.createElement("label");
        opcijaCLabel.innerHTML = this.opcijaC;
        kontejnerOdgovorC.appendChild(opcijaCLabel);

        this.radioBtns.push(opcijaARadio);
        this.radioBtns.push(opcijaBRadio);
        this.radioBtns.push(opcijaCRadio);

        let submitButton = document.createElement("button");
        submitButton.className = "submit-answer-btn";
        submitButton.innerHTML = "Submit answer✅";
        kontejnerZadatka.appendChild(submitButton);

        const a = document.createElement('a');
        //moze se kliknuti na report da bi se prijavila greska u zadatku ako je primecena
        //u slucaju da je prijavljen administrator, klikom na report dugme brise se zadatak iz baze
        let link;
        if( cor!=null && cor.tipKorisnika=="admin")
        link=document.createTextNode("Obrisi❗");
        else
        link = document.createTextNode("Report❗");
        
        a.className = "report-problem";

        a.appendChild(link);
        a.title = "Report error";
        a.onclick = ev => {
            if(cor==null)
            alert("Niste logovani!");
            else if(cor.tipKorisnika=="admin")
            {
                fetch("https://localhost:5001/CShark/IzbrisiOdobreniZadatak/" + this.id, { method: "DELETE" }).then(p=>{
                alert("Obrisan zadatak!");
                homeImageBtnFun(null,cor);
            });
            }
            else{
                let tempDiv = document.body.getElementsByClassName("kontejner-main-body");
                document.body.removeChild(tempDiv.item(0));
    
                let reportProblemMain = document.createElement("div");
                reportProblemMain.className = "kontejner-main-body";
                document.body.appendChild(reportProblemMain);

                let cList=document.createElement("div");
                cList.className="kontejner-koml";
                cList.innerHTML="Pošto si uočio grešku unutar zadatka, slobodno je prijavi kako bismo mogli da je sto pre ispravimo! Neko od naših administratora će vrlo brzo odreagovati na prijavu greške i potruditi se da je ispravi! 🤗";
                reportProblemMain.appendChild(cList);
                cList=document.createElement("div");
                cList.className="kontejner-komd";
                cList.innerHTML="Hvala na uloženom trudu i pomoći oko staranja da zadaci na našem sajt budu uvek ispravni i sa kvalitetnim rešenjima! 🥰";
                reportProblemMain.appendChild(cList);
                //crta se forma za prijavu greske
                let greskaUnos = new Greska(0, this.id, "", null);
                greskaUnos.crtajGreskuUnos(reportProblemMain);
            }

        }
        kontejnerZadatka.appendChild(a);
        let numberOfLikes = document.createElement("label");
        numberOfLikes.innerHTML = "👍"+this.brojLikes;
        kontejnerZadatka.appendChild(numberOfLikes);
        let numberOfDislikes = document.createElement("label");
        numberOfDislikes.innerHTML ="👎"+ this.brojDislikes;
        kontejnerZadatka.appendChild(numberOfDislikes);
        submitButton.onclick = ev => {
            //nelogovani korisnik ne moze da resava zadatke
            if (this.trenutnoLogovaniKorisnik == null) {
                alert("Niste logovani");
            }
            else {
                let chechedAnswer=null;

                this.radioBtns.forEach(el => {
                    if (el.checked == true) {
                        chechedAnswer = el;
                    }
                });
                if(chechedAnswer==null)
                    alert("Niste izabrali odgovor!");
                else{
                let tempDiv = document.body.getElementsByClassName("kontejner-main-body");
                document.body.removeChild(tempDiv.item(0));

                let afterSolveScreen = document.createElement("div");
                afterSolveScreen.className = "kontejner-main-body";
                afterSolveScreen.classList.add("afterSolveScreen");
                document.body.appendChild(afterSolveScreen);

                //provera se da li je odgovor tacan u zavisnosti od izabranog radio button-a
                if (chechedAnswer.value == this.tacanOdgovor) {

                    afterSolveScreen.innerHTML = "TAČNO STE ODGOVORILI!😍";
                }
                else {
                    afterSolveScreen.innerHTML = "NISTE TAČNO ODGOVORILI!😢"
                }

                let labelObjasnjenje = document.createElement("label");
                labelObjasnjenje.innerHTML = "<br>" + "Objašnjenje:"+ this.objasnjenje +"<br><br>";

                afterSolveScreen.appendChild(labelObjasnjenje);
                //dodaje se nov resen zadatak korisniku i menjaju mu se poeni u zavisnosti od resenja
                if (chechedAnswer.value == this.tacanOdgovor) {

                    this.trenutnoLogovaniKorisnik.dodajNoviResenZadatakTacan(this);
                }
                else {
                    this.trenutnoLogovaniKorisnik.dodajNoviResenZadatakNetacan(this);
                }
                //korisnik moze da stavi lajk/dislajk i da oceni tezinu zadatka
                let divLikeDis=document.createElement("div");
                divLikeDis.className="divLikeDis";
                afterSolveScreen.appendChild(divLikeDis);

                let btnLike = document.createElement("button");
                btnLike.className="dugmeLike";
                btnLike.innerHTML = "Like!";
                divLikeDis.appendChild(btnLike);

                let btnDisslike = document.createElement("button");
                btnDisslike.className="dugmeDisslike";
                btnDisslike.innerHTML = "Dislike!";
                divLikeDis.appendChild(btnDisslike);

                btnLike.onclick = ev =>{
                    this.brojLikes+=1;
                    fetch("https://localhost:5001/CShark/IzmeniOdobreniZadatak", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "id": this.id,
                    "tekstZadatka": this.tekstZadatka,
                    "programskiJezik": this.programskiJezik,
                    "opcijaA": this.opcijaA,
                    "opcijaB": this.opcijaB,
                    "opcijaC": this.opcijaC,
                    "tacanOdgovor": this.tacanOdgovor,
                    "brojBodova": this.brojBodova,
                    "brojLikes": this.brojLikes,
                    "zadatakJeOk": this.zadatakJeOk,
                    "zadatakPrelak": this.zadatakPrelak,
                    "zadatakPretezak": this.zadatakPretezak,
                    "brojDislikes": this.brojDislikes,
                    "objasnjenje": this.objasnjenje,
                    "autorZadatka": this.autorZadatka
                })
            }).then(p => {
                    alert("Zadatak lajkovan!");
            });
                    divLikeDis.removeChild(btnLike);
                    divLikeDis.removeChild(btnDisslike);

                }
                btnDisslike.onclick = ev =>{
                    this.brojDislikes += 1;
                    fetch("https://localhost:5001/CShark/IzmeniOdobreniZadatak", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "id": this.id,
                    "tekstZadatka": this.tekstZadatka,
                    "programskiJezik": this.programskiJezik,
                    "opcijaA": this.opcijaA,
                    "opcijaB": this.opcijaB,
                    "opcijaC": this.opcijaC,
                    "tacanOdgovor": this.tacanOdgovor,
                    "brojBodova": this.brojBodova,
                    "brojLikes": this.brojLikes,
                    "zadatakJeOk": this.zadatakJeOk,
                    "zadatakPrelak": this.zadatakPrelak,
                    "zadatakPretezak": this.zadatakPretezak,
                    "brojDislikes": this.brojDislikes,
                    "objasnjenje": this.objasnjenje,
                    "autorZadatka": this.autorZadatka
                })
            }).then(p => {
                    alert("Zadatak dislajkovan!");
            });
                    divLikeDis.removeChild(btnLike);
                    divLikeDis.removeChild(btnDisslike);
                }
    
                let labRazmaka=document.createElement("label");
                labRazmaka.innerHTML="<br>";
                afterSolveScreen.appendChild(labRazmaka);

                let divOcenaZadataka=document.createElement("div");
                divOcenaZadataka.className="divOcenaZadataka";
                afterSolveScreen.appendChild(divOcenaZadataka);

                let btnZadatakPretezak = document.createElement("button");
                btnZadatakPretezak.innerHTML = "Zadatak je pretezak";
                divOcenaZadataka.appendChild(btnZadatakPretezak);

                let btnZadatakOk = document.createElement("button");
                btnZadatakOk.innerHTML = "Zadatak je ok";
                divOcenaZadataka.appendChild(btnZadatakOk);

                let btnZadatakPrelak = document.createElement("button");
                btnZadatakPrelak.innerHTML = "Zadatak je prelak";
                divOcenaZadataka.appendChild(btnZadatakPrelak);

               
                btnZadatakPretezak.onclick = ev =>{

                    fetch("https://localhost:5001/CShark/IzmeniOdobreniZadatak", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "id": this.id,
                    "tekstZadatka": this.tekstZadatka,
                    "programskiJezik": this.programskiJezik,
                    "opcijaA": this.opcijaA,
                    "opcijaB": this.opcijaB,
                    "opcijaC": this.opcijaC,
                    "tacanOdgovor": this.tacanOdgovor,
                    "brojBodova": this.brojBodova,
                    "brojLikes": this.brojLikes,
                    "zadatakJeOk": this.zadatakJeOk,
                    "zadatakPrelak": this.zadatakPrelak,
                    "zadatakPretezak": this.zadatakPretezak+1,
                    "brojDislikes": this.brojDislikes,
                    "objasnjenje": this.objasnjenje,
                    "autorZadatka": this.autorZadatka
                })
            }).then(p => {
                    alert("Zadatak ocenjen!");
            });
                    divOcenaZadataka.removeChild(btnZadatakPretezak);
                    divOcenaZadataka.removeChild(btnZadatakPrelak);
                    divOcenaZadataka.removeChild(btnZadatakOk);
                }

                btnZadatakPrelak.onclick = ev =>{

                    fetch("https://localhost:5001/CShark/IzmeniOdobreniZadatak", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "id": this.id,
                    "tekstZadatka": this.tekstZadatka,
                    "programskiJezik": this.programskiJezik,
                    "opcijaA": this.opcijaA,
                    "opcijaB": this.opcijaB,
                    "opcijaC": this.opcijaC,
                    "tacanOdgovor": this.tacanOdgovor,
                    "brojBodova": this.brojBodova,
                    "brojLikes": this.brojLikes,
                    "zadatakJeOk": this.zadatakJeOk,
                    "zadatakPrelak": this.zadatakPrelak+1,
                    "zadatakPretezak": this.zadatakPretezak,
                    "brojDislikes": this.brojDislikes,
                    "objasnjenje": this.objasnjenje,
                    "autorZadatka": this.autorZadatka
                })
            }).then(p => {
                    alert("Zadatak ocenjen!");
            });
                    divOcenaZadataka.removeChild(btnZadatakPretezak);
                    divOcenaZadataka.removeChild(btnZadatakPrelak);
                    divOcenaZadataka.removeChild(btnZadatakOk);
                }

                btnZadatakOk.onclick = ev =>{

                    this.zadatakJeOk += 1;
                    this.promenaPoenaZadatka();
                    fetch("https://localhost:5001/CShark/IzmeniOdobreniZadatak", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "id": this.id,
                    "tekstZadatka": this.tekstZadatka,
                    "programskiJezik": this.programskiJezik,
                    "opcijaA": this.opcijaA,
                    "opcijaB": this.opcijaB,
                    "opcijaC": this.opcijaC,
                    "tacanOdgovor": this.tacanOdgovor,
                    "brojBodova": this.brojBodova,
                    "brojLikes": this.brojLikes,
                    "zadatakJeOk": this.zadatakJeOk,
                    "zadatakPrelak": this.zadatakPrelak,
                    "zadatakPretezak": this.zadatakPretezak,
                    "brojDislikes": this.brojDislikes,
                    "objasnjenje": this.objasnjenje,
                    "autorZadatka": this.autorZadatka
                })
            }).then(p => {
                    alert("Zadatak ocenjen!");
            });
                    divOcenaZadataka.removeChild(btnZadatakPretezak);
                    divOcenaZadataka.removeChild(btnZadatakPrelak);
                    divOcenaZadataka.removeChild(btnZadatakOk);
                }

            }
        }
    }

    }
    crtajZadatakGreska(kontejnerSvihZadataka) {
        //crtanje zadatka kod citanja svih prijava gresaka
        let kontZad = document.createElement("div");
        kontZad.className = "zadatak-za-approve";
        kontejnerSvihZadataka.appendChild(kontZad);

        let tekstZadatkaLabel = document.createElement("label");
        tekstZadatkaLabel.innerHTML = "<br>Tekst zadatka: " + this.tekstZadatka;
        kontZad.appendChild(tekstZadatkaLabel);

        let progJezikLabel = document.createElement("label");
        progJezikLabel.innerHTML = "<br> Programski jezik: " + this.programskiJezik;
        kontZad.appendChild(progJezikLabel);

        let opcALabel = document.createElement("label");
        opcALabel.innerHTML = "<br> A): " + this.opcijaA;
        kontZad.appendChild(opcALabel);

        let opcBLabel = document.createElement("label");
        opcBLabel.innerHTML = "<br> B): " + this.opcijaB;
        kontZad.appendChild(opcBLabel);

        let opcCLabel = document.createElement("label");
        opcCLabel.innerHTML ="<br> C): " + this.opcijaC;
        kontZad.appendChild(opcCLabel);

        let tacanOdgLabel = document.createElement("label");
        tacanOdgLabel.innerHTML = "<br> Tačan odgovor: " + this.tacanOdgovor;
        kontZad.appendChild(tacanOdgLabel);

        let objasnjenjeLabel = document.createElement("label");
        objasnjenjeLabel.innerHTML = "<br> Objašnjenje: " +this.objasnjenje;
        kontZad.appendChild(objasnjenjeLabel);

        let autorZadLabel = document.createElement("label");
        autorZadLabel.innerHTML = "<br> Autor: " + this.autorZadatka + "<br>";
        kontZad.appendChild(autorZadLabel);


    }

    crtajIzmenaZadatka(kontejner, id) {
        //forma za izmenu zadatka ako je primecena greska
        kontejner.classList.add("kontejnerIzmene");

        let labIzmena =document.createElement("label");
        labIzmena.className="labIzmena";
        labIzmena.innerHTML="Tekst zadatka: ";
        kontejner.appendChild(labIzmena);
        
        let inputTextZadatka = document.createElement("textarea");
        inputTextZadatka.className="inputTekstZadatka";
        inputTextZadatka.value = this.tekstZadatka;
        kontejner.appendChild(inputTextZadatka);

        labIzmena.innerHTML="Objašnjenje zadatka: ";
        kontejner.appendChild(labIzmena);
        
        let inputObjZadatka = document.createElement("textarea");
        inputObjZadatka.className="inputObjZadatka";
        inputObjZadatka.value = this.objasnjenje;
        kontejner.appendChild(inputObjZadatka);
        
        labIzmena =document.createElement("label");
        labIzmena.innerHTML="Opcija A: ";
        kontejner.appendChild(labIzmena);

        let inputOpcijaA = document.createElement("input");
        inputOpcijaA.className="inputOpcijaA";
        inputOpcijaA.value = this.opcijaA;
        kontejner.appendChild(inputOpcijaA);

        labIzmena =document.createElement("label");
        labIzmena.innerHTML="Opcija B: ";
        kontejner.appendChild(labIzmena);

        let inputOpcijaB = document.createElement("input");
        inputOpcijaB.className="inputOpcijaB";
        inputOpcijaB.value = this.opcijaB;
        kontejner.appendChild(inputOpcijaB);

        labIzmena =document.createElement("label");
        labIzmena.innerHTML="Opcija C: ";
        kontejner.appendChild(labIzmena);

        let inputOpcijaC = document.createElement("input");
        inputOpcijaC.className="inputOpcijaC";
        inputOpcijaC.value = this.opcijaC;
        kontejner.appendChild(inputOpcijaC);

        labIzmena =document.createElement("label");
        labIzmena.innerHTML="Tačan odgovor: ";
        kontejner.appendChild(labIzmena);

        let inputTacanOdgovor = document.createElement("input");
        inputTacanOdgovor.value = this.tacanOdgovor;
        kontejner.appendChild(inputTacanOdgovor);

        let btnIzmeni = document.createElement("button");
        btnIzmeni.className="btnIzmeniZad";
        btnIzmeni.innerHTML = "Izmeni";
        kontejner.appendChild(btnIzmeni);
        //poziva se server za izmenu zadatka
        btnIzmeni.onclick = ev => {
            fetch("https://localhost:5001/CShark/IzmeniOdobreniZadatak", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "id": this.id,
                    "tekstZadatka": inputTextZadatka.value,
                    "programskiJezik": this.programskiJezik,
                    "opcijaA": inputOpcijaA.value,
                    "opcijaB": inputOpcijaB.value,
                    "opcijaC": inputOpcijaC.value,
                    "tacanOdgovor": inputTacanOdgovor.value,
                    "brojBodova": this.brojBodova,
                    "brojLikes": this.brojLikes,
                    "zadatakJeOk": this.zadatakJeOk,
                    "zadatakPrelak": this.zadatakPrelak,
                    "zadatakPretezak": this.zadatakPretezak,
                    "brojDislikes": this.brojDislikes,
                    "objasnjenje": inputObjZadatka.value,
                    "autorZadatka": this.autorZadatka
                })
            }).then(p => {
                fetch("https://localhost:5001/CShark/IzbrisiGresku/" + id, { method: "DELETE" }).then(p => {
                    alert("Zadatak izmenjen!");
                    reportsBtnFun();
                });
            });
        }
    }

}