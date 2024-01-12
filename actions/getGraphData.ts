import { DeliveryStatus } from "@prisma/client";
import moment from "moment";
import prisma from "@/app/_lib/prismadb";

export const getGraphData = async () => {
  try {
    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");

    const result = await prisma.order.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        deliveryStatus: DeliveryStatus.completed,
      },
      _sum: { amount: true },
    });

    const aggregateData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};

    const currentDate = startDate.clone();

    while (currentDate <= endDate) {
      const day = currentDate.format("dddd");

      aggregateData[day] = {
        day,
        date: currentDate.format("YYYY-MM-DD"),
        totalAmount: 0,
      };

      currentDate.add(1, "day");
    }

    result.forEach((entry) => {
      const day = moment(entry.createdAt).format("dddd");
      const amount = entry._sum.amount || 0;
      aggregateData[day].totalAmount += amount;
    });

    const formattedData = Object.values(aggregateData).sort((a, b) => {
      return moment(a.date).diff(moment(b.date));
    });

    return formattedData;
  } catch (error) {
    throw new Error("Failed to fetch GraphData.");
  }
};
