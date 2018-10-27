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
app.get("/Developers", (req, res) => {
	res.render('developers');
});
app.get("/login", (req, res) => {
	res.render('login');
});
app.get("/schoolReg", (req, res) => {
	res.render('schoolReg');
});
app.get("/studentReg", (req, res) => {
	var i = 0;
	var obj;
	var school = new Array();
	db.collection("Schools").get().then((querySnapshot) => {
		ob = querySnapshot;
		querySnapshot.forEach((childSnapshot) => {
			school[i] = childSnapshot.id;
			console.log(childSnapshot.id);
			// console.log(school[i]);
			i++;
		});
		obj = Object.assign({}, school);
		console.log(obj);
		res.render('studentReg', { obj });
		return;
	}).catch((err) => {
		console.log(err);
	});


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
	var i = 0;
	var obj;
	var school = new Array();
	db.collection("Schools").get().then((querySnapshot) => {
		querySnapshot.forEach((childSnapshot) => {
			school[i] = childSnapshot.id;
			console.log(childSnapshot.id);
			// console.log(school[i]);
			i++;
		});
		obj = Object.assign({}, school);
		console.log(obj);
		res.render('viewSchools', { obj });
		return;
	}).catch((err) => {
		console.log(err);
	});
	// var schoolName = new Array();
	// db.collection("Schools").get().then((querySnapshot) => {
	// 	querySnapshot.forEach((doc) => {
	// 		schoolName = doc.data();
	// 		console.log(schoolName);
	// 		console.log(doc.id, " => ", doc.data());
	// 	});
	// 	return;
	// }).catch((err) => {
	// 	console.log(err);
	// });
});

app.get("/statistics", (req, res) => {
	res.render('statistics');
});
app.get("/beingPoirot", (req, res) => {
	res.render('beingpoirot');
});
app.get("/circuitrix", (req, res) => {
	res.render('circuitrix');
});
app.get("/codeBound", (req, res) => {
	res.render('codeBound');
});
app.get("/espritDeCorps", (req, res) => {
	res.render('espritDeCorps');
});
app.get("/finalDestination", (req, res) => {
	res.render('finalDestination');
});
app.get("/kerbalSpaceProgram", (req, res) => {
	res.render('kerbalSpaceProgram');
});
app.get("/lakshya", (req, res) => {
	res.render('lakshya');
});
app.get("/letsRingItUp", (req, res) => {
	res.render('letsRingItUp');
});
app.get("/mathementumContour", (req, res) => {
	res.render('mathementumContour');
});
app.get("/mechathalon", (req, res) => {
	res.render('mechathalon');
});
app.get("/mindsweeper", (req, res) => {
	res.render('mindsweeper');
});
app.get("/omniumArtiumMagister", (req, res) => {
	res.render('omniumArtiumMagister');
});
app.get("/projectExhibition", (req, res) => {
	res.render('projectExhibition');
});
app.get("/raceForGlory", (req, res) => {
	res.render('raceForGlory');
});
app.get("/roboCup", (req, res) => {
	res.render('roboCup');
});
app.get("/schoolDuels", (req, res) => {
	res.render('schoolDuels');
});
app.get("/sherlocked", (req, res) => {
	res.render('sherlocked');
});
app.get("/targo", (req, res) => {
	res.render('targo');
});
app.get("/techRoadies", (req, res) => {
	res.render('techRoadies');
});
app.get("/theSphinxQuiz", (req, res) => {
	res.render('theSphinxQuiz');
});

app.post('/onEventSelect', (req, res) => {
	var event = req.body.eventName;
	switch (event) {
		case "beingPoirot":
			res.redirect('/beingPoirot');
			break;
		case "circuitrix":
			res.redirect('/circuitrix');
			break;
		case "codeBound":
			res.redirect('/codeBound');
			break;
		case "espritDeCorps":
			res.redirect('/espritDeCorps');
			break;
		case "finalDestination":
			res.redirect('/finalDestination');
			break;
		case "kerbalSpaceProgram":
			res.redirect('/kerbalSpaceProgram');
			break;
		case "lakshya":
			res.redirect('/lakshya');
			break;
		case "letsRingItUp":
			res.redirect('/letsRingItUp');
			break;
		case "mathementumContour":
			res.redirect('/mathementumContour');
			break;
		case "mechathalon":
			res.redirect('/mechathalon');
			break;
		case "mindsweeper":
			res.redirect('/mindsweeper');
			break;
		case "omniumArtiumMagister":
			res.redirect('/omniumArtiumMagister');
			break;
		case "projectExhibition":
			res.redirect('/projectExhibition');
			break;
		case "raceForGlory":
			res.redirect('/raceForGlory');
			break;
		case "roboCup":
			res.redirect('/roboCup');
			break;
		case "schoolDuels":
			res.redirect('/schoolDuels');
			break;
		case "sherlocked":
			res.redirect('/sherlocked');
			break;
		case "targo":
			res.redirect('/targo');
			break;
		case "techRoadies":
			res.redirect('/techRoadies');
			break;
		case "theSphinxQuiz":
			res.redirect('/theSphinxQuiz');
			break;
		default:
			res.redirect('/eventReg');
			break;
	}
});

app.post('/onSchoolReg', (req, res) => {
	var schoolName = req.body.schoolName;
	var facultyName = req.body.facultyName;
	var email = req.body.email;
	var mobile = req.body.mobile;
	var cheque = req.body.cheque;
	var sch = db.collection("Schools").doc(schoolName);
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
			db.collection("Schools").doc(schoolName).set(ob);
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
	var schoolName = req.body.schoolName;
	var ob = {
		studentName: name,
		gender: gender,
		category: category,
		schoolName: schoolName,
	};
	var sch = db.collection("Schools").doc(schoolName);
	var ch = sch.collection("Students").doc(uid);
	sch.get().then((doc) => {
		if (doc.exists) {
			checkuid();
			return (doc);
		} else {
			throw new Error("School doesn't exist");
		}
	}).catch((err) => {
		console.error(err);
	});
	function checkuid() {
		ch.get().then((doc1) => {
			if (doc1.exists) {
				return doc1;
			} else {
				checkstud()
				db.collection("Schools").doc(schoolName).collection("Students").doc(uid).set(ob);
				return ("Added in Schools collection under students");
			}
		}).catch((err) => {
			console.error(err);
		});
	}
	function checkstud() {
		db.collection("Students").get().then((doc2) => {
			if (doc2.exists) {
				return doc2;
			} else {
				db.collection("Students").doc(uid).set(ob);
				return ("Added in Students collection")
			}
		}).catch((err) => {
			console.log(err);
		})
	}
	res.redirect('/studentReg');
});

app.post('/eventRegistration', (req, res) => {
})

app.post('/onEventReg', (req, res) => {
	var i, eve, eventName = req.body.eventName;
	db.collection("events").doc(eventName).get().then((doc) => {
		if (doc.exists) {
			i = doc.data().Max;
			switch (i) {
				case 1:
					eve = {
						Student1: req.body.Student1
					}
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student1).set({});
					break;
				case 2:
					eve = {
						Student1: req.body.Student1,
						Student2: req.body.Student2,
					}
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student1).set({});
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student2).set({});
					break;
				case 3:
					eve = {
						Student1: req.body.Student1,
						Student2: req.body.Student2,
						Student3: req.body.Student3
					}
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student1).set({});
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student2).set({});
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student3).set({});
					break;
				case 4:
					eve = {
						Student1: req.body.Student1,
						Student2: req.body.Student2,
						Student3: req.body.Student3,
						Student4: req.body.Student4
					}
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student1).set({});
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student2).set({});
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student3).set({});
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student4).set({});
					break;
				case 5:
					eve = {
						Student1: req.body.Student1,
						Student2: req.body.Student2,
						Student3: req.body.Student3,
						Student4: req.body.Student4,
						Student5: req.body.Student5
					}
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student1).set({});
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student2).set({});
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student3).set({});
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student4).set({});
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student5).set({});
					break;
				case 6:
					eve = {
						Student1: req.body.Student1,
						Student2: req.body.Student2,
						Student3: req.body.Student3,
						Student4: req.body.Student4,
						Student5: req.body.Student5,
						Student6: req.body.Student6
					}
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student1).set({});
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student2).set({});
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student3).set({});
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student4).set({});
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student5).set({});
					db.collection("events").doc(eventName).collection("Students").doc(req.body.Student).set({});
					break;
				default:
					console.log("Error in switch case.");
					break;
			}
			db.collection("events").doc(eventName).collection("Groups").add(eve);
			return (doc.data());
		} else {
			throw new Error(err);
		}
	}).catch((err) => {
		console.error(err);
	});
	switch (eventName) {
		case "Being poirot":
			res.redirect('/beingPoirot');
			break;
		case "Circuitrix":
			res.redirect('/circuitrix');
			break;
		case "Code Bound":
			res.redirect('/codeBound');
			break;
		case "Esprit de corps":
			res.redirect('/espritDeCorps');
			break;
		case "Final Destination":
			res.redirect('/finalDestination');
			break;
		case "Kerbal space program":
			res.redirect('/kerbalSpaceProgram');
			break;
		case "Lakshya":
			res.redirect('/lakshya');
			break;
		case "Let's ring it up":
			res.redirect('/letsRingItUp');
			break;
		case "Mathementum contour":
			res.redirect('/mathementumContour');
			break;
		case "Mechathalon":
			res.redirect('/mechathalon');
			break;
		case "Mindsweeper":
			res.redirect('/mindsweeper');
			break;
		case "Omnium artium magister":
			res.redirect('/omniumArtiumMagister');
			break;
		case "Project exhibition":
			res.redirect('/projectExhibition');
			break;
		case "Race for glory":
			res.redirect('/raceForGlory');
			break;
		case "Robo cup":
			res.redirect('/roboCup');
			break;
		case "School Duels":
			res.redirect('/schoolDuels');
			break;
		case "Sherlocked":
			res.redirect('/sherlocked');
			break;
		case "Targo":
			res.redirect('/targo');
			break;
		case "Tech roadies":
			res.redirect('/techRoadies');
			break;
		case "The sphinx quiz":
			res.redirect('/theSphinxQuiz');
			break;
		default:
			res.redirect('/eventReg');
			break;
	}
});

app.use((req, res, next) => {
	res.status(404).render('404');
});

exports.app = functions.https.onRequest(app);