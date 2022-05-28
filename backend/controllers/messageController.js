import { catchAsync, CustomErrorHandler } from "../utils";
import { User, Chat, Message } from "../models";

export const allMessages = catchAsync(async (req, res, next) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.status(200).json(messages);
  } catch (error) {
    return next(new CustomErrorHandler(400, error.message));
  }
});

export const sendMessage = catchAsync(async (req, res, next) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return next(new CustomErrorHandler(400, "Invalid data passed into request"));
  }

  var newMessage = {
    sender: req.user.id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender");
    message = await message.populate("chat");

    await Chat.findByIdAndUpdate(
      req.body.chatId,
      { latestMessage: message },
      {
        new: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json(message);
  } catch (error) {
    return next(new CustomErrorHandler(400, error.message));
  }
});
