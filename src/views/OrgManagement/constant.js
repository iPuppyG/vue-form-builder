export const USER_TYPE = {
	NORMAL_USER: 0,
	ADMIN: 1,
}

export const USER_TYPE_MAP = {
	[USER_TYPE.NORMAL_USER]: "普通用户",
	[USER_TYPE.ADMIN]: "组织管理员",
}

export const ROOT_ORG_ID = 0

export const ACTION_TYPE = {
	ADD: "ADD", // 创建组织
	ADD_SUB: "ADD_SUB", // 添加子组织
	EDIT: "EDIT", // 编辑组织
}

export const ACTION_TYPE_LIST = [ACTION_TYPE.ADD, ACTION_TYPE.ADD_SUB, ACTION_TYPE.EDIT]
