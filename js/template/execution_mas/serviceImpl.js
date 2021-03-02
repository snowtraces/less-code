const ge_serviceImpl = (table) => {
    let template = `package ${base_package}.${scope.SERVICE}.service.impl;
import com.winning.base.akso.common.page.WinPagedList;
import com.winning.base.akso.utils.spring.BeanMapper;
import com.winning.business.mdm.common.global.constants.error.ErrorConstants;
import ${base_package}.common.constants.MdmConst;
import ${base_package}.common.service.constants.TableNameConst;
import ${base_package}.common.util.IDGenerator;
import ${base_package}.common.util.QueryUtil;
import ${base_package}.${scope.SERVICE}.dto.${table.camelName}.*;
import ${base_package}.${scope.SERVICE}.entity.${table.camelName}.${table.camelNameUpper}PO;
import ${base_package}.${scope.SERVICE}.repository.${table.camelNameUpper}QueryRepository;
import ${base_package}.${scope.SERVICE}.repository.${table.camelNameUpper}Repository;
import ${base_package}.${scope.SERVICE}.service.${table.camelNameUpper}Service;
import com.winning.pts.exception.WinningRuntimeException;
import com.winning.pts.utils.collection.ListUtil;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

${annotation}
@Service
public class ${table.camelNameUpper}ServiceImpl implements ${table.camelNameUpper}Service {

    private ${table.camelNameUpper}Repository ${table.camelName}Repository;
    private IDGenerator idGenerator;
    private ${table.camelNameUpper}QueryRepository ${table.camelName}QueryRepository;

    public ${table.camelNameUpper}ServiceImpl(${table.camelNameUpper}Repository ${table.camelName}Repository, IDGenerator idGenerator, ${table.camelNameUpper}QueryRepository ${table.camelName}QueryRepository) {
        this.${table.camelName}Repository = ${table.camelName}Repository;
        this.idGenerator = idGenerator;
        this.${table.camelName}QueryRepository = ${table.camelName}QueryRepository;
    }

    @Override
    public ${table.camelNameUpper}ResultOutput save${table.camelNameUpper}(Save${table.camelNameUpper}Input inputDO) {
        Long[] soid = inputDO.getSoid();
        ${table.camelNameUpper}PO ${table.camelName} = BeanMapper.map(inputDO, ${table.camelNameUpper}PO.class);
        Date nowDate = QueryUtil.getServiceSystemDate();
        ${table.camelName}.setModifiedAt(nowDate);
        if(${table.camelName}.get${table.camelPkUpper}() == null) {
            //新增
            ${table.camelName}.set${table.camelPkUpper}(idGenerator.getUID(TableNameConst.${table.code}));
            ${table.camelName}.setCreatedAt(nowDate);
            if(${table.camelName}.getEnabledFlag()==null){
                ${table.camelName}.setEnabledFlag(MdmConst.YES_VALUE_ID);
            }
        } else {
            //更新
            ${table.camelNameUpper}PO po = ${table.camelName}Repository.findBy${table.camelPkUpper}(${table.camelName}.get${table.camelPkUpper}(), soid);
            if (po == null) {
                throw new WinningRuntimeException(ErrorConstants.UPDATED_DATA_NOT_FOUND, ErrorConstants.UPDATED_DATA_NOT_FOUND_DESC);
            }
            ${table.camelName}.setCreatedAt(po.getCreatedAt());
            ${table.camelName}.setHospitalSOID(po.getHospitalSOID());
            ${table.camelName}.setModifiedAt(nowDate);
            ${table.camelName}.setIsDel(MdmConst.NOT_IS_DEL);
        }
        this.${table.camelName}Repository.save(${table.camelName});
        return new ${table.camelNameUpper}ResultOutput(true, "", ${table.camelName}.get${table.camelPkUpper}());
    }

    @Override
    public ${table.camelNameUpper}ResultOutput delete${table.camelNameUpper}(Delete${table.camelNameUpper}Input inputDO) {
        Date nowDate = QueryUtil.getServiceSystemDate();

        // 判断是否非法入参
        Long[] soid = inputDO.getSoid();
        if (inputDO.get${table.camelPkUpper}() != null) {
            ${table.camelNameUpper}PO po = ${table.camelName}Repository.findBy${table.camelPkUpper}(inputDO.get${table.camelPkUpper}(), soid);
            if (po == null) {
                throw new WinningRuntimeException(ErrorConstants.DELETED_DATA_NOT_FOUND, ErrorConstants.DELETED_DATA_NOT_FOUND_DESC);
            }
        }
        this.${table.camelName}Repository.deleteBy${table.camelPkUpper}(inputDO.get${table.camelPkUpper}(),nowDate,inputDO.getHospitalSOID());
        return new ${table.camelNameUpper}ResultOutput(true, "", inputDO.get${table.camelPkUpper}());
    }

    @Override
    public WinPagedList<Query${table.camelNameUpper}Output> query${table.camelNameUpper}ByExample(Query${table.camelNameUpper}Input inputDO) {
        List<Query${table.camelNameUpper}Output> bizpackList = new ArrayList<>();
        long count = 0L;
        WinPagedList<${table.camelNameUpper}PO> pagedList = ${table.camelName}QueryRepository.queryByExample(inputDO);
        if (ListUtil.isNotEmpty(pagedList.getData())) {
            bizpackList = BeanMapper.mapList(pagedList.getData(), ${table.camelNameUpper}PO.class, Query${table.camelNameUpper}Output.class);
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