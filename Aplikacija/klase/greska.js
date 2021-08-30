import { Zadatak } from "./zadatak.js";
import { reportsBtnFun } from "../javascript/home.js";
import { cor } from "../javascript/home.js";
import { homeImageBtnFun } from "../javascript/home.js";

export class Greska {
    constructor(id, idZadatka, tekstGreske, mainDoc/*Prosledjuje se document od home*/) {
        this.id = id;
        this.idZadatka = idZadatka;
        this.tekstGreske = tekstGreske;
        this.mainDoc = mainDoc;
    }

    crtajGresku(doc) {
        let zad;
        //povlace se sve greske sa servera
        fetch("https://localhost:5001/CShark/PreuzmiZadatak/" + this.idZadatka).then(p => {
            p.json().then(data => {
                data.forEach(zadatak => {
                    zad = new Zadatak(zadatak.id, zadatak.tekstZadatka.replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/(?:\t)/g, "&nbsp"), zadatak.programskiJezik, zadatak.opcijaA,
                        zadatak.opcijaB, zadatak.opcijaC, zadatak.tacanOdgovor, zadatak.brojBodova, zadatak.brojLikes, zadatak.zadatakJeOk, zadatak.zadatakPrelak, zadatak.zadatakPretezak, zadatak.brojDislikes, zadatak.autorZadatka, zadatak.trKorisnik, zadatak.objasnjenje)
                    zad.crtajZadatakGreska(kontGreske);
                })
            })
        });

        let kontGreske = document.createElement("div");
        kontGreske.className = "kontejner-greske";
        doc.appendChild(kontGreske);

        let tekstGreskeLabel = document.createElement("label");
        tekstGreskeLabel.innerHTML ="Tekst prijave:"+ this.tekstGreske+"<br>";
        kontGreske.appendChild(tekstGreskeLabel);
        //opcija da se izmeni zadatak ako je greska validna
        let btnIzemniZadatak = document.createElement("button");
        btnIzemniZadatak.innerHTML = "Izmeni zadatak";
        kontGreske.appendChild(btnIzemniZadatak);
        //opcija da se zanemari greska ako je nevalidna
        let btnIgnorisiReport = document.createElement("button");
        btnIgnorisiReport.innerHTML = "Ignoriši grešku";
        kontGreske.appendChild(btnIgnorisiReport);
        //poziva se server da izmeni zadatak u slucaju validne prijave
        btnIzemniZadatak.onclick = ev => {
            let tempDiv = this.mainDoc.body.getElementsByClassName("kontejner-main-body");
            this.mainDoc.body.removeChild(tempDiv.item(0));
            //crta se posebna forma za izmenu zadatka
            let izmenaMain = document.createElement("div");
            izmenaMain.className = "kontejner-main-body";
            this.mainDoc.body.appendChild(izmenaMain);
            zad.crtajIzmenaZadatka(izmenaMain, this.id);
        }
        //ako je prijava nevalidna samo se ignorise/brise iz sistema
        btnIgnorisiReport.onclick = ev => {
            fetch("https://localhost:5001/CShark/IzbrisiGresku/" + this.id, { method: "DELETE" }).then(p => {
                alert("Greska ignorisana!");
                reportsBtnFun();
            });

        }
    }
    //crta se forma u koju ce se unositi greska prilikom prijave 
    crtajGreskuUnos(doc) {
        //unos teksta greske
        let divGreske=document.createElement("div");
        divGreske.className="divGreske";
        doc.appendChild(divGreske);

        let labGreske=document.createElement("label");
        labGreske.className="labGreske";
        labGreske.innerHTML="Tekst greške: <br>";
        divGreske.appendChild(labGreske);

        let textInput = document.createElement("textarea");
        textInput.className="textInputGreska";
        divGreske.appendChild(textInput);

        labGreske=document.createElement("label");
        labGreske.innerHTML="<br>";
        divGreske.appendChild(labGreske);
        //dugme za podnosenje
        //poziva se server da napravi novu gresku koja ce da se cita u reports
        let btnPosaljiError = document.createElement("button");
        btnPosaljiError.className="btnPosaljiError";
        btnPosaljiError.innerHTML = "Pošalji prijavu greške";
        btnPosaljiError.onclick = ev => {
            if(textInput.value=="")
            alert("Ne možete ostaviti prazno polje!")
            else{
                this.tekstGreske = textInput.value;
            fetch("https://localhost:5001/CShark/DodajGresku", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "idZadatka": this.idZadatka,
                    "tekstGreske": this.tekstGreske
                })
            }).then(p => {
                alert("Uspešno ste prijavili grešku u zadatku!");
                homeImageBtnFun(null,cor);
            });
            }
            
        }
        divGreske.appendChild(btnPosaljiError);
    }
}

