const seeder = require('mongoose-seed');
const config = require('config');

const School = require('../models/School');

seeder.connect(config.DATABASE_URL, () => {
  seeder.clearModels(['School'], async () => {
    const data = [
      {
        model: 'School',
        documents: [
          {
            "name": "test name 001",
            "studentCount": 1000,
            "street": "test street name 001",
            "suburb": "test suburb 001",
            "postcode": "testP 001",
            "state": "test state 001",
          },
          {
            "name": "test name 002",
            "studentCount": 2000,
            "street": "test street name 002",
            "suburb": "test suburb 002",
            "postcode": "testP 002",
            "state": "test state 002",
          },
          {
            "name": "test name 003",
            "studentCount": 3000,
            "street": "test street name 003",
            "suburb": "test suburb 003",
            "postcode": "testP 002",
            "state": "test state 003",
          },
        ],
      },
    ];
    seeder.populateModels(data, () => {
      seeder.disconnect();
    });
  });
});
