import Budget from 'models/Budget'

export default async function handler(req, res) {
    try {
        const { month } = req.query
        if (req.method === 'PUT') {
            res.status(200).json(
                await Budget.findOneAndReplace(
                    { month },
                    {
                        ...JSON.parse(req.body),
                        addedOn: new Date(),
                    }
                )
            )
        } else if (req.method === 'GET') {
            res.status(200).json(await Budget.find({ month }))
        } else {
            res.status(400)
        }
    } catch (ex) {
        console.log(ex)
        res.status(500)
    }
}
