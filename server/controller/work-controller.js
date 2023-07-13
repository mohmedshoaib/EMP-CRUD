import workModel from '../schema/work-schema.js';

export const addWork = async (request, response) => {
    console.log("status1")
    try {
        const work = await workModel.create({ ...request.body });
        response.status(201).json(work);
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
}