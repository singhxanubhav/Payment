import { Card } from "@repo/ui/card";

export const P2PTransactions = ({
    transactions
}: {
    transactions: {
        time: Date;
        amount: number;
        sender: string;
        receiver: string;
    }[];
}) => {
    if (!transactions.length) {
        return (
            <Card title="P2P Transactions">
                <div className="text-center pb-8 pt-8">No Recent Transactions</div>
            </Card>
        );
    }

    return (
        <Card title="P2P Transactions">
            <div className="pt-2">
                {transactions.map((t, index) => (
                    <div key={index} className="flex justify-between border-b py-2">
                        <div>
                            <div className="text-sm">Sent to {t.receiver}</div>
                            <div className="text-slate-600 text-xs">{t.time.toDateString()}</div>
                        </div>
                        <div className="flex flex-col justify-center text-right">
                            <span className="text-red-500">- ₹{t.amount}</span>
                            <span className="text-xs text-gray-500">From: {t.sender}</span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
