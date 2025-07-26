import { createContext, useContext, useState } from "react";

export const MoneyPodTransactionContext = createContext()

export const MoneyPodTransactionProvider = ({children}) => {
    const [data, setData] = useState({ amount: 0, type: 'Expense', kind: 'Personal', description: '', date: new Date(), friends: [], category: '', lendingTo: '', lendingFrom: '' })

    const handleChange = (name, value) => {
        setData((prev) => ({ ...prev, [name]: value }));
    }

    const addFriend = (name, amount) => {
        const friends = data.friends;
        friends.push({ name: name, amount: Number(parseFloat(amount).toFixed(2)) })
        setData((prev) => ({ ...prev, friends: friends }));
    }

    const changeFriendAmount = (name, amount) => {
        const friends = data.friends;
        const newFriends = friends.filter((friend) => { return friend.name != name });
        newFriends.push({ name, amount: Number(parseFloat(amount).toFixed(2)) });
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
        <MoneyPodTransactionContext.Provider value={{ data, handleChange, addFriend, changeFriendAmount, deleteFriend, handleReset }}>{children}</MoneyPodTransactionContext.Provider>
    )
}

const useMoneyPodTransaction = () => {
    const context = useContext(MoneyPodTransactionContext)
    return context
}

export default useMoneyPodTransaction