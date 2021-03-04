const ge_domainServiceImpl = (table) => {
    let template = `package ${base_package}.domain.service.impl;

import com.winning.base.akso.timer.TimerAbility;
import com.winning.base.akso.utils.spring.BeanMapper;
import ${base_package}.common.constants.ErrorConstant;
import ${base_package}.common.constants.RptStatusEnum;
import ${base_package}.common.exceptions.ExeRptDomainException;
import ${base_package}.common.valueobjects.*;
import ${base_package}.common.valueobjects.base.BaseVo;
import ${base_package}.common.valueobjects.${scope.RESOURCE}.${table.camelNameUpper}QueryInputVo;
import ${base_package}.common.valueobjects.${scope.RESOURCE}.${table.camelNameUpper}Vo;
import ${base_package}.domain.aggregates.MedTechReportBo;
import ${base_package}.domain.repositories.${table.camelNameUpper}Repository;
import ${base_package}.domain.repositories.ExeRptMgtRepository;
import ${base_package}.domain.service.${table.camelNameUpper}DomainService;
import ${base_package}.domain.service.ExeRptMgtDomainService;
import ${base_package}.dtos.*;
import ${base_package}.dtos.${scope.RESOURCE}.${table.camelNameUpper}Dto;
import ${base_package}.dtos.${scope.RESOURCE}.input.${table.camelNameUpper}InputDto;
import ${base_package}.dtos.input.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

${annotation}
@Service
public class ${table.camelNameUpper}DomainServiceImpl implements ${table.camelNameUpper}DomainService {

    static {
        BeanMapper.registerMapperClassType(${table.camelNameUpper}Dto.class, ${table.camelNameUpper}Vo.class);
    }

    @Autowired
    private TimerAbility timerAbility;

    @Autowired
    private ${table.camelNameUpper}Repository ${table.camelName}Repository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public String save${table.camelNameUpper}(${table.camelNameUpper}InputDto inputDto) {
        ${table.camelNameUpper}Vo ${table.camelName}Vo = BeanMapper.map(inputDto.get${table.camelNameUpper}Dto(), ${table.camelNameUpper}Vo.class);
        Long hospitalSOID = inputDto.getHospitalSOID();
        setBaseVo(${table.camelName}Vo, hospitalSOID);
        try {
            ${table.camelNameUpper}Vo ${table.camelName} = ${table.camelName}Repository.findBy${table.camelPkUpper}(hospitalSOID, ${table.camelName}Vo.get${table.camelPkUpper}());
            if (${table.camelName} != null && ${table.camelName}.getCreatedAt() != null) {
                ${table.camelName}Vo.setCreatedAt(${table.camelName}.getCreatedAt());
            }
            ${table.camelName}Repository.save${table.camelNameUpper}(${table.camelName}Vo);
        } catch (Exception e) {
            throw new ExeRptDomainException(ErrorConstant.EXECUTION_INSERT_ERROR_CODE, e, e.getMessage());
        }
        return "保存${table.name}成功！ " + ${table.camelName}Vo.get${table.camelPkUpper}();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public String delete${table.camelNameUpper}(Long hospitalSOID, Long ${table.camelPk}) {
        try {
            Date nowDate = new Date(timerAbility.getServerTime());
            ${table.camelName}Repository.deleteBy${table.camelPkUpper}(hospitalSOID, nowDate, ${table.camelPk});
        } catch (Exception e) {
            throw new ExeRptDomainException(ErrorConstant.EXECUTION_INSERT_ERROR_CODE, e, e.getMessage());
        }
        return "删除${table.name}成功！ " + ${table.camelPk};
    }

    @Override
    public ${table.camelNameUpper}Vo findBy${table.camelPkUpper}(Long hospitalSOID, Long ${table.camelPk}) {
        return ${table.camelName}Repository.findBy${table.camelPkUpper}(hospitalSOID, ${table.camelPk});
    }

    @Override
    public List<${table.camelNameUpper}Vo> query${table.camelNameUpper}(${table.camelNameUpper}QueryInputVo input) {
        return ${table.camelName}Repository.query${table.camelNameUpper}(input);
    }

    /**
     * 设置基本属性
     *
     * @param vo
     * @param hospitalSOID
     */
    private void setBaseVo(BaseVo vo, Long hospitalSOID) {
        vo.setHospitalSOID(hospitalSOID);
        vo.setIsDel(0);
        vo.setCreatedAt(new Date(timerAbility.getServerTime()));
        vo.setModifiedAt(new Date(timerAbility.getServerTime()));
    }

}
    `
    return template
}