<template>
  <popup-modal ref="popup">
    <h1>{{ title }}</h1>
    <p class="text-2xl mb-5">{{ message }}</p>
    <div>
      <Button @click="_confirm">{{ okButton }}</Button>
      <Button class="ml-5" @click="_cancel">{{ cancelButton }}</Button>
    </div>
  </popup-modal>
</template>

<script>
import Button from "./Button.vue";
import PopupModal from "./PopupModal.vue";

export default {
  name: "ConfirmDialogue",

  components: { PopupModal, Button },

  data: () => ({
    // Parameters that change depending on the type of dialogue
    title: undefined,
    message: undefined, // Main text content
    okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
    cancelButton: "Cancel", // text for cancel button

    // Private variables
    resolvePromise: undefined,
    rejectPromise: undefined,
  }),

  methods: {
    show(opts = {}) {
      this.title = opts.title;
      this.message = opts.message;
      this.okButton = opts.okButton;
      if (opts.cancelButton) {
        this.cancelButton = opts.cancelButton;
      }
      // Once we set our config, we tell the popup modal to open
      this.$refs.popup.open();
      // Return promise so the caller can get results
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },

    _confirm(e) {
      this._mainClickActions(e);
      this.resolvePromise(true);
    },

    _cancel(e) {
      this._mainClickActions(e);
      this.resolvePromise(false);
    },

    _mainClickActions(e) {
      e.preventDefault();
      e.stopImmediatePropagation();

      this.$refs.popup.close();
    },
  },
};
</script>
