const express = require('express');
const localAuth = require('../middleware/local-authenticate');

const router = express.Router();
router.use(express.static('public'));
router.use(require('connect-flash')());

const Post = require('../models/post');

router.get('/', (req, res) => {
	Post.fetchAll({withRelated: ['user']})
		.then(posts => {
			res.status(200).json({posts})
		}).catch(e => console.error(e));
});

router.post('/', localAuth, (req, res) => {
	const {title, body} = req.body;

	let id;

	if(res.locals.user) {
		id = res.locals.user.attributes.id;
	} else {
		id = null;
	}

	console.log("In the post action, the id is : " + id);

	Post.forge({title, body, user_id: id}).save()
		.then(post => {
			res.status(200).json({data: post})
		}).catch(e => {
			res.json({msg: req.flash('error')})
		});
});

router.get('/:id', (req, res) => {
	Post.forge({id: req.params.id}).fetch({withRelated: ['user']})
		.then(post => res.status(200).json({success: post}))
		.catch(e => console.error(e));
})

module.exports = router;