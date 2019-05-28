import Vue from "./vue";
import vue_app_friendsAndChat_data from "./vue_app_friendsAndChat_data";
import vue_app_friendsAndChat_methods from "./vue_app_friendsAndChat_methods";

const { vFriendsData, vAddFriendWindowData } = vue_app_friendsAndChat_data;
const { vFriendsMethods, vAddFriendWindowMethods } = vue_app_friendsAndChat_methods;

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

Vue.use(
  vFriends,
  vAddFriendWindow,
);

export default {
  vFriendsData,
  vAddFriendWindowData,
}