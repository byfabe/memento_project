<template>
  <div class="container-main-signup">
    <h1>Memento</h1>
    <div class="container-signup">
      <p class="text-info-signup">
        <span class="bold">Inscription</span> simple et
        <span class="bold">rapide</span> pour accèder au site et retrouver la
        <span class="bold">mémoire</span> !
      </p>
      <div class="container-form">
        <form action="">
          <div class="content-form">
            <label for="user">Nom d'utilisateur</label>
            <input @input="input" name="user" type="text" id="user" required />
          </div>
          <div class="content-form">
            <label for="password">Mot de passe</label>
            <input
              @input="input"
              name="password"
              type="text"
              id="password"
              required
            />
          </div>
          <div class="content-form">
            <label for="confirm-password">Confirmer mot de passe</label>
            <input
              @input="input"
              name="password"
              type="text"
              id="confirm-password"
              required
            />
          </div>
          <div class="content-form">
            <button class="btn-form">Valider</button>
          </div>
        </form>
      </div>
      <div class="forgotpassword">
        <a href="">Mot de passe oublié ?</a>
        <span class="space-forgotpassword">|</span>
        <a href="">Se connecter</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    input(e) {
      if (e.target.value != "") {
        e.target.parentNode.classList.add("animation");
      } else if (e.target.value == "") {
        e.target.parentNode.classList.remove("animation");
      }
    },
  },
  mounted: function () {
    document.querySelector(".container-main-nav").classList.add("display");
  },
};
</script>

<style lang="scss">
.display {
  display: none;
}
.container-main-signup {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    90deg,
    hsla(14, 90%, 73%, 1) 0%,
    hsla(331, 54%, 44%, 1) 100%
  );
  & h1 {
    font-size: clamp(75px, 5vw, 150px);
    color: #fbcfc9;
    font-family: "Gloria Hallelujah", cursive;
  }
  & .container-signup {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: clamp(600px, 35%, 800px);
    height: clamp(470px, 470px, 600px);
    box-shadow: 13px 11px 40px -8px #501831;
    border-radius: 20px;
    margin-bottom: 5%;
    & .text-info-signup {
      width: 82%;
      height: 50px;
      font-size: clamp(12px, 1vw, 150px);
      color: #f1f1f1;
      font-family: "Raleway", sans-serif;
      text-align: center;
      line-height: 25px;
      margin-top: 5%;
    }
    & .bold {
      font-weight: 600;
    }
  }
}
.container-form {
  width: 30%;
  margin-top: 5%;
  & .content-form {
    position: relative;
    display: flex;
    margin-bottom: 25px;
    & label {
      position: absolute;
      top: 50%;
      left: 0;
      font-size: clamp(12px, 0.8vw, 15px);
      color: #f1f1f1;
      font-family: "Raleway", sans-serif;
      transform: translateY(-50%);
      transition: 0.4s ease-out;
      cursor: text;
    }
    & input {
      display: block;
      width: 100%;
      padding: 10px 0px;
      border: none;
      outline: none;
      background: none;
      border-bottom: 2px solid #fbcfc9;
      color: #f1f1f1;
      font-size: clamp(12px, 0.8vw, 15px);
      font-family: "Raleway", sans-serif;
      transition: 0.4s ease-out;
    }
    &:nth-child(4) {
      justify-content: center;
      margin-bottom: 50px;
      margin-top: 50px;
    }
    & .btn-form {
      width: 110px;
      font-size: clamp(12px, 0.8vw, 15px);
      border: none;
      background: none;
      cursor: pointer;
      color: #fbcfc9;
      padding: 15px;
      border: 2px solid #fbcfc9;
      border-radius: 30px;
    }
    &:focus-within label,
    &.animation label {
      top: 0;
      transform: translateY(-100%);
      color: #f3ccc1;
      font-size: clamp(12px, 0.5vw, 15px);
    }
  }
}
.forgotpassword {
  display: flex;
  justify-content: center;
  width: 100%;
  & .space-forgotpassword {
    margin: 0 8px 0 8px;
    color: #501831;
  }
  & a {
    text-decoration: none;
    font-size: clamp(12px, 0.8vw, 150px);
    font-family: "Raleway", sans-serif;
    color: #fbcfc9;
    border-bottom: 2px solid transparent;
    &:hover {
      border-bottom-color: #fbcfc9;
    }
  }
}
</style>