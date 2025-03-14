const { Router } = require('express');
const User = require('../model/user')
const router = Router();

router.get('/signin', (req, res)=>{
    return res.render('signin');
});

router.get('/signup', (req, res)=>{
    return res.render('signup');
});

router.post('/signup', async(req, res)=>{
    const { fullName, gender, password, email } = req.body;
    await User.create({
        fullName,
        gender,
        email,
        password,
    });
    return res.redirect('/user/signin');
});
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await User.matchPasswordAndGeneratToken(email, password);
        return res.cookie('token',token).redirect("/")
        }
 catch (error) {
        return res.status(401).render('signin', { error: 'Incorrect Email or Password' });
    }
});

router.get('/logout', (req,res)=>{
    return res.clearCookie('token').redirect('/');
})

module.exports = router;