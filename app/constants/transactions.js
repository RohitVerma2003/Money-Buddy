const transactionType = [{ label: 'Expense', value: 'Expense' }, { label: 'Income', value: 'Income' }];
const transactionCategories = [
    { label: "Food & Dining", value: "food_dining", icon: "fast-food" },
    { label: "Coffee", value: "coffee", icon: "cafe" },
    { label: "Groceries", value: "groceries", icon: "cart" },
    { label: "Transportation", value: "transportation", icon: "car" },
    { label: "Shopping", value: "shopping", icon: "bag" },
    { label: "Rent", value: "rent", icon: "home" },
    { label: "Utilities", value: "utilities", icon: "flash" },
    { label: "Health", value: "health", icon: "medkit" },
    { label: "Subscriptions", value: "subscriptions", icon: "film" },
    { label: "Travel", value: "travel", icon: "airplane" },
    { label: "Education", value: "education", icon: "school" },
    { label: "Entertainment", value: "entertainment", icon: "game-controller" },
    { label: "Gifts", value: "gifts", icon: "gift" },
    { label: "Savings", value: "savings", icon: "wallet" },
    { label: "Investments", value: "investments", icon: "trending-up" },
    { label: "Salary", value: "salary", icon: "cash" },
    { label: "Freelance", value: "freelance", icon: "laptop" },
    { label: "Insurance", value: "insurance", icon: "shield-checkmark" },
    { label: "Donations", value: "donations", icon: "heart" },
    { label: "Others", value: "others", icon: "apps" },
];

const iconNameMapping = {
    food_dining: 'fast-food',
    coffee: 'cafe',
    groceries: 'cart',
    transportation: 'car',
    shopping: 'bag',
    rent: 'home',
    utilities: 'flash',
    health: 'medkit',
    subscriptions: 'film',
    travel: 'airplane',
    education: 'school',
    entertainment: 'game-controller',
    gifts: 'gift',
    savings: 'wallet',
    investments: 'trending-up',
    salary: 'cash',
    freelance: 'laptop',
    insurance: 'shield-checkmark',
    donations: 'heart',
    others: 'apps',
    lend: 'trending-up',
    debt: 'trending-down',
};


const transactionConst = { transactionType, transactionCategories, iconNameMapping };

export default transactionConst;