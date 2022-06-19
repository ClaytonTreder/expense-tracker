const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose
    .connect(process.env.CONNECTIONSTRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((err) => {
        console.log(err)
    })

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    month: {
        type: String,
    },
    year: {
        type: Number,
    },
    amount: {
        type: Number,
    },
    category: {
        type: String,
    },
    addedOn: {
        type: Date,
    },
})

module.exports =
    mongoose.models.Expense || mongoose.model('Expense', expenseSchema)
