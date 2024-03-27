const exp = require('constants')
const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 5000
app.use(express.static(path.join(__dirname,'./public')))
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("home")
})

app.get('/getBMI/:weight/:height', (req, res) => {
    const weight = parseFloat(req.params.weight);
    const height = parseFloat(req.params.height);

    // Check if weight and height are provided
    if (isNaN(weight) || isNaN(height)) {
        return res.status(400).json({ error: 'Weight and height must be numbers.' });
    }

    // Calculate BMI
    const bmi = calculateBMI(weight, height);

    res.send(bmi.toString());
});

// Function to calculate BMI
function calculateBMI(weight, height) {
    // Convert height to meters
    const heightInMeters = height / 100;

    // Calculate BMI
    const bmi = weight / (heightInMeters * heightInMeters);

    return bmi.toFixed(2);
}

app.listen(port,()=>{
    console.log("server is running on port : ",port)
})