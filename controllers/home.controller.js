const ProjectModel = require('../models/project.model');

module.exports.home = async (req, res) => {
    try{
        let projects = await ProjectModel.find({}).sort('-createdAt');
        return res.render('home', {
            title: 'Issue/Bug Tracker | Home',
            projects,
        });
    } catch(err) {
        console.log('Error', err);
        return;
    }
};