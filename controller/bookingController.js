const planModel = require("../model/planModel");
const stripe = require('stripe')("sk_test_kLLtoPA3WztYOMzg9mI4v94A00nplpozit");
module.exports.checkout = async function (req, res) {
    const id = await req.body.id;
    const plan = await planModel.findById(id);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            name: plan.name,
            description: plan.description,
            // images: ['https://example.com/t-shirt.png'],//a hosted image's link is to be given and not //that of locat host
            amount: 100,
            currency: 'usd',
            quantity: 1,
        }],
        success_url: '/',
        cancel_url: '/',

    });

    res.status(201).json({
        data: plan,
        success: "payment object send",
        session
    });
};


