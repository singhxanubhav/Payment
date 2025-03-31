
// export default function() {
//     return <div>
//         Transactions
//     </div>
// }

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { P2PTransactions } from "../../../components/P2PTransactions";

async function getP2PTransactions() {
    const session = await getServerSession(authOptions);
    if (!session) return [];

    const txns = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: Number(session.user.id) },
                { toUserId: Number(session.user.id) }
            ]
        },
        include: {
            fromUser: { select: { name: true } },
            toUser: { select: { name: true } }
        },
        orderBy: { timestamp: "desc" }
    });

    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        sender: t.fromUser.name,
        receiver: t.toUser.name
    }));
}

export default async function TransactionsPage() {
    const transactions = await getP2PTransactions();

    return (
        <div className="w-screen p-4">
            <h1 className="text-4xl font-bold text-[#6a51a6] mb-6">Transactions</h1>

            {/* Show P2P Transactions */}
            <P2PTransactions transactions={transactions} />
        </div>
    );
}
