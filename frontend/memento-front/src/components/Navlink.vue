<template>
  <div class="container-main-nav">
    <div class="menu">
      <a href=""><i class="fas fa-plus icon-menu icon-menu-all"></i></a>
      <a href=""><i class="fas fa-user icon-menu icon-menu-all"></i></a>
    </div>
  </div>
</template>

<style lang="scss">
.container-main-nav {
  display: flex;
  align-items: center;
}
.menu {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 20%;
  width: clamp(150px, 15vw, 200px);
  height: 40%;
  box-shadow: 13px 11px 32px -8px rgba(0, 0, 0, 0.507);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.icon-menu {
  font-size: clamp(15px, 4vw, 50px);
  color: #F78D79;
  transition: ease-in 0.3s;
}
.icon-menu2 {
  font-size: clamp(15px, 4vw, 50px);
  color: rgba(0, 98, 128, 0.836);
  transition: ease-in 0.2s;
}
.icon-menu3 {
  font-size: clamp(15px, 4vw, 50px);
  color: #33C77C;
  transition: ease-in 0.3s;
}
</style>