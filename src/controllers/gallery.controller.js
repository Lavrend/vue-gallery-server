import mongoose from 'mongoose';

import asyncRoute from '@/utils/asyncroutes';
import appConfig from '@/config/app';

// Gallery model
import '@/models/gallery.model';

const ObjectId = mongoose.Types.ObjectId;
const Model = mongoose.model('Gallery');

export const getGalleryList = asyncRoute((req, res) => {
  const params = req.query;
  const page = parseInt(params.page) || appConfig.defaultPage;
  const pageSize = parseInt(params.pageSize) || appConfig.defaultPageSize;
  const skip = pageSize * (page - 1);

  Model.aggregate([
    {
      '$facet': {
        metadata: [
          { $count: 'total', },
          { $addFields: { page } }
        ],

        items: [
          {
            $sort: {
              createdAt: 1,
            },
          },

          {
            $skip: skip,
          },

          {
            $limit: pageSize,
          },
        ],
      },
    },

    {
      '$unwind': '$metadata',
    },

    {
      '$project': {
        total: '$metadata.total',
        page: '$metadata.page',
        items: '$items',
      },
    },
  ])
  .exec((err, result) => {
    if (err) {
      res.send(err);
    }

    res.json(result[0]);
  });
});

export const getItemById = asyncRoute((req, res) => {
  Model.findOne({ _id: ObjectId(req.params.id) })
    .exec((err, result) => {
      if (err) {
        res.json(err);
      }

      res.json(result);
    });
});

export const createItem = asyncRoute((req, res) => {
  const Item = new Model(req.body);

  Item.save((err, result) => {
    if (err) {
      res.send(err);
    }

    res.json(result);
  });
});

export const updateItem = asyncRoute((req, res) => {
  Model.findOneAndUpdate({ _id: ObjectId(req.params.id) }, req.body, { new: true, runValidators: true })
    .exec((err, result) => {
      if (err) {
        res.send(err);
      }

      res.json(result);
    });
});

export const removeItem = asyncRoute((req, res) => {
  Model.findOneAndDelete({ _id: ObjectId(req.params.id) })
    .exec((err, result) => {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Task successfully deleted' });
    });
});
