import { PrismaClient, Prisma } from "../../generated/prisma";

const prisma = new PrismaClient();

const userData = [
  {
    email: "user1@example.com",
    fullName: "Alice",
    password: "123456",
    profile: "Hello, I'm Alice!",
    createdAt: "2025-07-12T08:30:00Z",
    updatedAt: "2025-07-12T08:30:00Z",
  },
  {
    email: "user2@example.com",
    fullName: "Bob",
    password: "123456",
    profile: "Hey there, I'm Bob.",
    createdAt: "2025-07-12T09:15:00Z",
    updatedAt: "2025-07-12T09:15:00Z",
  },
  {
    email: "user3@example.com",
    fullName: "Charlie",
    password: "123456",
    profile: "Charlie here, nice to meet you!",
    createdAt: "2025-07-12T10:00:00Z",
    updatedAt: "2025-07-12T10:00:00Z",
  },
  {
    email: "user4@example.com",
    fullName: "Diana",
    password: "123456",
    profile: "",
    createdAt: "2025-07-12T10:30:00Z",
    updatedAt: "2025-07-12T10:30:00Z",
  },
  {
    email: "user5@example.com",
    fullName: "Ethan",
    password: "123456",
    profile: "Ethan reporting in!",
    createdAt: "2025-07-12T11:00:00Z",
    updatedAt: "2025-07-12T11:00:00Z",
  },
];

const messageData = [
  {
    id: 1,
    senderId: 1,
    receiverId: 2,
    content: "Hey Bob, how's it going?",
    image: null,
    createdAt: "2025-07-12T12:00:00Z",
    updatedAt: "2025-07-12T12:00:00Z",
  },
  {
    id: 2,
    senderId: 2,
    receiverId: 1,
    content: "Hi Alice! I'm doing great, thanks!",
    image: null,
    createdAt: "2025-07-12T12:05:00Z",
    updatedAt: "2025-07-12T12:05:00Z",
  },
  {
    id: 3,
    senderId: 3,
    receiverId: 4,
    content: "Diana, are you free later?",
    image: null,
    createdAt: "2025-07-12T13:00:00Z",
    updatedAt: "2025-07-12T13:00:00Z",
  },
  {
    id: 4,
    senderId: 5,
    receiverId: 3,
    content: "Charlie, want to grab coffee?",
    image: null,
    createdAt: "2025-07-12T14:00:00Z",
    updatedAt: "2025-07-12T14:00:00Z",
  },
  {
    id: 5,
    senderId: 4,
    receiverId: 5,
    content: "Sure, let's meet at 5.",
    image: null,
    createdAt: "2025-07-12T14:05:00Z",
    updatedAt: "2025-07-12T14:05:00Z",
  },
];

const createMany = await prisma.user.createMany({
  data: userData,
  skipDuplicates: true,
});

await prisma.message.createMany({
  data: messageData,
  skipDuplicates: true,
});

const result = await prisma.user.findMany();

console.log(result);
