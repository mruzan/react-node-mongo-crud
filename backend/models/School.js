const mongoose = require('mongoose');
const {Schema} = mongoose;

const schoolSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  street: {
    type: String,
    default: null,
  },
  suburb: {
    type: String,
    default: null,
  },
  postcode: {
    type: String,
    default: null,
  },
  state: {
    type: String,
    default: null,
  },
  studentCount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'removed'],
    default: 'active',
  },
}, {timestamps: true, collation: {locale: 'en_US', strength: 1}});

schoolSchema.statics = {
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    REMOVED: 'removed',
  },

  ...schoolSchema.statics,
};

module.exports = mongoose.model('School', schoolSchema);