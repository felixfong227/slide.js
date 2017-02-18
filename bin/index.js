const fs = require("fs")
    ,path = require("path")
    packageJSON = JSON.parse(  fs.readFileSync( path.join(`${__dirname}/../package.json`)  )  )
    ,express = require("express")
    ,app = express()
    ,ejs = require("ejs")
    ,bodyParser = require('body-parser');
;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

let slidePages = [];
let currentPage = 0;
const slideConfig = packageJSON.slideConfig;
app.set("view engine", "ejs");
app.set("views", path.join(`${__dirname}/../${slideConfig.pageRoot}`));
app.use('/static', express.static(path.join(__dirname, '/../static')));

// User request custom static file, like custom CSS or JS files
app.use('/src', express.static(path.join(__dirname, `/../${slideConfig.pageRoot}/`)));

const slides = slideConfig.slides;


// Put all the slides path to the slidePages array
packageJSON.slideConfig.slides.map(name => {
    const pagePath = path.join(`${__dirname}/../${slideConfig.pageRoot}/${name}.ejs`);
    slidePages.push(pagePath)
});
// Start up the web page
app.get("/", (req,res) => {

    // Render the init index.ejs page
    res.render(`${__dirname}/../init/index`, {
        title: slideConfig.name
        ,appName: packageJSON.name
        ,port: slideConfig.port
    });

});

app.get("/api", (req,res) => {

    function renderPage(res,pagePath) {
        res.render(pagePath, {
           title: slideConfig.name
            ,currentPage: currentPage
            ,appName: packageJSON.name
        });
    }

    const query = req.query;
    const load = query.load;

    if(load == "forward"){

        if(currentPage < slidePages.length){
            const pagePath = path.join(slidePages[currentPage]);
            currentPage++;
            renderPage(res, pagePath);
        }

    }else if(load == 'backward'){

        if(currentPage <= slidePages.length && currentPage > 0){
            currentPage--;
            const pagePath = path.join(slidePages[currentPage]);
            renderPage(res, pagePath);
        }


    }else if(load == "init"){
        res.render(slidePages[0])
    }

});

app.listen(slideConfig.port, () => {

    console.log(`${packageJSON.name} is serving web server at port ${slideConfig.port}`);
    // Start the browser
    require("open")(`http://localhost:${slideConfig.port}`);
    // Sorry, maybe I'm just really too lazy to write the OS check script :P

});