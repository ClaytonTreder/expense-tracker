import Expense from 'models/Expense'

export default async function handler(req, res) {
    try {
        if (req.method === 'DELETE') {
            const { id } = req.query
            await Expense.findByIdAndDelete(id)
            res.status(200)
        } else {
            res.status(400)
        }
    } catch (ex) {
        console.log(ex)
        res.status(500)
    }
}
