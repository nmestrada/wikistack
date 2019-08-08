const express = require('express');
const router = express.Router();
const { addPage } = require('../views');
const models = require("../models");


router.get('/',(req,res,next) => {
    res.send('got to GET /wiki/');
});

router.get('/add',(req,res,next) => {
    res.send(addPage());
});



router.post('/', async (req, res, next) => {
    const data = req.body;
    
    // STUDENT ASSIGNMENT:
    // add definitions for `title` and `content`
    
    const page = new models.Page({
      title: data.title,
      content: data.content,
      status: data.status
    });
    console.log(page);
    // make sure we only redirect *after* our save is complete!
    // note: `.save` returns a promise.
    try {
      await page.save();
      res.redirect('/');
    } catch (error) { next(error) }
  });

module.exports = router;