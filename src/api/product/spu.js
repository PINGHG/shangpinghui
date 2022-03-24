import request from '@/utils/request'

// 获取SPU列表数据接口
// /admin/product/${page}/${limit}
export const reqSpuList = (page, limit, category3Id)=>request({
    url:`/admin/product/${page}/${limit}`,
    method:'get',
    params:{category3Id:category3Id}
});

// 获取某个spu的信息
// /admin/product/getSpuById/{spuId}
export const reqSpu = (spuId)=>request({
    url:`/admin/product/getSpuById/${spuId}`,
    method:'get',
});

// 获取品牌数据
// /admin/product/baseTrademark/getTrademarkList
export const reqTradeMarkList = ()=>request({
    url:'/admin/product/baseTrademark/getTrademarkList',
    method:'get'
});

// 获取spu图片
// /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId)=>request({
    url:`/admin/product/spuImageList/${spuId}`,
    method:'get'
});
// 获取平台中全部的销售属性3个
// /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = ()=>request({
    url:'/admin/product/baseSaleAttrList',
    method:'get'
})

// 添加/修改spu
// /admin/product/saveSpuInfo
// /admin/product/updateSpuInfo
export const reqAddOrUpdateSpu = (spuInfo)=>{
    if(spuInfo.id){
        return request({
            url:'/admin/product/updateSpuInfo',
            method:'post',
            data:spuInfo
        })
    }else{
        return request({
            url:'/admin/product/saveSpuInfo',
            method:'post',
            data:spuInfo
        })
    }
}

// 删除spu
export const reqDeleteSpu = (spuId)=>request({
    url:`/admin/product/deleteSpu/${spuId}`,
    method:'delete'
})
