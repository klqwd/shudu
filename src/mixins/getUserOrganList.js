import { getUserList, getUserOrganListByParentid } from '@/api/indicator'
export const getUserOrganList = {
  data() {
    return {
      organName: [
        {
          organName: '',
          gid: '',
        },
      ],
      realName: [
        {
          uid: '',
          realName: '',
        },
      ],
    }
  },
  created() {
    this.getUserList(), this.getUserOrganListByParentid(), console.log(1)
  },
  methods: {
    // 获取责任人信息
    async getUserList() {
      const data = await getUserList({
        pageNum: 1,
        pageSize: 20,
        gid: this.form.gid || 2,
      })
      this.realName = data.data.list
    },
    // 获取责任单位信息
    async getUserOrganListByParentid() {
      const data = await getUserOrganListByParentid({
        parentid: 1,
        pageNum: 1,
        pageSize: 20,
      })
      this.organName = data.data.list
    },
    // 选中单位时获取填报人
    async getInformant() {
      this.form.uid = ''
      const data = await getUserList({
        gid: this.form.gid,
        pageNum: 1,
        pageSize: 20,
      })
      this.realName = data.data.list
    },
  },
}
