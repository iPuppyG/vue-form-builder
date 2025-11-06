<template>
	<el-dialog class="view-member-dialog" :visible.sync="visible" width="900px" center>
		<div class="search-panel">
			<el-input
				class="search-input"
				v-model="searchValue"
				prefix-icon="el-icon-search"
				:placeholder="$t('orgManagement.dialog.viewMember.searchAccount')"
			></el-input>
			<span class="member-account">
				{{
					`${$t("orgManagement.dialog.viewMember.total")} ${memberCount} ${$t(
						"orgManagement.dialog.viewMember.totalSuffix"
					)}`
				}}
			</span>
		</div>
		<el-table class="view-member-table" :data="mockMemberData" row-key="userId">
			<el-table-column prop="nickName" :label="$t('orgManagement.dialog.viewMember.columns.name')">
				<template slot-scope="scope">
					<AvatarPanel class="name-column" :label="scope.row.nickName" />
				</template>
			</el-table-column>
			<el-table-column
				prop="username"
				:label="$t('orgManagement.dialog.viewMember.columns.loginAccount')"
			></el-table-column>
			<el-table-column prop="email" :label="$t('orgManagement.dialog.viewMember.columns.email')"></el-table-column>
			<el-table-column prop="orgName" :label="$t('orgManagement.dialog.viewMember.columns.orgName')"></el-table-column>
			<el-table-column prop="userType" :label="$t('orgManagement.dialog.viewMember.columns.userType')">
				<template slot-scope="scope">
					<Tag>{{ $t(`orgManagement.dialog.viewMember.columns.userTypeMap.${scope.row.userType}`) }}</Tag>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			class="pagination"
			:page-size="100"
			layout="total, prev, pager, next"
			:total="1000"
			background
		></el-pagination>
	</el-dialog>
</template>

<script>
import AvatarPanel from "@/components/AvatarPanel"
import Tag from "@/components/Tag"
import { mockMemberData } from "../../mock"

export default {
	name: "ViewMemberDialog",
	components: {
		AvatarPanel,
		Tag,
	},
	props: {
		visible: {
			type: Boolean,
			required: true,
			default: false,
		},
		editRow: {
			type: Object,
			required: false,
		},
	},
	data() {
		return {
			mockMemberData,
			searchValue: null,
			memberCount: 21,
		}
	},
}
</script>

<style lang="scss">
.view-member-dialog {
	.search-panel {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 24px;

		.search-input {
			width: 320px;

			input {
				border-radius: 8px;
			}
		}
	}

	.view-member-table {
		border-radius: 8px;
		border: 1px solid #e5e7eb;

		.el-table__header-wrapper {
			.el-table__cell {
				background-color: #f9fafb;

				.cell {
					color: #6b7280;
					font-size: 12px;
					font-weight: 400;
				}
			}
		}

		.el-table__row {
			height: 65px;
		}

		.name-column {
			font-size: 14px;
			font-weight: 500;
		}
	}

	.pagination {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 16px 0;

		.el-pagination__total {
			margin-right: auto;
		}
	}
}
</style>
<template>
	<el-dialog class="view-member-dialog" :visible="innerVisible" width="900px" center @close="handleClose">
		<div class="search-panel">
			<el-input
				class="search-input"
				v-model="searchValue"
				prefix-icon="el-icon-search"
				:placeholder="$t('orgManagement.dialog.viewMember.searchAccount')"
			></el-input>
			<span class="member-account">
				{{
					`${$t("orgManagement.dialog.viewMember.total")} ${memberCount} ${$t(
						"orgManagement.dialog.viewMember.totalSuffix"
					)}`
				}}
			</span>
		</div>
		<el-table class="view-member-table" :data="mockMemberData" row-key="userId">
			<el-table-column prop="nickName" :label="$t('orgManagement.dialog.viewMember.columns.name')">
				<template slot-scope="scope">
					<AvatarPanel class="name-column" :label="scope.row.nickName" />
				</template>
			</el-table-column>
			<el-table-column
				prop="username"
				:label="$t('orgManagement.dialog.viewMember.columns.loginAccount')"
			></el-table-column>
			<el-table-column prop="email" :label="$t('orgManagement.dialog.viewMember.columns.email')"></el-table-column>
			<el-table-column prop="orgName" :label="$t('orgManagement.dialog.viewMember.columns.orgName')"></el-table-column>
			<el-table-column prop="userType" :label="$t('orgManagement.dialog.viewMember.columns.userType')">
				<template slot-scope="scope">
					<Tag>{{ $t(`orgManagement.dialog.viewMember.columns.userTypeMap.${scope.row.userType}`) }}</Tag>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			class="pagination"
			:page-size="100"
			layout="total, prev, pager, next"
			:total="1000"
			background
		></el-pagination>
	</el-dialog>
</template>

<script>
import AvatarPanel from "@/components/AvatarPanel"
import Tag from "@/components/Tag"
import { mockMemberData } from "../../mock.js"

export default {
	name: "ViewMemberDialog",
	components: {
		AvatarPanel,
		Tag,
	},
	props: {
		visible: {
			type: Boolean,
			required: true,
			default: false,
		},
		editRow: {
			type: Object,
			required: false,
		},
	},
	data() {
		return {
			innerVisible: this.visible, // 本地状态维护可见性
			mockMemberData,
			searchValue: null,
			memberCount: 21,
		}
	},
	watch: {
		// 同步父组件传递的visible值到本地状态
		visible(newVal) {
			this.innerVisible = newVal
		},
		// 本地状态变化时通知父组件更新
		innerVisible(newVal) {
			this.$emit("update:visible", newVal)
		},
	},
	methods: {
		// 处理对话框关闭（如点击右上角关闭按钮）
		handleClose() {
			this.innerVisible = false
		},
	},
}
</script>

<style lang="scss">
.view-member-dialog {
	.search-panel {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 24px;

		.search-input {
			width: 320px;

			input {
				border-radius: 8px;
			}
		}
	}

	.view-member-table {
		border-radius: 8px;
		border: 1px solid #e5e7eb;

		.el-table__header-wrapper {
			.el-table__cell {
				background-color: #f9fafb;

				.cell {
					color: #6b7280;
					font-size: 12px;
					font-weight: 400;
				}
			}
		}

		.el-table__row {
			height: 65px;
		}

		.name-column {
			font-size: 14px;
			font-weight: 500;
		}
	}

	.pagination {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 16px 0;

		.el-pagination__total {
			margin-right: auto;
		}
	}
}
</style>
