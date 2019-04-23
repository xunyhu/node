<template>
  <section class="content">
       <section class="content-tab cur">
            <!-- tab列表 content -->
                <div class="rank-content-n curent">
                    <!-- 自己信息 -->
                    <div class="myself-block" id="attack-myself">
                        <div class="list-inner">
                            <em class="number">{{myself.myrank}}</em>
                            <div class="pic-wrap"><img :src="myself.mypic" alt=""></div>
                            <span class="nickname">{{myself.myname}}</span>
                            <span class="score">{{myself.myscore}}</span>
                        </div>
                    </div>
                    <!-- 表格 title -->
                    <div class="list-title">
                        <em class="title-number">排名</em>
                        <span class="v-h"></span>
                        <span class="title-nickname">主播昵称</span>
                        <span class="title-score">分数</span>
                    </div>
                    <!-- 列表 -->
                    <ul id="list-section">
                        <li :class="{'li-active': i < base}" v-for="(item,i) in items" :key="item.uid">
                            <div class="list-inner">
                                <em class="number"><span>{{i+1}}</span></em>
                                <div class="pic-wrap"><img :src="item.headPic" alt></div>
                                <span class="nickname" v-html="item.nickName"></span>
                                <span class="score">{{item.score}}</span>
                            </div>
                        </li>
                        
                    </ul>
                    <p class="ndata-tips" v-show="compNoData">超级娱乐场，蓄势待发</p>                                
                    <div id="more-box1" class="more-section" v-show="isNotAll">
                        <a class="more-btn" href="javascript:void(0);" @click="showMore">显示更多&gt;&gt;</a>
                    </div>
                </div>
            </section>
  </section>
</template>

<script>
    import { filterPic,nickNameFormat } from '../../../../common/js/common'

    export default {
        name: 'List',
        data () {
            return {
                myself: {
                    myrank: '未上榜',
                    mypic: 'https://res.uxin.com/default/default.png',
                    myname: '未知昵称',
                    myscore: 'x'

                },
                items: [],
                isAll: false,
                base: 10 // 初始化显示10条数据
            }
        },
        created () {
            this.getData();
        },
        computed: {
            // 是否显示“无数据”文案
            compNoData () {
                return !this.items.length > 0;
            },
            // 是否显示“查看更多”
            isNotAll () {
                return this.items.length > 10 && !this.isAll;
            }
        },
        methods: {
            getData () {
                this.$get('/h5/v1/supercasino/rank')
                    .then ( (res) => {
                        // console.info('======',res)
                        // 自己信息
                        const list = res.b.list;
                        if ( typeof res.b.self !== 'undefined') {
                            const { rank,headPic,nickName,score } = res.b.self;
                            if ( rank > 0 ) {
                                this.myself.myrank = rank;
                            }
                            this.myself.mypic = headPic;
                            this.myself.myname = nickName;
                            this.myself.myscore = score;

                        }
                        
                        // 列表
                        if ( list.length > 0 ) {
                            // 过滤数据
                            list.map( (v) => {
                                v.nickName = nickNameFormat(v.nickName);
                                v.headPic = filterPic(v.headPic);
                                return v;
                            });

                            this.items = list;

                        }
                    })  
            },
            showMore () {
                this.base = this.items.length;
                this.isAll = true;
            }
        }
    }
</script>

<style lang="scss">
// ===============================================
$divide: 10;
$fs: 750px/$divide/1rem;// 定义单位
$baseFontC: #fff; //字体颜色
$bgc: #332051; // 背景颜色
$imgMgr: 24px/$fs; //排行榜头像 margin-right
$thePath: '../assets';
@mixin display-box {
    display: -webkit-box;
    display: box;
}
.text-overflow{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

// ===============================================
.content-tab{
    padding: 34px/$fs 26px/$fs 18px/$fs;
    border-radius: 8px/$fs;
    background: #4f31c9;
}
#list-section{
    li{
        display: none;
        &.li-active{
            display: block;
        }
        .pic-wrap{
            margin-right: $imgMgr;
        }
        &:nth-child(1){
                .number span{
                    border-radius: 50%;
                    background: #f06013;
                }
                .pic-wrap{
                    position: relative;
                    img{
                        width: 100px/$fs;
                        border: 4px/$fs solid #ffdb43;
                        margin-right: 0;
                    }
                    &::before{
                        content: '';
                        position: absolute;
                        top: -22px/$fs;
                        left: 50%;
                        transform: translate3d(-35px/2/$fs,0,0);
                        width: 35px/$fs;
                        height: 25px/$fs;
                        background: url(#{$thePath}/images/top_1.png) no-repeat;
                        background-size: 100% 100%;
                    }
                }

        }
        &:nth-child(2){
                .number span{
                    border-radius: 50%;
                    background: #f06013;
                }
                .pic-wrap{
                    position: relative;
                    img{
                        width: 100px/$fs;
                        border: 4px/$fs solid #e0e0e0;
                        margin-right: 0;                        
                    }
                    &::before{
                        content: '';
                        position: absolute;
                        top: -22px/$fs;
                        left: 50%;
                        transform: translate3d(-35px/2/$fs,0,0);
                        width: 35px/$fs;
                        height: 25px/$fs;
                        background: url(#{$thePath}/images/top_2.png) no-repeat;
                        background-size: 100% 100%;
                    }
                }
        }
        &:nth-child(3){
            .number span{
                border-radius: 50%;
                background: #f06013;
            }
            .pic-wrap{
                position: relative;
                img{
                    width: 100px/$fs;
                    border: 4px/$fs solid #d9b081;
                    margin-right: 0;                        
                }
                &::before{
                    content: '';
                    position: absolute;
                    top: -22px/$fs;
                    left: 50%;
                    transform: translate3d(-35px/2/$fs,0,0);
                    width: 35px/$fs;
                    height: 25px/$fs;
                    background: url(#{$thePath}/images/top_3.png) no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
        &:nth-child(4){
            .number span{
                color: #ff9301;
            }
        }
        &:nth-child(5){
            .number span{
                color: #ff9301;
            }
        }
        &:nth-child(6){
            .number span{
                color: #ff9301;
            }
        }
        &:nth-child(7){
            .number span{
                color: #ff9301;
            }
        }
        &:nth-child(8){
            .number span{
                color: #ff9301;
            }
        }
    }
}
// 列表li inner
.list-inner{
    display: flex;
    padding-bottom: 15px/$fs;
    margin-bottom: 35px/$fs;
    align-items: center;
    // border-bottom: 3px/$fs dashed #3699FF;
    font-size: 24px/$fs;
    
    em,span,img{
        display: block;
    }
    .number{
        padding-left: 4px/$fs;
        width: 86px/$fs;
        z-index: 2;
        span{
            display: inline-block;
            width: 36px/$fs;
            height: 36px/$fs;
            line-height: 38px/$fs;
            text-align: center;
        }
    }
    img{
        // margin-right: 18px/$fs;
        display: inline-block;
        width: 78px/$fs;
        border: 4px/$fs solid #A0A0A0;
        border-radius: 50%;
        z-index: 2;
    }
    .nickname{
        width: 196px/$fs;
        @extend .text-overflow;
        z-index: 2;
    }
    .score{
        flex: 1;
        text-align: right;
        font-size: 26px/$fs;
        // color: #f56626;
        z-index: 2;
    }
}
// 列表标题
.list-title{
    display: flex;
    margin-bottom: 36px/$fs;
    padding: 15px/$fs 10px/$fs;
    align-items: center;
    border-radius: 6px/$fs;
    font-size: 24px/$fs;
    color: #fff;
    background: #ff9301;
    .title-number{
        display: block;
        width: 86px/$fs;
        text-align: left;
    }
    .title-nickname{
        display: block;
        width: 196px/$fs;
        padding-left: $imgMgr;
        @extend .text-overflow;
        
    }
    .title-score{
        display: block;
        flex: 1;
        text-align: right;
        font-size: 26px/$fs;
    }
    .v-h{
        display: block;
        width: (68px+18px+2px)/$fs;
    }

}
// 自己排名
.myself-block{
    .list-inner{
        position: relative;
        height: 110px/$fs;
        border-bottom: none;
         &::before{
            content: '';
            position: absolute;
            top: 0;
            left: 0;;
            height: 100%;
            width: 50%;
            background: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,.4));
            z-index: 1;
            
        }
        &::after{
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            height: 100%;
            width: 50%;
            background: linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,.4));
            z-index: 1;
        }
        .number{
            // width: 84px/$fs;
            font-size: 24px/$fs;
        }
        img{
        }
    }
}
#waiting{
    // display: none;
    text-align: center;
}

// 更多
.more-section{
    text-align: center;
}
.more-btn{
    display: block;
    height: 58px/$fs;
    line-height: 58px/$fs;
    border-radius: 10px/$fs;
    text-align: center;
    background: #ff9301;
    color: #fff;
}
.no-more{
    background: #d8bec0;
}
.ndata-tips{
    text-align: center;
}
.show{
    display: block;
}
</style>
