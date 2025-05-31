# automatic-pet-feeding

- 因为写web显得界面太空，所以改成写小程序
- 目前只有三个功能
- 一个是自动投喂，用户设置投喂量，然后向树莓派发送feed_method = 0和feed_num这两个数据，feed_method=0的时候，当树莓派检测到动物靠近的时候，即自动倒出相应重量的猫粮
- 第二个是定时投喂，用户设置时间和投喂量，向树莓派发送feed_method=1,feed_num和feed_time三个数据，到点了就倒出食物
- 第三个即为查看历史记录
- 目前只在localhost上测试有效，感觉如果要又比较长的历史记录，还得用onenet
- 摄像头功能有点复杂，有空再补
