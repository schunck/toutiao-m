<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
      >{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
        <van-grid-item
          class="grid-item"
          v-for="(channel, index) in myChannels"
          :key="index"
          @click="onMyChannelClick(channel, index)"
        >
          <van-icon
            v-show="isEdit && !fiexdChannels.includes(channel.id)"
            slot="icon"
            name='clear'
          ></van-icon>
          <span
            class="text"
            :class="{ active: index === active }"
            slot="text"
          >{{ channel.name }}</span>
        </van-grid-item>
      </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
    <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false,
      fiexdChannels: [0]
    }
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter(channel => {
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }
    // recommendChannels () {
    //   const channels = []
    //   this.allChannels.forEach(channel => {
    //     const ret = this.myChannels.find(myChannels => {
    //       return myChannels.id === channel.id
    //     })
    //     if (!ret) {
    //       channels.push(channel)
    //     }
    //   })
    //   return channels
    // }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        console.log(err)
        this.$toast('数据获取失败')
      }
    },
    onAddChannel (channel) {
      this.myChannels.push(channel)
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        if (this.fiexdChannels.includes(channel.id)) {
          return
        }
        this.myChannels.splice(index, 1)
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
      } else {
        this.$emit('updare-active', index, false)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
   .title-text {
     font-size: 30px;
     color: #333333;
   }
   .edit-btn {
     width: 104px;
     height: 48px;
     font-size: 26px;
     color: #f85959;
     border: 1px solid #f85959;
   }
   /deep/.grid-item {
     width: 160%;
     height: 86px;
      .van-grid-item__content {
        white-space: nowrap;
        background-color: #f4f5f6;
          .van-grid-item__text, .text {
            font-size: 28px;
            color: #222;
            margin-top: 0;
          }
          .active {
            color: red;
          }
          .van-grid-item__icon-wrapper {
            position: unset;
          }
      }
   }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

   /deep/.recommend-grid {
     .grid-item {
      .van-grid-item__content {
        flex-direction: row;
         .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
        .van-grid-item__text {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
