<template>
	<div class="wrapper">
		<div class="title">{{ $t("mySubmit.moduleName") }}</div>
		<div class="mySubmit">
			<el-tabs v-model="activeTab">
				<el-tab-pane
					v-for="item in tabOptions"
					:key="item.value"
					:label="$t(`mySubmit.tabMap.${item.value}`)"
					:name="item.value"
				>
					<el-table :data="mockMySubmitData">
						<el-table-column prop="fillingName" :label="$t('mySubmit.columnName.fillingName')"></el-table-column>
						<el-table-column prop="period" :label="$t('mySubmit.columnName.period')"></el-table-column>
						<el-table-column prop="status" :label="$t('mySubmit.columnName.status')">
							<template slot-scope="scope">
								<Tag color="green">{{ $t(`mySubmit.statusMap.${scope.row.status}`) }}</Tag>
							</template>
						</el-table-column>
						<el-table-column prop="operationType" :label="$t('mySubmit.columnName.operationType')"></el-table-column>
						<el-table-column prop="approver" :label="$t('mySubmit.columnName.approver')"></el-table-column>
						<el-table-column prop="approverOrg" :label="$t('mySubmit.columnName.approverOrg')"></el-table-column>
						<el-table-column prop="approvalTime" :label="$t('mySubmit.columnName.approvalTime')">
							<template slot-scope="scope">
								{{ dayjs(scope.row.approvalTime, "YYYY-MM-DD hh:mm:ss") }}
							</template>
						</el-table-column>
						<el-table-column :label="$t('mySubmit.columnName.action')">
							<template slot-scope="scope">
								<el-popconfirm :title="$t('mySubmit.action.revokeDesc')">
									<div v-if="activeTab === 'APPROVING'" class="btn revoke">
										{{ $t("mySubmit.action.revoke") }}
									</div>
								</el-popconfirm>
								<div v-if="activeTab === 'REJECTED'" class="btn-group">
									<div class="btn edit">
										{{ $t("mySubmit.action.edit") }}
									</div>
									<div class="btn re-submit">
										{{ $t("mySubmit.action.reSubmit") }}
									</div>
								</div>
								<div v-if="activeTab === 'APPROVED'" class="btn view-detail">
									{{ $t("mySubmit.action.viewDetail") }}
								</div>
								<div v-if="activeTab === 'WITHDRAW'" class="btn-group">
									<div class="btn edit">
										{{ $t("mySubmit.action.edit") }}
									</div>
									<div class="btn re-submit">
										{{ $t("mySubmit.action.reSubmit") }}
									</div>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
import dayjs from "dayjs"
import Tag from "@/components/tag"
import { tabOptions } from "./options"
import { mockMySubmitData } from "../mock"

export default {
	name: "MuSubmit",
	components: {
		Tag,
	},
	data() {
		return {
			tabOptions,
			mockMySubmitData,
			activeTab: "APPROVING",
			detailDialog: false,
			searchParams: {
				searchValue: null,
				actionType: null,
				approver: null,
			},
		}
	},
	methods: {
		dayjs,
	},
}
</script>

<style>
.wrapper {
	height: 100%;
	padding: 24px;

	.title {
		color: #111827;
		font-size: 24px;
		font-weight: 600;
		line-height: 32px;
		margin-bottom: 24px;
	}

	.btn-group {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.btn {
		font-size: 14px;
		cursor: pointer;

		&.revoke {
			color: #dc2626;

			&:hover {
				color: #7f1d1d;
			}
		}

		&.edit {
			color: #2563eb;

			&:hover {
				color: #1e3a8a;
			}
		}

		&.re-submit,
		&.view-detail {
			color: #16a34a;

			&:hover {
				color: #14532d;
			}
		}
	}
}
</style>
