var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'lumiazdk',
    api_key: '368961618787419',
    api_secret: '1lzTXyKW8Fn8QVSmuYBNsHp7DvM'
});
Meteor.methods({
    upload(file) {
        console.log('----')
        console.log(file)
        // console.log(cloudinary)
        cloudinary.uploader.upload(file, function(error, result) {console.log(result, error)});
    },
});