const express = require('express');
const morgan = require('morgan');
//JS functions
const layout = require('./views/layout');

//database
const models = require('./models');

//routers
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.get('/', (req,res,next)=> {
    const text = 'Hello World!';
    // res.send(layout(text));
    res.redirect('/wiki');
});

models.db.authenticate().
then(() => {
  console.log('connected to the database');
});
const init = async () => {
    try{
        await models.db.sync({force:true})
    }catch (err){
        console.log(err);
    }

    const PORT = 3000;
    app.listen(PORT, ()=>{
        console.log(`App listening in port ${PORT}`);
    });
};
init();
