const ge_serviceImpl = (table) => {
    let base_package = 'com.winning.execution.mdm.service'
    let package = table.code.replaceAll('_', '').toLowerCase()
    
    // 表名
    let camelName = $.toCamelCase(table.code)
    let firstUpperCamelName = $.firstUpperCase(camelName)

    // 主键
    let pk = table.primaryKey
    let pkCamelName = $.toCamelCase(pk)
    let pkFirstUpperCamelName = $.firstUpperCase(pkCamelName)

    let template = `package ${base_package}.service.impl;
import com.winning.base.akso.common.page.WinPagedList;
import com.winning.base.akso.utils.spring.BeanMapper;
import com.winning.business.mdm.common.global.constants.error.ErrorConstants;
import com.winning.execution.mdm.common.constants.MdmConst;
import com.winning.execution.mdm.common.service.constants.TableNameConst;
import com.winning.execution.mdm.common.util.IDGenerator;
import com.winning.execution.mdm.common.util.QueryUtil;
import ${base_package}.dto.${camelName}.*;
import ${base_package}.entity.${camelName}.${firstUpperCamelName}PO;
import ${base_package}.repository.${firstUpperCamelName}QueryRepository;
import ${base_package}.repository.${firstUpperCamelName}Repository;
import ${base_package}.service.${firstUpperCamelName}Service;
import com.winning.pts.exception.WinningRuntimeException;
import com.winning.pts.utils.collection.ListUtil;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author: CHENG
 * @date: ${new Date().toLocaleDateString()}
 * @version 1.0
 */
@Service
public class ${firstUpperCamelName}ServiceImpl implements ${firstUpperCamelName}Service {

    private ${firstUpperCamelName}Repository ${camelName}Repository;
    private IDGenerator idGenerator;
    private ${firstUpperCamelName}QueryRepository ${camelName}QueryRepository;

    public ${firstUpperCamelName}ServiceImpl(${firstUpperCamelName}Repository ${camelName}Repository, IDGenerator idGenerator, ${firstUpperCamelName}QueryRepository ${camelName}QueryRepository) {
        this.${camelName}Repository = ${camelName}Repository;
        this.idGenerator = idGenerator;
        this.${camelName}QueryRepository = ${camelName}QueryRepository;
    }

    @Override
    public ${firstUpperCamelName}ResultOutput save${firstUpperCamelName}(Save${firstUpperCamelName}Input inputDO) {
        Long[] soid = inputDO.getSoid();
        ${firstUpperCamelName}PO ${camelName} = BeanMapper.map(inputDO, ${firstUpperCamelName}PO.class);
        Date nowDate = QueryUtil.getServiceSystemDate();
        ${camelName}.setModifiedAt(nowDate);
        if(${camelName}.get${pkFirstUpperCamelName}() == null) {
            //新增
            ${camelName}.set${pkFirstUpperCamelName}(idGenerator.getUID(TableNameConst.${table.code}));
            ${camelName}.setCreatedAt(nowDate);
            if(${camelName}.getEnabledFlag()==null){
                ${camelName}.setEnabledFlag(MdmConst.YES_VALUE_ID);
            }
        } else {
            //更新
            ${firstUpperCamelName}PO po = ${camelName}Repository.findBy${pkFirstUpperCamelName}(${camelName}.get${pkFirstUpperCamelName}(), soid);
            if (po == null) {
                throw new WinningRuntimeException(ErrorConstants.UPDATED_DATA_NOT_FOUND, ErrorConstants.UPDATED_DATA_NOT_FOUND_DESC);
            }
            ${camelName}.setCreatedAt(po.getCreatedAt());
            ${camelName}.setHospitalSOID(po.getHospitalSOID());
            ${camelName}.setModifiedAt(nowDate);
            ${camelName}.setIsDel(MdmConst.NOT_IS_DEL);
        }
        this.${camelName}Repository.save(${camelName});
        return new ${firstUpperCamelName}ResultOutput(true, "", ${camelName}.get${pkFirstUpperCamelName}());
    }

    @Override
    public ${firstUpperCamelName}ResultOutput delete${firstUpperCamelName}(Delete${firstUpperCamelName}Input inputDO) {
        Date nowDate = QueryUtil.getServiceSystemDate();

        // 判断是否非法入参
        Long[] soid = inputDO.getSoid();
        if (inputDO.get${pkFirstUpperCamelName}() != null) {
            ${firstUpperCamelName}PO po = ${camelName}Repository.findBy${pkFirstUpperCamelName}(inputDO.get${pkFirstUpperCamelName}(), soid);
            if (po == null) {
                throw new WinningRuntimeException(ErrorConstants.DELETED_DATA_NOT_FOUND, ErrorConstants.DELETED_DATA_NOT_FOUND_DESC);
            }
        }
        this.${camelName}Repository.deleteBy${pkFirstUpperCamelName}(inputDO.get${pkFirstUpperCamelName}(),nowDate,inputDO.getHospitalSOID());
        return new ${firstUpperCamelName}ResultOutput(true, "", inputDO.get${pkFirstUpperCamelName}());
    }

    @Override
    public WinPagedList<Query${firstUpperCamelName}Output> query${firstUpperCamelName}ByExample(Query${firstUpperCamelName}Input inputDO) {
        List<Query${firstUpperCamelName}Output> bizpackList = new ArrayList<>();
        long count = 0L;
        WinPagedList<${firstUpperCamelName}PO> pagedList = ${camelName}QueryRepository.queryByExample(inputDO);
        if (ListUtil.isNotEmpty(pagedList.getData())) {
            bizpackList = BeanMapper.mapList(pagedList.getData(), ${firstUpperCamelName}PO.class, Query${firstUpperCamelName}Output.class);
            count = pagedList.getCount();
        }
        if (inputDO.getPageNo() > 0) {
            count = -1L;
        }
        return new WinPagedList<>(count, bizpackList.stream().distinct().collect(Collectors.toList()));
    }
}
    `
    return template
}