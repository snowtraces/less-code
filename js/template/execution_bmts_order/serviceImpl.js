const ge_serviceImpl = (table) => {
    let template = `package ${base_package}.domain.service.impl;

import com.winning.base.akso.duid.DuidAbility;
import com.winning.base.akso.timer.TimerAbility;
import com.winning.base.akso.utils.spring.BeanMapper;
import ${base_package}.common.valueobjects.${scope.RESOURCE}.${table.camelNameUpper}Vo;
import ${base_package}.domain.repositories.${table.camelNameUpper}Repository;
import ${base_package}.domain.service.${table.camelNameUpper}Service;
import ${base_package}.dtos.input.${scope.RESOURCE}.${table.camelNameUpper}DeleteInputDto;
import ${base_package}.dtos.input.${scope.RESOURCE}.${table.camelNameUpper}QueryInputDto;
import ${base_package}.dtos.input.${scope.RESOURCE}.${table.camelNameUpper}SaveInputDto;
import ${base_package}.dtos.output.${scope.RESOURCE}.${table.camelNameUpper}QueryOutputDto;
import ${base_package}.dtos.output.${scope.RESOURCE}.${table.camelNameUpper}ResultOutputDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class ${table.camelNameUpper}ServiceImpl extends ExeOrderExecuteBaseServiceImpl implements ${table.camelNameUpper}Service {
    @Autowired
    private ${table.camelNameUpper}Repository ${table.camelName}Repository;

    @Autowired
    private DuidAbility duidAbility;

    @Autowired
    private TimerAbility timerAbility;

    private static final String ${table.code}_TABLE_NAME = "${table.code}";

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ${table.camelNameUpper}ResultOutputDto save${table.camelNameUpper}(${table.camelNameUpper}SaveInputDto inputDto) {
        Long ${table.camelPk} = inputDto.get${table.camelPkUpper}();
        ${table.camelNameUpper}Vo vo = BeanMapper.map(inputDto, ${table.camelNameUpper}Vo.class);

        if (${table.camelPk} == null) {
            // 新增
            ${table.camelPk} = duidAbility.getUID(${table.code}_TABLE_NAME);
            vo.set${table.camelPkUpper}(${table.camelPk});
            setBaseVo(vo, vo.getHospitalSOID());

            ${table.camelName}Repository.save(vo);
        } else {
            // TODO 更新
        }

        return new ${table.camelNameUpper}ResultOutputDto(true, "", ${table.camelPk});
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ${table.camelNameUpper}ResultOutputDto delete${table.camelNameUpper}(${table.camelNameUpper}DeleteInputDto inputDto) {
        ${table.camelName}Repository.deleteBy${table.camelPkUpper}(
            inputDto.get${table.camelPkUpper}(),
            new Date(timerAbility.getServerTime()),
            inputDto.getHospitalSOID()
        );
        return new ${table.camelNameUpper}ResultOutputDto(true, "", inputDto.get${table.camelPkUpper}());
    }

    @Override
    public List<${table.camelNameUpper}QueryOutputDto> query${table.camelNameUpper}ByExample(${table.camelNameUpper}QueryInputDto inputDto) {
        // TODO
        return null;
    }
}
    `
    return template
}