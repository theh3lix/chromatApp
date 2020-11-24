using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using MySql.Data.MySqlClient;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;
using chromat.DAL;
using Chromat.Models;
using chromat.Services;

namespace chromat.Controllers
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
        public ActionResult Order(FormCollection form)
        {
            var files = Request.Files;
            int cnt9 = 1, cnt13 = 1, cnt15 = 1, cnt20 = 1;
            var now = DateTime.Now;
            int total = Convert.ToInt32(form["Amount9"]) + Convert.ToInt32(form["Amount13"]) + Convert.ToInt32(form["Amount15"]) + Convert.ToInt32(form["Amount20"]);
            ClearVariables(form);
            string login = $"{now.Month:00}-{now.Day:00}_{now.Hour}-{now.Minute}-{now.Second:00}_{form["Nazwisko"]}_{form["Imie"]}".Replace(" ", "_");
            string DirPath = Server.MapPath($"~/Content/Zamówienia/{login}");
            string errorPath = Server.MapPath("~/Content/errorlog.txt");
            try
            {
                string filePath = DirPath + $"/{login}.txt";
                for (int i = 0; i < files.Count; i++)
                {
                    ClearVariables(form);
                    if(form[$"{i+1}-Rozmiar"]!= "default") {
                        Rozmiar = form[$"{i + 1}-Rozmiar"];
                    }
                    if (form[$"{i + 1}-Powierzchnia"] != "default") {
                        Powierzchnia = form[$"{i + 1}-Powierzchnia"];
                    }
                    if (form[$"{i + 1}-Wypelnienie"] != "default") {
                        Wypelnienie = form[$"{i + 1}-Wypelnienie"];
                    }
                    if (form[$"{i + 1}-Sepia"] != "default") {
                        Sepia = form[$"{i + 1}-Sepia"];
                    }
                    if (form[$"{i + 1}-Ramka"] != "default") {
                        Ramka = form[$"{i + 1}-Ramka"];
                    }
                    if (form[$"{i + 1}-Ilosc"] != "1" && form[$"{i + 1}-Ilosc"] != "") {
                        Ilosc = form[$"{i + 1}-Ilosc"];
                    }
                    var path = DirPath + $"/{Rozmiar}_{Powierzchnia}_{Wypelnienie}_{Sepia}_{Ramka + Ilosc.ToString()}szt";
                    Directory.CreateDirectory(path);
                    HttpPostedFileBase file = files[i];
                    var ext = file.FileName.Split('.').Last();
                    if (!AcceptableExtensions.Contains(ext.ToLower()))
                        continue; 
                    switch (Rozmiar)
                    {
                        case "9x13":
                        case "10x15":
                            file.SaveAs($"{path}/{Ilosc}szt_{Rozmiar}_{Powierzchnia}_{Wypelnienie}_{Sepia}_{Ramka + cnt9}.{ext}");
                            cnt9++;
                            break;
                        case "13x18":
                            file.SaveAs($"{path}/{Ilosc}szt_{Rozmiar}_{Powierzchnia}_{Wypelnienie}_{Sepia}_{Ramka + cnt13}.{ext}");
                            cnt13++;
                            break;
                        case "15x21":
                            file.SaveAs($"{path}/{Ilosc}szt_{Rozmiar}_{Powierzchnia}_{Wypelnienie}_{Sepia}_{Ramka + cnt15}.{ext}");
                            cnt15++;
                            break;
                        case "20x30":
                            file.SaveAs($"{path}/{Ilosc}szt_{Rozmiar}_{Powierzchnia}_{Wypelnienie}_{Sepia}_{Ramka + cnt20}.{ext}");
                            cnt20++;
                            break;
                        default:
                            ViewData.Add("ErrorMessage", "Błędny rozmiar odbitki!");
                            return RedirectToAction("Index");
                    }
                }
                service.RenameDirectories(DirPath);
                using (var sr = new StreamWriter(filePath))
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
                TempData.Add("Message","Zamówienie zostało złożone!");
                return RedirectToAction("Index");
            } catch (Exception ex)
            {
                var ew = new StreamWriter(errorPath);
                ew.WriteLine("Message: "); 
                ew.WriteLine(ex.Message);
                ew.WriteLine("Inner exception: ");
                ew.WriteLine(ex.InnerException.Message);
                TempData.Add("ErrorMessage", "Wystąpił błąd przy składaniu zamówienia!");
                return RedirectToAction("Index");
            }
        }
        private void ClearVariables(FormCollection form)
        {
            if (form["Ramka"] == null)
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
