<template>
  <div class="splash-screen">
    <div class="splash-screen__brand">
      <div class="splash-screen__logo"></div>
      <div class="splash-screen__title">Weha Markdown</div>
    </div>
  </div>
</template>

<style lang="scss">
.splash-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
}

.splash-screen__brand {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
}

.splash-screen__logo {
  width: 120px;
  height: 120px;
  flex: none;
  background: no-repeat center url('../assets/iconWeha.webp');
  background-size: contain;
}

.splash-screen__title {
  font-size: 3rem;
  font-weight: 600;
  color: #20b2b2;
  letter-spacing: -0.01em;
  line-height: 1.1;
  white-space: nowrap;
}

@media (max-width: 560px) {
  .splash-screen__brand {
    gap: 16px;
  }
  .splash-screen__logo {
    width: 80px;
    height: 80px;
  }
  .splash-screen__title {
    font-size: 2rem;
  }
}
</style>
