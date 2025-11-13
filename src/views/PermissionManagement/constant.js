// 权限主体
export const PERMISSION_SUBJECT = {
	ORG: "ORG",
	USER: "USER",
}
export const PERMISSION_SUBJECT_LIST = [PERMISSION_SUBJECT.ORG, PERMISSION_SUBJECT.USER]

// 权限类型
export const PERMISSION_TYPE = {
	PANEL: "panel",
	DOWNLOAD_TASK: "download_task",
	DATA_FILL: "data_fill",
	DATASET: "dataset",
	LINK: "link",
}
export const PERMISSION_TYPE_LIST = Object.values(PERMISSION_TYPE)

// 操作类型
export const ACTION_TYPE = {
	VIEW: "view",
	EDIT: "edit",
	MANAGE: "manage",
	SUBMIT: "submit",
	EXPORT: "export",
}

// 权限类型对应的操作列表
export const ACTION_TYPE_LIST = {
	[PERMISSION_TYPE.PANEL]: [ACTION_TYPE.VIEW, ACTION_TYPE.EDIT, ACTION_TYPE.EXPORT],
	[PERMISSION_TYPE.DOWNLOAD_TASK]: [ACTION_TYPE.VIEW, ACTION_TYPE.EDIT, ACTION_TYPE.EXPORT],
	[PERMISSION_TYPE.DATA_FILL]: [ACTION_TYPE.EDIT, ACTION_TYPE.MANAGE, ACTION_TYPE.SUBMIT],
	[PERMISSION_TYPE.DATASET]: [ACTION_TYPE.VIEW, ACTION_TYPE.EDIT, ACTION_TYPE.EXPORT],
	[PERMISSION_TYPE.LINK]: [ACTION_TYPE.VIEW, ACTION_TYPE.EDIT],
}

// 国际化映射键名
export const I18N_KEYS = {
	subject: "permissionConfig.userPermissionConfig.permissionSubjectMap",
	searchPlaceholder: "permissionConfig.userPermissionConfig.searchPlaceholder",
	permissionType: "permissionConfig.permissionTypeMap",
	action: "permissionConfig.actionMap",
}
