import express, { Application, Request, Response } from 'express';
import http from 'http'
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
import assignmentAndTestRoute from './routes/allot-test-route'
import adminAuthRouter from './routes/admin-auth-route'
import testProgressRoute from './routes/test-progress-route'
import testDatarouter from './routes/test-data-route'
import reportRouter from './routes/report-route'
import mailRouter from './routes/email-route'
import collegeRouter from './routes/college-route'
import { Server } from 'socket.io';
import prismadb from './utils/prismadb';

dotenv.config()

const app:Application = express();
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin : '*'
  }
});

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

app.use('/auth', authRouter)
app.use('/send-mail',mailRouter)
app.use('/admin/auth', adminAuthRouter)
app.use('/learner/:learnerId/subTopic/:subTopicId/question', questionRouter)
app.use('/learner/test-progress',testProgressRoute )
app.use('/learner', learnerRouter)
app.use('/learner/:learnerId/major',majorRouter)
app.use('/learner/:learnerId/report',reportRouter)
app.use('/learner/:learnerId/college',collegeRouter)
app.use('/learner/:learnerId/major/:majorId/specialization',specializationRouter)
app.use('/learner/:learnerId/specialization/:specializationId/category',categoryRouter)
app.use('/learner/:learnerId/category/:categoryId/topic', topicRouter)
app.use('/learner/:learnerId/topic/:topicId/subTopic',subTopicRouter)
app.use('/learner/:learnerId/topic', assignmentAndTestRoute)
app.use('/learner/:learnerId/testData', testDatarouter)


/* 
    ROUTES FOR PRODUCT APP
*/

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});


/*

REAL TIME TEST USING WEBSOCKET

*/

// io.on("connection", async (socket) => {
//   try {
//     const params = socket.handshake.query as { userId: string; subTopicId: string };
    
//     const testProgress = await prismadb.testProgress.findFirst({
//       where: {
//         subTopicId: params.subTopicId,
//         userId: params.userId,
//       },
//     });

//     const testData = await prismadb.testData.findFirst({
//       where: {
//         testProgressId: testProgress?.id,
//       },
//     });

//     socket.emit("testProgressData", testData);
//   } catch (error) {
//     console.error("Error fetching data from the database:", error);
//     socket.emit("error", { message: "Failed to fetch test progress data." });
//   }

//   socket.on("onSelect", async (data) => {
//     try {
//       await prismadb.testData.update({
//         where: {
//           id : data.id as string
//         },
//         data: {
//           data: {
//             push : {questionId:data.questionId,option:data.option,isCorrect:data.correct}
//           }
//         }
//       })
//       // Handle selection data here, potentially updating the database
//       socket.emit("testProgressData",data)
//     } catch (error) {
//       console.error("Error processing onSelect:", error);
//     }
//   });
  
// })

// STARTING POINT IN SERVER
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
