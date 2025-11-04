<template>
	<main class="org-management">
		<div class="header">
			<el-input class="search" prefix-icon="el-icon-search" :placeholder="$t('orgManagement.searchOrg')" />
			<el-button class="add-btn" type="primary" icon="el-icon-plus">{{ $t("orgManagement.addOrg") }}</el-button>
		</div>
		<el-table class="table" :data="mockTreeData" :tree-props="{ children: 'subOrganizations' }" row-key="orgId">
			<el-table-column prop="name" :label="$t('orgManagement.columns.orgName')">
				<template slot-scope="scope">
					<i class="icon ri-building-line"></i>
					<span class="orgName">{{ scope.row.name }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="subOrganizationCount" :label="$t('orgManagement.columns.subOrgCount')">
				<template slot-scope="scope">
					<Tag color="blue">{{ `${scope.row.subOrganizationCount} ${$t("orgManagement.units.org")}` }}</Tag>
				</template>
			</el-table-column>
			<el-table-column prop="totalMemberCount" :label="$t('orgManagement.columns.totalMemberCount')">
				<template slot-scope="scope">
					<Tag color="green">{{ `${scope.row.totalMemberCount} ${$t("orgManagement.units.people")}` }}</Tag>
				</template>
			</el-table-column>
			<el-table-column prop="createBy" :label="$t('orgManagement.columns.createBy')">
				<template slot-scope="scope">
					<span class="createBy">{{ scope.row.createBy }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" :label="$t('orgManagement.columns.createTime')">
				<template slot-scope="scope">
					<span class="createTime">{{ dayjs(scope.row.createTime).format("YYYY-MM-DD hh:mm:ss") }}</span>
				</template>
			</el-table-column>
			<el-table-column :label="$t('orgManagement.columns.actions')" width="340px">
				<template slot-scope="scope">
					<div class="actions-wrap">
						<div class="btn edit-btn" plain>{{ $t("orgManagement.actions.edit") }}</div>
						<div class="btn add-btn" plain>{{ $t("orgManagement.actions.addSubOrg") }}</div>
						<div class="btn view-btn" plain>{{ $t("orgManagement.actions.viewMember") }}</div>
						<div class="btn delete-btn" plain>{{ $t("orgManagement.actions.delete") }}</div>
					</div>
				</template>
			</el-table-column>
		</el-table>
	</main>
</template>

<script>
import Tag from "@/components/Tag"
import { transformTreeKey } from "./utils"
import { mockTreeData } from "./mock"
import dayjs from "dayjs"

export default {
	components: { Tag },
	data() {
		return {
			mockTreeData,
		}
	},
	methods: {
		transformTreeKey,
		dayjs,
	},
}
</script>

<style lang="scss">
.org-management {
	width: 100%;
	padding: 24px;
	box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 24px;

		.search {
			width: 320px;

			input {
				border-radius: 8px;
			}
		}

		.add-btn {
			border-radius: 8px;
		}
	}

	.table {
		box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
		border-radius: 8px;
		border: none;

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

		.icon {
			color: #3b82f6;
		}

		.orgName {
			margin-left: 8px;
			color: #111827;
			font-size: 14px;
			font-weight: 500;
		}

		.createBy,
		.createTime {
			color: #111827;
			font-size: 14px;
			font-weight: 400;
		}

		.actions-wrap {
			display: flex;
			align-items: center;
			gap: 8px;

			.btn {
				font-size: 14px;
				border-radius: 8px;
				padding: 6px 12px;
				line-height: 20px;
				cursor: pointer;
			}

			.edit-btn {
				color: #374151;
				border: 1px solid #d1d5db;
			}

			.add-btn {
				color: #fff;
				background-color: #454f5d;

				&:hover {
					background-color: #374151;
				}
			}

			.view-btn {
				color: #374151;
				border: 1px solid #d1d5db;
			}

			.delete-btn {
				color: #fff;
				background-color: #dc2626;

				&:hover {
					background-color: #b91c1c;
				}
			}
		}
	}
}
</style>
