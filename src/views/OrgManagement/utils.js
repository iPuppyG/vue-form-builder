/**
 * 通用树形结构key转换函数：将指定的子节点字段转换为"children"
 * @param {Array|Object} data - 输入的树形数据（数组或单个对象）
 * @param {string} originalKey - 需要被替换的子节点字段名（如"subOrganizations"）
 * @returns {Array|Object} 转换后的树形数据（子节点字段替换为"children"）
 */
export const transformTreeKey = (data, originalKey) => {
	// 边界处理：如果数据为null/undefined，直接返回
	if (data === null || data === undefined) {
		return data
	}

	// 处理数组类型（顶层可能是数组）
	if (Array.isArray(data)) {
		return data.map(item => transformTreeKey(item, originalKey))
	}

	// 处理对象类型
	if (typeof data === "object") {
		// 创建新对象，避免修改原数据（浅拷贝基础上处理）
		const newObj = { ...data }

		// 如果当前对象包含需要替换的key
		if (originalKey in newObj) {
			// 递归处理子节点（子节点可能是数组/对象/null）
			newObj.children = transformTreeKey(newObj[originalKey], originalKey)
			// 删除原key
			delete newObj[originalKey]
		}

		// 遍历其他字段，确保嵌套对象也被处理（如存在多层嵌套的非子节点对象）
		Object.keys(newObj).forEach(key => {
			// 跳过已处理的children，递归处理其他可能的嵌套对象/数组
			if (key !== "children" && typeof newObj[key] === "object" && newObj[key] !== null) {
				newObj[key] = transformTreeKey(newObj[key], originalKey)
			}
		})

		return newObj
	}

	// 非对象/数组类型（如基本类型）直接返回
	return data
}
