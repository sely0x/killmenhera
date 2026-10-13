import Router from "koa-router";
import answers from './answers/index.js'

const api = new Router();

api.use('/answers', answers.routes())

export default api;