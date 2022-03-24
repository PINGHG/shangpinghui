// 获取品牌管理的数据模块
import  request  from "@/utils/request";

// 获取品牌列表接口
export const reqTradeMarkList = (page,limit)=>request({
    url:`/admin/product/baseTrademark/${page}/${limit}`,
    method:'get'
});

// 添加品牌
// /admin/product/baseTrademark/save  post body里带 "logoUrl" "tmName"
// 修改品牌
// /admin/product/baseTrademark/update put id name logo 
export const reqAddOrUpdateTradeMark = (tradeMark)=>{
    if(tradeMark.id){
        return request({
            url:'/admin/product/baseTrademark/update',
            method:'put',
            data:tradeMark
         })
    }else{
        return request({
            url:'/admin/product/baseTrademark/save',
            method:'post',
            data:tradeMark
        })
    }
} 
// 删除
export const reqDeleteTradeMark = (id)=>request({
    url:`/admin/product/baseTrademark/remove/${id}`,
    method:'delete',
})
