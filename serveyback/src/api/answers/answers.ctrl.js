import Joi from "joi"
import Answer from "../../models/answer.js"
import mongoose from "mongoose"

const { ObjectId } = mongoose.Types


/* export const checkObjectId = (ctx, next) => {
    const { id } = ctx.params
    if(!ObjectId.isValid(id)){
        ctx.status(400)
        return
    }
    return next()
} */


export const write = async ctx => {
    /* const schema = Joi.object().keys({
        body: Joi.string().required()
    })

    const result = schema.validate(ctx.request.body)
    if(result.error){
        ctx.status = 400
        ctx.body = result.error
        return
    }*/
    const body = ctx.request.body
    const answer = new Answer({
        body
    })
    try {
        await answer.save()
        ctx.body = answer;
    } catch(e) {
        ctx.throw(500, e)
    }
}


/* 포스트 조회
GET /api/answers
*/
export const list = async ctx => {
    try {
        const answers = await Answer.find().exec()
        ctx.body = answers
    } catch(e) {
        ctx.throw(500, e)
    }
}


/* 특정 포스트 조회
GET /api/answers/:id
*/
export const read = async ctx => {
    const { id } = ctx.params
    try {
        const answer = await Answer.findById(id).exec()
        if(!answer){
            ctx.status = 404
            return
        }
        ctx.body = answer
    } catch(e) {
        ctx.throw(500, e);
    }
}


/* 특정 포스트 제거
DELETE /api/answers/:id
*/
export const remove = async ctx => {
    const { id } = ctx.params
    try {
        await Answer.findByIdAndDelete(id).exec()
        ctx.status = 204;
    } catch(e) {
        ctx.throw(500, e);
    }
}



/* 특정 포스트 수정(부분)
PATCH /api/answers/:id
*/
export const update = async ctx => {/* 
    const schema = Joi.object().keys({
        body: Joi.string()
    })

    const result = schema.validate(ctx.request.body)
    if(result.error){
        ctx.status = 400
        ctx.body = result.error
        return
    } */
    const { id } = ctx.params
    try {
        const answer = await Answer.findByIdAndUpdate(id, ctx.request.body, {
            new: true
        }).exec();
        if(!answer){
            ctx.status = 404
            return
        }
        ctx.body = answer
    } catch(e) {
        ctx.throw(500, e);
    }
}

/* 통계 */
export const stats = async ctx => {
    console.log('STATS 진입 성공');

    try {
        const result = await Answer.aggregate([
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                    frendly: { $avg: '$body.frendly' },
                    like: { $avg: '$body.like' },
                    appearance: { $avg: '$body.appearance' },
                    social: { $avg: '$body.social' },
                    jiral: { $avg: '$body.jiral' }
                }
            },
            {
                $project: { _id: 0 }
            }
        ]);

        console.log('통계 계산 결과:', result);

        ctx.body = result[0] ?? { count: 0 };

    } catch (e) {
        console.error('STATS 실제 오류:', e);
        ctx.status = 500;
        ctx.body = {
            error: e.message
        };
    }
};