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
var ref = admin.app().database().ref();

app.get("/", (req, res) => {
	res.render('index');
});
app.get("/login", (req, res) => {
	checkInternet((isThere) => {
		if (isThere) {
			res.render("login");

		} else {
			res.render('schoolError');
		}
	});


});
app.get("/reg", (req, res) => {
	res.render('registration');
});
app.get("/studentReg", (req, res) => {
	res.render('studentReg');
});
app.get("/eventReg", (req, res) => {
	res.render('eventReg');
});
app.get("/notif", (req, res) => {
	checkInternet((isThere) => {
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
});

app.post('/onSubmit', (req, res) => {
	console.log(req.body);
	var schoolId = req.body.schoolId;
	var schoolName = req.body.schoolName;
	var facultyName = req.body.facultyName;
	var email = req.body.email;
	var mobile = req.body.mobile;
	var cheque = req.body.cheque;
	console.log(schoolName + " " + facultyName + " " + email + " " + mobile);
	var ob = {
		cheque : cheque,
		schoolName: schoolName,
		Faculty: {
			ContactNo: mobile, 
			EmailID: email,
			Name: facultyName,
		}
		
	};
	db.collection("Schools").doc(schoolId).set(ob);
	// db.ref('Schools/'+schoolId).set({
	// 	cheque : cheque,
	// 	schoolName: schoolName,
	// 	Faculty: {
	// 		ContactNo: mobile, 
	// 		EmailID: email,
	// 		Name: facultyName,
	// 	}
	// })
	res.render('registration');
});

app.post('/onStudentReg', (req, res) => {
	console.log(req.body);
	var one;
	var uid = req.body.uid;
	var name = req.body.studentName;
	var gender = req.body.gender;
	var category = req.body.category;
	var schoolId = req.body.schoolId;
	console.log(uid + " " + name + " " + gender + " " + category);
	if(category==="Junior"){
		one = "1";
		console.log(one);
	}else if(category === "Senior"){
		one = "2";
	}
	var ob = {
		studentName: name,
		gender : gender,
		category : category,
	};
	var sch = db.collection("Schools").doc(schoolId);
	var ch = sch.collection("Students").doc(uid);
	sch.get().then((doc) => {
		if(doc.exists){
			return(doc);
		}else{
			alertfunc();
			throw new Error("School does not exist");
		}
	}).catch((err)=>{
		console.log(err);
	});
	
	function checkuid(){
		ch.get().then((doc1)=>{
			if(doc1.exists){
//				console.log("UID already exists");
				return(doc1);
			}else{
				db.collection("Schools").doc(schoolId).collection("Students").doc(uid).set(ob);
				throw new Error("What's up?");
			}
		}).catch((err)=>{
			console.log(err);
			});
	}
	// if(schoolId.exists){
	// 	if(ch.exists){
	// 		console.log("Student with this id already exists");
	// 	}else{
	// 		db.collection("Schools").doc(schoolId).collection("Students").doc(uid).set(ob);
	// 	}
	// }else{
	// 	console.log("The school is not registered")
	// }
	res.render('studentReg');
});
                                                                                       
app.post('/onEventReg', (req, res) => {
	console.log(req.body);
	var i,j;
	var eventName = req.body.nameEvent;
	console.log(eventName);
	db.collection("events").doc(eventName).get().then((doc)=>{
		if(doc.exists){
			var eve = new Array();
			i = doc.data().Max;
			for(j=1;j<=i;j++){
				eve[j] = req.body.j;
				console.log(eve[j]);
				//db.collection("events").doc(eventName).collection("Groups").doc(1).set(student[]);
			}
			return(doc.data());
		}else{
			throw new Error(err);
		}
	}).catch((err) => {
		console.log(err);
	});
	res.render('eventReg');
});

function checkInternet(cb) {
	require('dns').lookup('google.com', (err) => {
		if (err && err.code === "ENOTFOUND") {
			cb(false);
			return;
		} else {
			cb(true);
			return;
		}
	})
}

app.use((req, res, next) => {
	res.status(404).render('404');
});

exports.app = functions.https.onRequest(app);