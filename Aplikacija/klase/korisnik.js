import { usersBtnFun } from "../javascript/home.js";
export class Korisnik {

    constructor(id, eMail, korisnickoIme, sifra, brojBodova, tipKorisnika) {

        this.id = id;
        this.email = eMail;
        this.korisnickoIme = korisnickoIme;
        this.sifra = sifra;
        this.brojBodova = brojBodova;
        this.tipKorisnika = tipKorisnika;
    }

    dodajNoviResenZadatakTacan(zadatak) {
        //ako korisnik tacno odgovori na zadatak dodaju mu se bodovi koliko zadatak nosi
        this.brojBodova+=zadatak.brojBodova;
        if(this.brojBodova>=300 && this.tip=="obican") // neophodan broj poena da korisnik dobije status privilegovanog
            this.tipKorisnika="privilegovaniKorisnik";
        fetch("https://localhost:5001/CShark/IzmeniKorisnika", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": this.id,
                "email": this.email,
                "korisnickoIme": this.korisnickoIme,
                "sifra": this.sifra,
                "brojBodova": this.brojBodova,
                "tipKorisnika": this.tipKorisnika
            })
        }).then(p => {
            //dodaje se kao resavan zadatak za tog korisnika
            fetch("https://localhost:5001/CShark/DodajResavanje", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "korisnik": this.id,
                    "zadatak": zadatak.id
                })
            });
        })

    }
    dodajNoviResenZadatakNetacan(zadatak) {
        //ako korisnik netacno resi zadatak oduzimaju mu se bodovi koliko zadatak nosi
        let promena=Math.floor(zadatak.brojBodova/2);
        this.brojBodova-=promena;
        if(this.brojBodova<300 && this.tip=="privilegovaniKorisnik") // neophodan broj poena da korisnik dobije status privilegovanog
            this.tipKorisnika="obican";
        fetch("https://localhost:5001/CShark/IzmeniKorisnika", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": this.id,
                "email": this.email,
                "korisnickoIme": this.korisnickoIme,
                "sifra": this.sifra,
                "brojBodova": this.brojBodova, //oduzimanje poena
                "tipKorisnika": this.tipKorisnika
            })
        }).then(p => {
            //dodaje se na spisak resavanih za tog korisnika
            fetch("https://localhost:5001/CShark/DodajResavanje", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "korisnik": this.id,
                    "zadatak": zadatak.id
                })
            });
        })

    }

    dodajBodove(noviBodovi) {

        this.brojBodova += noviBodovi;
    }

    prikaziTipKorisnika() {

        return this.tipKorisnika;
    }
    crtajKorisnika(kontejnerSvihKorisnika)
    {
        //crtanje svih korisnika s mogucnoscu brisanja istih iz baze
        kontejnerSvihKorisnika.classList.add("kontejnerSvihKorisnika");

        let kontKor = document.createElement("div");
        kontKor.className = "korisnik";
        kontejnerSvihKorisnika.appendChild(kontKor);

        let usernameLabel = document.createElement("label");
        usernameLabel.innerHTML ="<br> Korisničko ime:"+ this.korisnickoIme;
        kontKor.appendChild(usernameLabel);

        let bodoviLabel = document.createElement("label");
        bodoviLabel.innerHTML ="<br> Broj bodova:"+ this.brojBodova;
        kontKor.appendChild(bodoviLabel);

        let tipLabel = document.createElement("label");
        tipLabel.innerHTML ="<br> Tip korisnika:"+ this.tipKorisnika;
        kontKor.appendChild(tipLabel);

        let obrisiBtn=document.createElement("button");
        kontKor.appendChild(obrisiBtn);
        obrisiBtn.innerHTML="Obriši korisnika";
        obrisiBtn.onclick=ev=>{
            fetch("https://localhost:5001/CShark/IzbrisiKorisnika/" + this.id, { method: "DELETE" }).then(p=>{
                alert("Obrisan korisnik!");
                usersBtnFun();
            });
        }
    }



}