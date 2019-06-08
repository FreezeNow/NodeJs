import Vue from "./vue";
import vue_app_friendsAndChat_data from "./vue_app_friendsAndChat_data";
import vue_app_friendsAndChat_methods from "./vue_app_friendsAndChat_methods";

const { vFriendsData, vAddFriendWindowData, vChatroomData } = vue_app_friendsAndChat_data;
const { vFriendsMethods, vAddFriendWindowMethods, vChatroomMethods } = vue_app_friendsAndChat_methods;

const vFriends = new Vue({
  el: '#friends',
  data: vFriendsData,
  methods: vFriendsMethods,
});

const vAddFriendWindow = new Vue({
  el: '#addFriendWindow',
  data: vAddFriendWindowData,
  methods: vAddFriendWindowMethods,
});

const vChatroom = new Vue({
  el: '#vChatroom',
  data: vChatroomData,
  methods: vChatroomMethods,
  mounted() {
    setTimeout(() => {
      this.initWebSocket();
    }, 0);
    
    
  }
});

Vue.use(
  vFriends,
  vAddFriendWindow,
  vChatroom,
);


export default {
  vFriendsData,
  vAddFriendWindowData,
  vChatroomData,
}