<template>
  <NavLink
    :icon="organizationIcon"
    label="Organization"
    to="/organization"
    @click="emit('click')"
  />
  <NavLink
    :icon="settingIcon"
    label="Settings"
    to="/settings"
    @click="emit('click')"
  />
  <NavLink
    :icon="userIcon"
    label="Katherine Ellis"
    selected
    to="/"
    @click="emit('click')"
  />
</template>

<script setup lang="ts">
import NavLink from './NavLink.vue'

import organizationIcon from '@/assets/images/organization.svg'
import settingIcon from '@/assets/images/setting.svg'
import userIcon from '@/assets/images/user.svg'

const emit = defineEmits(['click'])
</script>