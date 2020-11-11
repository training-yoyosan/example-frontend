<template>
  <q-page padding>
    <q-banner class="bg-positive text-white q-my-lg">
      Yay! You're logged in!
    </q-banner>

    <q-card>
      <q-card-section class="q-pt-xs row justify-around items-center q-pa-lg">
        <a href="https://quasar.dev" target="_blank">
          <q-avatar :size="$q.screen.gt.sm ? '4em' : '2em'">
            <img src="https://cdn.quasar.dev/app-icons/icon-128x128.png" />
          </q-avatar>
        </a>
        <q-icon
          name="fas fa-plus"
          class="text-yellow-8"
          :size="$q.screen.gt.sm ? '3em' : '1.5em'"
        />

        <a
          href="https://laravel.com"
          target="_blank"
          style="text-decoration: none"
        >
          <q-icon
            name="fab fa-laravel"
            class="text-red"
            :size="$q.screen.gt.sm ? '4em' : '2.5em'"
          />
        </a>

        <q-icon
          name="fas fa-equals"
          class="text-purple"
          :size="$q.screen.gt.sm ? '3em' : '1.5em'"
        />

        <q-icon
          name="fas fa-heart"
          class="text-pink"
          :size="$q.screen.gt.sm ? '4em' : '2.5em'"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex"
};
</script>
