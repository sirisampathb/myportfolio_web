require('dotenv').config();
const { connectDB } = require('../config/db');
const Project = require('../models/Project');

const normalize = (val) => {
  if (!val) return null;
  if (typeof val !== 'string') return val;
  const v = val.trim();
  if (!v) return null;
  const lower = v.toLowerCase();
  if (lower === '#' || lower === 'none' || lower === 'n/a' || lower === 'null') return null;
  return v;
};

async function run() {
  try {
    await connectDB();
    console.log('Connected to DB');

    const projects = await Project.find({});
    console.log(`Found ${projects.length} projects`);

    for (const p of projects) {
      const updates = {};
      const newLink = normalize(p.link);
      const newGithub = normalize(p.github);
      const newImage = normalize(p.image);
      if (p.link !== newLink) updates.link = newLink;
      if (p.github !== newGithub) updates.github = newGithub;
      if (p.image !== newImage) updates.image = newImage;
      if (Object.keys(updates).length > 0) {
        await Project.updateOne({ _id: p._id }, { $set: updates });
        console.log(`Updated ${p.title}:`, updates);
      }
    }

    console.log('Normalization complete');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
