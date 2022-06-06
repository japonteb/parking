<template>
  <div class="q-pa-md">
    <q-layout
      view="lHh Lpr lff"
      container
      style="min-height: 730px"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>{{ $t('message.layout.parking') }}</q-toolbar-title>
          <a href="" />
          <q-btn label="🇬🇧" @click="$i18n.locale = 'en-us'" />
          <q-btn label="🇪🇸" @click="$i18n.locale = 'es-co'" />
          <q-btn label="🇧🇷" @click="$i18n.locale = 'pt-br'" />
          <q-btn flat round dense icon="menu" @click="drawer = !drawer" />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
        <q-scroll-area
          style="
            height: calc(100% - 150px);
            margin-top: 150px;
            border-right: 1px solid #ddd;
          "
        >
          <q-list padding>
            <q-item v-ripple clickable to="/" active-class="my-menu-link" exact>
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section> {{ $t('message.layout.home') }} </q-item-section>
            </q-item>

            <q-item
              v-ripple
              active
              clickable
              to="/entry"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="login" />
              </q-item-section>

              <q-item-section>
                {{ $t('message.layout.registerVehicleEntry') }}
              </q-item-section>
            </q-item>

            <q-item
              v-ripple
              active
              clickable
              to="/exit"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>

              <q-item-section>
                {{ $t('message.layout.registerVehicleExit') }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="text-weight-bold">
              {{ $t('message.layout.administrator') }}
            </div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref(false);
</script>

<style lang="postcss"></style>
