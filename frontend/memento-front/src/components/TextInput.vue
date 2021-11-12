<template>
  <div
    class="TextInput"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
  >
    <label :for="name">{{ label }}</label>
    <input
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    />

    <p class="help-message" v-show="errorMessage || meta.valid">
      {{ errorMessage || successMessage }}
    </p>
  </div>
</template>

<script>
import { useField } from "vee-validate";

export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    successMessage: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    // we don't provide any rules here because we are using form-level validation
    // https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(props.name, undefined, {
      initialValue: props.value,
    });

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    };
  },
};
</script>

<style  lang="scss" scoped>
$primary-color: #B0386F;
$error-color: #6b141d;
$error-bg-color: #fddfe2;
$success-color: #21a67a;
$success-bg-color: #e0eee4;

.TextInput {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: calc(1em * 1.5);
  width: 85%;
}

label {
  font-family: "Raleway", sans-serif;
  font-size: 15px;
  color: #fddfe2;
  display: block;
  margin-bottom: 4px;
  width: 85%;
}

input {
  border-radius: 5px;
  border: 2px solid transparent;
  padding: 9px 10px;
  outline: none;
  background-color: #f2f5f7;
  width: 85%;
  font-family: "Raleway", sans-serif;
  transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
}

input:focus {
  border-color: $primary-color;
}

.help-message {
  font-family: "Raleway", sans-serif;
  position: absolute;
  bottom: calc(-1.5 * 1em);
  margin: 0;
  font-size: 12px;
}

.TextInput.has-error input {
  background-color: $error-bg-color;
  color: $error-color;
}

.TextInput.has-error input:focus {
  border-color: $error-color;
}

.TextInput.has-error .help-message {
  color: $error-color;
}

.TextInput.success input {
  background-color: $success-bg-color;
  color: $success-color;
}

.TextInput.success input:focus {
  border-color: $success-color;
}

.TextInput.success .help-message {
  color: $success-color;
}
</style>