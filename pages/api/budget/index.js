import Budget from 'models/Budget'

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const restult = await Budget.find({
                month: JSON.parse(req.body)?.month,
            })
            if (restult) {
                res.status(200).json(
                    await Budget.findOneAndReplace(
                        { month: JSON.parse(req.body)?.month },
                        {
                            ...JSON.parse(req.body),
                            addedOn: new Date(),
                        }
                    )
                )
            } else {
                res.status(200).json(
                    await Budget.create({
                        ...JSON.parse(req.body),
                        addedOn: new Date(),
                    })
                )
            }
        } else if (req.method === 'GET') {
            res.status(200).json(await Budget.find(req.query))
        } else {
            res.status(400)
        }
    } catch (ex) {
        console.log(ex)
        res.status(500)
    }
}
