const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const port = 5000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

let assignmentList = [{'studentId': 1, 'assignmentId': 2,
                'assignmentType': "Esame", 'assignmentContent': "Esame LFC"}];

app.post('/assignment', (req, res) => {
    let studentId = req.body.studentId;
    let assignmentId = req.body.assignmentId;
    let assignmentType = req.body.assignmentType;
    let assignmentContent = req.body.assignmentContent;

    let newAssignment = {'studentId': studentId, 'assignmentId': assignmentId,
                         'assignmentType': assignmentType, 'assignmentContent': assignmentContent};

    assignmentList.push(newAssignment);

    res.send('Assignment inserted');
});

app.get('/assignment/:assignmentId/:studentId', (req, res) => {
    let studentId = req.params.studentId;
    let assignmentId = req.params.assignmentId;

    let ris = {};
    assignmentList.map(assignment => {
        if((assignment.studentId == studentId) && (assignment.assignmentId == assignmentId)) {
            ris = assignment;
        }
    });
    
    res.json(ris.assignmentId != undefined ? ris : 'Nessuna coppia trovata');
});

console.log("Server started on port " + port);
app.listen(port);