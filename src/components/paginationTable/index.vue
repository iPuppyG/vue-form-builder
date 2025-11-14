<template>
	<div class="table-container">
		<!-- 表格组件：透传所有属性和事件 -->
		<el-table class="table" v-bind="$attrs" v-on="$listeners">
			<slot />
		</el-table>

		<!-- 分页组件：透传分页相关属性 -->
		<el-pagination class="pagination" v-bind="paginationProps" background />
	</div>
</template>

<script>
export default {
	name: "PaginationTable",
	inheritAttrs: false,
	props: {
		// 分页配置：允许传入所有 el-pagination 的属性
		paginationProps: {
			type: Object,
			default: () => ({
				pageSize: 10,
				layout: "total, prev, pager, next",
				total: 100,
			}),
		},
	},
}
</script>

<style lang="scss">
.table-container {
	width: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
	border-radius: 8px;

	.table {
		flex: 1;
		display: flex;
		flex-direction: column;
		border: none;

		:global {
			.el-table__header-wrapper {
				flex-shrink: 0;

				.el-table__cell {
					background-color: #f9fafb;

					.cell {
						color: #6b7280;
						font-size: 12px;
						font-weight: 400;
					}
				}
			}

			.el-table__body-wrapper {
				flex-grow: 1;
				flex-shrink: 1;
				overflow-y: auto;

				.el-table__row {
					height: 65px;
				}
			}
		}
	}

	.pagination {
		height: 60px;
		flex: 0;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 16px 24px;

		.el-pagination__total {
			margin-right: auto;
		}
	}
}
</style>
