const fs = require("fs")
    ,path = require("path")
    packageJSON = JSON.parse(  fs.readFileSync( path.join(`${__dirname}/../package.json`)  )  )
    ,express = require("express")
    ,app = express()
    ,ejs = require("ejs")
;

let slidePages = [];
const slideConfig = packageJSON.slideConfig;

app.set("view engine", "ejs");
app.set("views", path.join(`${__dirname}/../${slideConfig.pageRoot}`));
// Put all the slides path to the slidePages array
packageJSON.slideConfig.slides.map(name => {
    const pagePath = path.join(`${__dirname}/../${slideConfig.pageRoot}/${name}.html`);
    slidePages.push(pagePath)
});
// Start up the web page
app.get("/", (req,res) => {

    // Render the init index.ejs page
    res.render(`${__dirname}/../init/index`, {
        title: slideConfig.name
        ,appName: packageJSON.name
    });

});

app.post("/api", (req,res) => {



});

app.listen(slideConfig.port, () => {

    console.log(`${packageJSON.name} is serving web server at port ${slideConfig.port}`)

});