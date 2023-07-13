import projectModel from '../schema/project-schema.js';

export const addProject = async (request, response) => {
    try {
      const project = await projectModel.create({ ...request.body });
      response.status(201).json(project);
    } catch (error) {
      response.status(409).json({ message: error.message });
    }
}

export const getProjects = async (request, response) => {
    try {
      const projects = await projectModel.find({});
      response.status(200).json(projects)
    } catch (error) {
      response.status(404).json({ message: error.message });
    }
}

export const getProject = async (request, response) => {
  try {
    const project = await projectModel.findById(request.params.id);
    response.status(200).json(project);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const editProject = async (request, response) => {
  let project = request.body;
  const editProject = new projectModel(project);
  try {
    await projectModel.updateOne({ _id: request.params.id }, editProject);
    response.status(200).json(editProject);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};