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

// Express specific stuff
app.use('/static', express.static('static'))
app.use(express.urlencoded())
app.use(express.json());

const allowedFiles = [
    "sitemap.xml",
"Lucknow2.xml",
"Delhi2.xml",
"DelhiAC.xml",
"DelhiRef.xml",
"DelhiWM.xml",
"DelhiMW.xml",
"DelhiTV.xml",
"AllBrands.xml",
"DelhiLucknowNew.xml",
"MumbaiAC.xml",
"MumbaiRef.xml",
"MumbaiWM.xml",
"MumbaiMW.xml",
"MumbaiTV.xml",
"ChennaiAC.xml",
"Chennai2.xml",
"ChennaiRef.xml",
"ChennaiWM.xml",
"ChennaiMW.xml",
"ChennaiTV.xml",
"BangaloreAC.xml",
"BangaloreRef.xml",
"BangaloreWM.xml",
"BangaloreMW.xml",
"BangaloreTV.xml",
"BengaluruAC.xml",
"BengaluruRef.xml",
"BengaluruWM.xml",
"BengaluruMW.xml",
"BengaluruTV.xml",
"ErnakulamAC.xml",
"ErnakulamRefRep.xml",
"ErnakulamWMMW.xml",
"ErnakulamTV.xml",
"KochiAC.xml",
"KochiRefRep.xml",
"KochiWMMW.xml",
"KochiTV.xml",
"CoimbatoreAC.xml",
"CoimbatoreRef.xml",
"CoimbatoreWM.xml",
"CoimbatoreMW.xml",
"CoimbatoreTV.xml",
"CoimbatoreRep.xml",
"GuAgAC.xml",
"GuAgRef.xml",
"GuAgWM.xml",
"GuAgMW.xml",
"GuAgTV.xml",
"GuAgRep.xml",
"LucknowAC.xml",
"LucknowRef.xml",
"LucknowWM.xml",
"LucknowMW.xml",
"LucknowTV.xml",
"LucknowRep.xml",
"BaPrAC.xml",
"BaPrRef.xml",
"BaPrWM.xml",
"BaPrMW.xml",
"BaPrTV.xml",
"BaPrRep.xml",
"VaAlAC.xml",
"VaAlRef.xml",
"VaAlWM.xml",
"VaAlMW.xml",
"VaAlTV.xml",
"VaAlRep.xml",
"KoEr.xml",
"AhmedabadAC1.xml",
"AhmedabadRef1.xml",
"AhmedabadWM1.xml",
"AhmedabadMW1.xml",
"AhmedabadTV1.xml",
"AhmedabadRep1.xml",
"AhmedabadAC2.xml",
"AhmedabadRef2.xml",
"AhmedabadWM2.xml",
"AhmedabadMW2.xml",
"AhmedabadTV2.xml",
"AhmedabadRep2.xml",
"BangaloreAC1.xml",
"BangaloreRef1.xml",
"BangaloreWM1.xml",
"BangaloreMW1.xml",
"BangaloreTV1.xml",
"BangaloreRep1.xml",
"BangaloreAC2.xml",
"BangaloreRef2.xml",
"BangaloreWM2.xml",
"BangaloreMW2.xml",
"BangaloreTV2.xml",
"BangaloreRep2.xml",
"BangaloreAC3.xml",
"BangaloreRef3.xml",
"BangaloreWM3.xml",
"BangaloreMW3.xml",
"BangaloreTV3.xml",
"BangaloreRep3.xml",
"BangaloreAC4.xml",
"BangaloreRef4.xml",
"BangaloreWM4.xml",
"BangaloreMW4.xml",
"BangaloreTV4.xml",
"BangaloreRep4.xml",
"BengaluruAC1.xml",
"BengaluruRef1.xml",
"BengaluruWM1.xml",
"BengaluruMW1.xml",
"BengaluruTV1.xml",
"BengaluruRep1.xml",
"BengaluruAC2.xml",
"BengaluruRef2.xml",
"BengaluruWM2.xml",
"BengaluruMW2.xml",
"BengaluruTV2.xml",
"BengaluruRep2.xml",
"BengaluruAC3.xml",
"BengaluruRef3.xml",
"BengaluruWM3.xml",
"BengaluruMW3.xml",
"BengaluruTV3.xml",
"BengaluruRep3.xml",
"BengaluruAC4.xml",
"BengaluruRef4.xml",
"BengaluruWM4.xml",
"BengaluruMW4.xml",
"BengaluruTV4.xml",
"BengaluruRep4.xml",
"MumbaiAC1.xml",
"MumbaiRef1.xml",
"MumbaiWM1.xml",
"MumbaiMW1.xml",
"MumbaiTV1.xml",
"MumbaiRep1.xml",
"MumbaiAC2.xml",
"MumbaiRef2.xml",
"MumbaiWM2.xml",
"MumbaiMW2.xml",
"MumbaiTV2.xml",
"MumbaiRep2.xml",
"DelhiAC1.xml",
"DelhiRef1.xml",
"DelhiWM1.xml",
"DelhiMW1.xml",
"DelhiTV1.xml",
"DelhiRep1.xml",
"DelhiAC2.xml",
"DelhiRef2.xml",
"DelhiWM2.xml",
"DelhiMW2.xml",
"DelhiTV2.xml",
"DelhiRep2.xml",
"DelhiAC3.xml",
"DelhiRef3.xml",
"DelhiWM3.xml",
"DelhiMW3.xml",
"DelhiTV3.xml",
"DelhiRep3.xml",
"ChennaiAC1.xml",
"ChennaiRef1.xml",
"ChennaiWM1.xml",
"ChennaiMW1.xml",
"ChennaiTV1.xml",
"ChennaiRep1.xml",
"ChennaiAC2.xml",
"ChennaiRef2.xml",
"ChennaiWM2.xml",
"ChennaiMW2.xml",
"ChennaiTV2.xml",
"ChennaiRep2.xml",
"ChennaiAC3.xml",
"ChennaiRef3.xml",
"ChennaiWM3.xml",
"ChennaiMW3.xml",
"ChennaiTV3.xml",
"ChennaiRep3.xml",
"MuDeChAC.xml",
"MuDeChRef.xml",
"MuDeChWM.xml",
"MuDeChMW.xml",
"MuDeChTV.xml",
"MuDeChRep.xml",
"AllChangedBrands.xml",
"AllBrandsNew.xml",
"LucknowNew.xml",
"DelhiMWNew.xml",
"Delhi2New.xml",
"DelhiWMNew.xml",
"BengaluruRep.xml",
"ChennaiRep.xml",
"MumbaiRepNew.xml",
"MumbaiWMNew.xml",
"Chennai2New.xml",
"MumbaiMWNew.xml",
"BangaloreRep.xml",
"DelhiRepNew.xml"
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

    if(host ==="servicerepairindia.com"){
        res.redirect(`https://www.servicerepairindia.com${req.path}`);
    }
    next();
});

app.get('*', async (req, res) => {


    let path = req.path.trim().replace(/\/+$/g, "");


    const slashCount = (path.match(/\//g) || []).length;

    if (slashCount === 1 && req.url.endsWith("robots.txt")) {
        const robotsFilePath = "./robots.txt";

        fs.readFile(robotsFilePath, 'utf-8', (err, data) => {
            if (err) {
                // Handle error, e.g., file not found or other file system issues
                console.error("Error reading robots.txt:", err);
                return res.status(500).send("Internal Server Error");
            }

            console.log("robots.txt file sent");
            
            return res.send(data);
        });

        return;
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
    console.log(parts[1], "parts[1]");
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

            if(allowedTemplates.includes(`${templateKey}${v1}${v2}`)){
                res.render(`${templateKey}${v1}${v2}`, {
                    NumValue: 9784467344
                });
            }
            else{
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
            console.log(brandContent);
            if (brandContent.message == "Brand content not found") {
                console.log("Homepage rendered");
                return res.render("Repair-Service-Center", {
                    NumValue: 9784467344
                })
            }

            const isSingleWord = /^[a-z]+$/i.test(prefixRemoved);


            if(prefixRemoved ==="OGeneral" ){

                if(allowedTemplates.includes(`${templateKey}${v1}${v2}`)){
                    res.render(`${templateKey}${v1}${v2}`, {
                        BrandName1: "O General",
                        BrandName2: "OGeneral",
                        BrandContent: brandContent.content,
                        NumValue: 9784467344
    
                    });

                }else{
                    return res.render("Repair-Service-Center", {
                        NumValue: 9784467344
                    })
                }

                

            }
            if(prefixRemoved ==="BlueStar"){

                if(allowedTemplates.includes(`${templateKey}${v1}${v2}`)){
                    res.render(`${templateKey}${v1}${v2}`, {
                        BrandName1: "Blue Star",
                        BrandName2: "BlueStar",
                        BrandContent: brandContent.content,
                        NumValue: 9784467344
    
                    });

                }else{
                    return res.render("Repair-Service-Center", {
                        NumValue: 9784467344
                    })
                }

               
            }
            if(prefixRemoved ==="WhiteWestinghouse"){

                if(allowedTemplates.includes(`${templateKey}${v1}${v2}`)){
                    res.render(`${templateKey}${v1}${v2}`, {            
                        BrandName1: "White Westinghouse",
                        BrandName2: "WhiteWestinghouse",
                        BrandContent: brandContent.content,
                        NumValue: 9784467344
    
                    });

                }else{
                    return res.render("Repair-Service-Center", {
                        NumValue: 9784467344
                    })
                }

                
            }

            if (isSingleWord) {

                if(allowedTemplates.includes(`${templateKey}${v1}${v2}`)){

                    res.render(`${templateKey}${v1}${v2}`, {
                        BrandName1: prefixRemoved,
                        BrandName2: prefixRemoved,
                        BrandContent: brandContent.content,
                        NumValue: 9784467344
    
                    });
                }else{

                    return res.render("Repair-Service-Center", {
                        NumValue: 9784467344
                    })
                }
                
               
            }
            else {

                const spacedPrefix = prefixRemoved.replace(/([a-z])([A-Z])/g, '$1 $2');
                const hyphenatedPrefix = prefixRemoved.replace(/([a-z])([A-Z])/g, '$1-$2');


                if(allowedTemplates.includes(`${templateKey}${v1}${v2}`)){
                    res.render(`${templateKey}${v1}${v2}`, {
                        BrandName1: spacedPrefix,
                        BrandName2: hyphenatedPrefix,
                        BrandContent: brandContent.content,
                        NumValue: 9784467344
                    })

                }else{

                    return res.render("Repair-Service-Center", {
                        NumValue: 9784467344
                    })
                }

               

            }

        }
        if(dashCount >=3){

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

                    if(afterSlash === "NaviMumbai"){

                        if(allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)){
                            res.render(`${templateKey}${v1}${v2}${v3}`, {
                            
                                NumValue: NumValue?.number,
                                CityName1: "Navi Mumbai",   
                                CityName2: "NaviMumbai"
                            })

                        }else{

                            return res.render("Repair-Service-Center", {    
                                NumValue: 9784467344
                            })
                        }
                        

                    }

                    if(allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)){

                        res.render(`${templateKey}${v1}${v2}${v3}`, {
                            CityName1: afterSlash,
                            CityName2: afterSlash,
                            NumValue: NumValue?.number
                        });
                    }else{

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


                    if(allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)){
                        res.render(`${templateKey}${v1}${v2}${v3}`, {
                            CityName1: afterSlashCity,
                            CityName2: afterSlashCity,
                            NumValue: NumValue?.number,
                            AreaName: afterSlashAreaName,
    
                        });
                    }else{

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


                    if(allowedTemplates.includes(`${templateKey}${v1}${v2}2`)){

                        res.render(`${templateKey}${v1}${v2}2`, {
                            CityName1: afterSlashCity,
                            CityName2: afterSlashCity,
                            NumValue: NumValue?.number,
                            AreaName1: areaName1,
                            AreaName2: `${afterSlashAreaName}`,
                        });

                    }else{

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

                console.log(brandContent);
                if (brandContent.message == "Brand content not found") {
                    return res.render("Repair-Service-Center", {
                        NumValue: 9784467344
                    })
                }
                const NumValue = await getCityContactByName(`${afterSlash}`);
                const spacedPrefix = prefixRemoved.replace(/([a-z])([A-Z])/g, '$1 $2');
                const hyphenatedPrefix = prefixRemoved.replace(/([a-z])([A-Z])/g, '$1-$2');

                if (NumValue !== null) {

                    if(prefixRemoved === "OGeneral" ){


                        if(afterSlash === "NaviMumbai"){


                            if(allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)){

                                res.render(`${templateKey}${v1}${v2}${v3}`, {
                                    BrandName1: "O General",
                                    BrandName2: "OGeneral",
                                    BrandContent: brandContent.content,
                                    NumValue: NumValue?.number,
                                    CityName1: "Navi Mumbai",   
                                    CityName2: "NaviMumbai"
                                })
                                
                            }else{

                                return res.render("Repair-Service-Center", {
                                    NumValue: 9784467344
                                })
                            }
                            
    
                        }

                        if(allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)){
                            res.render(`${templateKey}${v1}${v2}${v3}`, {
                                BrandName1: "O General",
                                BrandName2: "OGeneral",
                                BrandContent: brandContent.content,
                                NumValue: NumValue?.number,
                                CityName1: afterSlash,
                                CityName2: afterSlash
                            }) 
                        }else{

                            return res.render("Repair-Service-Center", {
                                NumValue: 9784467344
                            })
                        }
                        

                    }
                    if(prefixRemoved === "BlueStar" ){


                        if(afterSlash === "NaviMumbai"){


                            if(allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)){

                                res.render(`${templateKey}${v1}${v2}${v3}`, {
                                    BrandName1: "Blue Star",
                                    BrandName2: "BlueStar",
                                    BrandContent: brandContent.content,
                                    NumValue: NumValue?.number,
                                    CityName1: "Navi Mumbai",   
                                    CityName2: "NaviMumbai"
                                })
                                
                            }else{

                                return res.render("Repair-Service-Center", {
                                    NumValue: 9784467344
                                })
                            }
                            
    
                        }

                        if(allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)){
                            res.render(`${templateKey}${v1}${v2}${v3}`, {
                                BrandName1: "Blue Star",
                                BrandName2: "BlueStar",
                                BrandContent: brandContent.content,
                                NumValue: NumValue?.number,
                                CityName1: afterSlash,
                                CityName2: afterSlash
                            }) 
                        }else{

                            return res.render("Repair-Service-Center", {
                                NumValue: 9784467344
                            })
                        }
                        

                    }

                    if(prefixRemoved === "WhiteWestinghouse" ){


                        if(afterSlash === "NaviMumbai"){


                            if(allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)){

                                res.render(`${templateKey}${v1}${v2}${v3}`, {
                                    BrandName1: "White Westinghouse",
                                    BrandName2: "WhiteWestinghouse",
                                    BrandContent: brandContent.content,
                                    NumValue: NumValue?.number,
                                    CityName1: "Navi Mumbai",   
                                    CityName2: "NaviMumbai"
                                })
                                
                            }else{

                                return res.render("Repair-Service-Center", {
                                    NumValue: 9784467344
                                })
                            }
                            
    
                        }

                        if(allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)){
                            res.render(`${templateKey}${v1}${v2}${v3}`, {
                                BrandName1: "White Westinghouse",
                                BrandName2: "WhiteWestinghouse",
                                BrandContent: brandContent.content,
                                NumValue: NumValue?.number,
                                CityName1: afterSlash,
                                CityName2: afterSlash
                            }) 
                        }else{

                            return res.render("Repair-Service-Center", {
                                NumValue: 9784467344
                            })
                        }
                        

                    }

                    if(afterSlash === "NaviMumbai"){

                        if(allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)){
                            res.render(`${templateKey}${v1}${v2}${v3}`, {
                                BrandName1: spacedPrefix,
                                BrandName2: hyphenatedPrefix,
                                BrandContent: brandContent.content,
                                NumValue: NumValue?.number,
                                CityName1: "Navi Mumbai",   
                                CityName2: "NaviMumbai"
                            }) 
                        }else{

                            return res.render("Repair-Service-Center", {
                                NumValue: 9784467344
                            })
                        }
                        

                    }


                    if(allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)){

                        res.render(`${templateKey}${v1}${v2}${v3}`, {
                            BrandName1: spacedPrefix,
                            BrandName2: hyphenatedPrefix,
                            BrandContent: brandContent.content,
                            NumValue: NumValue?.number,
                            CityName1: afterSlash,
                            CityName2: afterSlash
                        })

                    }else{

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

                console.log(brandContent);
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


                    if(allowedTemplates.includes(`${templateKey}${v1}${v2}${v3}`)){

                        res.render(`${templateKey}${v1}${v2}${v3}`, {
                            NumValue: NumValue?.number,
                            CityName1: afterSlashCity,
                            CityName2: afterSlashCity,
                            BrandName1: prefixRemoved === "OGeneral" ? "O General": spacedPrefix ,
                            BrandName2: prefixRemoved === "OGeneral" ? "OGeneral" : prefixRemoved ,
                            BrandContent: brandContent.content,
                            AreaName: `${afterSlashAreaName}`,
    
    
                        });

                    }else{

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
                console.log(brandContent);

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


                    if(allowedTemplates.includes(`${templateKey}${v1}${v2}2`)){

                        res.render(`${templateKey}${v1}${v2}2`, {
                            NumValue: NumValue?.number,
                            CityName1: afterSlashCity,
                            CityName2: afterSlashCity,
                            BrandName1: prefixRemoved === "OGeneral" ? "O General": spacedPrefix ,
                            BrandName2: prefixRemoved === "OGeneral" ? "OGeneral" : prefixRemoved ,
                            BrandContent: brandContent.content,
                            AreaName1: `${afterSlashAreaName.replace(/-/g, ' ')}`,
                            AreaName2: `${afterSlashAreaName}`,
    
                        });

                    }else{

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
        if(dashCount >=3){
            return res.render("Repair-Service-Center",{
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