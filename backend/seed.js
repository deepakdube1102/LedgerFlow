require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Customer = require('./models/Customer');
const Invoice = require('./models/Invoice');
const KPI = require('./models/KPI');
const SubscriptionPlan = require('./models/SubscriptionPlan');
const Revenue = require('./models/Revenue');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await Promise.all([
            User.deleteMany({}),
            Customer.deleteMany({}),
            Invoice.deleteMany({}),
            KPI.deleteMany({}),
            SubscriptionPlan.deleteMany({}),
            Revenue.deleteMany({})
        ]);

        console.log('Cleared existing data.');

        // Create Default User
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);
        const defaultUser = await User.create({
            name: 'Demo User',
            email: 'demo@ledgerflow.app',
            password: hashedPassword
        });

        const userId = defaultUser._id;
        console.log('Created default user: demo@ledgerflow.app / password123');

        // Customers
        const customers = [
            { user: userId, name: "Sarah Johnson", email: "sarah@example.com", plan: "Enterprise", mrr: "$299", status: "Active", joined: "Jan 12, 2025" },
            { user: userId, name: "Michael Chen", email: "michael@example.com", plan: "Pro", mrr: "$79", status: "Active", joined: "Feb 3, 2025" },
            { user: userId, name: "Emily Rodriguez", email: "emily@example.com", plan: "Starter", mrr: "$29", status: "Active", joined: "Mar 15, 2025" },
            { user: userId, name: "James Wilson", email: "james@example.com", plan: "Pro", mrr: "$79", status: "Trial", joined: "Apr 1, 2025" },
            { user: userId, name: "Lisa Anderson", email: "lisa@example.com", plan: "Enterprise", mrr: "$299", status: "Active", joined: "Dec 20, 2024" },
            { user: userId, name: "David Kim", email: "david@example.com", plan: "Starter", mrr: "$29", status: "Churned", joined: "Nov 8, 2024" },
            { user: userId, name: "Anna Müller", email: "anna@example.com", plan: "Pro", mrr: "$79", status: "Active", joined: "Jan 28, 2025" },
            { user: userId, name: "Robert Taylor", email: "robert@example.com", plan: "Enterprise", mrr: "$299", status: "Active", joined: "Feb 14, 2025" },
        ];
        await Customer.insertMany(customers);

        // Invoices
        const invoices = [
            { user: userId, id: "INV-0042", customer: "Acme Corp", amount: "$2,400", status: "Paid", date: "Mar 1, 2025" },
            { user: userId, id: "INV-0041", customer: "Globex Inc", amount: "$1,800", status: "Paid", date: "Feb 28, 2025" },
            { user: userId, id: "INV-0040", customer: "Wayne Ent.", amount: "$3,200", status: "Pending", date: "Feb 25, 2025" },
            { user: userId, id: "INV-0039", customer: "Stark Labs", amount: "$950", status: "Paid", date: "Feb 20, 2025" },
            { user: userId, id: "INV-0038", customer: "Umbrella Co", amount: "$1,500", status: "Overdue", date: "Feb 15, 2025" },
            { user: userId, id: "INV-0037", customer: "Cyberdyne", amount: "$4,100", status: "Paid", date: "Feb 10, 2025" },
        ];
        await Invoice.insertMany(invoices);

        // Subscription Plans
        const plans = [
            { user: userId, name: "Starter", price: "$29", features: ["5 projects", "10K events/mo", "Email support"], popular: false },
            { user: userId, name: "Pro", price: "$79", features: ["25 projects", "100K events/mo", "Priority support", "API access"], popular: true },
            { user: userId, name: "Enterprise", price: "$299", features: ["Unlimited projects", "Unlimited events", "Dedicated support", "SSO & SAML", "Custom SLAs"], popular: false },
        ];
        await SubscriptionPlan.insertMany(plans);

        // Revenue Trend
        const revenueData = [
            { user: userId, month: "Jul", revenue: 32000 },
            { user: userId, month: "Aug", revenue: 38000 },
            { user: userId, month: "Sep", revenue: 41000 },
            { user: userId, month: "Oct", revenue: 45000 },
            { user: userId, month: "Nov", revenue: 52000 },
            { user: userId, month: "Dec", revenue: 48000 },
            { user: userId, month: "Jan", revenue: 58000 },
            { user: userId, month: "Feb", revenue: 62000 },
            { user: userId, month: "Mar", revenue: 68000 },
        ];
        await Revenue.insertMany(revenueData);

        // KPIs
        const kpis = [
            { user: userId, title: "Total Revenue", value: "$48,352", change: "+12.5%", positive: true, iconName: "DollarSign", gradient: "kpi-gradient-primary" },
            { user: userId, title: "Active Users", value: "2,847", change: "+8.2%", positive: true, iconName: "Users", gradient: "kpi-gradient-accent" },
            { user: userId, title: "Subscriptions", value: "1,243", change: "+4.1%", positive: true, iconName: "CreditCard", gradient: "kpi-gradient-warm" },
            { user: userId, title: "Churn Rate", value: "2.4%", change: "-0.3%", positive: true, iconName: "Activity", gradient: "kpi-gradient-rose" },
        ];
        await KPI.insertMany(kpis);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
