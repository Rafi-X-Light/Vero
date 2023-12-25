 
```javascript
module.exports = {
  config: {
    name: "forwardMessage",
    aliases: ["forward"],
    role: 1,
    shortDescription: {
      en: "Forward a specific user's message to admin inbox",
      tl: "I-forward ang mensahe ng tiyak na user sa admin inbox"
    },
    longDescription: {
      en: "This command allows you to forward a message sent by a specific user to the admin inbox.",
      tl: "Ang command na ito ay nagbibigay-daan sa iyo na i-forward ang mensahe na ipinadala ng tiyak na user sa admin inbox."
    },
    category: "goatBot",
    guide: {
      en: "{p}forwardMessage <user ID> <message>",
      tl: "{p}forwardMessage <user ID> <mensahe>"
    },
  },
  onStart: async function ({ event, message, args, threadsData, usersData, api }) {
    const adminInboxId = "100077513002567"; // Replace ADMIN_INBOX_ID with the actual admin inbox thread ID

    if (args.length < 2) {
      message.reply("Invalid command usage. Please provide the user ID and the message to forward.");
      return;
    }

    const userId = args[0];
    const message = args.slice(1).join(" ");

    const userThreads = await api.getThreadList(10, null, ["INBOX"]);
    const userThread = userThreads.find(t => t.threadID === userId);

    if (!userThread) {
      message.reply("User not found. Please enter a valid user ID.");
      return;
    }

    const adminInboxThread = await api.getThreadInfo(adminInboxId);

    if (!adminInboxThread) {
      message.reply("Admin inbox not found. Please set up the admin inbox thread ID.");
      return;
    }

    const forwardedMessage = `Forwarded message from user ${userId}:\${message}`;
    api.sendMessage(forwardedMessage, adminInboxId);
    message.reply("The message has been forwarded to the admin inbox.");
  }
};