import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type TransType = {
  date: string;
  amount: number;
  type: string;
};

type ChartDataType = {
  day: string;
  Expense: number;
  Income: number;
};

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function WeeklyGraph() {
  const [chartData, setChartData] = useState<ChartDataType[]>([]);
  const [totalSpendings, setTotalSpendings] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3001/api/trans/get-trans", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch:", res.status);
          return;
        }

        const json = await res.json();
        const rawTrans: TransType[] = json.transaction;

        // Get the start and end of the current week
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 7); // Next Sunday
        endOfWeek.setHours(0, 0, 0, 0);

        const weeklyData: Record<string, ChartDataType> = {};
        for (let i = 0; i < 7; i++) {
          const day = dayNames[i];
          weeklyData[day] = { day, Expense: 0, Income: 0 };
        }

        let totalExpense = 0;
        let totalIncome = 0;

        rawTrans.forEach((tx) => {
          const txDate = new Date(tx.date);
          if (txDate >= startOfWeek && txDate < endOfWeek) {
            const day = dayNames[txDate.getDay()];
            if (weeklyData[day]) {
              weeklyData[day][tx.type as "Income" | "Expense"] += tx.amount;
              if (tx.type === "Expense") totalExpense += tx.amount;
              if (tx.type === "Income") totalIncome += tx.amount;
            }
          }
        });

        const change =
          totalExpense === 0
            ? 0
            : ((totalIncome - totalExpense) / totalExpense) * 100;

        setTotalSpendings(totalExpense);
        setPercentageChange(change);

        const orderedDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const finalData = orderedDays.map((d) => weeklyData[d]);

        setChartData(finalData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white/10 rounded-xl p-4 shadow-sm h-98 flex flex-col ">
      <div className="mb-4">
        <h2 className="text-lg font-medium text-white">Weekly Spending</h2>
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-white">
            ₹{totalSpendings.toFixed(2)}
          </span>
          <span
            className={`ml-2 text-sm ${
              percentageChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {percentageChange >= 0 ? "+" : ""}
            {percentageChange.toFixed(0)}%
          </span>
        </div>
      </div>

      <div className="flex-1 rounded-lg text-gray-600">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f3f4f6"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              width={40}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                fontSize: "12px",
              }}
              itemStyle={{ color: "#1f2937" }}
            />
            <Line
              type="monotone"
              dataKey="Expense"
              stroke="#ef4444"
              strokeWidth={1.5}
              dot={{ r: 3, fill: "#ef4444" }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="Income"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3, fill: "#10b981" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
