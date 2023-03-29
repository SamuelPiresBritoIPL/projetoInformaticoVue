<template>
  <router-view></router-view>
</template>

<style>
[data-bs-theme="dark"] .vs__selected {
	color: var(--bs-light-text);
}

[data-bs-theme="dark"] .vs__dropdown-menu {
	background: var(--bs-dark-bg-subtle);
}

[data-bs-theme="dark"] .vs__open-indicator {
	fill: var(--vs-selected-bg);
	transform: scale(var(--vs-controls-size));
	transition: transform var(--vs-transition-duration)
		var(--vs-transition-timing-function);
	transition-timing-function: var(--vs-transition-timing-function);
}

[data-bs-theme="dark"] .vs__clear {
	fill: var(--vs-selected-bg);
}
</style>
