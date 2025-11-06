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

/**
 * 转换组织树数据字段，适配 Element Tree 组件
 * @param {Array} treeData 原始组织树数据
 * @returns {Array} 转换后的树数据（orgId→id，subOrganizations→children，name→label）
 */
export function transformOrgTreeForElement(treeData) {
	// 递归处理单个节点
	function transformNode(node) {
		// 复制原始节点并替换字段名
		const transformedNode = {
			id: node.orgId, // orgId → id
			label: node.name, // name → label
			pid: node.pid,
			createBy: node.createBy,
			createTime: node.createTime,
			totalMemberCount: node.totalMemberCount,
			subOrganizationCount: node.subOrganizationCount,
		}

		// 处理子节点（subOrganizations → children）
		if (node.subOrganizations && node.subOrganizations.length) {
			transformedNode.children = node.subOrganizations.map(child => transformNode(child))
		} else {
			// 无子节点时设为 null
			transformedNode.children = null
		}

		return transformedNode
	}

	// 处理顶层节点数组
	return treeData.map(rootNode => transformNode(rootNode))
}
