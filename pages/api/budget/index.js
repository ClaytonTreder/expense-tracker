import Budget from 'models/Budget'

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const result = await Budget.create({
                ...JSON.parse(req.body),
                addedOn: new Date(),
            })
            res.status(200).json(result)
        } else if (req.method === 'GET') {
            const results = await Budget.find()
            res.status(200).json(results)
        } else {
            res.status(400)
        }
    } catch (ex) {
        console.log(ex)
        res.status(500)
    }
}
