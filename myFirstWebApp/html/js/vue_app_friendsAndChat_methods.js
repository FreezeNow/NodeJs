import vue_app_friendsAndChat_data from "./vue_app_friendsAndChat_data";
import common_ajax from "./common_ajax";

const { vFriendsData, vAddFriendWindowData } = vue_app_friendsAndChat_data;
const { ajax } = common_ajax;

const vFriendsMethods = {
  showClick(event) {
    const target = event.target;
    if (target.className === 'friendsList') {
      const index = target.getAttribute('index');
      // 设置为空或者为单个好友列的高度*被点击列的friends属性的长度0
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
}

export default {
  vFriendsMethods,
  vAddFriendWindowMethods,
}