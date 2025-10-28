<template>
	<div class="widget-form">
		<div v-if="data.list.length == 0" class="form-empty">
			<i class="ri-drag-drop-line drag-drop-icon"></i>
			<div class="empty-text-container">
				<span class="title">{{ $t("fm.description.containerEmptyTitle") }}</span>
				<span class="desc">{{ $t("fm.description.containerEmpty") }}</span>
			</div>
		</div>
		<el-form
			class="form-container"
			:size="data.config.size"
			:label-position="data.config.labelPosition"
			:label-width="data.config.labelWidth + 'px'"
		>
			<draggable
				class="draggable-zone"
				v-model="data.list"
				v-bind="{ group: 'people', ghostClass: 'ghost', animation: 200, handle: '.drag-widget' }"
				@end="handleMoveEnd"
				@add="handleWidgetAdd"
			>
				<transition-group name="fade" tag="div" class="widget-form-list">
					<template v-for="(element, index) in data.list">
						<template v-if="element.type == 'grid'">
							<el-row
								class="widget-col"
								v-if="element && element.key"
								:key="element.key"
								type="flex"
								:class="{ active: selectWidget.key == element.key }"
								:gutter="element.options.gutter ? element.options.gutter : 0"
								:justify="element.options.justify"
								:align="element.options.align"
								@click.native="handleSelectWidget(index)"
							>
								<el-col v-for="(col, colIndex) in element.columns" :key="colIndex" :span="col.span ? col.span : 0">
									<draggable
										v-model="col.list"
										:no-transition-on-drag="true"
										v-bind="{
											group: { name: 'people', put: handlePut },
											ghostClass: 'ghost',
											animation: 200,
											handle: '.drag-widget',
										}"
										@end="handleMoveEnd"
										@add="handleWidgetColAdd($event, element, colIndex)"
									>
										<transition-group name="fade" tag="div" class="widget-col-list">
											<template v-for="(el, i) in col.list">
												<widget-form-item
													:key="el.key"
													v-if="el.key"
													:element="el"
													:select.sync="selectWidget"
													:index="i"
													:data="col"
												></widget-form-item>
											</template>
										</transition-group>
									</draggable>
								</el-col>
								<div class="widget-view-action widget-col-action" v-if="selectWidget.key == element.key">
									<i class="ri-delete-bin-6-line" @click.stop="handleWidgetDelete(index)"></i>
								</div>

								<div class="widget-view-drag widget-col-drag" v-if="selectWidget.key == element.key">
									<i class="ri-drag-move-2-fill drag-widget"></i>
								</div>
							</el-row>
						</template>
						<template v-else>
							<widget-form-item
								v-if="element && element.key"
								:key="element.key"
								:element="element"
								:select.sync="selectWidget"
								:index="index"
								:data="data"
							></widget-form-item>
						</template>
					</template>
				</transition-group>
			</draggable>
		</el-form>
	</div>
</template>

<script>
import Draggable from "vuedraggable"
import WidgetFormItem from "./WidgetFormItem"

export default {
	components: {
		Draggable,
		WidgetFormItem,
	},
	props: ["data", "select"],
	data() {
		return {
			selectWidget: this.select,
		}
	},
	mounted() {
		document.body.ondrop = function (event) {
			let isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1
			if (isFirefox) {
				event.preventDefault()
				event.stopPropagation()
			}
		}
	},
	methods: {
		handleMoveEnd({ newIndex, oldIndex }) {
			console.log("index", newIndex, oldIndex)
		},
		handleSelectWidget(index) {
			console.log(index, "#####")
			this.selectWidget = this.data.list[index]
		},
		handleWidgetAdd(evt) {
			const newIndex = evt.newIndex
			// 为拖拽到容器的元素添加唯一key
			const key = Date.parse(new Date())
			this.$set(this.data.list, newIndex, {
				...this.data.list[newIndex],
				options: {
					...this.data.list[newIndex].options,
					remoteFunc: "func_" + key,
				},
				key,
				model: this.data.list[newIndex].type + "_" + key,
				rules: [],
			})

			if (
				this.data.list[newIndex].type === "radio" ||
				this.data.list[newIndex].type === "checkbox" ||
				this.data.list[newIndex].type === "select"
			) {
				this.$set(this.data.list, newIndex, {
					...this.data.list[newIndex],
					options: {
						...this.data.list[newIndex].options,
						options: this.data.list[newIndex].options.options.map(item => ({
							...item,
						})),
					},
				})
			}

			if (this.data.list[newIndex].type === "grid") {
				this.$set(this.data.list, newIndex, {
					...this.data.list[newIndex],
					columns: this.data.list[newIndex].columns.map(item => ({ ...item })),
				})
			}

			this.selectWidget = this.data.list[newIndex]
		},
		handleWidgetColAdd($event, row, colIndex) {
			const newIndex = $event.newIndex
			const key = Date.parse(new Date())

			this.$set(row.columns[colIndex].list, newIndex, {
				...row.columns[colIndex].list[newIndex],
				options: {
					...row.columns[colIndex].list[newIndex].options,
					remoteFunc: "func_" + key,
				},
				key,
				model: row.columns[colIndex].list[newIndex].type + "_" + key,
				rules: [],
			})

			if (
				row.columns[colIndex].list[newIndex].type === "radio" ||
				row.columns[colIndex].list[newIndex].type === "checkbox" ||
				row.columns[colIndex].list[newIndex].type === "select"
			) {
				this.$set(row.columns[colIndex].list, newIndex, {
					...row.columns[colIndex].list[newIndex],
					options: {
						...row.columns[colIndex].list[newIndex].options,
						options: row.columns[colIndex].list[newIndex].options.options.map(item => ({
							...item,
						})),
					},
				})
			}

			this.selectWidget = row.columns[colIndex].list[newIndex]
		},
		handleWidgetDelete(index) {
			if (this.data.list.length - 1 === index) {
				if (index === 0) {
					this.selectWidget = {}
				} else {
					this.selectWidget = this.data.list[index - 1]
				}
			} else {
				this.selectWidget = this.data.list[index + 1]
			}

			this.$nextTick(() => {
				this.data.list.splice(index, 1)
			})
		},

		handlePut(a, b, c) {
			if (c.className.split(" ").indexOf("widget-col") >= 0 || c.className.split(" ").indexOf("no-put") >= 0) {
				return false
			}
			return true
		},
	},
	watch: {
		select(val) {
			this.selectWidget = val
		},
		selectWidget: {
			handler(val) {
				this.$emit("update:select", val)
			},
			deep: true,
		},
	},
}
</script>

<style lang="scss">
$text-color: #374151;
$primary-color: #3b82f6;
$default-border-color: #d1d5dc;
$hover-border-color: #9da3af;
$active-background-color: #eff6ff;

.widget-form {
	position: relative;
	height: 100%;

	.form-empty {
		position: absolute;
		top: 120px;
		left: 50%;
		transform: translate(-50%);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 32px;
		color: #6b7280;

		.drag-drop-icon {
			font-size: 36px;
		}

		.empty-text-container {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			gap: 8px;

			.title {
				font-size: 18px;
				font-weight: 500;
			}

			.desc {
				font-size: 14px;
				font-weight: 400;
			}
		}
	}

	.form-container {
		height: 100%;

		.draggable-zone {
			height: 100%;

			.widget-form-list {
				height: 100%;
				padding: 24px 24px 8px;
				overflow-y: scroll;

				.widget-col {
					padding-bottom: 0;
					padding: 16px;
					border: 2px dashed $default-border-color;
					border-radius: 8px;
					margin-bottom: 16px;

					.widget-view {
						margin: 0;
					}

					&:hover {
						border: 2px dashed $hover-border-color;
					}

					&.active {
						border: 2px dashed $primary-color;
						background-color: $active-background-color;
					}

					.el-col {
						min-height: 50px;
					}

					.widget-col-action {
						position: absolute;
						right: -2px;
						bottom: -2px;
						height: 22px;
						line-height: 22px;
						z-index: 9;
						border-radius: 0 0 8px 0;
						background-color: $primary-color;

						i {
							font-size: 14px;
							color: #fff;
							margin: 0 5px;
							cursor: pointer;
						}
					}

					.widget-col-drag {
						position: absolute;
						left: -2px;
						top: -2px;
						bottom: -18px;
						height: 22px;
						line-height: 22px;
						background: $primary-color;
						z-index: 9;
						border-radius: 8px 0 0 0;

						i {
							font-size: 14px;
							color: #fff;
							margin: 0 5px;
							cursor: move;
						}
					}
				}

				.widget-col-list {
					padding: 4px;
					min-height: 50px;
					border: 1px dashed #ccc;
				}

				.ghost {
					background: $primary-color;
					border: 1px solid $primary-color;
					outline-width: 0;
					height: 3px;
					box-sizing: border-box;
					font-size: 0;
					content: "";
					overflow: hidden;
					padding: 0;
				}
			}
		}
	}
}
</style>
