import express from 'express'
import connect from './db/connect.js'
import cors from 'cors'
import userRouter from './routes/user.js'
import dotenv from 'dotenv'
import productRouter from './routes/products.js'
import categoryRouter from './routes/category.js'
import path from 'path';
import { fileURLToPath } from 'url';
import orderRouter from './routes/order.js'

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

dotenv.config()
const port = process.env.PORT
const app = express()

connect()
app.use(cors())
app.use(express.json()) 

// Add this line to serve static files (uploaded images)
app.use('/uploads', express.static(path.join(dirname, 'uploads')));


app.use(userRouter)
app.use(productRouter)
app.use(categoryRouter)
app.use(orderRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})