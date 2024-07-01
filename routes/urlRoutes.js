import { Router } from "express";
import { UrlController } from "../controllers/urlController.js";

export const urlRoutes = Router()

urlRoutes.get('/', UrlController.getPage)
urlRoutes.post('/short', UrlController.saveUrl)
urlRoutes.get('/:link', UrlController.redirect)
urlRoutes.get('/preview/:link', UrlController.preview)
urlRoutes.get('*', UrlController.error)