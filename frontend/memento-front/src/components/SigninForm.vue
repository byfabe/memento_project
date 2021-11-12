<template>
  <div class="container-main-signup">
    <h1>Memento</h1>
    <div class="container-signup">
      <p class="text-info-signup">
        Connecter vous à votre
        <span class="bold">compte</span> !
      </p>
      <div class="container-form">
        <Form method="" action="">
          <div class="content-form">
            <label for="mail">E-mail</label>
            <Field
              @input="input"
              name="email"
              id="mail"
              :rules="emailRules"
              v-model="email"
              :placeholder="[[placeholderMail]]"
            />
          </div>
          <div class="content-form">
            <label for="password">Mot de passe</label>
            <Field
              @input="input"
              name="password"
              type="password"
              id="password"
              :rules="passwordRules"
              v-model="password"
              :placeholder="[[placeholderPass]]"
            />
          </div>
          <div class="content-form form-btn">
            <div class="container-error">
              <div class="error-mail">
                <ErrorMessage name="email" class="error" />
              </div>
              <div class="error-password">
                <ErrorMessage name="password" class="error" />
              </div>
            </div>
            <button
              @click="validation()"
              :disabled="!isComplete"
              class="btn-form"
            >
              Valider
            </button>
          </div>
        </Form>
      </div>
      <div class="forgotpassword">
        <a href="">Mot de passe oublié ?</a>
        <span class="space-forgotpassword">|</span>
        <a href="#/">Créer un compte</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapGetters } from "vuex";
import { setLocale } from "yup";
setLocale({
  string: {
    email: "Email invalide",
    min: "Mot de passe min. 8 caractères",
  },
  mixed: {
    required: ""
  }
});
export default {
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    return {
      emailRules: yup.string().required().email(),
      passwordRules: yup.string().required().min(8),
      email: "",
      password: "",
    };
  },
  methods: {
    input(e) {
      if (this.email || this.placeholderMail != "") {
        e.target.parentNode.classList.add("animation");
      } else if (this.email || this.placeholderMail == "") {
        e.target.parentNode.classList.remove("animation");
      }
    },
    // emailValidation() {
    //   if (/.+@.+/.test(this.email)) {
    //     this.placeholderMail = "";
    //     return true;
    //   } else {
    //     this.email = "";
    //     this.placeholderMail = "Email incorrect";
    //     return false;
    //   }
    // },
    // passValidation() {
    //   if (this.password >= 8) {
    //     this.placeholderPass = "";
    //     return true;
    //   } else {
    //     this.password = "";
    //     this.placeholderPass = "Min. 8 caractères";
    //     return false;
    //   }
    // },
    validation() {
      let valueForm = {
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch("fetchAuth", {
          endpoint: "auth/login",
          valueForm: valueForm,
          method: "POST",
        })
        .then((response) => response.json())
        .then((data) => {
          this.$store.commit("ADD_PROFILE", data);
          let logic = true;
          this.$store.commit("ADD_ENTER", logic);
          if (data) {
            document.location.href = "#/loisir";
          }
          console.log("dataOK", data);
        });
    },
  },
  computed: {
    ...mapGetters(["getEnter"]),
    isComplete() {
      return this.email != "" && this.password != "";
    },
  },
  mounted: function () {},
};
</script>

<style scoped lang="scss">
.container-main-signup {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: clamp(600px, 100vw, 100vw);
  height: 100vh;
  background: linear-gradient(
    -90deg,
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
    justify-content: space-around;
    width: clamp(600px, 35%, 800px);
    height: clamp(470px, 470px, 600px);
    min-height: 470px;
    margin-bottom: 150px;
    box-shadow: 13px 11px 40px -8px #501831;
    border-radius: 20px;

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
form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.container-form {
  width: 100%;
  margin-top: 5%;
  & .content-form {
    position: relative;
    display: flex;
    justify-content: center;
    width: 30%;
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
      &::-webkit-input-placeholder {
        color: rgba(255, 0, 0, 0.774);
      }
    }
    &:nth-child(3) {
      justify-content: center;
      margin-bottom: 10px;
      margin-top: 50px;
    }
    & .btn-form {
      position: relative;
      width: 110px;
      font-size: clamp(12px, 0.8vw, 15px);
      border: none;
      background: none;
      cursor: pointer;
      color: #fbcfc9;
      padding: 15px;
      border: 2px solid #fbcfc9;
      border-radius: 30px;
      &:disabled {
        cursor: not-allowed;
        opacity: 0.2;
      }
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
.container-error {
  position: absolute;
  display: flex;
  justify-content: space-around;
  top: -30px;
  width: 300px;
  height: 20px;
  color: #e20000;
  font-size: clamp(12px, 0.6vw, 15px);
  font-family: "Raleway", sans-serif;
  text-align: center;
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