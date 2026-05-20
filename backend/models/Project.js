const { Schema, model } = require('mongoose');

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    technologies: { type: [String], default: [] },
    image: { type: String, default: null },
    link: { type: String, default: null },
    github: { type: String, default: null },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = model('Project', projectSchema);
