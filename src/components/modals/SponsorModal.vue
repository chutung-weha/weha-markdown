<template>
  <modal-inner class="modal__inner-1--sponsor" aria-label="Tài trợ">
    <div class="modal__content">
      <p>Vui lòng chọn một tuỳ chọn <b>PayPal</b>:</p>
      <a class="paypal-option button flex flex--row flex--center" v-for="button in buttons" :key="button.id" :href="button.link">
        <div class="flex flex--column">
          <div>{{button.price}}<div class="paypal-option__offer" v-if="button.offer">{{button.offer}}</div></div>
          <span>{{button.description}}</span>
        </div>
      </a>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Huỷ</button>
    </div>
  </modal-inner>
</template>

<script>
import { mapGetters } from 'vuex';
import ModalInner from './common/ModalInner';
import utils from '../../services/utils';
import store from '../../store';

export default {
  components: {
    ModalInner,
  },
  data() {
    const sponsorToken = store.getters['workspace/sponsorToken'];
    const makeButton = (id, price, description, offer) => {
      const params = {
        cmd: '_s-xclick',
        hosted_button_id: id,
        custom: sponsorToken.sub,
      };
      return {
        id,
        price,
        description,
        offer,
        link: utils.addQueryParams('https://www.paypal.com/cgi-bin/webscr', params),
      };
    };

    return {
      buttons: sponsorToken ? [
        makeButton('QD7SFZS79D2AL', '$5', 'Tài trợ 3 tháng'),
        makeButton('WG64NCFL9TQZJ', '$15', 'Tài trợ 1 năm', '-25%'),
        makeButton('G2E7MN873EQ3U', '$25', 'Tài trợ 2 năm', '-37%'),
        makeButton('JQJT7ARKYC7FC', '$50', 'Tài trợ 5 năm', '-50%'),
      ] : [],
    };
  },
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
  },
  methods: {
    sponsor() {
    },
  },
};
</script>

<style lang="scss">
@import '../../styles/variables.scss';

.modal__inner-1.modal__inner-1--sponsor {
  max-width: 400px;
}

.paypal-option {
  text-align: center;
  padding: 10px;
  height: auto;
  font-size: 2.3em;
  margin: 0.75rem 0;
  line-height: 1.2;
  text-transform: none;

  span {
    display: inline-block;
    font-size: 0.75rem;
    opacity: 0.6;
    white-space: normal;
    line-height: 1.5;
  }

  .paypal-option__offer {
    float: right;
    font-size: 0.6rem;
    font-weight: 600;
    padding: 0.1em 0.2em;
    background-color: darken($error-color, 10);
    border-radius: 3px;
    color: #fff;
    margin-left: -0.5em;
  }
}
</style>
