import Router from 'koa-router'
import * as answersCtrl from './answers.ctrl.js'

const answers = new Router()

answers.get('/', answersCtrl.list)
answers.post('/', answersCtrl.write)
answers.get('/stats', answersCtrl.stats);
answers.get('/:id', /*answersCtrl.checkObjectId,*/ answersCtrl.read)
answers.delete('/:id', /*answersCtrl.checkObjectId,*/ answersCtrl.remove)
answers.patch('/:id', /*answersCtrl.checkObjectId,*/ answersCtrl.update)


export default answers;