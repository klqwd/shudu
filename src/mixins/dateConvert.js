export const dateConvert = {
  data() {
    return {
      options: [
        {
          dateType: 1,
          label: '月',
        },
        {
          dateType: 2,
          label: '季度',
        },
        {
          dateType: 3,
          label: '年',
        },
      ],
    }
  },
  created() {},
  computed: {
    dateTypeInput() {
      if (this.searchInput.dateType == '月') {
        return '1'
      } else if (this.searchInput.dateType == '季度') {
        return '2'
      } else if (this.searchInput.dateType == '年') {
        return '3'
      } else {
        return ''
      }
    },
  },
  methods: {
    convertDateType(row) {
      switch (row.dateType) {
        case 1:
          return '月'
        case 2:
          return '季度'
        case 3:
          return '年'
      }
    },
    // 转换状态
    alterState(value) {
      switch (value.progressState) {
        case '3':
          return '开工'
        case '6':
          return '停工'
        case '9':
          return '复工'
        case '12':
          return '竣工'
      }
    },
    alterScheduleState(value) {
      switch (value.progressState) {
        case '3':
          return '开始'
        case '6':
          return '停止'
        case '9':
          return '进行中'
        case '12':
          return '完成'
      }
    },
    // 状态转换
    convertDataTypeState(row) {
      if (row.state == 1) {
        return '已填报'
      } else {
        return '未填报'
      }
    },
    convertState(row) {
      if (row.warningState == 1) {
        this.stateClass = 'stateLag'
        return '滞后'
      } else if (row.warningState == 2) {
        this.stateClass = 'stateOverdue'
        return '逾期'
      }
    },
  },
}
