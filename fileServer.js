// File Server with Node JS

//required modules
var http = require('http');
var fs = require('fs');
//help with file paths
var path = require('path');


//http create server function
//takes a callback invoked with every:
//web request (req)
//sever response (res)

http.createServer(function(req,res){
    // log which method was requested and which url was requested
    console.log(`${req.method} request for ${req.url}`);
    //if requested url is equal to / then this is a request for the homepage
    if(req.url === "/"){
      //serve the public folder
      //use the file system module to read the file
      fs.readFile("./public/therouxBot.html","UTF-8",function(err,html){
        //callback function
        //respond with the header 200 and specify content type
        res.writeHead(200,{"Content-Type":"text/html"});
        //respond with the html
        res.end(html);
      });
    }
    //additionally serve any files linked in the html markup
    //if the requested url contains a regualar expression that matches css
    else if (req.url.match(/.css$/)){
        //create a path to the css
        //path.join (current directory,public directors,the url)
        var cssPath = path.join(__dirname,"public",req.url);
        //read stream
        var fileStream = fs.createReadStream(cssPath,"UTF-8");
        //response header
        res.writeHead(200,{"Content-Type":"text/css"});
        //pipe readsteam to write stream
        //will stream the contents of the file to the response
        fileStream.pipe(res);
    }
    //deal with the image file
    else if (req.url.match(/.jpg$/)){
      //create image path
      var imgPath = path.join(__dirname,"public",req.url);
      //read stream
      var imgStream = fs.createReadStream(imgPath);
      //response header
      res.writeHead(200,{"Content-Type":"image/jpeg"});
      //pipe read stream to write steam
      imgStream.pipe(res);
    }
    //deal with the js files
    else if (req.url.match(/.js$/)){
        //create js path
        var scriptPath = path.join(__dirname,"public",req.url);
        //read stream
        var scriptStream = fs.createReadStream(scriptPath);
        //response header
        res.writeHead(200,{"Content-Type":"text/javascript"});
        //pipe read steam to write stream
        scriptStream.pipe(res);
    }
    //deal with the json files
    else if (req.url.match(/.json$/)){
        //create js path
        var jsonPath = path.join(__dirname,"public",req.url);
        //read stream
        var jsonStream = fs.createReadStream(jsonPath);
        //response header
        res.writeHead(200,{"Content-Type":"application/json"});
        //pipe read steam to write stream
        jsonStream.pipe(res);
    }
    // if not requesting homepage, server responds with 404 error
    else {
        //sends a response header to the request
        //params (code,status message)
        res.writeHead(404,{"Content-Type":"text/plain"});
        //if you don't know what you're looking for you'll get a
        // 404 header response and the followin string:
        res.end("404 File Not Found");
    }


  //listen to any request coming in on port 3000
}).listen(3000);

console.log("File stream is running on port: 3000");
