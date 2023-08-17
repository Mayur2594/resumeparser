// NODE LIBRARIES
const fs = require('fs');
const path = require('path')
const multer = require('multer');

// SERVER CONTROLLERS
const candidates = require('./controllers/candidates.ctrl');

// FILES UPLOAD SETTING
var dir = './app/uploads/resumes';
let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, dir);
	},
	filename: (req, file, cb) => {
		cb(null,  Date.now() + '.' + path.extname(file.originalname));
	}
});


let upload_resumes = multer({
	storage: storage
});

// MODULES APIS 
module.exports = {

	configure: function (app) {
		app.post('/api/uploadCandidateResumes', upload_resumes.array('files'), function (req, res) {
			candidates.uploadCandidateResumes(req, res);
		});
    }
};