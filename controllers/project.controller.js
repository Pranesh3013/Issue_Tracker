const ProjectModel = require('../models/project.model');
const IssueModel = require('../models/issue.model');
const {findById} = require('../models/issue.model');
const { type } = require('os');

// create projects for user
module.exports.create = async (req, res) =>{
    try{
        ProjectModel.create({
            name: req.body.name,
            description: req.body.description,
            author: req.body.author,
        });
        res.redirect('back')
    } catch (err){
        console.log(err);
        return res.redirect('back');
    }
};

// find project and display it
module.exports.project = async (req, res) => {
    try{
        let project = await ProjectModel.findById(req.params.id).populate({
            path: 'issues',
        });
        if(project){
            return res.render('project_page', {
                title: 'Project Page',
                project,
            });
        }
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
};

//create issue
module.exports.createIssue = async(req, res) => {
    try{
        let project = await ProjectModel.findById(req.params.id);
        if(project){
            let issue = await IssueModel.create({
                title: req.body.title,
                description: req.body.description,
                labels: req.body.labels,
                author: req.body.author,
            });
            project.issues.push(issue);

            if(!(typeof req.body.labels === 'string')) {
                for(let label of req.body.labels){
                    let isPresent = project.labels.find((obj) => obj == label);
                    if(!isPresent){
                        project.labels.push(req.body.label)
                    }
                }
            }else{
                let isPresent = project.labels.find((obj) => obj == req.body.labels);
                if(!isPresent) {
                    project.labels.push(req.body.labels);
                }
            }
            await project.save();
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
};