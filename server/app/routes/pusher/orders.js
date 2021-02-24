var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
const History = require(process.cwd()+'/app/models/deliveryExecutive/history');
/* GET users listing. */

function findDeliveryPerson(users, oid) {
	// considering users sorted according to distance.
	// Apply sorting on users here.
	return users.find(user => !user.rejectList.includes(oid))

}
router.post('/', function (req, res, next) {

	const pusher = req.app.get('pusher');
	var users = req.app.get('users');
	console.log(users);

	// Change orderid later
	var delivery = findDeliveryPerson(users, req.body.orderid);
	console.log('selected dexec: ', delivery);

	// Delete delivery from users.
	//users.splice(users.indexOf(delivery, 1));
	console.log(req.body);
	pusher.trigger(delivery.channel, 'order-event', req.body);
	res.send('wait');
});
router.post('/accept', (req, res, next) => {

	var dId = req.body.dId;
	var users = req.app.get('users');

	// Trigger event to user-(specific) to notify order is accepted.
	//pusher.trigger('');

	console.log(users);
	res.send('On the way');
});
router.post('/reject', (req, res, next) => {
	const pusher = req.app.get('pusher');

	// Adding orderId in reject List.
	var dId = req.body.dId;
	var users = req.app.get('users');
	users.forEach(user => {
		if (user.channel == dId) {
			user.rejectList.push(req.body.orderInfo.orderId);

		}
	})

	var users = req.app.get('users');
	var delivery = findDeliveryPerson(users, req.body.orderInfo.orderId);
	console.log(users);
	console.log(delivery);
	console.log(req.body.orderInfo);
	pusher.trigger(delivery.channel, 'order-event', req.body.orderInfo);
	res.send('wait');
})
router.post('/delivered', (req, res, next) => {

	// Add delivery to users list.
	var dId = req.body.dId;
	var users = req.app.get('users');


	console.log('orderDelivered: ', req.body.orderInfo);

	History.create({
		deliveryUserID: req.body.dId,
		orderId: req.body.orderInfo.orderId,
		userName: req.body.orderInfo.userName,
		userAddress: req.body.orderInfo.userAddress,
		restName: req.body.orderInfo.restName,
		restAddress: req.body.orderInfo.restAddress,
	})
		.then((data) => {
			res.json(data);
		})
		.catch((error) => {
			console.log(error)
			res.end('Fail to record order');
		});
	//main();
	//res.send('Delivered');
});

router.post('/disconnect', (req, res, next) => {
	var dId = req.body.dId;
	var users = req.app.get('users');

	// Deleting disconnected user from active list.
	users.splice(users.findIndex(user => user.channel == dId), 1)

	console.log(users);
	res.send('logout');
});

async function main() {
	const output = `
	<p>You order summary<p>
	<h5>List of items</h5>
	<ul>
		<li>pizza</li>
		<li>Burger</li>
	</ul>
	<p>Thank you for ordering through out app </p>
`;


	let transporter = nodemailer.createTransport({
		host: "172.27.172.202",
		port: 25,
		secure: false, // true for 465, false for other ports
		auth: {
			user: 'CEL@evolvingsols.com', // generated ethereal user
			pass: 'Gmail#@5689', // generated ethereal password
		},
		tls: {
			rejectUnauthorized: false
		}
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"kiran" CEL@evolvingsols.com', // sender address
		to: "suraj.khatri@viit.ac.in", // list of receivers
		subject: "order summary", // Subject line
		text: "Hello world?", // plain text body
		html: output, // html body
	});

	console.log("Message sent: %s", info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


}
module.exports = router;
