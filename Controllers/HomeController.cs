using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using chromatApp.Models;
using chromat.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace chromatApp.Controllers
{
    public class HomeController : Controller
    {
        static string Ramka;
        static string Rozmiar;
        static string Powierzchnia;
        static string Wypelnienie;
        static string Sepia;
        static string Ilosc;
        readonly MiscService service = new MiscService();
        readonly List<string> AcceptableExtensions = new List<string>
        {
            "jpg", "jpeg", "png", "gif", "bmp", "ico"
        };
        public ActionResult Index()
        {
            return View();
        }



        [HttpPost]
        [DisableRequestSizeLimit]
        public ActionResult Order(IFormCollection form)
        {
            var files = form.Files;
            int cnt9 = 1, cnt13 = 1, cnt15 = 1, cnt20 = 1;
            var now = DateTime.Now;
            int total = Convert.ToInt32(form["Amount9"]) + Convert.ToInt32(form["Amount13"]) + Convert.ToInt32(form["Amount15"]) + Convert.ToInt32(form["Amount20"]);
            ClearVariables(form);
            string login = $"{now.Month:00}-{now.Day:00}_{now.Hour}-{now.Minute}-{now.Second:00}_{form["Nazwisko"]}_{form["Imie"]}".Replace(" ", "_");
            string DirPath = $"Content/Zamówienia/{login}";
            string errorPath = "Content/errorlog.txt";
            try
            {
                string filePath = DirPath + $"/{login}.txt";
                for (int i = 0; i < files.Count; i++)
                {
                    ClearVariables(form);
                    if (form[$"{i + 1}-Rozmiar"] != "default")
                    {
                        Rozmiar = form[$"{i + 1}-Rozmiar"];
                    }
                    if (form[$"{i + 1}-Powierzchnia"] != "default")
                    {
                        Powierzchnia = form[$"{i + 1}-Powierzchnia"];
                    }
                    if (form[$"{i + 1}-Wypelnienie"] != "default")
                    {
                        Wypelnienie = form[$"{i + 1}-Wypelnienie"];
                    }
                    if (form[$"{i + 1}-Sepia"] != "default")
                    {
                        Sepia = form[$"{i + 1}-Sepia"];
                    }
                    if (form[$"{i + 1}-Ramka"] != "default")
                    {
                        Ramka = form[$"{i + 1}-Ramka"];
                    }
                    if (form[$"{i + 1}-Ilosc"] != "1" && form[$"{i + 1}-Ilosc"] != "")
                    {
                        Ilosc = form[$"{i + 1}-Ilosc"];
                    }
                    var path = DirPath + $"/{Rozmiar}_{Powierzchnia}_{Wypelnienie}_{Sepia}_{Ramka + Ilosc.ToString()}szt";
                    Directory.CreateDirectory(path);
                    IFormFile file = files[i];
                    var ext = file.FileName.Split('.').Last();
                    if (!AcceptableExtensions.Contains(ext.ToLower()))
                        continue;
                    switch (Rozmiar)
                    {
                        case "9x13":
                        case "10x15":
                            file.CopyTo(new FileStream($"{path}/{Ilosc}szt_{Rozmiar}_{Powierzchnia}_{Wypelnienie}_{Sepia}_{Ramka + cnt9}.{ext}", FileMode.Create));
                            cnt9++;
                            break;
                        case "13x18":
                            file.CopyTo(new FileStream($"{path}/{Ilosc}szt_{Rozmiar}_{Powierzchnia}_{Wypelnienie}_{Sepia}_{Ramka + cnt13}.{ext}", FileMode.Create));
                            cnt13++;
                            break;
                        case "15x21":
                            file.CopyTo(new FileStream($"{path}/{Ilosc}szt_{Rozmiar}_{Powierzchnia}_{Wypelnienie}_{Sepia}_{Ramka + cnt15}.{ext}", FileMode.Create));
                            cnt15++;
                            break;
                        case "20x30":
                            file.CopyTo(new FileStream($"{path}/{Ilosc}szt_{Rozmiar}_{Powierzchnia}_{Wypelnienie}_{Sepia}_{Ramka + cnt20}.{ext}", FileMode.Create));
                            cnt20++;
                            break;
                        default:
                            ViewData.Add("ErrorMessage", "Błędny rozmiar odbitki!");
                            return RedirectToAction("Index");
                    }
                }
                service.RenameDirectories(DirPath);
                using (var sr = new StreamWriter(new FileStream(filePath, FileMode.Append)))
                {
                    sr.WriteLine("Login:");
                    sr.WriteLine(login);
                    sr.WriteLine();
                    sr.WriteLine("Dane uzupełniające:");
                    sr.WriteLine(form["Email"]);
                    sr.WriteLine(form["NrTel"]);
                    sr.WriteLine();
                    sr.WriteLine("Zamówienie:");
                    sr.WriteLine($"Ilość odbitek: {total}");
                    sr.WriteLine($"Do zapłaty: {form["Cena"]}");

                }
                TempData.Add("Message", "Zamówienie zostało złożone!");
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                var ew = new StreamWriter(new FileStream(errorPath, FileMode.Append));
                ew.WriteLine("Message: ");
                ew.WriteLine(ex.Message);
                TempData.Add("ErrorMessage", $"{ex}!");
                return RedirectToAction("Index");
            }
        }
        private void ClearVariables(IFormCollection form)
        {
            if (string.IsNullOrEmpty(form["Ramka"]))
                Ramka = "";
            else
                Ramka = "Ramka_";
            Rozmiar = form["Rozmiar"];
            Powierzchnia = form["Powierzchnia"];
            Wypelnienie = form["Wypelnienie"];
            Sepia = form["Sepia"];
            Ilosc = "1";
        }
    }
}
