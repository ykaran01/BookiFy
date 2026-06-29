import express from 'express' 
import cookieParser from 'cookie-parser';
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors'
const app = express()
 

app.use(express.urlencoded({ extended: true }))  
app.use(cors({
    origin: "https://booki-fy-ivory.vercel.app",
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization'] 
}))
app.use(clerkMiddleware());
app.use(cookieParser())
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));



import productRouter from './routers/product.router.js';
import cartRouter from './routers/cart.routes.js';
import orderRouter from './routers/order.route.js';
import reviewRouter from './routers/review.route.js';
import categoryRouter from './routers/Category.route.js'

app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/review', reviewRouter)
app.use('/api/category',categoryRouter)

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

export default app
