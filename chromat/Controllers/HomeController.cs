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

namespace chromat.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Order(FormCollection form)
        {
            var files = Request.Files;
            string Ramka = "";
            if (form["Ramka"] == null)
                Ramka = "";
            else
                Ramka = "Ramka_";
            var now = DateTime.Now;
            var test = form["Imie"];
            int cnt = 1;
            string login = $"{now.Month}-{now.Day}_{now.Hour}-{now.Minute}-{now.Second}_{form["Nazwisko"]}_{form["Imie"]}".Replace(" ", "_");
            string DirPath = Server.MapPath($"~/Content/Zamówienia/{login}");
            string errorPath = Server.MapPath("~/Content/errorlog.txt");
            try
            {
                var dirPath = DirPath + $"/{form["Rozmiar"]}_{form["Powierzchnia"]}_{form["Wypelnienie"]}_{form["Sepia"]}_{Ramka + files.Count}szt";
                var dir = Directory.CreateDirectory(dirPath);
                string filePath = DirPath + $"/{login}.txt";
                for (int i = 0; i < files.Count; i++)
                {
                    HttpPostedFileBase file = files[i];
                    var ext = file.FileName.Split('.').Last();
                    file.SaveAs($"{dirPath}/{files.Count}szt_{form["Rozmiar"]}_{form["Powierzchnia"]}_{form["Wypelnienie"]}_{Ramka + cnt.ToString()}.{ext}");
                    cnt++;
                }
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
                    sr.WriteLine($"Ilość odbitek: {files.Count}");
                    sr.WriteLine($"Do zapłaty: {form["Cena"]}");

                }
                ViewData["Message"] = "Zamówienie zostało złożone!";
                return RedirectToAction("Index");
            } catch (Exception ex)
            {
                var ew = new StreamWriter(errorPath);
                ew.WriteLine("Message: "); 
                ew.WriteLine(ex.Message);
                ew.WriteLine("Inner exception: ");
                ew.WriteLine(ex.InnerException.Message);
                ViewData["ErrorMessage"] = "Wystąpił błąd przy składaniu zamówienia!";
                return RedirectToAction("Index");
            }

        }
    }
}
