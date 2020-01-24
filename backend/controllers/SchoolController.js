const ResponseService = require('../services/ResponseService');
const SchoolService = require('../services/SchoolService');

const SchoolController = {
  getList: async (req, res) => {
    try {
      const response = await SchoolService.getList(req.body);
      
      ResponseService.success(res, response);
    } catch (error) {
      ResponseService.error(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const response = await SchoolService.create(req.body);

      ResponseService.success(res, response);
    } catch (error) {
      ResponseService.error(res, error);
    }
  }
};

module.exports = SchoolController;
