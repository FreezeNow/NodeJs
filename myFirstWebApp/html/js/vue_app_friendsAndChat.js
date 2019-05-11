import Vue from "./vue";
import vue_app_friendsAndChat_data from "./vue_app_friendsAndChat_data";
import vue_app_friendsAndChat_methods from "./vue_app_friendsAndChat_methods";

const {vFriendsAndChatData} = vue_app_friendsAndChat_data;
const {vFriendsAndChatMethods} = vue_app_friendsAndChat_methods;

const vFriendsAndChat = new Vue({
  el: '#friends',
  data: vFriendsAndChatData,
  methods: vFriendsAndChatMethods,
});

Vue.use(
  vFriendsAndChat,
);

export default {
  vFriendsAndChatData,
}