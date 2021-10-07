export default [{
    url: '/api/users',
    method: 'GET',
    response: () => {
      return {
        code: 20000,
        data: [{
          name: 'tom'
        }]
      }
    }
  },
  {
    url: '/api/newreport',
    method: 'GET',
    response: () => {
      return {
        code: 20000,
        data: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, ],

      }
    }
  },
  {
    url: '/api/rwmc',
    method: 'GET',
    response: () => {
      return {
        code: 20000,
        data: [{
            value: "三全鲜食（北新泾店）",
            address: "长宁区新渔路144号"
          },
          {
            value: "Hot honey 首尔炸鸡（仙霞路）",
            address: "上海市长宁区淞虹路661号",
          },
          {
            value: "新旺角茶餐厅",
            address: "上海市普陀区真北路988号创邑金沙谷6号楼113",
          },
        ]
      }
    }
  },
  {
    url: '/api/tableArray',
    method: 'get',
    response: (config) => {
      const {
        page = 1, limit = 2
      } = config.query;
      // 分页
      const data = mockList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      );
      return {
        code: 20000,
        data: data,
        limit: mockList.length
      }
    }
  },
  {
    url: '/api/addreport',
    method: 'get',
    response: (config) => {
      const {
        name = JSON.stringify('王小虎')
      } = config.query;
      const tableData = [{
          date: '2020-09-09',
          name: 'wang',
          address: 'beijng'
        }, {
          date: '2020-09-9',
          name: 'wang',
          address: 'beijng'
        },
        {
          date: '2020-09-9',
          name: 'wang',
          address: 'beijng'
        }
      ]
      const mockdata = {
        name: '王小虎',
        ssq: ['2020-02-09', '2020-03-07'],
        ms: '我是hh',
        tableData: tableData
      }
      // 分页
      return {
        code: 20000,
        data: mockdata,
      }
    }
  },
]

const mockList = [{
  date: '2016-05-02',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄',
  content: 'edit',
}, {
  date: '2016-05-04',
  name: '王小虎w',
  address: '上海市普陀区金沙江路 1517 弄',
  content: 'rwmx',
}, {
  date: '2016-05-01',
  name: '王小虎e',
  address: '上海市普陀区金沙江路 1519 弄',
  content: 'edit',
}, {
  date: '2016-05-03',
  name: '王小',
  address: '上海市普陀区金沙江路 1516 弄',
  content: 'rwmx',
}]