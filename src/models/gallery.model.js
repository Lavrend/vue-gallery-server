import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schemaOptions = {
  collection: 'gallery',
  timestamps: true,
  versionKey: false,
};

const GallerySchema = {
  type: {
    type: String,
    enum: ['normal', 'double'],
    default: 'normal',
  },

  title: {
    type: String,
    required: 'Please enter the title of the image',
    trim: true,
  },

  description: {
    type: String,
    required: 'Please enter the description of the image',
    trim: true,
  },

  image: {
    type: Number,
    default: 0,
  },
};

export default mongoose.model('Gallery', new Schema(GallerySchema, schemaOptions));
