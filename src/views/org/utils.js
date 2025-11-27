export const orgTreeDataNormalizer = node => {
	return {
		id: node.orgId,
		label: node.name,
		children: node.subOrganizations,
	}
}

/**
 * 将组织树数据转换为 orgId -> name 的平级 map
 * @param {Array} treeData 组织树数据
 * @returns {Object} 平级 map（key: orgId, value: name）
 */
export const convertOrgTreeToMap = treeData => {
	const orgMap = {}

	// 递归处理单个节点及其子节点
	function traverse(node) {
		// 提取当前节点的 orgId 和 name
		orgMap[node.orgId] = node.name

		// 若有子节点，递归处理
		if (node.subOrganizations && node.subOrganizations.length) {
			node.subOrganizations.forEach(child => traverse(child))
		}
	}

	// 遍历顶层节点
	treeData.forEach(rootNode => traverse(rootNode))

	return orgMap
}
