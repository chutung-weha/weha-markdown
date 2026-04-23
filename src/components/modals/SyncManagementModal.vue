<template>
  <modal-inner class="modal__inner-1--sync-management" aria-label="Quản lý các vị trí đồng bộ">
    <div class="modal__content">
      <div class="modal__image">
        <icon-sync></icon-sync>
      </div>
      <p v-if="syncLocations.length"><b>{{currentFileName}}</b> đã được đồng bộ với các vị trí sau:</p>
      <p v-else><b>{{currentFileName}}</b> chưa được đồng bộ.</p>
      <div>
        <div class="sync-entry flex flex--column" v-for="location in syncLocations" :key="location.id">
          <div class="sync-entry__header flex flex--row flex--align-center">
            <div class="sync-entry__icon flex flex--column flex--center">
              <icon-provider :provider-id="location.providerId"></icon-provider>
            </div>
            <div class="sync-entry__description">
              {{location.description}}
            </div>
            <div class="sync-entry__buttons flex flex--row flex--center">
              <button class="sync-entry__button button" @click="remove(location)" v-title="'Gỡ vị trí'">
                <icon-delete></icon-delete>
              </button>
            </div>
          </div>
          <div class="sync-entry__row flex flex--row flex--align-center">
            <div class="sync-entry__url">
              {{location.url || 'Google Drive app data'}}
            </div>
            <div class="sync-entry__buttons flex flex--row flex--center" v-if="location.url">
              <button class="sync-entry__button button" v-clipboard="location.url" @click="info('Đã sao chép URL vị trí vào clipboard!')" v-title="'Sao chép URL'">
                <icon-content-copy></icon-content-copy>
              </button>
              <a class="sync-entry__button button" v-if="location.url" :href="location.url" target="_blank" v-title="'Mở vị trí'">
                <icon-open-in-new></icon-open-in-new>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__info" v-if="syncLocations.length">
        <b>Mẹo:</b> Gỡ một vị trí sẽ không xoá bất kỳ file nào.
      </div>
    </div>
    <div class="modal__button-bar">
      <button class="button button--resolve" @click="config.resolve()">Đóng</button>
    </div>
  </modal-inner>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ModalInner from './common/ModalInner';
import store from '../../store';
import badgeSvc from '../../services/badgeSvc';

export default {
  components: {
    ModalInner,
  },
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
    ...mapGetters('syncLocation', {
      syncLocations: 'currentWithWorkspaceSyncLocation',
    }),
    currentFileName() {
      return store.getters['file/current'].name;
    },
  },
  methods: {
    ...mapActions('notification', [
      'info',
    ]),
    remove(location) {
      if (location.id === 'main') {
        this.info('Không thể gỡ vị trí này.');
      } else {
        store.commit('syncLocation/deleteItem', location.id);
        badgeSvc.addBadge('removeSyncLocation');
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../styles/variables.scss';

.sync-entry {
  margin: 1.5em 0;
  height: auto;
  font-size: 17px;
  line-height: 1.5;
}

$button-size: 30px;
$small-button-size: 22px;

.sync-entry__header {
  line-height: $button-size;
}

.sync-entry__row {
  border-top: 1px solid $hr-color;
  line-height: $small-button-size;
}

.sync-entry__icon {
  height: 22px;
  width: 22px;
  margin-right: 0.75rem;
  flex: none;
}

.sync-entry__description {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.sync-entry__url {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  opacity: 0.5;
  font-size: 0.67em;
}

.sync-entry__buttons {
  margin-left: 0.75rem;

  .sync-entry__row & {
    margin-left: 0.5rem;
  }
}

.sync-entry__button {
  width: $button-size;
  height: $button-size;
  padding: 4px;
  background-color: transparent;
  opacity: 0.75;

  .sync-entry__row & {
    width: $small-button-size;
    height: $small-button-size;
    padding: 4px;
  }

  &:active,
  &:focus,
  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
