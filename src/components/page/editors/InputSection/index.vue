<template>
  <div :class="[templateClasses.inputContainer]">
    <label :class="[templateClasses.label]">{{ label }}</label>
    <input-list-item
      v-for="(item, i) in listItems"
      :key="item.id"
      v-model="item.value"
      :i="i"
      :isFocused="focusedElementIndex === i"
      ref="listRef"
      @addNewLine="addNewLineHandler(i)"
      @removeLine="removeLineHandler"
      @focusAboveLine="focusAboveLineHandler"
      @focusBelowLine="focusBelowLineHandler"
      @refocus="focusedElementIndex = i"
    />
    <div class="d-flex justify-end">
      <v-btn :disabled="loading" icon @click="addNewLineHandler()">
        <v-icon color="blue" large> mdi-plus-box </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import InputListItem from '../InputListItem/index.vue';
export default {
  name: 'InputSection',
  props: {
    label: String,
  },
  inject: ['app', 'sectionName'],
  components: {
    InputListItem,
  },
  data() {
    return {
      focusedElementIndex: undefined,
      templateClasses: {
        inputContainer: ['mt-3', 'd-flex', 'flex-column', 'align-items-start'],
        label: ['form-label', 'mb-6'],
        textArea: ['form-control', 'border'],
      },
    };
  },
  computed: {
    listItems() {
      return this.$store.state.page[this.sectionName];
    },
    loading() {
      return this.$store.state.fetchState.loading;
    },
  },
  methods: {
    addNewLineHandler(index = null) {
      this.$store.dispatch('addNewLine', {
        sectionName: this.sectionName,
        index,
      });
      // /** If index is not supplied: simply add and focus the last item in the list */
      const nextIndex =
        typeof index === 'number' ? index + 1 : this.listItems.length - 1;

      this.focusLine(nextIndex, { waitForNextTick: true });
    },

    removeLineHandler(index) {
      /** If the to-be-removed line is NOT the last line in the list, remove it; Else keep
       * it but clear clear its value by setting to empty string */
      this.listItems.length !== 1
        ? this.listItems.splice(index, 1)
        : (this.listItems[index].value = '');

      this.$nextTick(() => {
        /** If deleted line is the last line: list of inputs will lose focus so we handle it here */
        if (document.activeElement.tagName === 'BODY') {
          const lastIndex = this.listItems.length - 1;
          this.$refs.listRef[lastIndex].$el.querySelector('input').focus();
          this.focusLine(lastIndex);
        }
      });
    },

    focusAboveLineHandler(index) {
      index - 1 >= 0 && this.focusLine(index - 1);
    },

    focusBelowLineHandler(index) {
      index + 1 < this.listItems.length && this.focusLine(index + 1);
    },

    /** HELPERS */

    focusLine(index, { waitForNextTick = false } = {}) {
      if (!waitForNextTick) {
        this.$refs.listRef[index].$el.querySelector('input').focus();
        this.focusedElementIndex = index;
      } else {
        this.$nextTick(() => {
          this.$refs.listRef[index].$el.querySelector('input').focus();
          this.focusedElementIndex = index;
        });
      }
    },
  },
  watch: {
    app: {
      deep: true,
      handler(prev, newVal) {
        const { activeElement } = newVal;

        // If the user clicked on an element with an id...
        if (activeElement.id) {
          // Since this handler runs on all 3 sections (meaning this function is called 3 times on the 3
          // sections) if the clicked element does not belong in this section...
          if (!activeElement.id.includes(this.sectionName)) {
            // ... then just in case, we unfocus everything in this section.
            this.focusedElementIndex = null;
            return;
          }

          // If the clicked element is a line
          if (activeElement.id.includes('list-input-field')) {
            const listInputFieldIndex = Number(activeElement.id.slice(-1));

            if (this.focusedElementIndex !== listInputFieldIndex) {
              this.focusedElementIndex = listInputFieldIndex;
            }

            return;
          }
        }

        // Else we assume user clicked outside (somewhere on <body>)
        this.focusedElementIndex = null;
      },
    },
  },
};
</script>
