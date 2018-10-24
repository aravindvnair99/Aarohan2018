const functions = require('firebase-functions'),
	express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	admin = require('firebase-admin');

var serviceAccount = require("./aarohan-reg-firebase-adminsdk-punrx-f96ce46066.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://aarohan-reg.firebaseio.com"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('views', './views');
app.set('view engine', 'ejs');

var db = admin.firestore();

app.get("/", (req, res) => {
	res.render('index');
});
app.get("/login", (req, res) => {
	res.render('login');
});
app.get("/schoolReg", (req, res) => {
	res.render('schoolReg');
});
app.get("/studentReg", (req, res) => {
	res.render('studentReg');
});
app.get("/eventReg", (req, res) => {
	res.render('eventReg');
});
app.get("/notif", (req, res) => {
	if (isThere) {
		var uids = new Array();
		var id = req.query.uid;
		getPrevilage((uids) => {
			var arrayLength = uids.length;
			for (var i = 0; i < arrayLength; i++) {
				if (uids[i] === id) {
					res.render('notification');
				}
			}
		});
	} else {
		res.render('schoolError');
	}
});

app.get('/viewSchools', (req, res) => {
	var schoolName = new Array();
	db.collection("Schools").get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			schoolName = doc.data();
			console.log(schoolName);
			console.log(doc.id, " => ", doc.data());
		});
		return;
	}).catch((err) => {
		console.log(err);
	});
});

app.post('/onEventSelect', (req, res) => {
	var event = req.body.eventName;
	switch (event) {
		case "beingPoirot":
			
			break;
	
		default:
			break;
	}
});

app.post('/onSchoolReg', (req, res) => {
	var schoolId = req.body.schoolId;
	var schoolName = req.body.schoolName;
	var facultyName = req.body.facultyName;
	var email = req.body.email;
	var mobile = req.body.mobile;
	var cheque = req.body.cheque;
	var sch = db.collection("Schools").doc(schoolId);
	sch.get().then((doc) => {
		if (doc.exists) {
			console.warn(schoolName + " already exists.");
			return;
		} else {
			var ob = {
				cheque: cheque,
				schoolName: schoolName,
				Faculty: {
					ContactNo: mobile,
					EmailID: email,
					Name: facultyName,
				}
			};
			db.collection("Schools").doc(schoolId).set(ob);
			return;
		}
	}).catch((err) => {
		console.log(err);
	});
	res.redirect('/schoolReg');
});

app.post('/onStudentReg', (req, res) => {
	var uid = "ARHN" + req.body.uid;
	var name = req.body.studentName;
	var gender = req.body.gender;
	var category = req.body.category;
	var schoolName = "Delhi Public School";
	var ob = {
		studentName: name,
		gender: gender,
		category: category,
	};
	var sch = db.collection("Schools").doc(schoolName);
	var ch = sch.collection("Students").doc(uid);
	sch.get().then((doc) => {
		if (doc.exists) {
			checkuid();
			return;
		}
	}).catch((err) => {
		console.error(err);
	});
	function checkuid() {
		ch.get().then((doc1) => {
			if (doc1.exists) {
				return;
			} else {
				db.collection("Schools").doc(schoolName).collection("Students").doc(uid).set(ob);
				throw new ("Added");
			}
		}).catch((err) => {
			console.error(err);
		});
	}
	res.redirect('/studentReg');
});

app.post('/onEventReg', (req, res) => {
	var i;
	var eventName = req.body.nameEvent;
	var count = req.body.count;
	console.log(count);
	console.log(eventName);
	db.collection("events").doc(eventName).get().then((doc) => {
		if (doc.exists) {
			var eve;
			i = doc.data().Max;
			switch (i) {
				case 1:
					eve = {
						Student1: req.body.Student1
					}
					break;
				case 2:
					eve = {
						Student1: req.body.Student1,
						Student2: req.body.Student2,
					}
					break;
				case 3:
					eve = {
						Student1: req.body.Student1,
						Student2: req.body.Student2,
						Student3: req.body.Student3
					}
					break;
				case 4:
					eve = {
						Student1: req.body.Student1,
						Student2: req.body.Student2,
						Student3: req.body.Student3,
						Student4: req.body.Student4
					}
					break;
				case 5:
					eve = {
						Student1: req.body.Student1,
						Student2: req.body.Student2,
						Student3: req.body.Student3,
						Student4: req.body.Student4,
						Student5: req.body.Student5
					}
					break;
				case 6:
					eve = {
						Student1: req.body.Student1,
						Student2: req.body.Student2,
						Student3: req.body.Student3,
						Student4: req.body.Student4,
						Student5: req.body.Student5,
						student6: req.body.student6
					}
					break;
				default:
					console.log("Error in switch case.");
					break;
			}
			db.collection("events").doc(eventName).collection("Groups").doc(count).set(eve);
			return (doc.data());
		} else {
			throw new Error(err);
		}
	}).catch((err) => {
		console.error(err);
	});
	res.redirect('/eventReg');
});

app.use((req, res, next) => {
	res.status(404).render('404');
});

exports.app = functions.https.onRequest(app);