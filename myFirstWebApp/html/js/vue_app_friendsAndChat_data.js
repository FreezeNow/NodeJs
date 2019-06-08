const vFriendsData = {
  friendsList: [
    {
      listName: '我的好友',
      friends: [
        {
          name: '波波',
          signature: '我是最美的白莲花',
        },
        {
          name: '沐',
          signature: '队友真菜',
        },
        {
          name: '沐',
          signature: '队友真菜',
        },
        {
          name: '沐',
          signature: '队友真菜',
        },
        {
          name: '沐',
          signature: '队友真菜',
        },
        {
          name: '沐',
          signature: '队友真菜',
        },
        {
          name: '沐',
          signature: '队友真菜',
        },
        {
          name: '沐',
          signature: '队友真菜',
        },
      ],
      friendsStyle: '',
    },
    {
      listName: '基友',
      friends: [
        {
          name: '骚猪',
          signature: '...',
        },
        {
          name: '骚猪',
          signature: '...',
        },
      ],
      friendsStyle: '',
    },
    {
      listName: '聊天测试',
      friends: [
        {
          name: 'root',
          signature: ' ',
        },
        {
          name: 'a',
          signature: ' ',
        }
      ],
      friendsStyle: '',
    }
  ],
};

const vAddFriendWindowData = {
  afwClass: {
    off: true,
  },
  searchBarMsg: '',
  searchResultList: [],
};

const vChatroomData = {
  inputChatMsg: '',
  chatMsgList: [],
  socket: null,
}

export default {
  vFriendsData,
  vAddFriendWindowData,
  vChatroomData,
};
