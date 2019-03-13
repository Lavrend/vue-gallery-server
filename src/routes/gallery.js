import { Router } from 'express';
import * as galleryController from '@/controllers/gallery.controller';

const router = Router();

router.route('/')
  .get(galleryController.getGalleryList)
  .post(galleryController.createItem);

router.route('/:id')
  .get(galleryController.getItemById)
  .put(galleryController.updateItem)
  .delete(galleryController.removeItem);

export default router;
