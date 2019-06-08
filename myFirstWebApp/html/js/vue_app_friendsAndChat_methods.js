import vue_app_friendsAndChat_data from "./vue_app_friendsAndChat_data";
import common_ajax from "./common_ajax";
import common_cookie from "./common_cookie";
import vue_component_header from './vue_component_header';

const { vFriendsData, vAddFriendWindowData, vChatroomData } = vue_app_friendsAndChat_data;
const { ajax } = common_ajax;
const { getCookie } = common_cookie;
const { vHeader } = vue_component_header;

const vFriendsMethods = {
  showClick(event) {
    const target = event.target;
    if (target.className === 'friendsList') {
      const index = target.getAttribute('index');
      // 设置为空或者为单个好友列的高度*被点击列的friends属性的长度
      vFriendsData.friendsList[index].friendsStyle =
        vFriendsData.friendsList[index].friendsStyle ?
          '' : `
          height: ${target.children[0].children[0].offsetHeight * Object.keys(vFriendsData.friendsList[index].friends).length}px
        `;
    }
  },
  addFriendClick() {
    vAddFriendWindowData.afwClass.off = false;
  }
};

const vAddFriendWindowMethods = {
  afCloseWindowClick() {
    vAddFriendWindowData.afwClass.off = true;
    vAddFriendWindowData.searchBarMsg = "";
    vAddFriendWindowData.searchResultList = [];
  },
  btnaAfRearchClick() {
    if (vAddFriendWindowData.searchBarMsg.length > 0) {
      ajax('ajaxSearchUser', 'POST', {
        data: {
          searchBarMsg: vAddFriendWindowData.searchBarMsg
        },
        callback: (result) => {
          vAddFriendWindowData.searchResultList = result;
        }
      })
    } else {
      vAddFriendWindowData.searchBarMsg = '请输入需要查询的内容';
      setTimeout(() => {
        this.$refs.searchBarRef.focus();
        this.$refs.searchBarRef.setSelectionRange(0, vAddFriendWindowData.searchBarMsg.length);
      }, 0);

    }
  }
};

const vChatroomMethods = {

  initWebSocket() {
    let name;
    vHeader.$children.forEach((child) => {
      if (child.user && child.login) {
        name = child.name;
      }
    });
    const url = `ws://localhost:3000/from=${name}&to=${name === 'a' ? 'root' : 'a'}`;
    console.log(`url: ${url}`);
    
    this.socket = new WebSocket(url);
    this.socket.onmessage = this.webSocketOnMessage;
    this.socket.onerror = this.webSocketOnError;
  },
  webSocketOnMessage(result) {
    console.log('收到');
    const data = JSON.parse(result.data);
    console.log(data);
    this.chatMsgList.push(data);
  },
  webSocketOnError(error) {
    console.error(error);
  },
  sendChatMsgClick() {
    let name;
    vHeader.$children.forEach((child) => {
      if (child.user && child.login) {
        name = child.name;
      }
    });
    const sendData = {
      // name: getCookie('name').trim() === '' ? '游客' : getCookie('name').trim(),
      name,
      content: this.inputChatMsg,
    }
    if (!this.socket) {
      const url = 'ws://localhost:8000/';
      this.socket = new WebSocket(url);
    }
    const sendInter = setInterval(() => {
      if (this.socket.readyState === 1) {
        clearInterval(sendInter);
        this.socket.send(JSON.stringify(sendData));
        this.chatMsgList.push(sendData);
      }
    }, 1);
  }
};

export default {
  vFriendsMethods,
  vAddFriendWindowMethods,
  vChatroomMethods,
};
