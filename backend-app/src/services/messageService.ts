import prisma from "../utils/deHepler";

export async function getUserForSider(userId: number) {
  const filterUsers = await prisma.user.findMany({
    where: {
      id: {
        not: userId,
      },
    },
    omit: {
      password: true,
    },
  });

  return filterUsers;
}

export async function getMessages(myId: number, userToChatId: number) {
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    },
  });

  return messages;
}
