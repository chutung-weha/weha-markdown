<template>
  <div class="tour" @keydown.esc.stop="skip">
    <div class="tour-step" :class="'tour-step--' + step" :style="stepStyle">
      <div class="tour-step__inner" v-if="step === 'welcome'">
        <h2>Chào mừng trở lại!</h2>
        <p><b>Weha Markdown</b> đã sẵn sàng!</p>
        <p>Hãy nhấn <b>Tiếp</b> để bắt đầu hướng dẫn nhanh.</p>
        <div class="tour-step__button-bar">
          <button class="button" @click="finish">Bỏ qua</button>
          <button class="button button--resolve" @click="next">Tiếp</button>
        </div>
      </div>
      <div class="tour-step__inner" v-else-if="step === 'editor'">
        <h2>Trình soạn thảo Markdown</h2>
        <p>Weha Markdown chuyển Markdown sang HTML ngay tức thì.</p>
        <p>Nhấn <icon-side-preview></icon-side-preview> để bật/tắt khung xem trước.</p>
        <div class="tour-step__button-bar">
          <button class="button" @click="finish">Bỏ qua</button>
          <button class="button button--resolve" @click="next">Tiếp</button>
        </div>
      </div>
      <div class="tour-step__inner" v-else-if="step === 'explorer'">
        <h2>Trình quản lý file</h2>
        <p>Weha Markdown có thể quản lý nhiều file và thư mục trong một workspace.</p>
        <p>Nhấn <icon-folder></icon-folder> để mở trình quản lý file.</p>
        <div class="tour-step__button-bar">
          <button class="button" @click="finish">Bỏ qua</button>
          <button class="button button--resolve" @click="next">Tiếp</button>
        </div>
      </div>
      <div class="tour-step__inner" v-else-if="step === 'menu'">
        <h2>Còn nhiều hơn thế!</h2>
        <p>Weha Markdown còn có thể đồng bộ và xuất bản file của bạn, quản lý workspace cộng tác…</p>
        <p>Nhấn <icon-provider provider-id="stackedit"></icon-provider> để khám phá menu.</p>
        <div class="tour-step__button-bar">
          <button class="button" @click="finish">Bỏ qua</button>
          <button class="button button--resolve" @click="next">Tiếp</button>
        </div>
      </div>
      <div class="tour-step__inner" v-else-if="step === 'end'">
        <h2>Chúc bạn làm việc vui vẻ!</h2>
        <p>Cảm ơn bạn đã sử dụng Weha Markdown.</p>
        <div class="tour-step__button-bar">
          <button class="button button--resolve" @click="finish">Đồng ý</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import store from '../store';

const steps = [
  'welcome',
  'editor',
  'explorer',
  'menu',
  'end',
];

export default {
  data: () => ({
    stepIdx: 0,
    stepStyles: {},
  }),
  computed: {
    step() {
      return steps[this.stepIdx];
    },
    stepStyle() {
      return this.stepStyles[this.step] || {};
    },
  },
  methods: {
    updatePositions() {
      document.querySelectorAll('[tour-step-anchor]').cl_each((anchorElt) => {
        const anchorRect = anchorElt.getBoundingClientRect();
        const anchorSteps = (anchorElt.getAttribute('tour-step-anchor') || '').split(',');
        anchorSteps.forEach((step) => {
          const style = {
            top: `${anchorRect.top + (anchorRect.height / 2)}px`,
            left: `${anchorRect.left + (anchorRect.width / 2)}px`,
          };
          switch (step) {
            case 'welcome':
            case 'end': {
              style.top = `${anchorRect.top}px`;
              break;
            }
            case 'editor':
            case 'menu': {
              style.left = `${anchorRect.left}px`;
              break;
            }
            case 'explorer': {
              style.left = `${anchorRect.left + anchorRect.width}px`;
              break;
            }
            default:
              return;
          }
          Vue.set(this.stepStyles, step, style);
        });
      });
    },
    finish() {
      store.dispatch('data/patchLayoutSettings', {
        welcomeTourFinished: true,
      });
    },
    next() {
      this.stepIdx += 1;
    },
  },
  mounted() {
    this.$watch(
      () => store.getters['layout/styles'],
      () => this.updatePositions(),
      { immediate: true },
    );
  },
};
</script>


<style lang="scss">
@import '../styles/variables.scss';

.tour {
  position: absolute;
  top: 0;
  left: 0;
}

.tour-step {
  position: absolute;
}

$tour-step-background: transparentize(mix(#f3f3f3, $selection-highlighting-color, 75%), 0.025);
$tour-step-width: 240px;

.tour-step__inner {
  position: absolute;
  background-color: $tour-step-background;
  padding: 1.5em;
  font-size: 0.9em;
  line-height: 1.33;
  width: $tour-step-width;
  text-align: center;
  border-radius: $border-radius-base;

  h2 {
    margin: 0;

    &::after {
      display: none;
    }
  }

  .icon,
  .icon-provider {
    width: 1.25em;
    height: 1.25em;
    vertical-align: bottom;
    display: inline-block;
  }

  &::before {
    content: '';
    position: absolute;
  }

  .tour-step--welcome &,
  .tour-step--end & {
    left: -$tour-step-width/2;
    top: 36px;
    border-bottom-right-radius: 0;

    &::before {
      bottom: -10px;
      right: 0;
      border-top: 10px solid $tour-step-background;
      border-left: 10px solid transparent;
    }
  }

  .tour-step--editor &,
  .tour-step--menu & {
    right: 15px;
    border-top-right-radius: 0;

    &::before {
      top: 0;
      right: -10px;
      border-top: 10px solid $tour-step-background;
      border-right: 10px solid transparent;
    }
  }

  .tour-step--explorer & {
    left: 15px;
    border-top-left-radius: 0;

    &::before {
      top: 0;
      left: -10px;
      border-top: 10px solid $tour-step-background;
      border-left: 10px solid transparent;
    }
  }
}

.tour-step__button-bar {
  margin-top: 1.5em;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  .button {
    font-size: 1.1em;
  }
}
</style>
