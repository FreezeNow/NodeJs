import vue_app_blog from './vue_app_blog';

const changePosition = () => {
  const { blogsData, sidebarData } = vue_app_blog;
  if (document.documentElement.clientWidth < 1017) {
    blogsData.blogsClass.blogsMinPosition = true;
    sidebarData.sidebarClass.sidebarMinPosition = true;
  } else {
    blogsData.blogsClass.blogsMinPosition = false;
    sidebarData.sidebarClass.sidebarMinPosition = false;
  }
};
changePosition();

export default {
  changePosition,
}