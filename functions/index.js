const functions = require('firebase-functions'),
	express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	admin = require('firebase-admin');

var serviceAccount = require("./aarohan-reg-firebase-adminsdk-punrx-f96ce46066.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('views', './views');
app.set('view engine', 'ejs');

var db = admin.firestore();

app.post('/onSubmit', (req, res) => {
	var ob = {
		cheque: req.body.cheque,
		schoolName: req.body.schoolName,
		faculty: {
			ContactNo: req.body.mobile,
			EmailID: req.body.email,
			Name: req.body.facultyName,
		}
	};
	db.collection("Schools").doc(req.body.schoolId).set(ob);
	res.redirect('/regSchool');
});

app.get("/regSchool", (req, res) => {
	res.render('regSchool');
});

exports.app = functions.https.onRequest(app);