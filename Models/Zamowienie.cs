using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace chromatApp.Models
{
    public class Zamowienie
    {
        public List<IFormFile> Files { get; set; }
        public string Imie { get; set; }
        public string Nazwisko { get; set; }
        public string Email { get; set; }
        public string NrTel { get; set; }
        public string Cena { get; set; }
        public string Rozmiar { get; set; }
        public string Wypelnienie { get; set; }
        public string Sepia { get; set; }
        public string Powierzchnia { get; set; }
        public string Ramka { get; set; }
    }
}
