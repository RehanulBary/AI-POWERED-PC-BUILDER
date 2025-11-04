-- MySQL dump 10.13  Distrib 8.4.6, for Linux (x86_64)
--
-- Host: localhost    Database: pcbuilder
-- ------------------------------------------------------
-- Server version	8.4.6

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `caselist`
--

DROP TABLE IF EXISTS `caselist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caselist` (
  `productid` varchar(7) NOT NULL,
  `brand` varchar(14) NOT NULL,
  `name` varchar(34) NOT NULL,
  `price` int NOT NULL,
  `type` varchar(10) NOT NULL,
  `form_factor` varchar(28) NOT NULL,
  `features` varchar(35) NOT NULL,
  `gpu_clearance` varchar(5) NOT NULL,
  PRIMARY KEY (`productid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caselist`
--

LOCK TABLES `caselist` WRITE;
/*!40000 ALTER TABLE `caselist` DISABLE KEYS */;
INSERT INTO `caselist` VALUES ('CASE001','NZXT','NZXT H510',7500,'Mid Tower','ATX/Micro-ATX/Mini-ITX','Tempered Glass, Cable Management','381mm'),('CASE002','NZXT','NZXT H7 Flow',12500,'Mid Tower','ATX/Micro-ATX/Mini-ITX','High Airflow, Modern Design','400mm'),('CASE003','NZXT','NZXT H9 Elite',30000,'Mid Tower','ATX/Micro-ATX/Mini-ITX','Panoramic Glass, RGB, Dual-Chamber','435mm'),('CASE004','Corsair','Corsair 4000D Airflow',9500,'Mid Tower','ATX/Micro-ATX/Mini-ITX','Excellent Airflow, Cable Management','360mm'),('CASE005','Corsair','Corsair iCUE 5000X RGB',22000,'Mid Tower','ATX/Micro-ATX/Mini-ITX','Tempered Glass, RGB, Spacious','420mm'),('CASE006','Corsair','Corsair 7000D Airflow',35000,'Full Tower','ATX/E-ATX/Micro-ATX/Mini-ITX','Massive Airflow, Radiator Support','450mm'),('CASE007','Cooler Master','Cooler Master NR200',8500,'Mini Tower','Mini-ITX','Compact, High Airflow, SFF','330mm'),('CASE008','Cooler Master','Cooler Master MasterBox TD500 Mesh',11000,'Mid Tower','ATX/Micro-ATX/Mini-ITX','ARGB Fans, Airflow','410mm'),('CASE009','Cooler Master','Cooler Master HAF 700 EVO',38000,'Full Tower','E-ATX/ATX','Premium Airflow, Modular, RGB','490mm'),('CASE010','Fractal Design','Fractal Meshify 2',18000,'Mid Tower','ATX/Micro-ATX/Mini-ITX','Mesh Front, Modular Design','491mm'),('CASE011','Fractal Design','Fractal Define 7',20000,'Mid Tower','ATX/Micro-ATX/Mini-ITX','Silent Panels, Premium Build','467mm'),('CASE012','Fractal Design','Fractal North',16000,'Mid Tower','ATX/Micro-ATX/Mini-ITX','Wooden Front, Stylish Design','355mm'),('CASE013','Lian Li','Lian Li O11 Dynamic',15000,'Mid Tower','ATX/Micro-ATX/Mini-ITX','Dual Chamber, Tempered Glass','420mm'),('CASE014','Lian Li','Lian Li O11 Dynamic XL',25000,'Full Tower','E-ATX/ATX','High-End Watercooling Support','446mm'),('CASE015','Lian Li','Lian Li Lancool III RGB',18000,'Mid Tower','ATX/Micro-ATX/Mini-ITX','Mesh Front, RGB Fans','435mm');
/*!40000 ALTER TABLE `caselist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cpulist`
--

DROP TABLE IF EXISTS `cpulist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cpulist` (
  `productid` varchar(6) NOT NULL,
  `brand` varchar(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int NOT NULL,
  `socket` varchar(7) NOT NULL,
  `clockspeed` varchar(23) NOT NULL,
  `cache` varchar(47) NOT NULL,
  `cores` int NOT NULL,
  `threads` int NOT NULL,
  `igpu` varchar(3) NOT NULL,
  PRIMARY KEY (`productid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cpulist`
--

LOCK TABLES `cpulist` WRITE;
/*!40000 ALTER TABLE `cpulist` DISABLE KEYS */;
INSERT INTO `cpulist` VALUES ('CPU001','Intel','Intel Core i3-12100 12th Gen Alder Lake Processor',11500,'LGA1700','3.30 GHz Up to 4.30 GHz','12MB',4,8,'Yes'),('CPU002','Intel','Intel Core i5-12400F 12th Gen Alder Lake Processor',12500,'LGA1700','2.50 GHz Up to 4.40 GHz','18MB',6,12,'No'),('CPU003','Intel','Intel Core i5-12500 12th Gen Alder Lake Processor',18500,'LGA1700','3.00 GHz Up to 4.60 GHz','18MB',6,12,'Yes'),('CPU004','Intel','Intel Core i5-12600K 12th Gen Alder Lake Processor',25000,'LGA1700','2.8 GHz Up to 4.9 GHz','20MB',10,16,'Yes'),('CPU005','Intel','Intel Core i7-12700K 12th Gen Alder Lake Processor',30200,'LGA1700','3.60 GHz Up to 5.0 GHz','25MB',12,20,'Yes'),('CPU006','Intel','Intel Core Ultra 5 245K Arrow Lake Processor',33500,'LGA1851','3.6 GHz up to 5.2GHz','24 MB',14,14,'Yes'),('CPU007','Intel','Intel Core Ultra 7 265K Arrow Lake Processor',40500,'LGA1851','3.3GHz up to 5.5GHz','30 MB',20,20,'Yes'),('CPU008','Intel','Intel Core Ultra 9 285K Arrow Lake Processor',70500,'LGA1851','3.2GHz up to 5.7GHz','36 MB',24,24,'Yes'),('CPU009','AMD','AMD Ryzen 5 8400F Processor',11000,'AM5','3.8GHz Up to 5.1GHz','3.8GHz Up to 5.1GHz',6,12,'No'),('CPU010','AMD','AMD Ryzen 5 7400F Processor',14800,'AM5','3.7GHz Up to 4.7GHz','L2 Cache: 6MB, L3 Cache: 32MB',6,12,'No'),('CPU011','AMD','AMD Ryzen 5 7500F Processor',15800,'AM5','3.8GHz Up to 5.1GHz','L2 Cache: 6MB, L3 Cache: 32MB',6,12,'No'),('CPU012','AMD','AMD Ryzen 5 7600 Processor',20700,'AM5','3.8GHz Up to 5.1GHz','3.8GHz Up to 5.1GHz',6,12,'Yes'),('CPU013','AMD','AMD Ryzen 5 7700 Processor',23000,'AM5','3.8GHz Up to 5.3GHz','L2 Cache: 8MB, L3 Cache: 32MB',8,16,'Yes'),('CPU014','AMD','AMD Ryzen 5 8500G Processor with Radeon Graphics',21500,'AM5','3.5GHz up to 5.0GHz','L2 Cache: 6MB, L3 Cache: 16MB',6,12,'Yes'),('CPU015','AMD','AMD Ryzen 7 8700G Processor with Radeon Graphics',29900,'AM5','4.2GHz Up to 5.1GHz','8MB, L3 Cache: 16MB',8,16,'Yes'),('CPU016','AMD','AMD Ryzen 7 7600X Processor',21000,'AM5','4.7GHz Up to 5.3GHz','L2 Cache: 6MB, L3 Cache: 32MB',6,12,'Yes'),('CPU017','AMD','AMD Ryzen 7 7700X Processor',33000,'AM5','4.5GHz Up to 5.4GHz','L2 Cache: 8MB, L3 Cache: 32MB',8,16,'Yes'),('CPU018','AMD','AMD Ryzen 7 9900X Processor',39500,'AM5','4.4GHz Up to 5.6GHz','L1 Cache: 960KB, L2 Cache: 12MB, L3 Cache: 64MB',12,24,'Yes'),('CPU019','AMD','AMD Ryzen 7 7950X Processor',50500,'AM5','4.5GHz Up to 5.7GHz','L2 Cache: 16MB, L3 Cache: 64MB',16,32,'Yes'),('CPU020','AMD','AMD Ryzen 9 9950X3D Gaming Processor',83500,'AM5','4.3GHz Up to 5.7GHz','128 MB',16,32,'Yes'),('CPU021','AMD','AMD Ryzen 9 9900X3D Gaming Processor',71000,'AM5','4.4GHz Up to 5.5GHz','128 MB',12,24,'Yes'),('CPU022','AMD','AMD Ryzen 9 7900X3D Gaming Processor',48500,'AM5','4.4GHz Up to 5.6GHz','128 MB',12,24,'Yes'),('CPU023','AMD','AMD Ryzen 9 9800X3D Gaming Processor',50500,'AM5','4.7 GHz','96 MB',8,16,'Yes'),('CPU024','AMD','AMD Ryzen 9 7800X3D Gaming Processor',45500,'AM5','4.2 GHz','96 MB',8,16,'Yes'),('CPU025','AMD','AMD Ryzen 5 5600 Processor',11500,'AM4','3.5GHz up to 4.4GHz','L2: 3MB, L3: 32MB',6,12,'No'),('CPU026','AMD','AMD Ryzen 5 5700X3D Processor',27500,'AM4','3.0GHz up to 4.1GHz','L2: 4MB, L3: 96MB',8,16,'No'),('CPU027','AMD','AMD Ryzen 5 5700X Processor',13000,'AM4','3.4GHz Up to 4.6GHz','L2: 4MB, L3: 32MB',8,16,'No'),('CPU028','AMD','AMD Ryzen 5 5600G Processor',13500,'AM4','3.9GHz up to 4.4GHz','L2: 3MB, L3: 16MB',6,12,'Yes'),('CPU029','AMD','AMD Ryzen 5 5700G Processor',15500,'AM4','3.8GHz up to 4.6GHz','L2: 4MB, L3: 16MB',8,16,'Yes'),('CPU030','AMD','AMD Ryzen 5 5900X Processor',30000,'AM4','3.7GHz Up to 4.8GHz','L2: 6MB, L3: 64MB',12,24,'No');
/*!40000 ALTER TABLE `cpulist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gpulist`
--

DROP TABLE IF EXISTS `gpulist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gpulist` (
  `productid` varchar(10) NOT NULL,
  `brand` varchar(10) NOT NULL,
  `name` varchar(45) NOT NULL,
  `price` varchar(6) NOT NULL,
  `vram` varchar(4) NOT NULL,
  `memory_type` varchar(6) NOT NULL,
  `boost_clock` varchar(7) NOT NULL,
  `tdp` varchar(4) NOT NULL,
  `pcie_version` varchar(8) NOT NULL,
  PRIMARY KEY (`productid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gpulist`
--

LOCK TABLES `gpulist` WRITE;
/*!40000 ALTER TABLE `gpulist` DISABLE KEYS */;
INSERT INTO `gpulist` VALUES ('GPU001','MSI','MSI GeForce RTX 3060 Ventus 2X 12G OC','45000','12GB','GDDR6','1807MHz','170W','PCIe 4.0'),('GPU002','Gigabyte','Gigabyte GeForce RTX 3060 Ti Gaming OC 8G','56000','8GB','GDDR6','1770MHz','200W','PCIe 4.0'),('GPU003','PowerColor','PowerColor Red Devil RX 6700 XT','62000','12GB','GDDR6','2581MHz','230W','PCIe 4.0'),('GPU004','Asus','Asus Dual GeForce RTX 3070 8GB','72000','8GB','GDDR6','1755MHz','220W','PCIe 4.0'),('GPU005','XFX','XFX Speedster SWFT 309 Radeon RX 6700 10GB','58000','10GB','GDDR6','2495MHz','175W','PCIe 4.0'),('GPU006','MSI','MSI Radeon RX 6600 Mech 2X 8G','40000','8GB','GDDR6','2491MHz','132W','PCIe 4.0'),('GPU007','Gigabyte','Gigabyte Radeon RX 6600 Eagle 8G','39500','8GB','GDDR6','2491MHz','132W','PCIe 4.0'),('GPU008','PowerColor','PowerColor Fighter RX 6600 XT','45000','8GB','GDDR6','2589MHz','160W','PCIe 4.0'),('GPU009','Asus','Asus TUF Gaming GeForce RTX 3080 12GB OC','115000','12GB','GDDR6X','1785MHz','350W','PCIe 4.0'),('GPU010','XFX','XFX Speedster MERC 319 RX 6800 XT','95000','16GB','GDDR6','2250MHz','300W','PCIe 4.0'),('GPU011','MSI','MSI Gaming X Trio GeForce RTX 4080 Super 16GB','190000','16GB','GDDR6X','2625MHz','320W','PCIe 4.0'),('GPU012','Gigabyte','Gigabyte AORUS Master RTX 4070 Ti Super 16GB','150000','16GB','GDDR6X','2640MHz','285W','PCIe 4.0'),('GPU013','PowerColor','PowerColor Red Dragon RX 6800 16GB','88000','16GB','GDDR6','2190MHz','250W','PCIe 4.0'),('GPU014','Asus','Asus ROG Strix RTX 4090 24GB OC','335000','24GB','GDDR6X','2640MHz','450W','PCIe 4.0'),('GPU015','XFX','XFX Speedster MERC 319 RX 7900 XTX','210000','24GB','GDDR6','2615MHz','355W','PCIe 4.0'),('GPU016','MSI','MSI Ventus 3X GeForce RTX 3050 8GB','35000','8GB','GDDR6','1807MHz','130W','PCIe 4.0'),('GPU017','Gigabyte','Gigabyte Eagle GeForce RTX 3050 8GB','34000','8GB','GDDR6','1777MHz','130W','PCIe 4.0'),('GPU018','PowerColor','PowerColor Hellhound RX 6650 XT','48000','8GB','GDDR6','2694MHz','180W','PCIe 4.0'),('GPU019','Asus','Asus Dual Radeon RX 6650 XT OC','49000','8GB','GDDR6','2689MHz','180W','PCIe 4.0'),('GPU020','XFX','XFX QICK 319 RX 6750 XT','67000','12GB','GDDR6','2623MHz','250W','PCIe 4.0'),('GPU021','MSI','MSI Gaming X GeForce RTX 4060 Ti 8GB','58000','8GB','GDDR6','2655MHz','160W','PCIe 4.0'),('GPU022','Gigabyte','Gigabyte Gaming OC RTX 4060 Ti 8GB','57500','8GB','GDDR6','2655MHz','160W','PCIe 4.0'),('GPU023','PowerColor','PowerColor Red Devil RX 7900 XT','185000','20GB','GDDR6','2500MHz','315W','PCIe 4.0'),('GPU024','Asus','Asus TUF Gaming RX 7900 XT OC','182000','20GB','GDDR6','2535MHz','315W','PCIe 4.0'),('GPU025','XFX','XFX Speedster SWFT 210 RX 6600','37000','8GB','GDDR6','2491MHz','132W','PCIe 4.0'),('GPU026','MSI','MSI Aero ITX GeForce GTX 1660 Super 6GB','30000','6GB','GDDR6','1785MHz','125W','PCIe 3.0'),('GPU027','Gigabyte','Gigabyte Windforce GeForce GTX 1660 Ti 6GB','32000','6GB','GDDR6','1770MHz','120W','PCIe 3.0'),('GPU028','PowerColor','PowerColor Fighter RX 6500 XT','25000','4GB','GDDR6','2825MHz','107W','PCIe 4.0'),('GPU029','Asus','Asus Phoenix RTX 3050 6GB','28000','6GB','GDDR6','1470MHz','115W','PCIe 4.0'),('GPU030','XFX','XFX Speedster SWFT 105 RX 6400','22000','4GB','GDDR6','2321MHz','53W','PCIe 4.0');
/*!40000 ALTER TABLE `gpulist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mobolist`
--

DROP TABLE IF EXISTS `mobolist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mobolist` (
  `productid` varchar(5) NOT NULL,
  `brand` varchar(8) DEFAULT NULL,
  `name` varchar(59) DEFAULT NULL,
  `price` varchar(5) DEFAULT NULL,
  `socket` varchar(7) DEFAULT NULL,
  `formfactor` varchar(9) DEFAULT NULL,
  `ramtype` varchar(4) DEFAULT NULL,
  `ramslot` varchar(2) DEFAULT NULL,
  `pcie` varchar(1) DEFAULT NULL,
  `supportedcpu` varchar(65) DEFAULT NULL,
  PRIMARY KEY (`productid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobolist`
--

LOCK TABLES `mobolist` WRITE;
/*!40000 ALTER TABLE `mobolist` DISABLE KEYS */;
INSERT INTO `mobolist` VALUES ('MB001','MSI','MSI A520M-A Pro AM4 AMD Micro-ATX Motherboar','8000','AM4','Micro-ATX','DDR4','2x','3','AMD Ryzen 5000/4000G Series & AMD Ryzen 3rd Generation Processors'),('MB002','MSI','MSI B450M-A PRO MAX II AMD AM4 Motherboard','8500','AM4','Micro-ATX','DDR4','2x','3','AMD Ryzen 5000/4000G Series & AMD Ryzen 3rd Generation Processors'),('MB003','MSI','MSI PRO H610M-S DDR4 m-ATX Motherboard','10000','LGA1700','Micro-ATX','DDR4','2x','4','14th/13th/12th Gen Intel Processors'),('MB004','MSI','MSI PRO H610M-E mATX Motherboard','11000','LGA1700','Micro-ATX','DDR5','2x','4','14th/13th/12th Gen Intel Processors'),('MB005','MSI','MSI B550M-A PRO DDR4 AMD AM4 Micro ATX Motherboard','12000','AM4','Micro-ATX','DDR4','4x','4','AMD Ryzen 5000 & 3000 Series desktop processors'),('MB006','Asus','ASUS TUF GAMING B760M-PLUS II LGA1700 Micro-ATX Motherboard','22300','LGA1700','Micro-ATX','DDR5','4x','4','14th, 13th Gen & 12th Gen Processors'),('MB007','Gigabyte','GIGABYTE Z790 D DDR4 ATX Motherboar','26800','LGA1700','ATX','DDR5','4x','4','14th, 13th Gen & 12th Gen Processors'),('MB008','MSI','MSI PRO H810M-B DDR5 LGA1851 mATX Motherboard','17000','LGA1851','Micro-ATX','DDR5','2x','5','Intel Core Ultra Processors (Series 2),'),('MB009','Asus','Asus PRIME B860-PLUS WIFI-CSM LGA 1851 ATX Motherboard','29000','LGA1851','ATX','DDR5','4x','5','Intel Core Ultra Processors (Series 2),'),('MB010','Gigabyte','Gigabyte Z890 UD LGA 1851 ATX Motherboard','31000','LGA1851','ATX','DDR5','4x','5','Intel Core Ultra Processors (Series 2),'),('MB011','MSI','MSI PRO A620M-E AMD AM5 mATX Motherboard','11300','AM5','Micro-ATX','DDR5','2x','4','Ryzen 9000/ 8000 / 7000 Series Processors'),('MB012','Gigabyte','GIGABYTE B650M K AMD AM5 Micro-ATX Motherboard','14000','AM5','Micro-ATX','DDR5','4x','4','Ryzen 8000 & 7000 Series Processors for Socket AM5'),('MB013','MSI','MSI PRO B840-P WIFI AMD AM5 ATX Motherboard','22600','AM5','ATX','DDR5','4x','5','Ryzen 9000/ 8000 / 7000 Series Processors'),('MB014','AsRock','ASRock X870 Pro RS WiFi AM5 DDR5 ATX Motherboard','35500','AM5','ATX','DDR5','4x','5','Ryzen 9000/ 8000 / 7000 Series Processors'),('MB015','Asus','Asus TUF GAMING B850M-PLUS WIFI micro-ATX Motherboard','36500','AM5','Micro-ATX','DDR5','4x','5','Ryzen 9000/ 8000 / 7000 Series Processors'),('MB016','Gigabyte','GIGABYTE A620M H AM5 Micro-ATX Motherboard','12000','AM5','Micro-ATX','DDR5','2x','4','Ryzen 9000/ 8000 / 7000 Series Processors'),('MB017','Gigabyte','GIGABYTE B650M D3HP DDR5 AM5 Motherboard','17500','AM5','ATX','DDR5','4x','4','Ryzen 9000/ 8000 / 7000 Series Processors'),('MB018','MSI','MSI PRO B650M-B DDR5 AMD AM5 m-ATX Motherboard','12800','AM5','Micro-ATX','DDR5','2x','4','Ryzen 9000/ 8000 / 7000 Series Processors'),('MB019','AsRock','ASRock B850M-X WiFi AM5 DDR5 Micro ATX Motherboard','18500','AM5','Micro-ATX','DDR5','2x','4','Ryzen 9000/ 8000 / 7000 Series Processors');
/*!40000 ALTER TABLE `mobolist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `psulist`
--

DROP TABLE IF EXISTS `psulist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `psulist` (
  `productid` varchar(6) NOT NULL,
  `brand` varchar(13) NOT NULL,
  `name` varchar(33) NOT NULL,
  `price` int NOT NULL,
  `wattage` varchar(5) NOT NULL,
  `efficiency` varchar(12) NOT NULL,
  `modular` varchar(15) NOT NULL,
  PRIMARY KEY (`productid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `psulist`
--

LOCK TABLES `psulist` WRITE;
/*!40000 ALTER TABLE `psulist` DISABLE KEYS */;
INSERT INTO `psulist` VALUES ('PSU001','Corsair','Corsair CV450',4000,'450W','80+ Bronze','Non-Modular'),('PSU002','Corsair','Corsair CV550',4800,'550W','80+ Bronze','Non-Modular'),('PSU003','Corsair','Corsair CX550F RGB',7500,'550W','80+ Bronze','Semi-Modular'),('PSU004','Corsair','Corsair CX650M',8800,'650W','80+ Bronze','Semi-Modular'),('PSU005','Corsair','Corsair RM650x',12500,'650W','80+ Gold','Fully Modular'),('PSU006','Corsair','Corsair RM750x',14500,'750W','80+ Gold','Fully Modular'),('PSU007','Corsair','Corsair HX850',18500,'850W','80+ Platinum','Fully Modular'),('PSU008','Corsair','Corsair AX1000',23000,'1000W','80+ Titanium','Fully Modular'),('PSU009','Corsair','Corsair RM1000e',21000,'1000W','80+ Gold','Fully Modular'),('PSU010','Corsair','Corsair AX1600i',25000,'1600W','80+ Titanium','Fully Modular'),('PSU011','Cooler Master','Cooler Master MWE 450',4200,'450W','80+ White','Non-Modular'),('PSU012','Cooler Master','Cooler Master MWE 550 Bronze',5000,'550W','80+ Bronze','Non-Modular'),('PSU013','Cooler Master','Cooler Master MWE 650 V2',6200,'650W','80+ Bronze','Non-Modular'),('PSU014','Cooler Master','Cooler Master MWE Gold 650W',9500,'650W','80+ Gold','Fully Modular'),('PSU015','Cooler Master','Cooler Master MWE Gold 750W',11000,'750W','80+ Gold','Fully Modular'),('PSU016','Cooler Master','Cooler Master V750',14000,'750W','80+ Gold','Fully Modular'),('PSU017','Cooler Master','Cooler Master V850',16500,'850W','80+ Gold','Fully Modular'),('PSU018','Cooler Master','Cooler Master V1000 Platinum',20000,'1000W','80+ Platinum','Fully Modular'),('PSU019','Cooler Master','Cooler Master V1300 Platinum',24000,'1300W','80+ Platinum','Fully Modular'),('PSU020','Cooler Master','Cooler Master XG850 Plus Platinum',22500,'850W','80+ Platinum','Fully Modular'),('PSU021','Seasonic','Seasonic S12III 500',4800,'500W','80+ Bronze','Non-Modular'),('PSU022','Seasonic','Seasonic S12III 650',6000,'650W','80+ Bronze','Non-Modular'),('PSU023','Seasonic','Seasonic Focus GX-550',9500,'550W','80+ Gold','Fully Modular'),('PSU024','Seasonic','Seasonic Focus GX-650',11500,'650W','80+ Gold','Fully Modular'),('PSU025','Seasonic','Seasonic Focus GX-750',13500,'750W','80+ Gold','Fully Modular'),('PSU026','Seasonic','Seasonic Focus PX-850',17000,'850W','80+ Platinum','Fully Modular'),('PSU027','Seasonic','Seasonic Prime GX-1000',20000,'1000W','80+ Gold','Fully Modular'),('PSU028','Seasonic','Seasonic Prime PX-1200',24000,'1200W','80+ Platinum','Fully Modular'),('PSU029','Seasonic','Seasonic Prime TX-1600',25000,'1600W','80+ Titanium','Fully Modular'),('PSU030','Seasonic','Seasonic Prime Fanless PX-500',15500,'500W','80+ Platinum','Fanless Modular');
/*!40000 ALTER TABLE `psulist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ramlist`
--

DROP TABLE IF EXISTS `ramlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ramlist` (
  `productid` varchar(6) NOT NULL,
  `brand` varchar(9) NOT NULL,
  `name` varchar(48) NOT NULL,
  `price` int NOT NULL,
  `type` varchar(4) NOT NULL,
  `capacity` varchar(5) NOT NULL,
  `frequency` varchar(7) NOT NULL,
  `caslatency` varchar(14) NOT NULL,
  PRIMARY KEY (`productid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ramlist`
--

LOCK TABLES `ramlist` WRITE;
/*!40000 ALTER TABLE `ramlist` DISABLE KEYS */;
INSERT INTO `ramlist` VALUES ('RAM001','Corsair','Corsair Vengeance LPX 8GB DDR4 3200MHz',2500,'DDR4','8GB','3200MHz','CL16-18-18-36'),('RAM002','Kingston','Kingston Fury Beast 8GB DDR4 3200MHz',2400,'DDR4','8GB','3200MHz','CL16-18-18-30'),('RAM003','G.Skill','G.Skill Ripjaws V 16GB DDR4 3600MHz',4800,'DDR4','16GB','3600MHz','CL18-22-22-42'),('RAM004','Corsair','Corsair Vengeance RGB Pro 16GB DDR4 3200MHz',5200,'DDR4','16GB','3200MHz','CL16-18-18-36'),('RAM005','ADATA','ADATA XPG GAMMIX D30 8GB DDR4 3000MHz',2300,'DDR4','8GB','3000MHz','CL16-18-18'),('RAM006','TeamGroup','Team T-Force Vulcan Z 16GB DDR4 3200MHz',4700,'DDR4','16GB','3200MHz','CL16-20-20-40'),('RAM007','Kingston','Kingston Fury Renegade 16GB DDR4 3600MHz',5500,'DDR4','16GB','3600MHz','CL16-18-18-36'),('RAM008','G.Skill','G.Skill Trident Z RGB 32GB DDR4 3600MHz',9500,'DDR4','32GB','3600MHz','CL16-16-16-36'),('RAM009','Corsair','Corsair Dominator Platinum RGB 32GB DDR5 5600MHz',18500,'DDR5','32GB','5600MHz','CL36-36-36-76'),('RAM010','ADATA','ADATA XPG Lancer RGB 16GB DDR5 5200MHz',11000,'DDR5','16GB','5200MHz','CL38-38-38-84'),('RAM011','Kingston','Kingston Fury Beast 16GB DDR5 6000MHz',12500,'DDR5','16GB','6000MHz','CL40-40-40-80'),('RAM012','G.Skill','G.Skill Ripjaws S5 32GB DDR5 6000MHz',21000,'DDR5','32GB','6000MHz','CL36-36-36-96'),('RAM013','Patriot','Patriot Viper Steel 8GB DDR4 3200MHz',2400,'DDR4','8GB','3200MHz','CL16-18-18-36'),('RAM014','TeamGroup','Team T-Force Delta RGB 32GB DDR4 3600MHz',9800,'DDR4','32GB','3600MHz','CL18-22-22-42'),('RAM015','Corsair','Corsair Vengeance 64GB DDR5 5600MHz',36000,'DDR5','64GB','5600MHz','CL36-36-36-76'),('RAM016','ADATA','ADATA XPG Spectrix D41 8GB DDR4 3200MHz',2500,'DDR4','8GB','3200MHz','CL16-18-18'),('RAM017','Kingston','Kingston HyperX Predator 8GB DDR4 3000MHz',2200,'DDR4','8GB','3000MHz','CL15-17-17'),('RAM018','G.Skill','G.Skill Flare X 16GB DDR4 3200MHz',4600,'DDR4','16GB','3200MHz','CL16-18-18-38'),('RAM019','Patriot','Patriot Signature Line 4GB DDR4 2400MHz',1500,'DDR4','4GB','2400MHz','CL17-17-17'),('RAM020','TeamGroup','Team T-Force Vulcan DDR5 32GB 5600MHz',19000,'DDR5','32GB','5600MHz','CL36-36-36-76'),('RAM021','Corsair','Corsair ValueSelect 4GB DDR4 2400MHz',1400,'DDR4','4GB','2400MHz','CL16-16-16'),('RAM022','ADATA','ADATA Premier 8GB DDR4 2666MHz',2000,'DDR4','8GB','2666MHz','CL19-19-19'),('RAM023','Kingston','Kingston Fury Beast RGB 32GB DDR5 6000MHz',20000,'DDR5','32GB','6000MHz','CL40-40-40-80'),('RAM024','G.Skill','G.Skill Trident Z5 RGB 64GB DDR5 6400MHz',42000,'DDR5','64GB','6400MHz','CL32-39-39-102'),('RAM025','Patriot','Patriot Viper RGB 16GB DDR4 3600MHz',5200,'DDR4','16GB','3600MHz','CL18-22-22-42'),('RAM026','TeamGroup','Team Elite Plus 8GB DDR4 2666MHz',1900,'DDR4','8GB','2666MHz','CL19-19-19'),('RAM027','Corsair','Corsair Dominator Platinum 128GB DDR5 5600MHz',72000,'DDR5','128GB','5600MHz','CL36-36-36-76'),('RAM028','ADATA','ADATA XPG Hunter 16GB DDR4 3200MHz',4500,'DDR4','16GB','3200MHz','CL16-20-20-38'),('RAM029','Kingston','Kingston ValueRAM 8GB DDR4 2400MHz',1800,'DDR4','8GB','2400MHz','CL17-17-17'),('RAM030','G.Skill','G.Skill Aegis 8GB DDR4 3000MHz',2100,'DDR4','8GB','3000MHz','CL16-18-18-38');
/*!40000 ALTER TABLE `ramlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ssdlist`
--

DROP TABLE IF EXISTS `ssdlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ssdlist` (
  `productid` varchar(6) NOT NULL,
  `brand` varchar(8) NOT NULL,
  `name` varchar(30) NOT NULL,
  `price` int NOT NULL,
  `capacity` varchar(5) NOT NULL,
  `type` varchar(30) DEFAULT NULL,
  `read_speed` varchar(9) NOT NULL,
  `write_speed` varchar(9) NOT NULL,
  `nand_type` varchar(3) NOT NULL,
  `endurance_tbw` varchar(7) NOT NULL,
  PRIMARY KEY (`productid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ssdlist`
--

LOCK TABLES `ssdlist` WRITE;
/*!40000 ALTER TABLE `ssdlist` DISABLE KEYS */;
INSERT INTO `ssdlist` VALUES ('SSD001','Samsung','Samsung 970 EVO Plus 250GB',3800,'250GB','PCIe 3.0 NVMe','3500MB/s','2300MB/s','MLC','150TBW'),('SSD002','WD','WD Black SN850X 1TB',12500,'1TB','PCIe 4.0 NVMe','7300MB/s','6300MB/s','TLC','600TBW'),('SSD003','Crucial','Crucial P3 Plus 500GB',4500,'500GB','PCIe 4.0 NVMe','5000MB/s','3600MB/s','QLC','120TBW'),('SSD004','ADATA','ADATA XPG SX8200 Pro 1TB',9200,'1TB','PCIe 3.0 NVMe','3500MB/s','3000MB/s','TLC','640TBW'),('SSD005','Kingston','Kingston NV2 250GB',2900,'250GB','PCIe 4.0 NVMe','3000MB/s','1300MB/s','QLC','80TBW'),('SSD006','Samsung','Samsung 980 PRO 2TB',23000,'2TB','PCIe 4.0 NVMe','7000MB/s','5100MB/s','TLC','1200TBW'),('SSD007','WD','WD Blue SN570 500GB',4000,'500GB','PCIe 3.0 NVMe','3500MB/s','2300MB/s','TLC','150TBW'),('SSD008','Crucial','Crucial P5 Plus 2TB',21000,'2TB','PCIe 4.0 NVMe','6600MB/s','5000MB/s','TLC','1200TBW'),('SSD009','ADATA','ADATA Legend 840 1TB',9800,'1TB','PCIe 4.0 NVMe','5000MB/s','4500MB/s','TLC','600TBW'),('SSD010','Kingston','Kingston KC3000 1TB',13500,'1TB','PCIe 4.0 NVMe','7000MB/s','6000MB/s','TLC','800TBW'),('SSD011','Samsung','Samsung 990 PRO 1TB',16500,'1TB','PCIe 4.0 NVMe','7450MB/s','6900MB/s','TLC','600TBW'),('SSD012','WD','WD Black SN770 500GB',5800,'500GB','PCIe 4.0 NVMe','5150MB/s','4900MB/s','TLC','300TBW'),('SSD013','Crucial','Crucial T700 1TB',22000,'1TB','PCIe 5.0 NVMe','12400MB/s','11800MB/s','TLC','700TBW'),('SSD014','ADATA','ADATA XPG Lancer 512GB',5600,'500GB','PCIe 4.0 NVMe','5000MB/s','4000MB/s','TLC','300TBW'),('SSD015','Kingston','Kingston Fury Renegade 2TB',25500,'2TB','PCIe 4.0 NVMe','7300MB/s','7000MB/s','TLC','1000TBW'),('SSD016','Samsung','Samsung PM9A1 512GB',6400,'500GB','PCIe 4.0 NVMe','6900MB/s','5000MB/s','TLC','300TBW'),('SSD017','WD','WD Blue SN580 250GB',3100,'250GB','PCIe 4.0 NVMe','4100MB/s','2000MB/s','TLC','150TBW'),('SSD018','Crucial','Crucial P3 1TB',7500,'1TB','PCIe 3.0 NVMe','3500MB/s','3000MB/s','QLC','220TBW'),('SSD019','ADATA','ADATA XPG Gammix S70 Blade 1TB',10800,'1TB','PCIe 4.0 NVMe','7400MB/s','5500MB/s','TLC','700TBW'),('SSD020','Kingston','Kingston A2000 500GB',4800,'500GB','PCIe 3.0 NVMe','2200MB/s','2000MB/s','TLC','150TBW'),('SSD021','Samsung','Samsung 970 EVO Plus 2TB',17500,'2TB','PCIe 3.0 NVMe','3500MB/s','3300MB/s','TLC','1200TBW'),('SSD022','WD','WD Black SN850 500GB',7500,'500GB','PCIe 4.0 NVMe','7000MB/s','4100MB/s','TLC','300TBW'),('SSD023','Crucial','Crucial P2 250GB',2800,'250GB','PCIe 3.0 NVMe','2300MB/s','940MB/s','QLC','80TBW'),('SSD024','ADATA','ADATA XPG SX6000 Pro 512GB',4200,'500GB','PCIe 3.0 NVMe','2100MB/s','1500MB/s','TLC','150TBW'),('SSD025','Kingston','Kingston NV1 1TB',6900,'1TB','PCIe 3.0 NVMe','2100MB/s','1700MB/s','QLC','240TBW'),('SSD026','Samsung','Samsung 980 500GB',5200,'500GB','PCIe 3.0 NVMe','3100MB/s','2600MB/s','TLC','300TBW'),('SSD027','WD','WD Green SN350 960GB',5500,'1TB','PCIe 3.0 NVMe','2400MB/s','1900MB/s','QLC','200TBW'),('SSD028','Crucial','Crucial BX500 NVMe 480GB',3600,'500GB','PCIe 3.0 NVMe','2100MB/s','1600MB/s','TLC','150TBW'),('SSD029','ADATA','ADATA XPG Atom 50 1TB',10200,'1TB','PCIe 4.0 NVMe','5000MB/s','4500MB/s','TLC','600TBW'),('SSD030','Kingston','Kingston Fury Renegade 4TB',48500,'4TB','PCIe 4.0 NVMe','7300MB/s','7000MB/s','TLC','2000TBW');
/*!40000 ALTER TABLE `ssdlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-29 16:00:17
