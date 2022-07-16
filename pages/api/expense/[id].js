import Expense from 'models/Expense';

export default async function handler(req, res) {
  try {
    if (req.method === "GET"){
      const { id } = req.query;

      const expense = await Expense.findById(id);

      res.send(expense).status(200);
    }
    else if (req.method === 'DELETE') {
      const { id } = req.query;

      await Expense.findByIdAndDelete(id);

      res.send(200);
    } else if (req.method === 'PUT') {
      const { id } = req.query;

      await Expense.findByIdAndUpdate(id, {
        amount: JSON.parse(req.body).amount,
      });

      res.send(200);
    } else {
      res.send(400);
    }
  } catch (ex) {
    console.log(ex);
    res.status(500);
  }
}
