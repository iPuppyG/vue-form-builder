/**
 * 格式化组织树数据
 * 1. orgId → id
 * 2. name → label
 * 3. subOrganizations → children（空值时移除该字段）
 * 4. 保留原数据中所有其他字段
 * @param {Array} data 原始组织树数组
 * @returns {Array} 格式化后的组织树数组
 */
export const formatOrgTreeData = data => {
	// 递归处理单个节点
	const processNode = node => {
		// 解构原始节点，提取需要转换的字段和剩余字段
		const { orgId, name, subOrganizations, ...restFields } = node

		// 处理 children：仅当 subOrganizations 是有效非空数组时才保留
		let children
		if (Array.isArray(subOrganizations) && subOrganizations.length > 0) {
			children = formatOrgTreeData(subOrganizations) // 递归处理子节点
		}

		// 构建格式化节点：children 存在时才添加该字段
		const formattedNode = {
			id: orgId,
			label: name,
			...restFields,
		}

		// 只有 children 有效时才添加 children 字段
		if (children) {
			formattedNode.children = children
		}

		return formattedNode
	}

	// 容错处理：输入非数组时返回空数组
	return Array.isArray(data) ? data.map(processNode) : []
}
