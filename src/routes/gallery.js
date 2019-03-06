import asyncRoute from '@/utils/asyncroutes';
import appConfig from '@/config/app';
import errorCodes from '@/config/errorCodes';

import { ObjectId } from 'mongodb';
import { Router } from 'express';

const app = Router();

app.get('/',
  asyncRoute(async (req, res) => {
    const params = req.query;
    const page = parseInt(params.page) || appConfig.defaultPage;
    const pageSize = parseInt(params.pageSize) || appConfig.defaultPageSize;
    const skip = pageSize * (page - 1);

    const result = await req.db.collection("tiles").aggregate([
      {
        "$facet": {
          metadata: [
            { $count: "total", },
            { $addFields: { page } }
          ],

          items: [
            { $skip: skip },
            { $limit: pageSize }
          ]
        }
      },

      { "$unwind": "$metadata" },

      {
        "$project": {
          total: "$metadata.total",
          page: "$metadata.page",
          items: "$items"
        }
      }
    ]).toArray();

    return res.send({
      success: true,
      data: result,
    });
  })
);

app.get('/:id',
  asyncRoute(async (req, res) => {
    const id = req.params.id;

    const result = await req.db.collection('tiles')
      .findOne(ObjectId(id));

    if(!result) {
      return res
        .status(errorCodes.ROUTE_NOT_FOUND.status)
        .json({
          success: false,
          error: errorCodes.ROUTE_NOT_FOUND,
        });
    }

    return res.json({
      success: true,
      data: result,
    });
  })
);

export default app;
