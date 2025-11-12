/**
 * 权限主体
 * @typedef {Object} PermissionSubject
 * @property {string} ORG - 组织类型权限主体
 * @property {string} USER - 用户类型权限主体
 */

/**
 * @type {PermissionSubject}
 * @constant
 */
export const PERMISSION_SUBJECT = {
	ORG: "ORG",
	USER: "USER",
}

/**
 * 权限主体列表
 * @type {Array<PermissionSubject[keyof PermissionSubject]>}
 * @constant
 */
export const PERMISSION_SUBJECT_LIST = [PERMISSION_SUBJECT.ORG, PERMISSION_SUBJECT.USER]

/**
 * 权限类型
 * @typedef {Object} PermissionType
 * @property {string} PANEL - 仪表盘
 * @property {string} DOWNLOAD_TASK - 自助取数
 * @property {string} DATA_FILL - 数据填报
 * @property {string} DATASET - 数据集
 * @property {string} LINK - 数据源
 */

/**
 * @type {PermissionType}
 * @constant
 */
export const PERMISSION_TYPE = {
	PANEL: "panel",
	DOWNLOAD_TASK: "download_task",
	DATA_FILL: "data_fill",
	DATASET: "dataset",
	LINK: "link",
}

/**
 * 权限类型列表
 * @type {Array<PermissionType[keyof PermissionType]>}
 * @constant
 */
export const PERMISSION_TYPE_LIST = [
	PERMISSION_TYPE.PANEL,
	PERMISSION_TYPE.DOWNLOAD_TASK,
	PERMISSION_TYPE.DATA_FILL,
	PERMISSION_TYPE.DATASET,
	PERMISSION_TYPE.LINK,
]

/**
 * 权限类型对应的Remix Icon图标类名
 * @type {Record<PermissionType[keyof PermissionType], string>}
 * @constant
 */
export const PERMISSION_TYPE_CONFIG_ICONS = {
	[PERMISSION_TYPE.PANEL]: "ri-dashboard-line",
	[PERMISSION_TYPE.DOWNLOAD_TASK]: "ri-search-line",
	[PERMISSION_TYPE.DATA_FILL]: "ri-file-text-line",
	[PERMISSION_TYPE.DATASET]: "ri-database-line",
	[PERMISSION_TYPE.LINK]: "ri-server-line",
}

/**
 * 权限操作类型
 * @typedef {Object} ActionType
 * @property {string} VIEW - 查阅
 * @property {string} EDIT - 编辑
 * @property {string} MANAGE - 表格管理
 * @property {string} SUBMIT - 提交数据
 * @property {string} EXPORT - 导出
 */

/**
 * @type {ActionType}
 * @constant
 */
export const ACTION_TYPE = {
	VIEW: "view",
	EDIT: "edit",
	MANAGE: "manage",
	SUBMIT: "submit",
	EXPORT: "export",
}

/**
 * 各权限类型支持的操作类型
 * @type {Record<PermissionType[keyof PermissionType], Array<ActionType[keyof ActionType]>>}
 * @constant
 */
export const ACTION_TYPE_LIST = {
	[PERMISSION_TYPE.PANEL]: [ACTION_TYPE.VIEW, ACTION_TYPE.EDIT, ACTION_TYPE.EXPORT],
	[PERMISSION_TYPE.DOWNLOAD_TASK]: [ACTION_TYPE.VIEW, ACTION_TYPE.EDIT, ACTION_TYPE.EXPORT],
	[PERMISSION_TYPE.DATA_FILL]: [ACTION_TYPE.VIEW, ACTION_TYPE.EDIT, ACTION_TYPE.MANAGE, ACTION_TYPE.SUBMIT],
	[PERMISSION_TYPE.DATASET]: [ACTION_TYPE.VIEW, ACTION_TYPE.EDIT, ACTION_TYPE.EXPORT],
	[PERMISSION_TYPE.LINK]: [ACTION_TYPE.VIEW, ACTION_TYPE.EDIT],
}
