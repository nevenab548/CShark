using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CSharkController : ControllerBase
    {
        public CSharkContext Context { get; set; }
        public CSharkController(CSharkContext context)
        {
            Context = context;
        }
        [Route("PreuzmiKorisnike")]
        [HttpGet]
        public async Task<List<Korisnik>> PreuzmiKorisnike()
        {
            return await Context.Korisnici.OrderByDescending(k => k.BrojBodova).ToListAsync();
        }
        [Route("PreuzmiResavanjaKorisnika/{idk}")]
        [HttpGet]
        public async Task<List<Resavanje>> PreuzmResavanjaKorisnika(int idk)
        {
            return await Context.Resavanja.Where(k => k.Korisnik == idk).ToListAsync();
        }
        [Route("PreuzmiResavanjaZadatka/{idz}")]
        [HttpGet]
        public async Task<List<Resavanje>> PreuzmResavanjaZadatka(int idz)
        {
            return await Context.Resavanja.Where(k => k.Zadatak == idz).ToListAsync();
        }
        [Route("PreuzmiResavanja")]
        [HttpGet]
        public async Task<List<Resavanje>> PreuzmResavanja(int zad,int kor)
        {
            return await Context.Resavanja.Where(k => k.Zadatak == zad && k.Korisnik==kor).ToListAsync();
        }
        [Route("PreuzmiOdobreneZadatke")]
        [HttpGet]
        public async Task<List<ZadatakOdobren>> PreuzmiOdobreneZadatke()
        {
            return await Context.ZadaciOdobreni.OrderByDescending(k => k.ID).ToListAsync();
        }
        [Route("PreuzmiOdobreneZadatkePoeni")]
        [HttpGet]
        public async Task<List<ZadatakOdobren>> PreuzmiOdobreneZadatkePoeni()
        {
            return await Context.ZadaciOdobreni.OrderByDescending(k => k.BrojBodova).ToListAsync();
        }
        [Route("PreuzmiOdobreneZadatkeLajk")]
        [HttpGet]
        public async Task<List<ZadatakOdobren>> PreuzmiOdobreneZadatkeLajk()
        {
            return await Context.ZadaciOdobreni.OrderByDescending(k => k.BrojLikes).ToListAsync();
        }
        [Route("PreuzmiOdobreneZadatke/{jezik}")]
        [HttpGet]
        public async Task<List<ZadatakOdobren>> PreuzmiOdobreneZadatke(string jezik)
        {
            return await Context.ZadaciOdobreni.Where(k => k.ProgramskiJezik == jezik).OrderByDescending(k => k.ID).ToListAsync();
        }
        [Route("PreuzmiZadatkeNaCekanju")]
        [HttpGet]
        public async Task<List<ZadatakNaCekanju>> PreuzmiZadatkeNaCekanju()
        {
            return await Context.ZadaciNaCekanju.OrderBy(k => k.ID).ToListAsync();
        }
        [Route("PreuzmiGreske")]
        [HttpGet]
        public async Task<List<Greska>> PreuzmiGreske()
        {
            return await Context.Greske.OrderBy(k => k.ID).ToListAsync();
        }
        [Route("IzbrisiOdobreniZadatak/{id}")]
        [HttpDelete]
        public async Task IzbrisiOdobreniZadatak(int id)
        {
            var zadatak = await Context.ZadaciOdobreni.FindAsync(id);
            Context.Remove(zadatak);
            await Context.SaveChangesAsync();
        }
        [Route("IzbrisiZadatakNaCekanju/{id}")]
        [HttpDelete]
        public async Task IzbrisiZadatakNaCekanju(int id)
        {
            var zadatak = await Context.ZadaciNaCekanju.FindAsync(id);
            Context.Remove(zadatak);
            await Context.SaveChangesAsync();
        }
        [Route("IzbrisiGresku/{id}")]
        [HttpDelete]
        public async Task IzbrisiGresku(int id)
        {
            var prijava = await Context.Greske.FindAsync(id);
            Context.Remove(prijava);
            await Context.SaveChangesAsync();
        }
        [Route("IzbrisiResavanje/{id}")]
        [HttpDelete]
        public async Task IzbrisiResavanje(int id)
        {
            var res = await Context.Resavanja.FindAsync(id);
            Context.Remove(res);
            await Context.SaveChangesAsync();
        }
        [Route("IzbrisiKorisnika/{id}")]
        [HttpDelete]
        public async Task IzbrisiKorisnika(int id)
        {
            var korisnik = await Context.Korisnici.FindAsync(id);
            Context.Remove(korisnik);
            await Context.SaveChangesAsync();
        }
        [Route("IzmeniOdobreniZadatak")]
        [HttpPut]
        public async Task IzmeniOdobreniZadatak([FromBody] ZadatakOdobren zadatak)
        {
            Context.Update<ZadatakOdobren>(zadatak);
            await Context.SaveChangesAsync();
        }
        [Route("IzmeniZadatakNaCekanju")]
        [HttpPut]
        public async Task IzmeniZadatakNaCekanju([FromBody] ZadatakNaCekanju zadatak)
        {
            Context.Update<ZadatakNaCekanju>(zadatak);
            await Context.SaveChangesAsync();
        }
        [Route("IzmeniKorisnika")]
        [HttpPut]
        public async Task IzmeniKorisnika([FromBody] Korisnik korisnik)
        {
            Context.Update<Korisnik>(korisnik);
            await Context.SaveChangesAsync();
        }
        [Route("DodajKorisnika")]
        [HttpPost]
        public async Task<IActionResult> DodajKorisnika([FromBody] Korisnik korisnik)
        {
            if (korisnik.KorisnickoIme == "" || korisnik.Email == "" || korisnik.Sifra == "")
                return StatusCode(406);
            Context.Korisnici.Add(korisnik);
            await Context.SaveChangesAsync();
            return Ok();
        }
        [Route("DodajZadatakNaOdobrenje")]
        [HttpPost]
        public async Task DodajZadatakNaOdobrenje([FromBody] ZadatakNaCekanju zadatak)
        {
            Context.ZadaciNaCekanju.Add(zadatak);
            await Context.SaveChangesAsync();
        }
        [Route("DodajResavanje")]
        [HttpPost]
        public async Task DodajResavanje([FromBody] Resavanje resavanje)
        {
            Context.Resavanja.Add(resavanje);
            await Context.SaveChangesAsync();
        }
        [Route("DodajZadatak")]
        [HttpPost]
        public async Task DodajZadatak([FromBody] ZadatakOdobren zadatak)
        {
            Context.ZadaciOdobreni.Add(zadatak);
            await Context.SaveChangesAsync();
        }
        [Route("DodajGresku")]
        [HttpPost]
        public async Task DodajPrijavu([FromBody] Greska greska)
        {
            Context.Greske.Add(greska);
            await Context.SaveChangesAsync();
        }
        [Route("PreuzmiKorisnika")]
        [HttpGet]
        public Task<List<Korisnik>> PreuzmiKorisnika(string a, string b)
        {
            return Context.Korisnici.Where(k => k.Email == a || k.KorisnickoIme == b).ToListAsync();
        }
        [Route("PreuzmiKorisnikaLog")]
        [HttpGet]
        public Task<List<Korisnik>> PreuzmiKorisnikaLog(string u, string p)
        {
            return Context.Korisnici.Where(k => k.KorisnickoIme == u && k.Sifra == p).ToListAsync();
        }
        [Route("PreuzmiZadatak/{id}")]
        [HttpGet]
        public Task<List<ZadatakOdobren>> PreuzmiZadatak(int id)
        {
            return Context.ZadaciOdobreni.Where(k => k.ID == id).ToListAsync();
        }
    }
}
