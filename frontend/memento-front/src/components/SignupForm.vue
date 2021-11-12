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
        <Form
          class="form"
          @submit="onSubmit"
          :validation-schema="schema"
          @invalid-submit="onInvalidSubmit"
        >
          <TextInput
            v-model="email"
            name="email"
            type="email"
            label="E-mail"
            placeholder="Votre adresse email"
            success-message="Got it, we won't spam you!"
          />
          <TextInput
            v-model="password"
            name="password"
            type="password"
            label="Mot de passe"
            placeholder="Votre mot de passe"
            success-message="Nice and secure!"
          />
          <TextInput
            name="confirm_password"
            type="password"
            label="Confirmer mot de passe"
            placeholder="Entrez à nouveau"
            success-message="Glad you remembered it!"
          />

          <button class="submit-btn" type="submit">S'inscrire</button>
        </Form>
      </div>
      <div class="forgotpassword">
        <a href="">Mot de passe oublié ?</a>
        <span class="space-forgotpassword">|</span>
        <a href="#/signin">Se connecter</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Form } from "vee-validate";
import * as Yup from "yup";
import TextInput from "../components/TextInput.vue";
import { setLocale } from "yup";
setLocale({
  string: {
    email: "Email invalide",
    min: "Mot de passe min. 6 caractères",
  },
  mixed: {
    required: "",
  },
});
export default {
  name: "SignupForm",
  components: {
    TextInput,
    Form,
  },
  setup() {
    function onSubmit(values) {
     let value = JSON.stringify(values);
      console.log(value);
    }

    function onInvalidSubmit() {
      const submitBtn = document.querySelector(".submit-btn");
      submitBtn.classList.add("invalid");
      console.log("ko");
      setTimeout(() => {
        submitBtn.classList.remove("invalid");
      }, 1000);
    }

    // Using yup to generate a validation schema
    // https://vee-validate.logaretm.com/v4/guide/validation#validation-schemas-with-yup
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      confirm_password: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "Mot de passe non identique"),
    });

    return {
      email: "",
      password: "",
      onSubmit,
      schema,
      onInvalidSubmit,
    };
  },
  // data() {
  //   return {

  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //     placeholderMail: "",
  //     placeholderPass: "",
  //     placeholderConfirmPass: "",
  //   };
  // },
  methods: {
    input(e) {
      if (
        this.email != "" ||
        this.placeholderMail != "" ||
        this.password != "" ||
        this.confirmPassword != ""
      ) {
        e.target.parentNode.classList.add("animation");
      } else if (
        this.email == "" ||
        this.placeholderMail == "" ||
        this.password == "" ||
        this.confirmPassword == ""
      ) {
        e.target.parentNode.classList.remove("animation");
      }
    },
    emailValidation() {
      if (/.+@.+/.test(this.email)) {
        this.placeholderMail = "";
        return true;
      } else {
        this.email = "";
        this.placeholderMail = "Email incorrect";
        return false;
      }
    },
    passValidation() {
      if (this.password >= 8) {
        this.placeholderPass = "";
        return true;
      } else {
        this.password = "";
        this.placeholderPass = "Min. 8 caractères";
        return false;
      }
    },
    passConfirmValidation() {
      if (this.confirmPassword === this.password) {
        this.placeholderConfirmPass = "";
        return true;
      } else {
        this.confirmPassword = "";
        this.placeholderConfirmPass = "Mot de passe non identique";
        return false;
      }
    },
    validation() {
      if (
        this.emailValidation() &&
        this.passValidation() &&
        this.passConfirmValidation() === true
      ) {
        let valueForm = {
          email: this.email,
          password: this.password,
        };
        this.$store
          .dispatch("fetchAuth", {
            endpoint: "auth/signup",
            valueForm: valueForm,
            method: "POST",
          })
          .then((response) => response.json())
          .then((data) => {
            console.log("dataOK", data);
          });
        document.location.href = "#/loisir";
      }
    },
  },
  computed: {
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
// .container-form {
//   width: 30%;
//   margin-top: 5%;
//   & .content-form {
//     position: relative;
//     display: flex;
//     margin-bottom: 25px;
//     & label {
//       position: absolute;
//       top: 50%;
//       left: 0;
//       font-size: clamp(12px, 0.8vw, 15px);
//       color: #f1f1f1;
//       font-family: "Raleway", sans-serif;
//       transform: translateY(-50%);
//       transition: 0.4s ease-out;
//       cursor: text;
//     }
//     & input {
//       display: block;
//       width: 100%;
//       padding: 10px 0px;
//       border: none;
//       outline: none;
//       background: none;
//       border-bottom: 2px solid #fbcfc9;
//       color: #f1f1f1;
//       font-size: clamp(12px, 0.8vw, 15px);
//       font-family: "Raleway", sans-serif;
//       transition: 0.4s ease-out;
//       &::-webkit-input-placeholder {
//         color: rgba(255, 0, 0, 0.774);
//       }
//     }
//     &:nth-child(4) {
//       justify-content: center;
//       margin-bottom: 20px;
//       margin-top: 40px;
//     }
//     & .btn-form {
//       width: 110px;
//       font-size: clamp(12px, 0.8vw, 15px);
//       border: none;
//       background: none;
//       cursor: pointer;
//       color: #fbcfc9;
//       padding: 15px;
//       border: 2px solid #fbcfc9;
//       border-radius: 30px;
//       &:disabled {
//         cursor: not-allowed;
//         opacity: 0.2;
//       }
//     }
//     &:focus-within label,
//     &.animation label {
//       top: 0;
//       transform: translateY(-100%);
//       color: #f3ccc1;
//       font-size: clamp(12px, 0.5vw, 15px);
//     }
//   }
// }
// .container-error {
//   position: absolute;
//   display: flex;
//   justify-content: space-around;
//   top: -30px;
//   width: 450px;
//   height: 20px;
//   color: #e20000;
//   font-size: clamp(12px, 0.6vw, 15px);
//   font-family: "Raleway", sans-serif;
//   text-align: center;
// }
.forgotpassword {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 15px;
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

//New css

$primary-color: #c25172;
$error-color: #f23648;
$error-bg-color: #fddfe2;
$success-color: #21a67a;
$success-bg-color: #e0eee4;

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  margin: 0px auto;
  padding-top: 30px;
  padding-bottom: 30px;
}

.submit-btn {
  background: $primary-color;
  outline: none;
  border: none;
  color: #fff;
  font-size: 18px;
  font-family: "Raleway", sans-serif;
  padding: 10px 15px;
  display: block;
  width: 50%;
  //margin-top: 40px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  border: 2px solid #fbcfc9;
  border-radius: 30px;
}

.submit-btn.invalid {
  animation: shake 0.3s;
  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px);
  }
  10% {
    transform: translate(-1px, -2px);
  }
  20% {
    transform: translate(-3px, 0px);
  }
  30% {
    transform: translate(3px, 2px);
  }
  40% {
    transform: translate(1px, -1px);
  }
  50% {
    transform: translate(-1px, 2px);
  }
  60% {
    transform: translate(-3px, 1px);
  }
  70% {
    transform: translate(3px, 1px);
  }
  80% {
    transform: translate(-1px, -1px);
  }
  90% {
    transform: translate(1px, 2px);
  }
  100% {
    transform: translate(1px, -2px);
  }
}

.submit-btn:hover {
  transform: scale(1.05);
}
</style>