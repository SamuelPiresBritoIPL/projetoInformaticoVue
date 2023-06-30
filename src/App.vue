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

[data-bs-theme="dark"] .vs__dropdown-toggle {
	border-color: var(--bs-light-bg-subtle);
}

[data-bs-theme="dark"] .vs__dropdown-menu {
	background: var(--bs-dark-bg-subtle);
}

[data-bs-theme="dark"] .vs__open-indicator {
	fill: var(--vs-selected-bg);
	transform: scale(var(--vs-controls-size));
	transition: transform var(--vs-transition-duration) var(--vs-transition-timing-function);
	transition-timing-function: var(--vs-transition-timing-function);
}

[data-bs-theme="dark"] .vs__clear {
	fill: var(--vs-selected-bg);
}

[data-bs-theme="dark"] .g-dialog-content {
	--content-bg: var(--bs-dark-bg-subtle);
}

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
	background-color: rgba(228, 238, 247, 0.7);
	border: 0.5px solid;
	border-color: var(--bs-primary);
	/* color: #fff; */
	border-radius: 5px;
}

[data-bs-theme="dark"] .vuecal__event {
	background-color: rgba(228, 229, 230, 0.7);
	color: #333333;
}

[data-bs-theme="dark"] .vuecal__cell--selected {
	background-color: rgba(139, 255, 158, 0.2);
}

[data-bs-theme="light"] .vuecal__cell--selected {
	background-color: rgba(21, 255, 60, 0.2);
}

.vuecal__no-event {
	display: none;
}

.pe-cursor {
	cursor: pointer;
}

[data-bs-theme="light"] .vuecal__time-cell-label {
	color: #000;
}


/*Fixes danger text for dark theme*/
[data-bs-theme="dark"] .text-danger-contrasted {
	color: #ff4359;
	
}

/*Fixes danger text for light theme*/
[data-bs-theme="light"] .text-danger-contrasted {
	color: #dc3545;
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
</style>
