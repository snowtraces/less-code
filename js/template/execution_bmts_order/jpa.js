const ge_jpa = (table) => {
    let template = `package ${base_package}.persistence.repositories.jpa;

import ${base_package}.persistence.entity.${table.camelNameUpper};
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface ${table.camelNameUpper}Jpa extends JpaRepository<${table.camelNameUpper}, Long> {
    /**
     * 根据${table.name}标识删除${table.name}
     *
     * @param ${table.camelPk}   ${table.name}标识
     * @param modifiedAt   修改时间
     * @param hospitalSOID 医院soid
     */
    @Modifying
    @Query("update ${table.camelNameUpper} a set a.isDel = 1 , a.modifiedAt = :modifiedAt where a.${table.camelPk} = :${table.camelPk} and a.isDel = 0 and a.hospitalSOID = :hospitalSOID")
    void deleteBy${table.camelPkUpper}(@Param("${table.camelPk}") Long ${table.camelPk}, @Param("modifiedAt") Date modifiedAt, @Param("hospitalSOID") Long hospitalSOID);

    /**
     * 根据主键查询${table.name}信息
     *
     * @param ${table.camelPk}    ${table.name}标识
     * @param hospitalSOIDs 医院soid
     * @return ${table.name}信息
     */
    @Query(value = "select a from ${table.camelNameUpper} a  " +
        "  where a.${table.camelPk} = :${table.camelPk}" +
        " and a.hospitalSOID in :hospitalSOIDs " +
        " and a.isDel=0")
    ${table.camelNameUpper} findBy${table.camelPkUpper}(@Param("${table.camelPk}") Long ${table.camelPk}, @Param("hospitalSOIDs") Long[] hospitalSOIDs);

}
    `
    return template
}