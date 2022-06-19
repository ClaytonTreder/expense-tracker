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

const budgetSchema = new mongoose.Schema({
    month: {
        type: String,
    },
    year: {
        type: Number,
    },
    income: [
        {
            user: {
                type: String,
            },
            amount: {
                type: Number,
            },
            occurrences: {
                type: Number,
            },
        },
    ],
    categories: [
        {
            title: {
                type: String,
            },
            amount: {
                type: Number,
            },
            occurrences: {
                type: Number,
            },
        },
    ],
    addedOn: {
        type: Date,
    },
})

module.exports =
    mongoose.models.Budget || mongoose.model('Budget', budgetSchema)
