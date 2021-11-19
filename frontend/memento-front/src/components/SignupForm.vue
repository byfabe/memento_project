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
            name="email"
            type="email"
            label="E-mail"
            placeholder="Votre adresse email"
          />
          <TextInput
            name="password"
            type="password"
            label="Mot de passe"
            placeholder="Votre mot de passe"
          />
          <TextInput
            name="confirm_password"
            type="password"
            label="Confirmer mot de passe"
            placeholder="Entrez à nouveau"
          />

          <button class="submit-btn" type="submit">S'inscrire</button>
        </Form>
      </div>
      <div class="forgotpassword">
        <a href="">Mot de passe oublié ?</a>
        <span class="space-forgotpassword">|</span>
        <a href="#/">Se connecter</a>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
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
    const store = useStore();
    function onSubmit(values) {
      store
        .dispatch("fetchAuth", {
          endpoint: "auth/signup",
          valueForm: values,
          method: "POST",
        })
        .then((response) => response.json())
        .then((data) => {
          store.commit("ADD_PROFILE", data);
          let logic = true;
          store.commit("ADD_ENTER", logic);
          return data;
        })
        .then((data) => {
          if (data.token) {
            document.location.href = "#/board";
          }
        });
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
      onSubmit,
      schema,
      onInvalidSubmit,
    };
  },
  methods: {},
  computed: {},
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