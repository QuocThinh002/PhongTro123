import authRouter from './auth'
import insertRouter from './insert'
import categoryRouter from './category'
import postRouter from './post'
import imageRouter from './image'
import attributeRouter from './attribute'
import userRouer from './user'
import priceRangeRouter from './priceRange'
import acreageRangeRouter from './acreageRange'


const initRoutes = (app) => {
    app.use('/api/v1/insert', insertRouter)
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/category', categoryRouter)
    app.use('/api/v1/post', postRouter)
    app.use('/api/v1/image', imageRouter)
    app.use('/api/v1/attribute', attributeRouter)
    app.use('/api/v1/user', userRouer)
    app.use('/api/v1/pricerange', priceRangeRouter)
    app.use('/api/v1/acreagerange', acreageRangeRouter)

    app.use('/', (req, res) => {
        res.send('server on...!!!')
    })
}

export default initRoutes