const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc, setDoc, updateDoc, increment, collection, query, orderBy, limit, getDocs } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getBalance(userId) {
    const userDoc = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
        return userSnapshot.data().balance || 0;
    } else {
        await setDoc(userDoc, { balance: 0 });
        return 0;
    }
}

async function updateBalance(userId, amount) {
    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, { balance: increment(amount) });
}

async function claimDailyReward(userId) {
    const userDoc = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDoc);
    const now = new Date();
    const lastClaim = userSnapshot.exists() ? userSnapshot.data().lastClaim?.toDate() : null;
    const canClaim = !lastClaim || now - lastClaim >= 24 * 60 * 60 * 1000;
    const reward = 200;

    if (canClaim) {
        await updateDoc(userDoc, {
            balance: increment(reward),
            lastClaim: now,
        });
        return reward;
    } else {
        return 0; // alr claimed tday
    }
}

async function getLeaderboard() {
    const leaderboardQuery = query(collection(db, 'users'), orderBy('balance', 'desc'), limit(10));
    const querySnapshot = await getDocs(leaderboardQuery);
    const leaderboard = [];
    querySnapshot.forEach(docSnapshot => {
        leaderboard.push({
            username: docSnapshot.id,
            coins: docSnapshot.data().balance,
        });
    });
    return leaderboard;
}

async function getInventory(userId) {
    const userDoc = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
        return userSnapshot.data().inventory || [];
    } else {
        await setDoc(userDoc, { inventory: [] });
        return [];
    }
}

async function stealCoins(userId, targetId) {
    const userDoc = doc(db, 'users', userId);
    const targetDoc = doc(db, 'users', targetId);
    const targetSnapshot = await getDoc(targetDoc);

    if (targetSnapshot.exists()) {
        const targetBalance = targetSnapshot.data().balance || 0;
        const stealAmount = Math.min(Math.floor(Math.random() * 50) + 1, targetBalance);

        if (stealAmount > 0) {
            await updateDoc(targetDoc, { balance: increment(-stealAmount) });
            await updateDoc(userDoc, { balance: increment(stealAmount) });
        }

        return stealAmount;
    } else {
        return 0; // brokie- or doesnt exist
    }
}

async function playSlots(userId) {
    const userDoc = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDoc);
    const balance = userSnapshot.exists() ? userSnapshot.data().balance || 0 : 0;

    if (balance < 50) {
        return { result: 'insufficient', balance };
    }

    const emojis = ['🍒', '🍋', '🍊', '🍉', '🍇', '7️⃣', '💎'];
    const result = [];
    for (let i = 0; i < 3; i++) {
        result.push(emojis[Math.floor(Math.random() * emojis.length)]);
    }

    let payout = 0;
    if (result[0] === result[1] && result[1] === result[2]) {
        payout = 200; // winner
    }

    await updateDoc(userDoc, { balance: increment(-50 + payout) });
    return { result, payout, balance: balance - 50 + payout };
}

module.exports = {
    getBalance,
    updateBalance,
    claimDailyReward,
    getLeaderboard,
    getInventory,
    stealCoins,
    playSlots,
};