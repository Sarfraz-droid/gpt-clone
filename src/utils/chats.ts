import prisma from "@/db";
import { Chats, TransformedChats } from "@/types/api";
import dayjs from "dayjs";
import { faker } from "@faker-js/faker";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const mockChats: Chats[] = [
  {
    createdAt: dayjs("2020-01-02").toDate(),
    id: Math.random(),
    title: faker.lorem.text(),
    user_id: Math.random().toString(),
  },
  {
    createdAt: dayjs().toDate(),
    id: Math.random(),
    title: "Today Title",
    user_id: Math.random().toString(),
  },
  {
    createdAt: dayjs("2024-04-01").toDate(),
    id: Math.random(),
    title: faker.lorem.text(),
    user_id: Math.random().toString(),
  },
  {
    createdAt: dayjs("2024-04-20").toDate(),
    id: Math.random(),
    title: faker.lorem.text(),
    user_id: Math.random().toString(),
  },
] as Chats[];

export const getChats = async (userId: string) => {
  const data = await prisma.chat.findMany({
    where: {
      user_id: userId,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });

  return data;
};

export const updateChat = async (chat: Chats) => {
  const data = await prisma.chat.update({
    where: {
      id: chat.id,
    },
    data: {
      title: chat.title,
    },
  });

  return data;
};

export const deleteChat = async (chatId: number) => {
  await prisma.message.deleteMany({
    where: {
      chatId,
    },
  });

  const data = await prisma.chat.delete({
    where: {
      id: chatId,
    },
  });

  return data;
};

const createChatTransformerMaps = () => {
  const today = dayjs();
  const previous7Days = dayjs().subtract(7, "days");
  const previous30Days = dayjs().subtract(30, "days");
  let yearMonths = [];

  const currentMonth = dayjs().month();
  for (let i = 1; i <= currentMonth; i++) {
    yearMonths.push(dayjs().subtract(i, "months"));
  }

  const pastYear = dayjs().subtract(1, "years");

  let tags = [
    {
      date: (date: string) => dayjs().isSame(date, "date"),
      text: "Today",
    },
    {
      date: (date: string) => previous7Days.isBefore(date, "date"),
      text: "Previous 7 Days",
    },
    {
      date: (date: string) => previous30Days.isBefore(date, "date"),
      text: "Previous 30 Days",
    },
  ];

  yearMonths.forEach((m) => {
    tags.push({
      date: (date: string) => m.isSame(date, "month"),
      text: months[m.month()],
    });
  });

  tags.push({
    date: (date: string) => pastYear.isSame(date, "year"),
    text: pastYear.year().toString(),
  });

  tags.push({
    date: (date: string) => true,
    text: "Past",
  });

  return tags;
};

export const transformChats = (chats: Chats[]) => {
  const chatMaps = createChatTransformerMaps();

  let result = chatMaps.map(
    (res) =>
      ({
        text: res.text,
        children: [],
      } as TransformedChats)
  );

  chats.forEach((chat) => {
    const dateString = dayjs(chat.createdAt).format("YYYY/MM/DD");
    for (let i = 0; i < chatMaps.length; i++) {
      if (chatMaps[i].date(dateString)) {
        result[i].children.push(chat);
        break;
      }
    }
  });

  result = result.filter((v) => v.children.length > 0);

  return result;
};
