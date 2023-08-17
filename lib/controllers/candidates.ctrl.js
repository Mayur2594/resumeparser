const mongoose = require('mongoose');
const ResumeParser = require('../config/resume-parser-extended');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const conStr = 'mongodb://localhost:27017/resumeparse';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(conStr, options);

module.exports = {
  uploadCandidateResumes: function(req,res)
  {
    console.log(req.files[0])
      // for (var i = 0; i < req.files.length; i++) {
        var resume_path = req.files[0].destination + '/' + req.files[0].filename;
        var index = 0;
        var resume = new ResumeParser(resume_path);
        resume.extractText()
        .then(data => {
          index = index + 1
          // var prompt = "Summarize the text below into a JSON with exactly the following structure {basic_info: {first_name, last_name, full_name, email, phone_number, location, portfolio_website_url, linkedin_url, github_main_page_url, university, education_level (BS, MS, or PhD), graduation_year, graduation_month, majors, GPA}, work_experience: [{job_title, company, location, duration, job_summary}], project_experience:[{project_name, project_description}]}:"+data;
          var prompt = "Summarize the text below into a JSON with exactly the following structure {first_name, last_name, full_name, Email, PhoneNo, Address, Aadhaar, Pan, Date Of Birth in format \"DD/MM/YYYY\", City, State, Pincode, Zipcode, Skill Set, Additional Info, PanCard Number, Salary, Gender, [CUSTOM_FIELDS]}. strictly keep Additional Info and Address should be merge in one single paragraph, Skill Set strictly in comma sperated string [CUSTOM_DESCRIPTION]:"+data;

          var output_path = './output/'+index+req.files[0].originalname.lastIndexOf('.')+'.txt';
          fs.writeFileSync(output_path, prompt);
          //  console.log(prompt)
          res.send({status:200, data: prompt, type: 'success'})
          
        }).catch(err=>{
          res.send({status:500, data: err, type: 'error'})
          // console.log(err);
        });
      // }
  }
}