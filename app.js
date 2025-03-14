require('dotenv').config();

const express = require('express');
const { connectMongoDB } = require('./connection');
const app = express();
const PORT = process.env.PORT || 3004;
const path = require('path');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const Blog = require('./model/blog');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middleware/authentication');



//MiddleWares Below this
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.get('/', async (req, res)=>{ 
    const allBlogs = await Blog.find({});
    return res.render('home', {
        user: req.user,
        blogs: allBlogs,
    });
 });

app.use('/user', userRoute);
app.use('/blog', blogRoute);

//DataBase Connection.
connectMongoDB(process.env.MONGO_URL)
.then(()=> console.log('Database has been Connected...'))
.catch((err)=> console.log('Unable to connect with database!!!'));

//Server Connection.
app.listen(PORT, ()=>console.log(`Server has been Started at port ${PORT}`));