import {
  Chat,
  PrivateChannel,
  PublicChannel,
  joinPrivateChannel,
  PrivateMessage,
  DirectMessage,
  PublicChannelMessage,
  GetPrivateConversations,
} from '../entities/chat.entity';

export class CreateChatDto extends Chat {}

export class CreatePrivateChannelDto extends PrivateChannel {}

export class JoinPublicChannelDto extends PublicChannel {}

export class JoinPrivateChannelDto extends joinPrivateChannel {}

export class PrivateMessageDto extends PrivateMessage {}

export class DirectMessageDto extends DirectMessage {}

export class PublicChannelMessageDto extends PublicChannelMessage {}

export class GetPrivateConversationsDto extends GetPrivateConversations {}