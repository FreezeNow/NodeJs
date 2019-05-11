import vue_app_friendsAndChat_data from "./vue_app_friendsAndChat_data";

const {vFriendsAndChatData} = vue_app_friendsAndChat_data;

const vFriendsAndChatMethods = {
  showClick(event) {
    // if (vFriendsAndChatData.friendsClass.off) {
    //   vFriendsAndChatData.friendsClass.off = false;
    // } else {
    //   vFriendsAndChatData.friendsClass.off = true;
    // }
    const target = event.target;
    if (target.className === 'friendsList') {
      const index = target.getAttribute('index');
      // vFriendsAndChatData.friendsList[index].friendsClass.off = 
      //   vFriendsAndChatData.friendsList[index].friendsClass.off ? false : true;
      vFriendsAndChatData.friendsList[index].friendsStyle = 
        vFriendsAndChatData.friendsList[index].friendsStyle ? 
        '' : `
          height: ${target.children[0].children[0].offsetHeight * Object.keys(vFriendsAndChatData.friendsList[index].friends).length}px
        `;
      // console.log(vFriendsAndChatData.friendsList[index].friendsStyle);
    }
  },
};

export default {
  vFriendsAndChatMethods,
}