const express = require("express");
const app = express();
const fs = require("fs");
require("dotenv").config();
const path = require("path");
const port = process.env.port || 8000;
const connectDB = require("./database/db");
const { getCityContactByName } = require("./controllers/cityContact.controller");
const { getCityByName } = require("./controllers/city.controller");
const getBrandContentByName = require("./controllers/brandContent.controller").getBrandContentByName;

// Connect to Database

connectDB();


// Load View Engine

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
const robots = fs.readFileSync('robots.txt')

// Express specific stuff
app.use('/static', express.static('static'))
app.use(express.urlencoded())
app.use(express.json());
app.use('/favicon.ico', express.static('static/img/favicon.ico'))

const allowedFiles = [
    "AhmedabadAC1.xml",
    "AhmedabadAC2.xml",
    "AhmedabadMW1.xml",
    "AhmedabadMW2.xml",
    "AhmedabadRef1.xml",
    "AhmedabadRef2.xml",
    "AhmedabadRep1.xml",
    "AhmedabadRep2.xml",
    "AhmedabadTV1.xml",
    "AhmedabadTV2.xml",
    "AhmedabadWM1.xml",
    "AhmedabadWM2.xml",
    "AllBrands.xml",
    "AllBrandsNew.xml",
    "AllChangedBrands.xml",
    "AmriMoraAC.xml",
    "AmriMoraMW.xml",
    "AmriMoraRef.xml",
    "AmriMoraRep.xml",
    "AmriMoraTV.xml",
    "AmriMoraWM.xml",
    "BangaloreAC.xml",
    "BangaloreAC1.xml",
    "BangaloreAC2.xml",
    "BangaloreAC3.xml",
    "BangaloreAC4.xml",
    "BangaloreMW.xml",
    "BangaloreMW1.xml",
    "BangaloreMW2.xml",
    "BangaloreMW3.xml",
    "BangaloreMW4.xml",
    "BangaloreRef.xml",
    "BangaloreRef1.xml",
    "BangaloreRef2.xml",
    "BangaloreRef3.xml",
    "BangaloreRef4.xml",
    "BangaloreRep.xml",
    "BangaloreRep1.xml",
    "BangaloreRep2.xml",
    "BangaloreRep3.xml",
    "BangaloreRep4.xml",
    "BangaloreTV.xml",
    "BangaloreTV1.xml",
    "BangaloreTV2.xml",
    "BangaloreTV3.xml",
    "BangaloreTV4.xml",
    "BangaloreWM.xml",
    "BangaloreWM1.xml",
    "BangaloreWM2.xml",
    "BangaloreWM3.xml",
    "BangaloreWM4.xml",
    "BaPrAC.xml",
    "BaPrMW.xml",
    "BaPrRef.xml",
    "BaPrRep.xml",
    "BaPrTV.xml",
    "BaPrWM.xml",
    "BengaluruAC.xml",
    "BengaluruAC1.xml",
    "BengaluruAC2.xml",
    "BengaluruAC3.xml",
    "BengaluruAC4.xml",
    "BengaluruMW.xml",
    "BengaluruMW1.xml",
    "BengaluruMW2.xml",
    "BengaluruMW3.xml",
    "BengaluruMW4.xml",
    "BengaluruRef.xml",
    "BengaluruRef1.xml",
    "BengaluruRef2.xml",
    "BengaluruRef3.xml",
    "BengaluruRef4.xml",
    "BengaluruRep.xml",
    "BengaluruRep1.xml",
    "BengaluruRep2.xml",
    "BengaluruRep3.xml",
    "BengaluruRep4.xml",
    "BengaluruTV.xml",
    "BengaluruTV1.xml",
    "BengaluruTV2.xml",
    "BengaluruTV3.xml",
    "BengaluruTV4.xml",
    "BengaluruWM.xml",
    "BengaluruWM1.xml",
    "BengaluruWM2.xml",
    "BengaluruWM3.xml",
    "BengaluruWM4.xml",
    "BhoHisaHubAC.xml",
    "BhoHisaHubMW.xml",
    "BhoHisaHubRef.xml",
    "BhoHisaHubRep.xml",
    "BhoHisaHubTV.xml",
    "BhoHisaHubWM.xml",
    "ChanBilasKolhaKhaAC.xml",
    "ChanBilasKolhaKhaMW.xml",
    "ChanBilasKolhaKhaRef.xml",
    "ChanBilasKolhaKhaRep.xml",
    "ChanBilasKolhaKhaTV.xml",
    "ChanBilasKolhaKhaWM.xml",
    "Chennai2.xml",
    "Chennai2New.xml",
    "ChennaiAC.xml",
    "ChennaiAC1.xml",
    "ChennaiAC2.xml",
    "ChennaiAC3.xml",
    "ChennaiMW.xml",
    "ChennaiMW1.xml",
    "ChennaiMW2.xml",
    "ChennaiMW3.xml",
    "ChennaiRef.xml",
    "ChennaiRef1.xml",
    "ChennaiRef2.xml",
    "ChennaiRef3.xml",
    "ChennaiRep.xml",
    "ChennaiRep1.xml",
    "ChennaiRep2.xml",
    "ChennaiRep3.xml",
    "ChennaiTV.xml",
    "ChennaiTV1.xml",
    "ChennaiTV2.xml",
    "ChennaiTV3.xml",
    "ChennaiWM.xml",
    "ChennaiWM1.xml",
    "ChennaiWM2.xml",
    "ChennaiWM3.xml",
    "CoimbatoreAC.xml",
    "CoimbatoreMW.xml",
    "CoimbatoreRef.xml",
    "CoimbatoreRep.xml",
    "CoimbatoreTV.xml",
    "CoimbatoreWM.xml",
    "CuttDehJabRatAC.xml",
    "CuttDehJabRatMW.xml",
    "CuttDehJabRatRef.xml",
    "CuttDehJabRatRep.xml",
    "CuttDehJabRatTV.xml",
    "CuttDehJabRatWM.xml",
    "Delhi2.xml",
    "Delhi2New.xml",
    "DelhiAC.xml",
    "DelhiAC1.xml",
    "DelhiAC2.xml",
    "DelhiAC3.xml",
    "DelhiLucknowNew.xml",
    "DelhiMW.xml",
    "DelhiMW1.xml",
    "DelhiMW2.xml",
    "DelhiMW3.xml",
    "DelhiMWNew.xml",
    "DelhiRef.xml",
    "DelhiRef1.xml",
    "DelhiRef2.xml",
    "DelhiRef3.xml",
    "DelhiRep1.xml",
    "DelhiRep2.xml",
    "DelhiRep3.xml",
    "DelhiRepNew.xml",
    "DelhiTV.xml",
    "DelhiTV1.xml",
    "DelhiTV2.xml",
    "DelhiTV3.xml",
    "DelhiWM.xml",
    "DelhiWM1.xml",
    "DelhiWM2.xml",
    "DelhiWM3.xml",
    "DelhiWMNew.xml",
    "DhanBbsrGoaAC.xml",
    "DhanBbsrGoaMW.xml",
    "DhanBbsrGoaRef.xml",
    "DhanBbsrGoaRep.xml",
    "DhanBbsrGoaTV.xml",
    "DhanBbsrGoaWM.xml",
    "ErnakulamAC.xml",
    "ErnakulamRefRep.xml",
    "ErnakulamTV.xml",
    "ErnakulamWMMW.xml",
    "Faridabad1AC.xml",
    "Faridabad1MW.xml",
    "Faridabad1Ref.xml",
    "Faridabad1Rep.xml",
    "Faridabad1TV.xml",
    "Faridabad1WM.xml",
    "FaridabadGhaziabad2AC.xml",
    "FaridabadGhaziabad2MW.xml",
    "FaridabadGhaziabad2Ref.xml",
    "FaridabadGhaziabad2Rep.xml",
    "FaridabadGhaziabad2TV.xml",
    "FaridabadGhaziabad2WM.xml",
    "Ghaziabad1AC.xml",
    "Ghaziabad1MW.xml",
    "Ghaziabad1Ref.xml",
    "Ghaziabad1Rep.xml",
    "Ghaziabad1TV.xml",
    "Ghaziabad1WM.xml",
    "GNKottAC.xml",
    "GNKottMW.xml",
    "GNKottRef.xml",
    "GNKottRep.xml",
    "GNKottTV.xml",
    "GNKottWM.xml",
    "GuAgAC.xml",
    "GuAgMW.xml",
    "GuAgRef.xml",
    "GuAgRep.xml",
    "GuAgTV.xml",
    "GuAgWM.xml",
    "Gurgaon1AC.xml",
    "Gurgaon1MW.xml",
    "Gurgaon1Ref.xml",
    "Gurgaon1Rep.xml",
    "Gurgaon1TV.xml",
    "Gurgaon1WM.xml",
    "Gurgaon2AC.xml",
    "Gurgaon2MW.xml",
    "Gurgaon2Ref.xml",
    "Gurgaon2Rep.xml",
    "Gurgaon2TV.xml",
    "Gurgaon2WM.xml",
    "Gurugram1AC.xml",
    "Gurugram1MW.xml",
    "Gurugram1Ref.xml",
    "Gurugram1Rep.xml",
    "Gurugram1TV.xml",
    "Gurugram1WM.xml",
    "Gurugram2AC.xml",
    "Gurugram2MW.xml",
    "Gurugram2Ref.xml",
    "Gurugram2Rep.xml",
    "Gurugram2TV.xml",
    "Gurugram2WM.xml",
    "GurugramGurgaon3AC.xml",
    "GurugramGurgaon3MW.xml",
    "GurugramGurgaon3Ref.xml",
    "GurugramGurgaon3Rep.xml",
    "GurugramGurgaon3TV.xml",
    "GurugramGurgaon3WM.xml",
    "Hyderabad1AC.xml",
    "Hyderabad1MW.xml",
    "Hyderabad1Ref.xml",
    "Hyderabad1Rep.xml",
    "Hyderabad1TV.xml",
    "Hyderabad1WM.xml",
    "Hyderabad2AC.xml",
    "Hyderabad2MW.xml",
    "Hyderabad2Ref.xml",
    "Hyderabad2Rep.xml",
    "Hyderabad2TV.xml",
    "Hyderabad2WM.xml",
    "Hyderabad3AC.xml",
    "Hyderabad3MW.xml",
    "Hyderabad3Ref.xml",
    "Hyderabad3Rep.xml",
    "Hyderabad3TV.xml",
    "Hyderabad3WM.xml",
    "Hyderabad4AC.xml",
    "Hyderabad4MW.xml",
    "Hyderabad4Ref.xml",
    "Hyderabad4Rep.xml",
    "Hyderabad4TV.xml",
    "Hyderabad4WM.xml",
    "Hyderabad5AC.xml",
    "Hyderabad5MW.xml",
    "Hyderabad5Ref.xml",
    "Hyderabad5Rep.xml",
    "Hyderabad5TV.xml",
    "Hyderabad5WM.xml",
    "Hyderabad6AC.xml",
    "Hyderabad6MW.xml",
    "Hyderabad6Ref.xml",
    "Hyderabad6Rep.xml",
    "Hyderabad6TV.xml",
    "Hyderabad6WM.xml",
    "Hyderabad7AC.xml",
    "Hyderabad7MW.xml",
    "Hyderabad7Ref.xml",
    "Hyderabad7Rep.xml",
    "Hyderabad7TV.xml",
    "Hyderabad7WM.xml",
    "Hyderabad8AC.xml",
    "Hyderabad8MW.xml",
    "Hyderabad8Ref.xml",
    "Hyderabad8Rep.xml",
    "Hyderabad8TV.xml",
    "Hyderabad8WM.xml",
    "Hyderabad9AC.xml",
    "Hyderabad9MW.xml",
    "Hyderabad9Ref.xml",
    "Hyderabad9Rep.xml",
    "Hyderabad9TV.xml",
    "Hyderabad9WM.xml",
    "IndNainAC.xml",
    "IndNainMW.xml",
    "IndNainRef.xml",
    "IndNainRep.xml",
    "IndNainTV.xml",
    "IndNainWM.xml",
    "Jaipur1AC.xml",
    "Jaipur1MW.xml",
    "Jaipur1Ref.xml",
    "Jaipur1Rep.xml",
    "Jaipur1TV.xml",
    "Jaipur1WM.xml",
    "Jaipur3AC.xml",
    "Jaipur3MW.xml",
    "Jaipur3Ref.xml",
    "Jaipur3Rep.xml",
    "Jaipur3TV.xml",
    "Jaipur3WM.xml",
    "JammShimUjjainSriGandhiAC.xml",
    "JammShimUjjainSriGandhiMW.xml",
    "JammShimUjjainSriGandhiRef.xml",
    "JammShimUjjainSriGandhiRep.xml",
    "JammShimUjjainSriGandhiTV.xml",
    "JammShimUjjainSriGandhiWM.xml",
    "KanJamAC.xml",
    "KanJamMW.xml",
    "KanJamRef.xml",
    "KanJamRep.xml",
    "KanJamTV.xml",
    "KanJamWM.xml",
    "KochiAC.xml",
    "KochiRefRep.xml",
    "KochiTV.xml",
    "KochiWMMW.xml",
    "KoEr.xml",
    "Kolkata1AC.xml",
    "Kolkata1MW.xml",
    "Kolkata1Ref.xml",
    "Kolkata1Rep.xml",
    "Kolkata1TV.xml",
    "Kolkata1WM.xml",
    "Kolkata2AC.xml",
    "Kolkata2MW.xml",
    "Kolkata2Ref.xml",
    "Kolkata2Rep.xml",
    "Kolkata2TV.xml",
    "Kolkata2WM.xml",
    "Kolkata3AC.xml",
    "Kolkata3MW.xml",
    "Kolkata3Ref.xml",
    "Kolkata3Rep.xml",
    "Kolkata3TV.xml",
    "Kolkata3WM.xml",
    "Kolkata4AC.xml",
    "Kolkata4MW.xml",
    "Kolkata4Ref.xml",
    "Kolkata4Rep.xml",
    "Kolkata4TV.xml",
    "Kolkata4WM.xml",
    "Kolkata5AC.xml",
    "Kolkata5MW.xml",
    "Kolkata5Ref.xml",
    "Kolkata5Rep.xml",
    "Kolkata5TV.xml",
    "Kolkata5WM.xml",
    "Kolkata6AC.xml",
    "Kolkata6MW.xml",
    "Kolkata6Ref.xml",
    "Kolkata6Rep.xml",
    "Kolkata6TV.xml",
    "Kolkata6WM.xml",
    "Kolkata7AC.xml",
    "Kolkata7MW.xml",
    "Kolkata7Ref.xml",
    "Kolkata7Rep.xml",
    "Kolkata7TV.xml",
    "Kolkata7WM.xml",
    "Kolkata8AC.xml",
    "Kolkata8MW.xml",
    "Kolkata8Ref.xml",
    "Kolkata8Rep.xml",
    "Kolkata8TV.xml",
    "Kolkata8WM.xml",
    "Kolkata9AC.xml",
    "Kolkata9MW.xml",
    "Kolkata9Ref.xml",
    "Kolkata9Rep.xml",
    "Kolkata9TV.xml",
    "Kolkata9WM.xml",
    "Lucknow2.xml",
    "LucknowAC.xml",
    "LucknowMW.xml",
    "LucknowNew.xml",
    "LucknowRef.xml",
    "LucknowRep.xml",
    "LucknowTV.xml",
    "LucknowWM.xml",
    "LudJhaGwaAC.xml",
    "LudJhaGwaMW.xml",
    "LudJhaGwaRef.xml",
    "LudJhaGwaRep.xml",
    "LudJhaGwaTV.xml",
    "LudJhaGwaWM.xml",
    "MaduraiRanchiAC.xml",
    "MaduraiRanchiMW.xml",
    "MaduraiRanchiRef.xml",
    "MaduraiRanchiRep.xml",
    "MaduraiRanchiTV.xml",
    "MaduraiRanchiWM.xml",
    "MeeMysoreAc.xml",
    "MeeMysoreMW.xml",
    "MeeMysoreRef.xml",
    "MeeMysoreRep.xml",
    "MeeMysoreTV.xml",
    "MeeMysoreWM.xml",
    "MohaVijaJoAC.xml",
    "MohaVijaJoMW.xml",
    "MohaVijaJoRef.xml",
    "MohaVijaJoRep.xml",
    "MohaVijaJoTV.xml",
    "MohaVijaJoWM.xml",
    "MuDeChAC.xml",
    "MuDeChMW.xml",
    "MuDeChRef.xml",
    "MuDeChRep.xml",
    "MuDeChTV.xml",
    "MuDeChWM.xml",
    "MumbaiAC.xml",
    "MumbaiAC1.xml",
    "MumbaiAC2.xml",
    "MumbaiMW.xml",
    "MumbaiMW1.xml",
    "MumbaiMW2.xml",
    "MumbaiMWNew.xml",
    "MumbaiRef.xml",
    "MumbaiRef1.xml",
    "MumbaiRef2.xml",
    "MumbaiRep1.xml",
    "MumbaiRep2.xml",
    "MumbaiRepNew.xml",
    "MumbaiTV.xml",
    "MumbaiTV1.xml",
    "MumbaiTV2.xml",
    "MumbaiWM.xml",
    "MumbaiWM1.xml",
    "MumbaiWM2.xml",
    "MumbaiWMNew.xml",
    "NagpurDarBhiAC.xml",
    "NagpurDarBhiMW.xml",
    "NagpurDarBhiRef.xml",
    "NagpurDarBhiRep.xml",
    "NagpurDarBhiTV.xml",
    "NagpurDarBhiWM.xml",
    "NashikAC.xml",
    "NashikMW.xml",
    "NashikRef.xml",
    "NashikRep.xml",
    "NashikTV.xml",
    "NashikWM.xml",
    "NaviMumbai1AC.xml",
    "NaviMumbai1MW.xml",
    "NaviMumbai1Ref.xml",
    "NaviMumbai1Rep.xml",
    "NaviMumbai1TV.xml",
    "NaviMumbai1WM.xml",
    "NaviMumbaiJaipur2AC.xml",
    "NaviMumbaiJaipur2MW.xml",
    "NaviMumbaiJaipur2Ref.xml",
    "NaviMumbaiJaipur2Rep.xml",
    "NaviMumbaiJaipur2TV.xml",
    "NaviMumbaiJaipur2WM.xml",
    "NoiJamAC.xml",
    "NoiJamMW.xml",
    "NoiJamRef.xml",
    "NoiJamRep.xml",
    "NoiJamTV.xml",
    "NoiJamWM.xml",
    "PatThriAC.xml",
    "PatThriMW.xml",
    "PatThriRef.xml",
    "PatThriRep.xml",
    "PatThriTV.xml",
    "PatThriWM.xml",
    "Pune1AC.xml",
    "Pune1MW.xml",
    "Pune1Ref.xml",
    "Pune1Rep.xml",
    "Pune1TV.xml",
    "Pune1WM.xml",
    "Pune2AC.xml",
    "Pune2MW.xml",
    "Pune2Ref.xml",
    "Pune2Rep.xml",
    "Pune2TV.xml",
    "Pune2WM.xml",
    "Pune3AC.xml",
    "Pune3MW.xml",
    "Pune3Ref.xml",
    "Pune3Rep.xml",
    "Pune3TV.xml",
    "Pune3WM.xml",
    "Pune4AC.xml",
    "Pune4MW.xml",
    "Pune4Ref.xml",
    "Pune4Rep.xml",
    "Pune4TV.xml",
    "Pune4WM.xml",
    "Pune5AC.xml",
    "Pune5MW.xml",
    "Pune5Ref.xml",
    "Pune5Rep.xml",
    "Pune5TV.xml",
    "Pune5WM.xml",
    "RaiMangAC.xml",
    "RaiMangMW.xml",
    "RaiMangRef.xml",
    "RaiMangRep.xml",
    "RaiMangTV.xml",
    "RaiMangWM.xml",
    "RajVellAC.xml",
    "RajVellMW.xml",
    "RajVellRef.xml",
    "RajVellRep.xml",
    "RajVellTV.xml",
    "RajVellWM.xml",
    "sitemap.xml",
    "SixCityAC.xml",
    "SixCityMW.xml",
    "SixCityRef.xml",
    "SixCityRep.xml",
    "SixCityTV.xml",
    "SixCityWM.xml",
    "SuraKotaAC.xml",
    "SuraKotaMW.xml",
    "SuraKotaRef.xml",
    "SuraKotaRep.xml",
    "SuraKotaTV.xml",
    "SuraKotaWM.xml",
    "ThiruBhaCalicutAC.xml",
    "ThiruBhaCalicutMW.xml",
    "ThiruBhaCalicutRef.xml",
    "ThiruBhaCalicutRep.xml",
    "ThiruBhaCalicutTV.xml",
    "ThiruBhaCalicutWM.xml",
    "TrichyTiruManaliAC.xml",
    "TrichyTiruManaliMW.xml",
    "TrichyTiruManaliRef.xml",
    "TrichyTiruManaliRep.xml",
    "TrichyTiruManaliTV.xml",
    "TrichyTiruManaliWM.xml",
    "TrivaKozChhaRaiBikaAC.xml",
    "TrivaKozChhaRaiBikaMW.xml",
    "TrivaKozChhaRaiBikaRef.xml",
    "TrivaKozChhaRaiBikaRep.xml",
    "TrivaKozChhaRaiBikaTV.xml",
    "TrivaKozChhaRaiBikaWM.xml",
    "UdMathPondiSecundAC.xml",
    "UdMathPondiSecundMW.xml",
    "UdMathPondiSecundRef.xml",
    "UdMathPondiSecundRep.xml",
    "UdMathPondiSecundTV.xml",
    "UdMathPondiSecundWM.xml",
    "VaAlAC.xml",
    "VaAlMW.xml",
    "VaAlRef.xml",
    "VaAlRep.xml",
    "VaAlTV.xml",
    "VaAlWM.xml",
    "VadoSataAC.xml",
    "VadoSataMW.xml",
    "VadoSataRef.xml",
    "VadoSataRep.xml",
    "VadoSataTV.xml",
    "VadoSataWM.xml",
    "VisaJalandhAC.xml",
    "VisaJalandhMW.xml",
    "VisaJalandhRef.xml",
    "VisaJalandhRep.xml",
    "VisaJalandhTV.xml",
    "VisaJalandhWM.xml"
];

const allowedTemplates = [
    "Repair-Service-Center",
    "AC-Service-Center12",
    "AC-Service-Center13",
    "AC-Service-Center220",
    "AC-Service-Center221",
    "AC-Service-Center222",
    "AC-Service-Center230",
    "AC-Service-Center231",
    "AC-Service-Center232",
    "Refrigerator-Service-Center12",
    "Refrigerator-Service-Center13",
    "Refrigerator-Service-Center220",
    "Refrigerator-Service-Center221",
    "Refrigerator-Service-Center222",
    "Refrigerator-Service-Center230",
    "Refrigerator-Service-Center231",
    "Refrigerator-Service-Center232",
    "WashingMachine-Service-Center12",
    "WashingMachine-Service-Center13",
    "WashingMachine-Service-Center220",
    "WashingMachine-Service-Center221",
    "WashingMachine-Service-Center222",
    "WashingMachine-Service-Center230",
    "WashingMachine-Service-Center231",
    "WashingMachine-Service-Center232",
    "MicrowaveOven-Service-Center12",
    "MicrowaveOven-Service-Center13",
    "MicrowaveOven-Service-Center220",
    "MicrowaveOven-Service-Center221",
    "MicrowaveOven-Service-Center222",
    "MicrowaveOven-Service-Center230",
    "MicrowaveOven-Service-Center231",
    "MicrowaveOven-Service-Center232",
    "TV-Service-Center12",
    "TV-Service-Center13",
    "TV-Service-Center220",
    "TV-Service-Center221",
    "TV-Service-Center222",
    "TV-Service-Center230",
    "TV-Service-Center231",
    "TV-Service-Center232",
    "Repair-Service-Center13",
    "Repair-Service-Center230",
    "Repair-Service-Center231",
    "Repair-Service-Center232"

]


app.use((req, res, next) => {
    const host = req.get('Host'); // Extract the Host header
    console.log(host, "host");

    if (host === "servicerepairindia.com") {
        res.redirect(`https://www.servicerepairindia.com${req.path}`);
    }
    next();
});

app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(robots);
});

app.get('*', async (req, res) => {


    let path = req.path.trim().replace(/\/+$/g, "");


    const slashCount = (path.match(/\//g) || []).length;

    if (slashCount === 1 && path.endsWith("robots.txt")) {


        
        //return res.type('text/plain').end(robots);
        res.render("Repair-Service-Center", {
            NumValue: 9784467344
        })
    }
    //Homepage

    if (path === "/" || path === "") {
        console.log("HomePage served");
        path = ""
        return res.render("Repair-Service-Center", {
            NumValue: 9784467344
        })
    }





    let parts = path.split('/'); // Split by slashes
    
    let dashCount = (parts[1]?.match(/-/g) || []).length;





    //for condition /AC-Service-Center or /DelhiAC.xml

    if (slashCount === 1 && path.endsWith(".xml")) {
        console.log("condition 2 is running");
        const templateKey = path.slice(1);
        console.log(templateKey, "templatekey");

        // Check if the templateKey is in the allowedFiles list
        if (allowedFiles.includes(`${templateKey}`)) {
            const fileNeeded = fs.readFileSync(`./Sitemaps/${templateKey}`);
            return res.end(fileNeeded);
        } else {
            // Handle the case when the file is not in the list
            return res.render("Repair-Service-Center", {
                NumValue: 9784467344
            })
        }
    }






    if (slashCount == 1 && !path.endsWith(".xml")) {
        console.log("condition 3 is running");
        const v1 = 1;
        let v2 = 0;

        // 1-2
        if (dashCount === 2) {
            console.log("condition 4 is running");
            v2 = 2;
            const templateKey = path.slice(1)
            console.log(templateKey, "templatekey");
            console.log(`${templateKey}${v1}${v2}`);

            if (allowedTemplates.includes(`${templateKey}${v1}${v2}`)) {
                res.render(`${templateKey}${v1}${v2}`, {
                    NumValue: 9784467344
                });
            }
            else {
                return res.render("Repair-Service-Center", {
                    NumValue: 9784467344
                })
            }



        }
        // for condition /Actron-AC-Service-Center
        // 1-3
        if (dashCount == 3) {
            console.log("condition 5 is running");
            v2 = 3;

            let templateKey = path.slice(1)
            const firstDashIndex = templateKey.indexOf('-');
            const prefixRemoved = templateKey.slice(0, firstDashIndex);
            console.log(prefixRemoved);
            templateKey = templateKey.slice(firstDashIndex + 1);

            const slashIndex = templateKey.indexOf('/');
            if (slashIndex !== -1) {
                templateKey = templateKey.slice(0, slashIndex);
            }

            console.log(`${templateKey}${v1}${v2}`);

            let readyTemplateKey = templateKey;
            if (readyTemplateKey.startsWith("AC")) {
                readyTemplateKey = readyTemplateKey.replace(/^AC/, "Ac");
            } else if (readyTemplateKey.startsWith("TV")) {
                readyTemplateKey = readyTemplateKey.replace(/^TV/, "Tv");
            }
            const brandContent = await getBrandContentByName(`${prefixRemoved}-${readyTemplateKey}`);
            
            if (brandContent.message == "Brand content not found") {
                console.log("Homepage rendered due to brand content not found");
                return res.render("Repair-Service-Center", {
                    NumValue: 9784467344
                })
            }

            const isSingleWord = /^[a-z]+$/i.test(prefixRemoved);


            if (prefixRemoved === "OGeneral") {

                if (allowedTemplates.includes(`${templateKey}${v1}${v2}`)) {
                    res.render(`${templateKey}${v1}${v2}`, {
                        BrandName1: "O General",
                        BrandName2: "OGeneral",
                        BrandContent: brandContent.content,
                        NumValue: 9784467344

                    });

                } else {
                    return res.render("Repair-Service-Center", {
                        NumValue: 9784467344
                    })
                }



            }
            if (prefixRemoved === "BlueStar") {

                if (allowedTemplates.includes(`${templateKey}${v1}${v2}`)) {
                    res.render(`${templateKey}${v1}${v2}`, {
                        BrandName1: "Blue Star",
                        BrandName2: "BlueStar",
                        BrandContent: brandContent.content,
                        NumValue: 9784467344

                    });

                } else {
                    return res.render("Repair-Service-Center", {
                        NumValue: 9784467344
                    })
                }


            }
            if (prefixRemoved === "WhiteWestinghouse") {

                if (allowedTemplates.includes(`${templateKey}${v1}${v2}`)) {
                    res.render(`${templateKey}${v1}${v2}`, {
                        BrandName1: "White Westinghouse",
                        BrandName2: "WhiteWestinghouse",
                        BrandContent: brandContent.content,
                        NumValue: 9784467344

                    });

                } else {
                    return res.render("Repair-Service-Center", {
                        NumValue: 9784467344
                    })
                }


            }

            if (isSingleWord) {

                if (allowedTemplates.includes(`${templateKey}${v1}${v2}`)) {

                    res.render(`${templateKey}${v1}${v2}`, {
                        BrandName1: prefixRemoved,
                        BrandName2: prefixRemoved,
                        BrandContent: brandContent.content,
                        NumValue: 9784467344

                    });
                } else {

                    return res.render("Repair-Service-Center", {
                        NumValue: 9784467344
                    })
                }


            }
            else {

                const spacedPrefix = prefixRemoved.replace(/([a-z])([A-Z])/g, '$1 $2');
                const hyphenatedPrefix = prefixRemoved.replace(/([a-z])([A-Z])/g, '$1-$2');


                if (allowedTemplates.includes(`${templateKey}${v1}${v2}`)) {
                    res.render(`${templateKey}${v1}${v2}`, {
                        BrandName1: spacedPrefix,
                        BrandName2: hyphenatedPrefix,
                        BrandContent: brandContent.content,
                        NumValue: 9784467344
                    })

                } else {

                    return res.render("Repair-Service-Center", {
                        NumValue: 9784467344
                    })
                }



            }

        }
        if (dashCount >= 3) {

            return res.render("Repair-Service-Center", {
                NumValue: 9784467344
            })
        }



    }
    // for condition /AC-Service-Center/Delhi or or /Actron-AC-Service-Center/Delhi or /Actron-AC-Service-Center/Delhi-Rohini
    //
    if (slashCount === 2) {
        console.log("condition 6 is running");
        let v1 = 2;
        let v2 = 0;
        let v3 = 0;

        //       2-2
        if (dashCount == 2) {
            console.log("condition 7 is running");
            v2 = 2;
            let templateKey = path.slice(1)
            let afterSlash = templateKey.split('/')[1]; // Get the part after the slash

            const slashIndex = templateKey.indexOf('/');
            if (slashIndex !== -1) {
                templateKey = templateKey.slice(0, slashIndex);


                console.log(afterSlash, "afterSlash");
                v3 = (afterSlash.match(/-/g) || []).length;
            }



            console.log(templateKey, "templatekey");

            console.log(`${templateKey}${v1}${v2}${v3}`);

            if (v1 == 2 && v2 == 2 && v3 == 0) {
                const NumValue = await getCityContactByName(`${afterSlash}`);

                if (NumValue !== null) {

                    if (afterSlash === "NaviMumbai") {

                        if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)) {
                            res.render(`${templateKey}${v1}${v2}${v3}`, {

                                NumValue: NumValue?.number,
                                CityName1: "Navi Mumbai",
                                CityName2: "NaviMumbai"
                            })

                        } else {

                            return res.render("Repair-Service-Center", {
                                NumValue: 9784467344
                            })
                        }


                    } else if (afterSlash === "GreaterNoida") {
                        if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)) {
                            res.render(`${templateKey}${v1}${v2}${v3}`, {

                                NumValue: NumValue?.number,
                                CityName1: "Greater Noida",
                                CityName2: "GreaterNoida"
                            })
                        } else {
                            return res.render("Repair-Service-Center", {
                                NumValue: 9784467344
                            })
                        }
                    }

                    if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)) {

                        res.render(`${templateKey}${v1}${v2}${v3}`, {
                            CityName1: afterSlash,
                            CityName2: afterSlash,
                            NumValue: NumValue?.number
                        });
                    } else {

                        return res.render("Repair-Service-Center", {
                            NumValue: 9784467344
                        })
                    }


                }
                res.render("Repair-Service-Center", {
                    NumValue: 9784467344
                })
            }
            //for condition /AC-Service-Center/Delhi-Rohini 
            if (v1 == 2 && v2 == 2 && v3 == 1) {

                const afterSlashCity = afterSlash.split('-')[0];
                const afterSlashAreaName = afterSlash.split('-').slice(1).join('-');
                const NumValue = await getCityContactByName(`${afterSlashCity}`);
                const isAreaFound = await getCityByName(`${afterSlashCity}1`, `${afterSlashAreaName}`);
                console.log(NumValue);
                console.log(isAreaFound);

                if (NumValue !== null && isAreaFound) {

                    if(afterSlashCity ==="NaviMumbai"){
                        if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)) {
                            res.render(`${templateKey}${v1}${v2}${v3}`, {
                                CityName1: "Navi Mumbai",
                                CityName2: afterSlashCity,
                                NumValue: NumValue?.number,
                                AreaName: afterSlashAreaName,
    
                            });
                        } else {
    
                            return res.render("Repair-Service-Center", {
                                NumValue: 9784467344
                            })
                        }
                    }else if(afterSlashCity === "GreaterNoida"){
                        if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)) {
                            res.render(`${templateKey}${v1}${v2}${v3}`, {
                                CityName1: "Greater Noida",
                                CityName2: afterSlashCity,
                                NumValue: NumValue?.number,
                                AreaName: afterSlashAreaName,
    
                            });
                        } else {
    
                            return res.render("Repair-Service-Center", {
                                NumValue: 9784467344
                            })
                        }
                    }


                    if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)) {
                        res.render(`${templateKey}${v1}${v2}${v3}`, {
                            CityName1: afterSlashCity,
                            CityName2: afterSlashCity,
                            NumValue: NumValue?.number,
                            AreaName: afterSlashAreaName,

                        });
                    } else {

                        return res.render("Repair-Service-Center", {
                            NumValue: 9784467344
                        })
                    }


                } else {
                    res.render("Repair-Service-Center", {
                        NumValue: 9784467344
                    })
                }

            }

            if (v1 == 2 && v2 == 2 && v3 >= 2) {

                const afterSlashCity = afterSlash.split('-')[0];
                const afterSlashAreaName = afterSlash.split('-').slice(1).join('-');
                const NumValue = await getCityContactByName(`${afterSlashCity}`);
                const isAreaFound = await getCityByName(`${afterSlashCity}2`, `${afterSlashAreaName}`);
                console.log(NumValue);
                console.log(isAreaFound);
                const areaName1 = afterSlashAreaName.replace(/-/g, ' ');



                if (NumValue !== null && isAreaFound) {

                    if(afterSlashCity === "NaviMumbai"){
                        if (allowedTemplates.includes(`${templateKey}${v1}${v2}2`)) {

                            res.render(`${templateKey}${v1}${v2}2`, {
                                CityName1: "Navi Mumbai",
                                CityName2: afterSlashCity,
                                NumValue: NumValue?.number,
                                AreaName1: areaName1,
                                AreaName2: `${afterSlashAreaName}`,
                            });
    
                        } else {
    
                            return res.render("Repair-Service-Center", {
                                NumValue: 9784467344
                            })
                        }
                    }else if(afterSlashCity === "GreaterNoida"){
                        if (allowedTemplates.includes(`${templateKey}${v1}${v2}2`)) {

                            res.render(`${templateKey}${v1}${v2}2`, {
                                CityName1: "Greater Noida",
                                CityName2: afterSlashCity,
                                NumValue: NumValue?.number,
                                AreaName1: areaName1,
                                AreaName2: `${afterSlashAreaName}`,
                            });
    
                        } else {
    
                            return res.render("Repair-Service-Center", {
                                NumValue: 9784467344
                            })
                        }
                    }


                    if (allowedTemplates.includes(`${templateKey}${v1}${v2}2`)) {

                        res.render(`${templateKey}${v1}${v2}2`, {
                            CityName1: afterSlashCity,
                            CityName2: afterSlashCity,
                            NumValue: NumValue?.number,
                            AreaName1: areaName1,
                            AreaName2: `${afterSlashAreaName}`,
                        });

                    } else {

                        return res.render("Repair-Service-Center", {
                            NumValue: 9784467344
                        })
                    }


                } else {
                    res.render("Repair-Service-Center", {
                        NumValue: 9784467344
                    })
                }
            }


        }
        if (dashCount == 3) {
            console.log("condition 8 is running");
            v2 = 3;
            let templateKey = path.slice(1)
            let afterSlash = templateKey.split('/')[1]; // Get the part after the slash
            const slashIndex = templateKey.indexOf('/');
            if (slashIndex !== -1) {
                templateKey = templateKey.slice(0, slashIndex);


                console.log(afterSlash, "afterSlash");
                v3 = (afterSlash.match(/-/g) || []).length;
            }
            let firstDashIndex = templateKey.indexOf('-');
            const prefixRemoved = templateKey.slice(0, firstDashIndex);
            console.log(prefixRemoved);
            templateKey = templateKey.slice(firstDashIndex + 1);
            console.log(`${templateKey}${v1}${v2}${v3}`);


            if (v1 == 2 && v2 == 3 && v3 == 0) {
                let readyTemplateKey = templateKey;
                if (readyTemplateKey.startsWith("AC")) {
                    readyTemplateKey = readyTemplateKey.replace(/^AC/, "Ac");
                } else if (readyTemplateKey.startsWith("TV")) {
                    readyTemplateKey = readyTemplateKey.replace(/^TV/, "Tv");
                }

                const brandContent = await getBrandContentByName(`${prefixRemoved}-${readyTemplateKey}`);

                
                if (brandContent.message == "Brand content not found") {
                    return res.render("Repair-Service-Center", {
                        NumValue: 9784467344
                    })
                }
                const NumValue = await getCityContactByName(`${afterSlash}`);
                const spacedPrefix = prefixRemoved.replace(/([a-z])([A-Z])/g, '$1 $2');
                const hyphenatedPrefix = prefixRemoved.replace(/([a-z])([A-Z])/g, '$1-$2');

                if (NumValue !== null) {

                    if (prefixRemoved === "OGeneral") {


                        if (afterSlash === "NaviMumbai") {


                            if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)) {

                                res.render(`${templateKey}${v1}${v2}${v3}`, {
                                    BrandName1: "O General",
                                    BrandName2: "OGeneral",
                                    BrandContent: brandContent.content,
                                    NumValue: NumValue?.number,
                                    CityName1: "Navi Mumbai",
                                    CityName2: "NaviMumbai"
                                })

                            } else {

                                return res.render("Repair-Service-Center", {
                                    NumValue: 9784467344
                                })
                            }


                        }else if(afterSlash === "GreaterNoida"){
                            if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)) {
                                res.render(`${templateKey}${v1}${v2}${v3}`, {
                                    BrandName1: "O General",
                                    BrandName2: "OGeneral",
                                    BrandContent: brandContent.content,
                                    NumValue: NumValue?.number,
                                    CityName1: "Greater Noida",
                                    CityName2: "GreaterNoida"
                                })
                            } else {

                                return res.render("Repair-Service-Center", {
                                    NumValue: 9784467344
                                })
                            }
                            }

                        if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)) {
                            res.render(`${templateKey}${v1}${v2}${v3}`, {
                                BrandName1: "O General",
                                BrandName2: "OGeneral",
                                BrandContent: brandContent.content,
                                NumValue: NumValue?.number,
                                CityName1: afterSlash,
                                CityName2: afterSlash
                            })
                        } else {

                            return res.render("Repair-Service-Center", {
                                NumValue: 9784467344
                            })
                        }


                    }
                    if (prefixRemoved === "BlueStar") {


                        if (afterSlash === "NaviMumbai") {


                            if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)) {

                                res.render(`${templateKey}${v1}${v2}${v3}`, {
                                    BrandName1: "Blue Star",
                                    BrandName2: "BlueStar",
                                    BrandContent: brandContent.content,
                                    NumValue: NumValue?.number,
                                    CityName1: "Navi Mumbai",
                                    CityName2: "NaviMumbai"
                                })

                            } else {

                                return res.render("Repair-Service-Center", {
                                    NumValue: 9784467344
                                })
                            }


                        }else if(afterSlash ==="GreaterNoida"){
                            if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)){
                                res.render(`${templateKey}${v1}${v2}${v3}`, {
                                    BrandName1: "Blue Star",
                                    BrandName2: "BlueStar",
                                    BrandContent: brandContent.content,
                                    NumValue: NumValue?.number,
                                    CityName1: "Greater Noida",
                                    CityName2:"GreaterNoida",
                                    })
                            }
                        }

                        if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)) {
                            res.render(`${templateKey}${v1}${v2}${v3}`, {
                                BrandName1: "Blue Star",
                                BrandName2: "BlueStar",
                                BrandContent: brandContent.content,
                                NumValue: NumValue?.number,
                                CityName1: afterSlash,
                                CityName2: afterSlash
                            })
                        } else {

                            return res.render("Repair-Service-Center", {
                                NumValue: 9784467344
                            })
                        }


                    }

                    if (prefixRemoved === "WhiteWestinghouse") {


                        if (afterSlash === "NaviMumbai") {


                            if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)) {

                                res.render(`${templateKey}${v1}${v2}${v3}`, {
                                    BrandName1: "White Westinghouse",
                                    BrandName2: "WhiteWestinghouse",
                                    BrandContent: brandContent.content,
                                    NumValue: NumValue?.number,
                                    CityName1: "Navi Mumbai",
                                    CityName2: "NaviMumbai"
                                })

                            } else {

                                return res.render("Repair-Service-Center", {
                                    NumValue: 9784467344
                                })
                            }


                        } else if(afterSlash === "GreaterNoida") {
                            if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)) {

                                res.render(`${templateKey}${v1}${v2}${v3}`, {
                                    BrandName1: "White Westinghouse",
                                    BrandName2: "WhiteWestinghouse",
                                    BrandContent: brandContent.content,
                                    NumValue: NumValue?.number,
                                    CityName1: "Greater Noida",
                                    CityName2: "GreaterNoida"
                                })

                            } else {

                                return res.render("Repair-Service-Center", {
                                    NumValue: 9784467344
                                })
                            }
                        }

                        if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)) {
                            res.render(`${templateKey}${v1}${v2}${v3}`, {
                                BrandName1: "White Westinghouse",
                                BrandName2: "WhiteWestinghouse",
                                BrandContent: brandContent.content,
                                NumValue: NumValue?.number,
                                CityName1: afterSlash,
                                CityName2: afterSlash
                            })
                        } else {

                            return res.render("Repair-Service-Center", {
                                NumValue: 9784467344
                            })
                        }


                    }

                    if (afterSlash === "NaviMumbai") {

                        if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)) {
                            res.render(`${templateKey}${v1}${v2}${v3}`, {
                                BrandName1: spacedPrefix,
                                BrandName2: hyphenatedPrefix,
                                BrandContent: brandContent.content,
                                NumValue: NumValue?.number,
                                CityName1: "Navi Mumbai",
                                CityName2: "NaviMumbai"
                            })
                        } else {

                            return res.render("Repair-Service-Center", {
                                NumValue: 9784467344
                            })
                        }


                    }
                    else if (afterSlash === "GreaterNoida") {

                        if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)) {
                            res.render(`${templateKey}${v1}${v2}${v3}`, {
                                BrandName1: spacedPrefix,
                                BrandName2: hyphenatedPrefix,
                                BrandContent: brandContent.content,
                                NumValue: NumValue?.number,
                                CityName1: "Greater Noida",
                                CityName2: "GreaterNoida"
                            })
                        } else {

                            return res.render("Repair-Service-Center", {
                                NumValue: 9784467344
                            })
                        }


                    }


                    if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)) {

                        res.render(`${templateKey}${v1}${v2}${v3}`, {
                            BrandName1: spacedPrefix,
                            BrandName2: hyphenatedPrefix,
                            BrandContent: brandContent.content,
                            NumValue: NumValue?.number,
                            CityName1: afterSlash,
                            CityName2: afterSlash
                        })

                    } else {

                        return res.render("Repair-Service-Center", {
                            NumValue: 9784467344
                        })
                    }


                } else {
                    res.render("Repair-Service-Center", {
                        NumValue: 9784467344
                    })
                }


            }

            if (v1 == 2 && v2 == 3 && v3 == 1) {

                let readyTemplateKey = templateKey;
                if (readyTemplateKey.startsWith("AC")) {
                    readyTemplateKey = readyTemplateKey.replace(/^AC/, "Ac");
                } else if (readyTemplateKey.startsWith("TV")) {
                    readyTemplateKey = readyTemplateKey.replace(/^TV/, "Tv");
                }

                const brandContent = await getBrandContentByName(`${prefixRemoved}-${readyTemplateKey}`);

                if (brandContent.message == "Brand content not found") {
                    return res.render("Repair-Service-Center", {
                        NumValue: 9784467344
                    })
                }
                const afterSlashCity = afterSlash.split('-')[0];
                const afterSlashAreaName = afterSlash.split('-')[1];
                const NumValue = await getCityContactByName(`${afterSlashCity}`);

                const spacedPrefix = prefixRemoved.replace(/([a-z])([A-Z])/g, '$1 $2');
                const hyphenatedPrefix = prefixRemoved.replace(/([a-z])([A-Z])/g, '$1-$2');
                const isAreaFound = await getCityByName(`${afterSlashCity}1`, `${afterSlashAreaName}`);

                if (NumValue !== null && isAreaFound) {
                    if(afterSlashCity ==="NaviMumbai"){
                        if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)) {

                            res.render(`${templateKey}${v1}${v2}${v3}`, {
                                NumValue: NumValue?.number,
                                CityName1: "Navi Mumbai",
                                CityName2: "NaviMumbai",
                                BrandName1: prefixRemoved === "OGeneral" ? "O General" : spacedPrefix,
                                BrandName2: prefixRemoved === "OGeneral" ? "OGeneral" : prefixRemoved,
                                BrandContent: brandContent.content,
                                AreaName: `${afterSlashAreaName}`,
    
    
                            });
    
                        } else {
    
                            return res.render("Repair-Service-Center", {
                                NumValue: 9784467344
                            })
                        }

                    }else if(afterSlashCity ==="GreaterNoida"){
                        if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)) {

                            res.render(`${templateKey}${v1}${v2}${v3}`, {
                                NumValue: NumValue?.number,
                                CityName1: "Greater Noida",
                                CityName2: "GreaterNoida",
                                BrandName1: prefixRemoved === "OGeneral" ? "O General" : spacedPrefix,
                                BrandName2: prefixRemoved === "OGeneral" ? "OGeneral" : prefixRemoved,
                                BrandContent: brandContent.content,
                                AreaName: `${afterSlashAreaName}`,
    
    
                            });
    
                        } else {
    
                            return res.render("Repair-Service-Center", {
                                NumValue: 9784467344
                            })
                        }
                    }


                    if (allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)) {

                        res.render(`${templateKey}${v1}${v2}${v3}`, {
                            NumValue: NumValue?.number,
                            CityName1: afterSlashCity,
                            CityName2: afterSlashCity,
                            BrandName1: prefixRemoved === "OGeneral" ? "O General" : spacedPrefix,
                            BrandName2: prefixRemoved === "OGeneral" ? "OGeneral" : prefixRemoved,
                            BrandContent: brandContent.content,
                            AreaName: `${afterSlashAreaName}`,


                        });

                    } else {

                        return res.render("Repair-Service-Center", {
                            NumValue: 9784467344
                        })
                    }




                } else {
                    res.render("Repair-Service-Center", {
                        NumValue: 9784467344
                    })
                }
            }

            if (v1 == 2 && v2 == 3 && v3 >= 2) {
                console.log("condition 232 is running");
                let readyTemplateKey = templateKey;
                if (readyTemplateKey.startsWith("AC")) {
                    readyTemplateKey = readyTemplateKey.replace(/^AC/, "Ac");
                } else if (readyTemplateKey.startsWith("TV")) {
                    readyTemplateKey = readyTemplateKey.replace(/^TV/, "Tv");
                }
                const brandContent = await getBrandContentByName(`${prefixRemoved}-${readyTemplateKey}`);

                if (brandContent.message == "Brand content not found") {
                    return res.render("Repair-Service-Center", {
                        NumValue: 9784467344
                    })
                }
                const afterSlashCity = afterSlash.split('-')[0];
                const afterSlashAreaName = afterSlash.split('-').slice(1).join('-');
                const NumValue = await getCityContactByName(`${afterSlashCity}`);
                const isAreaFound = await getCityByName(`${afterSlashCity}2`, `${afterSlashAreaName}`);
                const spacedPrefix = prefixRemoved.replace(/([a-z])([A-Z])/g, '$1 $2');
                const hyphenatedPrefix = prefixRemoved.replace(/([a-z])([A-Z])/g, '$1-$2');


                console.log(isAreaFound, "isAreaFound");
                console.log(NumValue, "NumValue");

                if (NumValue !== null && isAreaFound) {
                    if(afterSlashCity === "NaviMumbai"){
                        if (allowedTemplates.includes(`${templateKey}${v1}${v2}2`)) {

                            res.render(`${templateKey}${v1}${v2}2`, {
                                NumValue: NumValue?.number,
                                CityName1: "Navi Mumbai",
                                CityName2: "NaviMumbai",
                                BrandName1: prefixRemoved === "OGeneral" ? "O General" : spacedPrefix,
                                BrandName2: prefixRemoved === "OGeneral" ? "OGeneral" : prefixRemoved,
                                BrandContent: brandContent.content,
                                AreaName1: `${afterSlashAreaName.replace(/-/g, ' ')}`,
                                AreaName2: `${afterSlashAreaName}`,
    
                            });
    
                        } else {
    
                            return res.render("Repair-Service-Center", {
                                NumValue: 9784467344
                            })
                        }
                    }else if(afterSlashCity === "GreaterNoida"){
                        if (allowedTemplates.includes(`${templateKey}${v1}${v2}2`)) {

                            res.render(`${templateKey}${v1}${v2}2`, {
                                NumValue: NumValue?.number,
                                CityName1: "Greater Noida",
                                CityName2: "GreaterNoida",
                                BrandName1: prefixRemoved === "OGeneral" ? "O General" : spacedPrefix,
                                BrandName2: prefixRemoved === "OGeneral" ? "OGeneral" : prefixRemoved,
                                BrandContent: brandContent.content,
                                AreaName1: `${afterSlashAreaName.replace(/-/g, ' ')}`,
                                AreaName2: `${afterSlashAreaName}`,
    
                            });
    
                        } else {
    
                            return res.render("Repair-Service-Center", {
                                NumValue: 9784467344
                            })
                        }
                    }


                    if (allowedTemplates.includes(`${templateKey}${v1}${v2}2`)) {

                        res.render(`${templateKey}${v1}${v2}2`, {
                            NumValue: NumValue?.number,
                            CityName1: afterSlashCity,
                            CityName2: afterSlashCity,
                            BrandName1: prefixRemoved === "OGeneral" ? "O General" : spacedPrefix,
                            BrandName2: prefixRemoved === "OGeneral" ? "OGeneral" : prefixRemoved,
                            BrandContent: brandContent.content,
                            AreaName1: `${afterSlashAreaName.replace(/-/g, ' ')}`,
                            AreaName2: `${afterSlashAreaName}`,

                        });

                    } else {

                        return res.render("Repair-Service-Center", {
                            NumValue: 9784467344
                        })
                    }




                } else {
                    res.render("Repair-Service-Center", {
                        NumValue: 9784467344
                    })
                }
            }
        }
        if (dashCount >= 3) {
            return res.render("Repair-Service-Center", {
                NumValue: 9784467344
            })
        }
    }
    res.render("Repair-Service-Center", {
        NumValue: 9784467344
    })
});


// Start Server
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`)); 