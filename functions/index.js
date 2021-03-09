const functions = require("firebase-functions");
const express = require("express");
const app = express();
const admin = require("firebase-admin");

admin.initializeApp();

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.set("views", "./views");
app.set("view engine", "ejs");

const db = admin.firestore();

app.get("/", (_req, res) => {
	res.render("index");
});
app.get("/Developers", (_req, res) => {
	res.render("developers");
});
app.get("/login", (_req, res) => {
	res.render("login");
});
app.get("/schoolReg", (_req, res) => {
	res.render("schoolReg");
});
app.get("/eventReg", (_req, res) => {
	res.render("eventReg");
});
app.get("/statistics", (_req, res) => {
	res.render("statistics");
});
app.get("/beingPoirot", (_req, res) => {
	res.render("beingPoirot");
});
app.get("/circuitrix", (_req, res) => {
	res.render("circuitrix");
});
app.get("/codeBound", (_req, res) => {
	res.render("codeBound");
});
app.get("/espritDeCorps", (_req, res) => {
	res.render("espritDeCorps");
});
app.get("/finalDestination", (_req, res) => {
	res.render("finalDestination");
});
app.get("/kerbalSpaceProgram", (_req, res) => {
	res.render("kerbalSpaceProgram");
});
app.get("/lakshya", (_req, res) => {
	res.render("lakshya");
});
app.get("/letsRingItUp", (_req, res) => {
	res.render("letsRingItUp");
});
app.get("/mathementumContour", (_req, res) => {
	res.render("mathementumContour");
});
app.get("/mechathalon", (_req, res) => {
	res.render("mechathalon");
});
app.get("/mindsweeper", (_req, res) => {
	res.render("mindsweeper");
});
app.get("/omniumArtiumMagister", (_req, res) => {
	res.render("omniumArtiumMagister");
});
app.get("/projectExhibition", (_req, res) => {
	res.render("projectExhibition");
});
app.get("/raceForGlory", (_req, res) => {
	res.render("raceForGlory");
});
app.get("/roboCup", (_req, res) => {
	res.render("roboCup");
});
app.get("/schoolDuels", (_req, res) => {
	res.render("schoolDuels");
});
app.get("/sherlocked", (_req, res) => {
	res.render("sherlocked");
});
app.get("/targo", (_req, res) => {
	res.render("targo");
});
app.get("/techRoadies", (_req, res) => {
	res.render("techRoadies");
});
app.get("/theSphinxQuiz", (_req, res) => {
	res.render("theSphinxQuiz");
});
app.get("/search", (_req, res) => {
	db.collection("students")
		.doc()
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((childSnapshot) => {
				console.log(childSnapshot.id);
			});
			res.send("Done");
			return;
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get("/count", (_req, res) => {
	let i = 0;
	db.collection("events")
		.doc("Mechathalon")
		.collection("Groups")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((childSnapshot) => {
				i++;
			});
			res.send(JSON.stringify(i));
			return;
		})
		.catch((err) => {
			res.send(err);
		});
});

app.get("/studentReg", (_req, res) => {
	let i = 0;
	let obj;
	const school = [];
	db.collection("Schools")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((childSnapshot) => {
				school[i] = childSnapshot.id;
				i++;
			});
			obj = Object.assign({}, school);
			res.render("studentReg", {obj});
			return;
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get("/viewSchools", (_req, res) => {
	let i = 0;
	let obj;
	const school = [];
	db.collection("Schools")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((childSnapshot) => {
				school[i] = childSnapshot.id;
				i++;
			});
			obj = Object.assign({}, school);
			res.render("viewSchools", {obj});
			return;
		})
		.catch((err) => {
			console.log(err);
		});
});

app.post("/onEventSelect", (req, res) => {
	const event = req.body.eventName;
	switch (event) {
		case "beingPoirot":
			res.redirect("/beingPoirot");
			break;
		case "circuitrix":
			res.redirect("/circuitrix");
			break;
		case "codeBound":
			res.redirect("/codeBound");
			break;
		case "espritDeCorps":
			res.redirect("/espritDeCorps");
			break;
		case "finalDestination":
			res.redirect("/finalDestination");
			break;
		case "kerbalSpaceProgram":
			res.redirect("/kerbalSpaceProgram");
			break;
		case "lakshya":
			res.redirect("/lakshya");
			break;
		case "letsRingItUp":
			res.redirect("/letsRingItUp");
			break;
		case "mathementumContour":
			res.redirect("/mathementumContour");
			break;
		case "mechathalon":
			res.redirect("/mechathalon");
			break;
		case "mindsweeper":
			res.redirect("/mindsweeper");
			break;
		case "omniumArtiumMagister":
			res.redirect("/omniumArtiumMagister");
			break;
		case "projectExhibition":
			res.redirect("/projectExhibition");
			break;
		case "raceForGlory":
			res.redirect("/raceForGlory");
			break;
		case "roboCup":
			res.redirect("/roboCup");
			break;
		case "schoolDuels":
			res.redirect("/schoolDuels");
			break;
		case "sherlocked":
			res.redirect("/sherlocked");
			break;
		case "targo":
			res.redirect("/targo");
			break;
		case "techRoadies":
			res.redirect("/techRoadies");
			break;
		case "theSphinxQuiz":
			res.redirect("/theSphinxQuiz");
			break;
		default:
			res.redirect("/eventReg");
			break;
	}
});

app.post("/onSchoolReg", (req, res) => {
	const schoolName = req.body.schoolName;
	const facultyName = req.body.facultyName;
	const email = req.body.email;
	const mobile = req.body.mobile;
	const cheque = req.body.cheque;
	const sch = db.collection("Schools").doc(schoolName);
	sch.get()
		.then((doc) => {
			if (doc.exists) {
				console.warn(schoolName + " already exists.");
				return;
			} else {
				const ob = {
					cheque: cheque,
					schoolName: schoolName,
					Faculty: {
						ContactNo: mobile,
						EmailID: email,
						Name: facultyName,
					},
				};
				db.collection("Schools").doc(schoolName).set(ob);
				return;
			}
		})
		.catch((err) => {
			console.log(err);
		});
	res.redirect("/schoolReg");
});

app.post("/onStudentReg", (req, res) => {
	const uid = "ARHN" + req.body.uid;
	const name = req.body.studentName;
	const gender = req.body.gender;
	const category = req.body.category;
	const schoolName = req.body.schoolName;
	const ob = {
		studentName: name,
		gender: gender,
		category: category,
		schoolName: schoolName,
	};
	const sch = db.collection("Schools").doc(schoolName);
	const ch = sch.collection("Students").doc(uid);
	sch.get()
		.then((doc) => {
			if (doc.exists) {
				checkuid();
				return doc;
			} else {
				throw new Error("School doesn't exist");
			}
		})
		.catch((err) => {
			console.error(err);
		});
	/**
	 * checkuid
	 */
	function checkuid() {
		ch.get()
			.then((doc1) => {
				if (doc1.exists) {
					return doc1;
				} else {
					checkstud();
					db.collection("Schools")
						.doc(schoolName)
						.collection("Students")
						.doc(uid)
						.set(ob);
					return "Added in Schools collection under students";
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}
	/**
	 * checkstud
	 */
	function checkstud() {
		db.collection("Students")
			.get()
			.then((doc2) => {
				if (doc2.exists) {
					return doc2;
				} else {
					db.collection("Students").doc(uid).set(ob);
					return "Added in Students collection";
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}
	res.redirect("/studentReg");
});

app.post("/onEventReg", (req, res) => {
	let i;
	let eve;
	const eventName = req.body.eventName;
	db.collection("events")
		.doc(eventName)
		.get()
		.then((doc) => {
			if (doc.exists) {
				i = doc.data().Max;
				switch (i) {
					case 2:
						eve = {
							Student1: req.body.Student1,
							Student2: req.body.Student2,
						};
						db.collection("events")
							.doc(eventName)
							.collection("Students")
							.doc(req.body.Student1)
							.set({});
						db.collection("events")
							.doc(eventName)
							.collection("Students")
							.doc(req.body.Student2)
							.set({});
						break;
					case 3:
						if (
							req.body.Student2 === "" &&
							req.body.Student3 === ""
						) {
							eve = {
								Student1: req.body.Student1,
							};
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student1)
								.set({});
						} else if (req.body.Student3 === "") {
							eve = {
								Student1: req.body.Student1,
								Student2: req.body.Student2,
							};
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student1)
								.set({});
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student2)
								.set({});
						} else {
							eve = {
								Student1: req.body.Student1,
								Student2: req.body.Student2,
								Student3: req.body.Student3,
							};
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student1)
								.set({});
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student2)
								.set({});
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student3)
								.set({});
						}
						break;
					case 4:
						eve = {
							Student1: req.body.Student1,
							Student2: req.body.Student2,
							Student3: req.body.Student3,
							Student4: req.body.Student4,
						};
						db.collection("events")
							.doc(eventName)
							.collection("Students")
							.doc(req.body.Student1)
							.set({});
						db.collection("events")
							.doc(eventName)
							.collection("Students")
							.doc(req.body.Student2)
							.set({});
						db.collection("events")
							.doc(eventName)
							.collection("Students")
							.doc(req.body.Student3)
							.set({});
						db.collection("events")
							.doc(eventName)
							.collection("Students")
							.doc(req.body.Student4)
							.set({});
						break;
					case 6:
						if (
							req.body.Student2 === "" &&
							req.body.Student3 === "" &&
							req.body.Student4 === "" &&
							req.body.Student5 === "" &&
							req.body.Student6 === ""
						) {
							eve = {
								Student1: req.body.Student1,
							};
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student1)
								.set({});
						} else if (
							req.body.Student3 === "" &&
							req.body.Student4 === "" &&
							req.body.Student5 === "" &&
							req.body.Student6 === ""
						) {
							eve = {
								Student1: req.body.Student1,
								Student2: req.body.Student2,
							};
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student1)
								.set({});
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student2)
								.set({});
						} else if (
							req.body.Student4 === "" &&
							req.body.Student5 === "" &&
							req.body.Student6 === ""
						) {
							eve = {
								Student1: req.body.Student1,
								Student2: req.body.Student2,
								Student3: req.body.Student3,
							};
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student1)
								.set({});
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student2)
								.set({});
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student3)
								.set({});
						} else if (
							req.body.Student5 === "" &&
							req.body.Student6 === ""
						) {
							eve = {
								Student1: req.body.Student1,
								Student2: req.body.Student2,
								Student3: req.body.Student3,
								Student4: req.body.Student4,
							};
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student1)
								.set({});
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student2)
								.set({});
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student3)
								.set({});
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student4)
								.set({});
						} else if (req.body.Student6 === "") {
							eve = {
								Student1: req.body.Student1,
								Student2: req.body.Student2,
								Student3: req.body.Student3,
								Student4: req.body.Student4,
								Student5: req.body.Student5,
							};
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student1)
								.set({});
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student2)
								.set({});
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student3)
								.set({});
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student4)
								.set({});
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student5)
								.set({});
						} else {
							eve = {
								Student1: req.body.Student1,
								Student2: req.body.Student2,
								Student3: req.body.Student3,
								Student4: req.body.Student4,
								Student5: req.body.Student5,
								Student6: req.body.Student6,
							};
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student1)
								.set({});
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student2)
								.set({});
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student3)
								.set({});
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student4)
								.set({});
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student5)
								.set({});
							db.collection("events")
								.doc(eventName)
								.collection("Students")
								.doc(req.body.Student6)
								.set({});
						}
						break;
					default:
						console.log("Error in switch case.");
						break;
				}
				db.collection("events")
					.doc(eventName)
					.collection("Groups")
					.add(eve);
				return doc.data();
			}
		})
		.catch((err) => {
			console.error(err);
		});
	switch (eventName) {
		case "Being poirot":
			res.redirect("/beingPoirot");
			break;
		case "Circuitrix":
			res.redirect("/circuitrix");
			break;
		case "Code Bound":
			res.redirect("/codeBound");
			break;
		case "Esprit de corps":
			res.redirect("/espritDeCorps");
			break;
		case "Final Destination":
			res.redirect("/finalDestination");
			break;
		case "Kerbal space program":
			res.redirect("/kerbalSpaceProgram");
			break;
		case "Lakshya":
			res.redirect("/lakshya");
			break;
		case "Let's ring it up":
			res.redirect("/letsRingItUp");
			break;
		case "Mathementum contour":
			res.redirect("/mathementumContour");
			break;
		case "Mechathalon":
			res.redirect("/mechathalon");
			break;
		case "Mindsweeper":
			res.redirect("/mindsweeper");
			break;
		case "Omnium artium magister":
			res.redirect("/omniumArtiumMagister");
			break;
		case "Project exhibition":
			res.redirect("/projectExhibition");
			break;
		case "Race for glory":
			res.redirect("/raceForGlory");
			break;
		case "Robo cup":
			res.redirect("/roboCup");
			break;
		case "School Duels":
			res.redirect("/schoolDuels");
			break;
		case "Sherlocked":
			res.redirect("/sherlocked");
			break;
		case "Targo":
			res.redirect("/targo");
			break;
		case "Tech roadies":
			res.redirect("/techRoadies");
			break;
		case "The sphinx quiz":
			res.redirect("/theSphinxQuiz");
			break;
		default:
			res.redirect("/eventReg");
			break;
	}
});

app.use((_req, res, _next) => {
	res.status(404).render("404");
});

exports.app = functions.https.onRequest(app);
