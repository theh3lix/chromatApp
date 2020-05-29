DROP DATABASE IF EXISTS chromatDB;
CREATE DATABASE chromatDB;
USE chromatDB;

CREATE TABLE Order {
    id int(11) not null AUTO_INCREMENT,
    Nazwisko nvarchar(max) DEFAULT NULL,
    Imie nvarchar(max) DEFAULT NULL,
    Email nvarchar(max) DEFAULT NULL,
    NrTel nvarchar(max) DEFAULT NULL,
    DataZamowienia datetime2 DEFAULT NULL,
    Ramka bit DEFAULT NULL,
    Przyciecie nvarchar(max) DEFAULT NULL,
    Powloka nvarchar(max) DEFAULT NULL,
    Kolor nvarchar(max) DEFAULT NULL,
    Rozmiar nvarchar(max) DEFAULT NULL,
    IloscOdbitek int(11) DEFAULT NULL,
    Cena float DEFAULT NULL,
    PRIMARY KEY(id)
};