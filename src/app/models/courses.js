const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const courseSchema = new Schema(
    {
        name: { type: String },
        description: { type: String },
        image: { type: String },
        level: { type: String },
        slug: { type: String, slug: "name", unique: true }
    },
    {
        timestamps: true,
    }
);

// Enable the mongoose-delete plugin with overrideMethods set to 'all'
courseSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

module.exports = mongoose.model("courses", courseSchema);
