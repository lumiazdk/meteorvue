Router.route("/upload", { where: "server" }).post(function() {
  console.log('req')

    let req = this.request;
    let res = this.response;
    res.writeHead(200, { "Content-Type": "text/html;  charset=utf-8" });
    let formidable = require("formidable");
    let path = require("path");
    let cloudinary = require("cloudinary").v2;
    cloudinary.config({
        cloud_name: 'lumiazdk',
        api_key: '368961618787419',
        api_secret: '1lzTXyKW8Fn8QVSmuYBNsHp7DvM',
        folders:'blog'
    });
    let form = formidable.IncomingForm();
    // 文件上传
    form.parse(req, function(err, fields, files) {
        if (err) {
            console.log(err);
        }
        cloudinary.uploader.upload(files.files.path,{folder: 'blog'}, function(error, result) {
          if (result) {
            let data = {
                code: 0,
                data: result,
                message: "上传成功"
            };
            res.end(JSON.stringify(data), "utf-8");
        } else {
            console.log(respInfo.statusCode);
            console.log(error);
        }
        });
        
    });
});

          