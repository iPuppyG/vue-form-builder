<template>
	<el-dialog class="view-member-dialog" :visible.sync="open" width="900px">
		<div class="search-panel">
			<el-input
				class="search-input"
				v-model="searchValue"
				prefix-icon="el-icon-search"
				:placeholder="$t('orgManagement.model.viewMember.searchAccount')"
			></el-input>
			<span class="member-account">
				{{
					`${$t("orgManagement.model.viewMember.total")} ${memberCount} ${$t(
						"orgManagement.model.viewMember.totalSuffix"
					)}`
				}}
			</span>
		</div>
		<el-table class="view-member-table" :data="mockMemberData" row-key="userId">
			<el-table-column prop="nickName" :label="$t('orgManagement.model.viewMember.columns.name')">
				<template slot-scope="scope"><AvatarPanel class="name-column" :label="scope.row.nickName" /></template>
			</el-table-column>
			<el-table-column
				prop="username"
				:label="$t('orgManagement.model.viewMember.columns.loginAccount')"
			></el-table-column>
			<el-table-column prop="email" :label="$t('orgManagement.model.viewMember.columns.email')"></el-table-column>
			<el-table-column prop="orgName" :label="$t('orgManagement.model.viewMember.columns.orgName')"></el-table-column>
			<el-table-column prop="userType" :label="$t('orgManagement.model.viewMember.columns.userType')">
				<template slot-scope="scope">
					<Tag>{{ $t(`orgManagement.model.viewMember.columns.userTypeMap.${scope.row.userType}`) }}</Tag>
				</template>
			</el-table-column>
		</el-table>
	</el-dialog>
</template>

<script>
import AvatarPanel from "@/components/AvatarPanel"
import Tag from "@/components/Tag"
import { mockMemberData } from "./mock"

export default {
	name: "ViewMemberDialog",
	components: {
		AvatarPanel,
		Tag,
	},
	props: {
		open: {
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
	}

	.name-column {
		font-size: 14px;
		font-weight: 500;
	}
}
</style>
