<template>
	<router-view></router-view>
</template>

<style>
.alwaysOnTop {
	z-index: 9999;
}

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

[data-bs-theme="dark"] .g-dialog-content {
	--content-bg: var(--bs-dark-bg-subtle);
}

/* .btn-secondary {
    color: #fff;
    background-color: #8b9196 !important;
    border-color: #8b9196 !important;
} */
/* .redcolor {
  color:red;
}
.wrapper {
  color: #000;
}

.content {
  padding: 20px;
}

.title {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
} */

.vuecal__event-title {
	font-size: 1em;
	font-weight: bold;
}
.vuecal__cell-content {
	justify-content: flex-start;
	height: 100%;
	align-items: flex-end;
}
.vuecal__event {
	background-color: rgba(228, 238, 247, 0.7) !important;
	border: 0.5px solid rgb(50, 50, 255);
	color: #fff;
	border-radius: 5px 5px 5px 5px;
}
.vuecal__no-event {
	display: none;
}
</style>
