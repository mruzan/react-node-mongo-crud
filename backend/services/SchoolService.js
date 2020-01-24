const baseJoi = require('joi');
const extension = require('joi-date-extensions');

const Joi = baseJoi.extend(extension);

const School = require('../models/School');
const { createValidateSchema } = require('../schemas/SchoolSchema');

const SchoolService = {
  getList: async (data) => {
    const { filters,  } = data;
    let {
      limit, offset, search,
    } = data;

    limit = parseInt(limit, 10) || 10;
    offset = parseInt(offset, 10) || 0;

    let query = { status: { $ne: School.STATUS.REMOVED } };


    if (filters) {
      if (filters.status && filters.status.length > 0) {
        query.status = { $in: filters.status };
      }
      if (filters.school && filters.school.length > 0) {
        query.name = { $in: filters.school };
      }
    }

    if (search && search !== '') {
      const queryString = new RegExp(search
        .trim()
        .toLowerCase()
        .replace(/([.*+?=^!:${}()|[\]\/\\])/g, '\\$1'), 'i');
      const searchQuery = {
        $or: [
          {name: {$regex: queryString}},
          {street: {$regex: queryString}},
          {suburb: {$regex: queryString}},
          {postcode: {$regex: queryString}},
          {state: {$regex: queryString}},
        ],
      };
      query = Object.assign({}, query,searchQuery);
    }

    try{
      const schools = await School.find(query)
        .skip(offset)
        .limit(limit)
        .exec();
      const total = await School.countDocuments({ status: { $ne: School.STATUS.REMOVED } });
      return { schools, total };
    }catch (e) {
      return e.message;
    }
  },

  create: async (data) => {
    const validation = Joi.validate(data, createValidateSchema);
    if (validation.error) {
      let errorMessage = validation.error.details.shift();
      errorMessage = errorMessage.message;
      throw new Error(errorMessage);
    }

    const school = await School.create(data);
    return school;
  }

};
module.exports = SchoolService;
