import Project from "../models/projects.js";
import Issue from "../models/issue.js";

export const createProject = async (req, res) => {
  console.log(req.body);
  try {

    Project.create({
      name: req.body.name,
      description: req.body.description,
      author: req.body.author,
    });
    res.redirect("back");
  } catch (error) {
    console.log(`Error in creating project: ${error}`);
    return res.redirect("back");
  }
};

export const projectDetails = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate({
      path: "issues",
    });

    console.log(project);
    
    if (project) {
      return res.render("projectDetails", {
        //?or use this
        //? project:details, project.author
        title: "Project Details",
        project,
        req:req
      });
    }
    return res.redirect("back");
  } catch (error) {
    console.log(`Error in getting project details: ${error}`);
    return res.redirect("back");
  }
};

export const createIssue = async (req, res) => {
  try {

    let project = await Project.findById(req.params.id);
    if(project){
      let issue = await Issue.create({
        title: req.body.title,
        description: req.body.description,
        labels: req.body.labels,
        author: req.body.author,
      });
      // todo added to the issues array of the project object using the push() method
      project.issues.push(issue);
      if (!(typeof req.body.labels === 'string')) {
        for (let label of req.body.labels) {
          let isPresent = project.labels.find((obj) => obj == label);
          if (!isPresent) {
            project.labels.push(label);
          }
        }
      } else {
        let isPresent = project.labels.find((obj) => obj == req.body.labels);
        if (!isPresent) {
          project.labels.push(req.body.labels);
        }
      }
      await project.save();
      return res.redirect("back");

    }else{
      return res.redirect('back');
    }
    
  } catch (error) {
    console.log(`Error in getting project issues: ${error}`);
    return res.redirect("back");
  }
};

