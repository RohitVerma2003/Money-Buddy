import { createContext, useContext, useState } from "react";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const [data, setData] = useState({ amount: 0, type: 'Expense', kind: 'Personal', description: '', date: new Date(), friends: [], category: '', lendingTo: '', lendingFrom: '' })

    const handleChange = (name, value) => {
        setData((prev) => ({ ...prev, [name]: value }));
    }

    const addFriend = (name, amount) => {
        const friends = data.friends;
        friends.push({ name: name, amount: amount })
        setData((prev) => ({ ...prev, friends: friends }));
    }

    const changeFriendAmount = (name, amount) => {
        const friends = data.friends;
        const newFriends = friends.filter((friend) => { return friend.name != name });
        newFriends.push({ name, amount });
        setData((prev) => ({ ...prev, friends: newFriends }));
    }

    const deleteFriend = (name) => {
        const friends = data.friends;
        const newFriends = friends.filter((friend) => { return friend.name != name });
        setData((prev) => ({ ...prev, friends: newFriends }));
    }

    const handleReset = () => {
        setData({ amount: 0, type: 'Expense', kind: 'Personal', description: '', date: new Date(), friends: [], category: '' })
    }

    return (
        <TransactionContext.Provider value={{ data, handleChange, addFriend, changeFriendAmount, deleteFriend, handleReset }}>{children}</TransactionContext.Provider>
    )
}

const useTransactions = () => {
    const context = useContext(TransactionContext);
    return context;
}

export default useTransactions;