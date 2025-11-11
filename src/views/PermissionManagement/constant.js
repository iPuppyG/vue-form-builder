export const tabsOptions = [
	{
		label: "仪表盘",
		value: "panel",
	},
	{
		label: "自助取数",
		value: "download_task",
	},
	{
		label: "数据填报",
		value: "data_fill",
	},
	{
		label: "数据集",
		value: "dataset",
	},
	{
		label: "数据源",
		value: "link",
	},
]

export const permissionConfigIcons = new Map([
	["panel", "ri-dashboard-line"],
	["download_task", "ri-search-line"],
	["data_fill", "ri-file-text-line"],
	["dataset", "ri-database-line"],
	["link", "ri-server-line"],
])

export const orgTreeOptions = [
	{
		id: "company_001",
		label: "总公司",
		children: [
			{
				id: "dept_001",
				label: "技术部",
			},
			{
				id: "dept_002",
				label: "产品部",
			},
			{
				id: "dept_003",
				label: "运营部",
			},
		],
	},
	{
		id: "company_002",
		label: "分公司A",
		children: [
			{
				id: "dept_004",
				label: "销售部",
			},
			{
				id: "dept_005",
				label: "市场部",
			},
		],
	},
]

export const userList = [
	{ id: 1, name: "张三", email: "zhangsan@company.com" },
	{ id: 2, name: "李四", email: "lisi@company.com" },
	{ id: 3, name: "王五", email: "wangwu@company.com" },
	{ id: 4, name: "赵六", email: "zhaoliu@company.com" },
	{ id: 5, name: "钱七", email: "qianqi@company.com" },
	{ id: 6, name: "孙八", email: "sunba@company.com" },
]
