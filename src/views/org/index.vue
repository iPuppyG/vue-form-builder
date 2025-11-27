<template>
	<div class="wrapper">
		<div class="module-name">{{ $t("orgManagement.moduleName") }}</div>
		<main class="org-management">
			<div class="header">
				<el-input
					v-model="searchValue"
					class="search-input"
					prefix-icon="el-icon-search"
					:placeholder="$t('orgManagement.searchOrg')"
				/>
				<el-button class="add-btn" type="primary" icon="el-icon-plus" @click="handleAddOrg">
					{{ $t("orgManagement.addOrg") }}
				</el-button>
			</div>
			<PaginationTable
				class="table"
				:highlight-current-row="false"
				:data="mockOrgTreeData"
				:tree-props="{ children: 'subOrganizations' }"
				row-key="orgId"
			>
				<el-table-column prop="name" :label="$t('orgManagement.columns.orgName')" min-width="250px">
					<template slot-scope="scope">
						<i class="icon ri-building-line" />
						<span class="orgName">{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="subOrganizationCount" :label="$t('orgManagement.columns.subOrgCount')" min-width="120px">
					<template slot-scope="scope">
						<Tag color="blue">
							{{ `${scope.row.subOrganizationCount} ${$t("orgManagement.units.org")}` }}
						</Tag>
					</template>
				</el-table-column>
				<el-table-column
					prop="totalMemberCount"
					:label="$t('orgManagement.columns.totalMemberCount')"
					min-width="120px"
				>
					<template slot-scope="scope">
						<Tag color="green">
							{{ `${scope.row.totalMemberCount} ${$t("orgManagement.units.people")}` }}
						</Tag>
					</template>
				</el-table-column>
				<el-table-column prop="createBy" :label="$t('orgManagement.columns.createBy')" min-width="200px">
					<template slot-scope="scope">
						<span class="createBy">{{ scope.row.createBy }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" :label="$t('orgManagement.columns.createTime')" width="200px">
					<template slot-scope="scope">
						<span class="createTime">{{ dayjs(scope.row.createTime).format("YYYY-MM-DD hh:mm:ss") }}</span>
					</template>
				</el-table-column>
				<el-table-column :label="$t('orgManagement.columns.actions')" min-width="350px">
					<template slot-scope="scope">
						<div class="actions-wrap">
							<div class="btn edit-btn" @click="handleEditOrg(scope.row)">
								{{ $t("orgManagement.actions.edit") }}
							</div>

							<div class="btn add-btn" @click="handleAddSubOrg(scope.row)">
								{{ $t("orgManagement.actions.addSubOrg") }}
							</div>
							<div class="btn view-btn" @click="handleViewMember(scope.row)">
								{{ $t("orgManagement.actions.viewMember") }}
							</div>
							<el-popconfirm
								:title="$t('orgManagement.actions.deleteDesc', { orgName: orgMap[scope.row.orgId] })"
								@confirm="handleDeleteOrg(scope.row)"
							>
								<div class="btn delete-btn" slot="reference">
									{{ $t("orgManagement.actions.delete") }}
								</div>
							</el-popconfirm>
						</div>
					</template>
				</el-table-column>
			</PaginationTable>

			<ViewMemberDialog :visible.sync="viewModalVisible" :edit-row="editRow" />
			<EditDialog :visible.sync="editModalVisible" :edit-row="editRow" :type="editModalType" />
		</main>
	</div>
</template>

<script>
import dayjs from "dayjs"
import PaginationTable from "@/components/paginationTable"
import Tag from "@/components/tag"
import { convertOrgTreeToMap } from "./utils"
import ViewMemberDialog from "./ViewMemberDialog"
import EditDialog from "./EditDialog"
import { mockOrgTreeData } from "../mock"
import { ACTION_TYPE } from "./constant"

export default {
	components: { PaginationTable, Tag, ViewMemberDialog, EditDialog },
	data() {
		return {
			searchValue: null,
			editRow: undefined,
			editModalVisible: false,
			viewModalVisible: false,
			editModalType: ACTION_TYPE.ADD,
			mockOrgTreeData,
		}
	},
	computed: {
		orgMap() {
			return convertOrgTreeToMap(mockOrgTreeData)
		},
	},
	methods: {
		dayjs,
		toggleViewMemberModal() {
			this.viewModalVisible = !this.viewModalVisible
		},
		toggleEditOrgModal() {
			this.editModalVisible = !this.editModalVisible
		},
		handleViewMember(row) {
			this.editRow = row
			this.toggleViewMemberModal()
		},
		handleAddOrg() {
			this.editRow = null
			this.editModalType = ACTION_TYPE.ADD
			this.toggleEditOrgModal()
		},
		handleAddSubOrg(row) {
			this.editRow = row
			this.editModalType = ACTION_TYPE.ADD_SUB
			this.toggleEditOrgModal()
		},
		handleEditOrg(row) {
			this.editRow = row
			this.editModalType = ACTION_TYPE.EDIT
			this.toggleEditOrgModal()
		},
		handleDeleteOrg(row) {
			console.log("orgId", row.orgId)
		},
	},
}
</script>

<style lang="scss">
.wrapper {
	display: flex;
	flex-direction: column;
	overflow: hidden;
	width: 100%;
	height: 100%;
	padding: 24px;
	background-color: #f5f6f7;

	.module-name {
		color: #1f2329;
		font-size: 20px;
		font-weight: 500;
		line-height: 28px;
		margin-bottom: 24px;
	}

	.org-management {
		width: 100%;
		overflow: hidden;
		padding: 24px;
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

		.header {
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

			.add-btn {
				font-size: 14px;
				font-weight: 400;
				border-radius: 8px;
			}
		}

		.table {
			max-height: calc(100% - 36px - 24px);

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
					white-space: nowrap;
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
}
</style>
