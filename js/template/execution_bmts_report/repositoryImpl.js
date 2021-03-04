const ge_repositoryImpl = (table) => {
    let template = `package ${base_package}.persistence.repositories;

import com.winning.base.akso.jpa.util.JpaUtils;
import com.winning.base.akso.utils.spring.BeanMapper;
import ${base_package}.common.valueobjects.${scope.RESOURCE}.${table.camelNameUpper}QueryInputVo;
import ${base_package}.common.valueobjects.${scope.RESOURCE}.${table.camelNameUpper}Vo;
import ${base_package}.domain.repositories.${table.camelNameUpper}Repository;
import ${base_package}.persistence.entity.${scope.RESOURCE}.${table.camelNameUpper};
import ${base_package}.persistence.repositories.jpa.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.*;

@Repository
public class ${table.camelNameUpper}RepositoryImpl implements ${table.camelNameUpper}Repository {

    @Autowired
    private ${table.camelNameUpper}Jpa ${table.camelName}Jpa;

    @PersistenceContext
    private EntityManager entityManager;

    static {
        BeanMapper.registerMapperClassType(${table.camelNameUpper}.class, ${table.camelNameUpper}Vo.class);
    }

    @Override
    public Long save${table.camelNameUpper}(${table.camelNameUpper}Vo inputVo) {
        ${table.camelNameUpper} entity = BeanMapper.map(inputVo, ${table.camelNameUpper}.class);
        ${table.camelName}Jpa.save(entity);
        return entity.get${table.camelPkUpper}();
    }

    @Override
    public Long deleteBy${table.camelPkUpper}(Long hospitalSOID, Date modifiedAt, Long ${table.camelPk}) {
        ${table.camelName}Jpa.deleteBy${table.camelPkUpper}(hospitalSOID, modifiedAt, ${table.camelPk});
        return ${table.camelPk};
    }

    @Override
    public ${table.camelNameUpper}Vo findBy${table.camelPkUpper}(Long ${table.camelPk}, Long hospitalSOID) {
        ${table.camelNameUpper} entity = ${table.camelName}Jpa.findBy${table.camelPkUpper}(${table.camelPk}, hospitalSOID);
        return BeanMapper.map(entity, ${table.camelNameUpper}Vo.class);
    }

    @Override
    @Transactional(isolation = Isolation.READ_UNCOMMITTED)
    public List<${table.camelNameUpper}Vo> query${table.camelNameUpper}(${table.camelNameUpper}QueryInputVo input) {
        StringBuilder hsqlBuilder = new StringBuilder();
        hsqlBuilder.append("SELECT t");
        hsqlBuilder.append("FROM ${table.camelNameUpper} t ");
        hsqlBuilder.append("WHERE t.isDel = 0 and t.hospitalSOID = :hospitalSOID");
        Map<String, Object> params = new HashMap<>(16);
        params.put("hospitalSOID", input.getHospitalSOID());

${table.attrs.filter(attr => attr.code !== "SEQ_NO")
            .map(attr => {
                return `        // ${attr.name}
        ${attr.javaType} ${$.toCamelCase(attr.code)} = input.get${$.firstUpperCase($.toCamelCase(attr.code))}();
        if (${$.toCamelCase(attr.code)} != null) {
            hsqlBuilder.append(" AND t.${$.toCamelCase(attr.code)} = :${$.toCamelCase(attr.code)} ");
            params.put("${$.toCamelCase(attr.code)}", ${$.toCamelCase(attr.code)});
        }
   `}).join('\n')
        }
      
        Query query = entityManager.createQuery(hsqlBuilder.toString());
        params.forEach(query::setParameter);
        JpaUtils.setMapResult(query);
        List resultList = query.getResultList();
        return BeanMapper.mapList(resultList, Map.class, ${table.camelNameUpper}Vo.class);
    }
}
`
    return template
}