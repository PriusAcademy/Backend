import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth-route'
import learnerRouter from './routes/learner-route'
import majorRouter from './routes/major-route'
import specializationRouter from './routes/specialization-route'
import categoryRouter from './routes/category-route'
import topicRouter from './routes/topic-route'
import subTopicRouter from './routes/sub-topic-route'
import questionRouter from './routes/question-route'
import allotTest from './routes/allot-test-route'
import adminAuthRouter from './routes/admin-auth-route'

dotenv.config()

const app:Application = express();
const PORT = process.env.PORT || 8000;

 /*
    MIDDLEWARES FOR ROUTES
 */

app.use(express.json()); 
const corsOptions = {
  origin : '*',
  methods : ['GET','POST','PATCH','DELETE','OPTIONS','PUT'],
  allowedHeaders : ['Content-Type','Authorization'],
  credentials : true
}
app.use(cors(corsOptions))
app.options('*',cors(corsOptions))

 /*
    ROUTES FOR ADMIN APP
 */

app.use('/auth',authRouter)
app.use('/admin/auth',adminAuthRouter)
app.use('/learner',learnerRouter)
app.use('/learner/:learnerId/major',majorRouter)
app.use('/learner/:learnerId/major/:majorId/specialization',specializationRouter)
app.use('/learner/:learnerId/specialization/:specializationId/category',categoryRouter)
app.use('/learner/:learnerId/category/:categoryId/topic', topicRouter)
app.use('/learner/:learnerId/topic/:topicId/subTopic',subTopicRouter)
app.use('/learner/:learnerId/subTopic/:subTopicId/question',questionRouter)
app.use('/learner/:learnerId/subTopic',allotTest)


/* 
    ROUTES FOR PRODUCT APP
*/

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});


// STARTING POINT IN SERVER
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
