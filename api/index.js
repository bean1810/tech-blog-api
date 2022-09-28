import express from 'express';
import bodyParser from 'body-parser';
import authorsRoutes from './server/routes/AuthorsRoutes';
import categoryRoutes from './server/routes/CategoryRoutes';
import articlesRoutes from './server/routes/ArticlesRoutes';
import usersRoutes from './server/routes/UsersRoutes'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;

app.use('/api/v1/authors', authorsRoutes);
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/articles', articlesRoutes);
app.use('/api/v1/users', usersRoutes)

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to this API.'
}));
app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});
export default app;